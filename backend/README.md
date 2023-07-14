# Backend API for Fiturself

### API Endpoints:

| API endpoints | Request | Description                       | Protected |
| ------------- | ------- | --------------------------------- | --------- |
| /             | GET     | Home page, gets all newest posts. | True      |
| /login        | POST    | Log in to your existing account.  | False     |

| Users                                | Request | Description                                      | Protected |
| ------------------------------------ | ------- | ------------------------------------------------ | --------- |
| /users                               | GET     | Fetch all users in the platform.                 | True      |
| /users                               | POST    | Create a new user.                               | False     |
| /users/:userID                       | GET     | Fetch existing user data.                        | True      |
| /users/:userID                       | PUT     | Update existing user data.                       | True      |
| /users/:userID                       | DELETE  | Delete user from database cleanup all user data. | True      |
| /users/:userID/friends               | GET     | Fetch user's friends list.                       | True      |
| /users/:userID/friends/received      | GET     | Fetch user's received friend requests.           | True      |
| /users/:userID/friends/sent          | GET     | Fetch user's sent friend requests.               | True      |
| /users/send/:senderID/:receiverID    | POST    | Send a friend request to a different user.       | True      |
| /users/cancel/:senderID/:receiverID  | DELETE  | Cancel a pending friend request.                 | True      |
| /users/accept/:receiverID/:senderID  | PUT     | Accept a pending friend request, become friends. | True      |
| /users/decline/:receiverID/:senderID | DELETE  | Decline a pending friend request.                | True      |
| /users/remove/:removerID/:removedID  | DELETE  | Remove someone's from your friend list.          | True      |

| Posts                                  | Request | Description                                                  | Protected |
| -------------------------------------- | ------- | ------------------------------------------------------------ | --------- |
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
