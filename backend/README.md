# Backend API for Fiturself

### API Endpoints:

| API endpoints         | Request | Description                       | Protected |
| --------------------- | ------- | --------------------------------- | --------- |
| /                     | GET     | Home page, gets all newest posts. | True      |
| /login                | POST    | Log in to your existing account.  | False     |
| /users                | GET     | Fetch all users in the platform.  | True      |
| /users                | POST    | Create a new user.                | False     |
| /users/:id            | GET     | Fetch existing user data.         | True      |
| /users/:id            | PUT     | Update existing user data.        | True      |
| /users/:id            | DELETE  | Delete user from database.        | True      |
| /workouts             | GET     | Fetch latest workouts.            | True      |
| /workouts/:id         | PUT     | Update specific workout.          | True      |
| /workouts/:id         | DELETE  | Delete specific workout.          | True      |
| /workouts?user=userId | GET     | Fetch specific user workouts.     | True      |

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
