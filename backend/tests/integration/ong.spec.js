const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const knexConfig = require('../../knexfile');

describe('ONG', () => {
  beforeEach(async () => {
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

    expect(response.body).not.toBeNull();
  });
});

/**
 * Quando necessitar, de em algum teste de requisição, definir, por exemplo, 
 * o "header", com o Authorization, basta colocar:
 * 
 * `.set('Authorization', 'id_de_alguma_coisa');`
 */