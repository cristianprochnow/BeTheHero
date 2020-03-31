const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
// const knexConfig = require('../../knexfile');

describe('Incident', () => {
//   beforeAll(async () => {
//     await connection.migrate.latest(knexConfig.test);
//   });

  afterAll(async () => {
    // await connection.migrate.rollback(knexConfig.test);
    await connection.destroy();
  });

  it('should be able to create a incident', async () => {
    const ongCreationResponse = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });

    const incidentCreationResponse = await request(app)
      .post('/incidents')
      .set('Authorization', ongCreationResponse.body.id)
      .send({
        title: "Caso de teste Show",
        description: "Detalhes deste caso criado para testes.",
        value: 120.50,
      });

    expect(incidentCreationResponse.body).toHaveProperty('id');
    expect(incidentCreationResponse.body.id).not.toBeNull();
  });

  it('should be able to list all the incidents', async () => {
    const ongCreationResponse = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });

    const incidentCreationResponse = await request(app)
      .post('/incidents')
      .set('Authorization', ongCreationResponse.body.id)
      .send({
        title: "Caso de teste Show",
        description: "Detalhes deste caso criado para testes.",
        value: 120.50,
      });

    const incidentListingResponse = await request(app)
      .get('/incidents');

    expect(incidentListingResponse.body).not.toBeUndefined();
    expect(incidentListingResponse.body).not.toBeNull();

    expect(incidentListingResponse.body[0]).toHaveProperty('id');
    expect(incidentListingResponse.body[0]).toHaveProperty('title');
    expect(incidentListingResponse.body[0]).toHaveProperty('description');
    expect(incidentListingResponse.body[0]).toHaveProperty('value');
    expect(incidentListingResponse.body[0]).toHaveProperty('ong_id');
    expect(incidentListingResponse.body[0]).toHaveProperty('name');
    expect(incidentListingResponse.body[0]).toHaveProperty('email');
    expect(incidentListingResponse.body[0]).toHaveProperty('whatsapp');
    expect(incidentListingResponse.body[0]).toHaveProperty('city');
    expect(incidentListingResponse.body[0]).toHaveProperty('uf');
  });

  it('should be able to delete a incident', async () => {
    const ongCreationResponse = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });
    
    const incidentCreationResponse = await request(app)
      .post('/incidents')
      .set('Authorization', ongCreationResponse.body.id)
      .send({
        title: "Apenas um teste",
        description: "Apenas mais um teste show, para ver se tudo está funcionando corretamente.",
        value: 120.50,
      });

    const incidentRemovingResponse = await request(app)
      .delete(`/incidents/${incidentCreationResponse.body.id}`)
      .set('Authorization', ongCreationResponse.body.id);

    expect(incidentRemovingResponse.status).toBe(204);
  });
});
