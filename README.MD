# Projeto Trelloso Client

Cliente para o a RestAPI do Trelloso, sistema que emula algumas funcionalidades do Trello!

## Observações Importantes
- O projeto vai ser um Single Page Application (SPA), isso gera uma complexidade no controle da exibição dos itens, e é por isso que é interessante para nós nesse momento
- A estrutura inicial de arquivos e pastas do projeto deve ser:
    - Se for necessário outros arquivos podem ser adicionados
    - Usar módulos para o código JS
```bash
trelloso_<minha_matricula_sem_traco_e_minusculo>
    index.html
    js/    
        main.js
    css/
        style.css
    img/
        favicon.png
```
- O arquivo de ícone deve ser uma imagem com 16x16 pixels ou 32x32 pixels, usando cores de 8 ou 24 bits! O arquivo pode ser um PNG, GIF ou ICO 
- É possível usar ferramentas de build como o Vite, mas o Live Server do VSCode nesse momento é suficiente
- Não é permitido o uso de frameworks e nem componentes de frontend externos disponíveis na web, devemos desenvolver os recursos que vamos precisar
- Antes de ficar preso em formatações CSS garanta que a parte Javascript está funcionando corretamente, por exemplo:
    - Crie um **form** simples de cadastrado de usuário
    - Teste todo o processo enviando os dados para o endpoint do backend
    - Se estiver funcionando corretamente ajuste o layout para esse componente
- O layout da página deve ser feito com Grid Layout com áreas
- O layout interno dos componentes deve ser feito com Flexbox

## Atividades

### Ambiente
- Baixar o projeto trelloso_fastapi do Classroom
    - Descompactar o arquivo em um diretório
    - Seguir as orientações do arquivo README.md para inicializar o backend
- Criar a estrutura de arquivos e pastas inicial
- Abrir a pasta do projeto no VSCode
- Verificar se o VSCode está com as extensões necessárias
    - Prettier - Code formatter: Formatação do código digitado
    - Live Server: Servidor web de desenvolvimento
    - Javascript (ES6) code snippets: Coleção de trechos de código

### RestAPI
- Explorar a página de documentação da API
- Identificar o tipo de Request Body que cada método usa, isso vai ajudar e evitar muito problema e tempo perdido com chamadas que não funcionam
- Usar um aplicativo para acesso às APIs
    - Postman
    - Insomnia
    - Thunder Client (Extensão do VSCode)
- Os **endpoints** vão retornar os códigos:
    - 200: Executado com sucesso
    - 401: O usuário logado na página não está autorizado a acessar o recurso
    - 404: Recurso não encontrado. Ou o **endpoint** não existe ou o recurso solicitado não existe, por exemplo pedir um card com id 10 e ele não existir no BD
    - 500: Problema no funcionamento do Backend! Entrar em contato comigo!

### Desenvolvimento

#### Criar o formulário para registrar um novo usuário
- Fazer o código que envia essa requisição para o backend
    - Usar o fetch nativo do Javascript
    - Não usar axios
    - Lembrar que o fetch retorna uma promisse
- Esse **endpoint** é aberto e não precisa de autenticação
- Cada **endpoint** pode ser testado na página de documentação da API, nesse processo é apresentado os campos que o **endpoint** espera para ser executado com sucesso. Por exemplo, para criar um usuário é necessário:
    - Request Body: application/json
    - JSON: { "name": "string", "username": "string", "avatar_url": "string", "password": "string" }
- Após criado com sucesso é possível fazer login com esse usuário
- Exibir mensagem de erro de forma apropriada para o usuário

### Criar a página de login
- Alterar a exibição do formulário de registro e de login
- Enviar os dados de autenticação para o **endpoint** auth/token
- Se o endpoint responder com sucesso (200) salvar o **token** no **localStorage**
- Ao abrir a página novamente verificar se o **token** existe no **localStorage**
    - Caso exista exibir os Quadros do usuário e tentar usar esse token nas requisições
    - Se o token não funcionar (expirou) então voltar a exibir o formulário de login
- Exibir mensagem de erro de forma apropriada para o usuário (js)
- Observações:
    - Salvar o token no **localStorage** não é a opção mais segura
    - Nesse momento vamos usar dessa forma
    - Outra opção seria usar um cookie http-only
        - O **backend** retornaria esse cookie no processo de login
        - Ele seria usado automaticamente nas próximas requisições

### Home do usuário conectado
- Criar uma home Responsiva do usuário 
- A home deve contar:
    - Uma barra de navegação
    - Adicionar um menu à barra de navegação (Opções para navegar entre as "páginas" e sair)
    - Adicionar um ícone com o avatar do usuário, no canto direito
        - Ao clicar no ícone apresentar os dados do usuário
    - Exibir os quadros criados pelo usuário separando os favoritos dos demais
    - Exibir uma barra lateral com opções para filtrar a lista de quadros (mostrar todos, favoritos)
    - Opção para a criação do Quadro
    - Opção para editar o Quadro
    - Opção para definir se o Quadro é favorito

### Exibir o board selecionado
- Criar a exibição do board, pode ter rolagem horizanto como no Trello
    - Manter a barra de navegação
    - Exibir as Listas com a opção para criar uma nova	
    - Exibir os Cartões de cada Lista
        - Com etiquetas (tags), indicações de membros, indicações de comentários e data se tiver
    - Criar um novo Cartão a partir da Lista
    - Editar um cartão 
        - Adicionando/removendo tags e comentários e data)	
    - Excluir um cartão	
    - Mover o cartão de uma lista para outra
        - Plus: Usar **drag and drop** para isso!

### Plus - Converter em um PWA
- Com a aplicação funcionando corretamente converta em um PWA
- Crie o Service Worker com foco na possibilidade de acessar os recursos do cache caso offline
- Para reduzir complexidade caso esteja offline não permitir que o usuário faça alteração nos itens, apenas visualização
