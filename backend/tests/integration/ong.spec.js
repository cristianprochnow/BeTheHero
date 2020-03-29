const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const knexConfig = require('../../knexfile');

describe('ONG', () => {
  beforeAll(async () => {
    await connection.migrate.rollback(knexConfig.test);
    await connection.migrate.latest(knexConfig.test);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create an ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Show",
        email: "contato@apad.com.br",
        whatsapp: "47991929399",
        city: "Rio do Sul",
        uf: "SC"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });

  it('should be able to list all the ONGs', async () => {
    const response = await request(app)
      .get('/ongs');

    expect(response.body).not.toBeUndefined();
    expect(response.body).not.toBeNull();

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
    expect(response.body[0]).toHaveProperty('whatsapp');
    expect(response.body[0]).toHaveProperty('city');
    expect(response.body[0]).toHaveProperty('uf');
  });
});

/**
 * Quando necessitar, de em algum teste de requisição, definir, por exemplo, 
 * o "header", com o Authorization, basta colocar:
 * 
 * `.set('Authorization', 'id_de_alguma_coisa');`
 */
