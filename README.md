# Goal List Backend

API RESTful desenvolvida com Fastify para gerenciamento de metas e objetivos, oferecendo funcionalidades de autenticação de usuários e controle de metas.

## 🚀 Funcionalidades

### Autenticação e Usuário
- Criação de conta de usuário
- Autenticação via JWT
- Atualização de dados do perfil (nome, email, senha)
- Exclusão de conta

### Gerenciamento de Metas
- Criação de metas
- Listagem de metas pendentes da semana
- Marcação de metas como concluídas
- Desmarcação de metas concluídas
- Remoção de metas
- Resumo semanal de metas
- Limpeza em massa de conclusões de metas

## 🛠️ Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente
- **Prisma**: ORM para banco de dados
- **TypeScript**: Linguagem principal
- **JWT**: Autenticação e autorização
- **BCrypt**: Criptografia de senhas
- **Date-fns**: Manipulação de datas

## 📋 Endpoints da API

### Usuários
```
POST /users - Criar novo usuário
POST /session - Login de usuário
GET /me - Detalhes do usuário autenticado
PUT /change-password - Atualizar senha
PUT /change-email - Atualizar email
PUT /change-name - Atualizar nome
DELETE /delete-user - Excluir usuário
```

### Metas
```
POST /goals - Criar nova meta
GET /pending-goals - Listar metas pendentes da semana
POST /completions - Marcar meta como concluída
GET /summary - Obter resumo semanal
DELETE /delete-goal - Deletar meta específica
DELETE /delete-all-goal-completion - Deletar todas as conclusões
DELETE /undo - Desfazer conclusão de meta
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ThalysonRibeiro/goallist-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```env
DATABASE_URL="sua-url-do-banco-de-dados"
JWT_SECRET="seu-segredo-jwt"
CORS_ORIGIN="http://localhost:3333"
PORT=3333
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Gere o cliente Prisma:
```bash
npm run prisma:generate
```

6. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Gera build de produção
- `npm run start`: Inicia o servidor em produção
- `npm run seed`: Executa seeds do banco de dados
- `npm run prisma:generate`: Gera cliente Prisma
- `npm run vercel-build`: Build específico para deploy na Vercel

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza Prisma como ORM. Os principais modelos incluem:

- User (Usuários)
- Goal (Metas)
- GoalCompletion (Conclusões de metas)

## 🔒 Middleware de Autenticação

A API utiliza um middleware `isAuthenticated` para proteger rotas que requerem autenticação. O token JWT deve ser enviado no header da requisição:

```
Authorization: Bearer seu-token-jwt
```

## 🚀 Deploy

O projeto está configurado para deploy na Vercel, incluindo comandos específicos para build e geração do Prisma Client.

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

- Thalyson - [GitHub](https://github.com/ThalysonRibeiro)

## 📄 Versão

- Versão atual: 1.0.0
