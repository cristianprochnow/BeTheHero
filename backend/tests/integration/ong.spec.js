const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
// const knexConfig = require('../../knexfile');

describe('ONG', () => {
//   beforeAll(async () => {
//     await connection.migrate.latest(knexConfig.test);
//   });

  afterAll(async () => {
    // await connection.migrate.rollback(knexConfig.test);
    await connection.destroy();
  });

  it('should be able to create an ONG', async () => {
    const ongCreationResponse = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });

      expect(ongCreationResponse.body).toHaveProperty('id');
      expect(ongCreationResponse.body.id).toHaveLength(8);
  });

  it('should be able to list all the ONGs', async () => {
    const ongListingResponse = await request(app)
      .get('/ongs');

    expect(ongListingResponse.body).not.toBeUndefined();
    expect(ongListingResponse.body).not.toBeNull();

    expect(ongListingResponse.body[0]).toHaveProperty('id');
    expect(ongListingResponse.body[0]).toHaveProperty('name');
    expect(ongListingResponse.body[0]).toHaveProperty('email');
    expect(ongListingResponse.body[0]).toHaveProperty('whatsapp');
    expect(ongListingResponse.body[0]).toHaveProperty('city');
    expect(ongListingResponse.body[0]).toHaveProperty('uf');
  });
});

/**
 * Quando necessitar, de em algum teste de requisição, definir, por exemplo, 
 * o "header", com o Authorization, basta colocar:
 * 
 * `.set('Authorization', 'id_de_alguma_coisa');`
 */
