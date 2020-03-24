exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};

/**
 * UP -> Relaciona-se com a criação de tabelas ou colunas etc.
 * DOWN -> Relaciona-se com a remoção de algo do banco de dados, caso haja 
 * problema, por exemplo, e seja necessária a remoção de alguma coisa.
 * 
 * UP => faz, DOWN => desfaz.
 * 
 * MIGRATION -> É como se fosse um histórico de eventos no banco e processos 
 * pré-estabelecidos, para que não haja a necessidade de, quando algum outro 
 * desenvolvedor desejar usar o mesmo database, ter que fazer tudo a mão.
 */
