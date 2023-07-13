# Backend API for Fiturself

### API Endpoints:

| API endpoints          | Request | Description                                  | Protected |
| ---------------------- | ------- | -------------------------------------------- | --------- |
| /                      | GET     | Home page, gets all newest posts.            | True      |
| /:userID               | POST    | Home page, create a new post.                | True      |
| /login                 | POST    | Log in to your existing account.             | False     |
| /users                 | GET     | Fetch all users in the platform.             | True      |
| /users                 | POST    | Create a new user.                           | False     |
| /users/:userID         | GET     | Fetch existing user data.                    | True      |
| /users/:userID         | PUT     | Update existing user data.                   | True      |
| /users/:userID         | DELETE  | Delete user from database.                   | True      |
| /posts                 | GET     | Posts page, gets all newest posts.           | True      |
| /posts/:postID/:userID | POST    | Create a comment on a specific post.         | True      |
| /posts/:postID/:userID | UPDATE  | Update a post and the account data.          | True      |
| /posts/:postID/:userID | DELETE  | Delete the post and update the account data. | True      |

### To-do:

1. Integrate and use TypeScript for the backend: **DONE**, much thanks to this guy's [video](https://www.youtube.com/watch?v=qy8PxD3alWw&ab_channel=ColtSteele) for explaining so well
2. Create db schemas: User / Post / Comments / Workout **IN PROGRESS**
3. Create routes for: homepage / auth / user profiles / workout types **IN PROGRESS**
4. Test the Routes: had to do TS config for jest, followed this [article](https://bobbyhadz.com/blog/typescript-jest-cannot-use-import-statement-outside-module)
5. Test the Database operations
6. Setup secure authentication / look into other strategies
7. Create controllers for the API
8. Test everything with Postman
9. Profit ??? (Deploy)

### Installation and running

```
git clone git@github.com:janaiscoding/fiturself.git
cd fiturself/backend
npm install
npm run dev
Server is listening on localhost:3000
```

# Built with

## Technologies

- Express.js, Node.js
- Mongoose, MongoDB
- TypeScript, JavaScript

## Tools Used

- Postman
- Visual Studio Code
- npm package manager
- Linux Terminal
- Git and Github
