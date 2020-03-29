const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const knexConfig = require('../../knexfile');

describe('Incident', () => {
  beforeAll(async () => {
    await connection.migrate.rollback(knexConfig.test);
    await connection.migrate.latest(knexConfig.test);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a incident', async () => {
    const responseOng = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', responseOng.body.id)
      .send({
        title: "Caso de teste Show",
        description: "Detalhes deste caso criado para testes.",
        value: 120.50,
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).not.toBeNull();
  });

  it('should be able to list all the incidents', async () => {
    const response = await request(app)
      .get('/incidents');

    expect(response.body).not.toBeUndefined();
    expect(response.body).not.toBeNull();

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('value');
    expect(response.body[0]).toHaveProperty('ong_id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('whatsapp');
    expect(response.body[0]).toHaveProperty('city');
    expect(response.body[0]).toHaveProperty('uf');
  });

  it('should be able to delete a incident', async () => {
    const responseOngCreation = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });
    
    const responseIncidentCreation = await request(app)
      .post('/incidents')
      .set('Authorization', responseOngCreation.body.id)
      .send({
        title: "Apenas um teste",
        description: "Apenas mais um teste show, para ver se tudo está funcionando corretamente.",
        value: 120.50,
      });

    console.log(responseIncidentCreation.body.id);

    const response = await request(app)
      .delete(`/incidents/${responseIncidentCreation.body.id}`)
      .set('Authorization', responseOngCreation.body.id);

    expect(response.status).toBe(204);
  });
});
