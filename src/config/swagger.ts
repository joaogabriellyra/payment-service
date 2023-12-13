import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerConfig: swaggerJSDoc.OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Service',
      description: `O usuário poderá criar uma conta no sistema em que será permitido realizar e receber transferências
        entre os usuários já cadastrados. O usuário também poderá alterar as suas informações. 
        Será permitido um cadastro por CPF.
        O passo a passo da construção da aplicação consiste nas seguintes etapas:
        \n- criar um docker-compose e criar uma rota /healthy que retorna ‘the application is healthy’ <b>OK</b>
        \n- configurar typeORM <b>OK</b>
        \n- a documentação do projeto será pelo swagger 
        \n- cadastrar usuário com post 
        \n- as senhas serão encriptografadas ao serem salvas 
        \n- haverá um e-mail para confirmação de cadastro 
        \n- fazer post para login
        \n- a autenticação do login será via JWT 
        \n- pegar informações do usuário com get 
        \n- atualizar informações do usuário com put 
        \n- deletar usuário com delete (deleção lógica) 
        \n- fazer post depositando 
        \n- fazer get saldo 
        \n- fazer post transferindo (todo usuário cadastrado poderá receber uma transferência) 
        \n- fazer post sacando 
      `,
      contact: {
        email: 'jgabriellyra@hotmail.com'
      },
      version: '1.0.0'
    },
    host: 'localhost:3001',
    // Não obrigatório, serve apenas para definir a ordem das categorias
    tags: [],
    externalDocs: {
      description: 'View swagger.json',
      url: '../swagger.json'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          in: 'header',
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  },
  apis: ['src/controllers/*.ts', 'controllers/*.js']
};