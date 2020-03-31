const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
// const knexConfig = require('../../knexfile');

describe('Profile', () => {
  // beforeAll(async () => {
  //   await connection.migrate.latest(knexConfig.test);
  // });
  
  afterAll(async () => {
    // await connection.migrate.rollback(knexConfig.test);
    await connection.destroy();
  });

  it('should be able to list all the incidents according the ONG ID', async () => {
    const OngCreationResponse = await request(app)
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
      .set('Authorization', OngCreationResponse.body.id)
      .send({
        title: "Caso de teste Show",
        description: "Detalhes deste caso criado para testes.",
        value: 120.50,
      });
    
    const response = await request(app)
      .get('/profile')
      .set('Authorization', OngCreationResponse.body.id);

    expect(response.body).not.toBeUndefined();
    expect(response.body).not.toBeNull();

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('value');
    expect(response.body[0]).toHaveProperty('ong_id');
  });
});
