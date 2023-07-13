# Backend API for Fiturself

### API Endpoints:

| API endpoints                          | Request | Description                                                  | Protected |
| -------------------------------------- | ------- | ------------------------------------------------------------ | --------- |
| /                                      | GET     | Home page, gets all newest posts.                            | True      |
| /login                                 | POST    | Log in to your existing account.                             | False     |
| /users                                 | GET     | Fetch all users in the platform.                             | True      |
| /users                                 | POST    | Create a new user.                                           | False     |
| /users/:userID                         | GET     | Fetch existing user data.                                    | True      |
| /users/:userID                         | PUT     | Update existing user data.                                   | True      |
| /users/:userID                         | DELETE  | Delete user from database cleanup all user data.             | True      |
| /posts                                 | GET     | Posts page, gets all newest posts.                           | True      |
| /posts/:userID                         | POST    | Create a new post from your account                          | True      |
| /posts/:postID/:userID                 | POST    | Create a comment on a specific post associated with an user. | True      |
| /posts/:postID/:userID                 | UPDATE  | Update a post and the account data.                          | True      |
| /posts/:postID/:userID                 | DELETE  | Delete the post and update the account data.                 | True      |
| /posts/:postID/:userID/like            | PUT     | Like/dislike a post from a user account.                     | True      |
| /posts/:postID/:userID/:commentID/like | PUT     | Like/dislike a comment from a user account.                  | True      |

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
