const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/**
 * RECURSO
 * 
 * Caso a rota fosse, por exemplo, '/users', este seria um recurso da rota. 
 * Geralmente está relacionado com algum recurso do banco de dados, seja ele 
 * uma entidade ou qualquer outra coisa.
 * 
 * ROTA
 * 
 * É como se fosse o conjunto total. Em que em determinada combinação, há o 
 * direcionamento para outra página.
 * 
 * PARÂMETROS
 * 
 * Query Params -> (?name=AlgumNome%idade=algumaIdade) [request.query]
 * Route Params -> (/users/:id => /users/4) [request.params]
 * Request Body -> [request.body] {dados de uma requisição}
 * 
 * CORS
 * 
 * É apenas uma segurança adicional, em relação aos acessos. Já que estamos 
 * lidando apenas com o desenvolvimento, não é passado nenhum argumento para a 
 * função. Mas se estivéssemos no ambiente de produção, o que é recomendado 
 * ser passado é, por exemplo:
 * 
 * app.use(cors({
 *  origin: 'http://linkemqueestahospedadomeufrontend.com.br'
 * }));
 */
