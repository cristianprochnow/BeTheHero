const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
// const knexConfig = require('../../knexfile');

describe('Session', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a login session', async () => {
    const ongCreationResponse = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });

    const sessionCreationResponse = await request(app)
      .post('/session')
      .send({
        id: ongCreationResponse.body.id
      });

    expect(sessionCreationResponse.body).not.toBeUndefined();
    expect(sessionCreationResponse.body).not.toBeNull();
    expect(sessionCreationResponse.body).toHaveProperty('name');
  });
});
