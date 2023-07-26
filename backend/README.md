# Backend API for Fiturself

### API Endpoints:

| API endpoints | Request | Description                         | Protected | Postman tested |
| ------------- | ------- | ----------------------------------- | --------- | -------------- |
| /             | GET     | Home page, gets all newest posts.   | True      | True           |
| /signup       | POST    | Create a new user.                  | False     | True           |
| /login        | POST    | Log in to your existing account.    | False     | True           |
| /verify       | POST    | Verify Token and re-send user data. | False     | True           |

Token expires in 24hr

| Users                     | Request | Description                                      | Protected | Postman tested    |
| ------------------------- | ------- | ------------------------------------------------ | --------- | ----------------- |
| /users                    | GET     | Fetch all users in the platform.                 | True      | True              |
| /users/:userID            | GET     | Fetch existing user data.                        | True      | True              |
| /users/:userID            | PUT     | Update existing user data.                       | True      | True              |
| /users/:userID/upload     | POST    | Upload user profile picture.                     | True      | False(used views) |
| /users/:userID            | DELETE  | Delete user from database cleanup all user data. | True      | True              |
| /users/:userID/friends    | GET     | Fetch user's friends list.                       | True      | True              |
| /users/:userID/received   | GET     | Fetch user's received friend requests.           | True      | True              |
| /users/:userID/sent       | GET     | Fetch user's sent friend requests.               | True      | True              |
| /users/:receiverID/send   | POST    | Send a friend request to a different user.       | True      | True              |
| /users/:receiverID/cancel | DELETE  | Cancel a pending friend request.                 | True      | True              |
| /users/:senderID/accept   | PUT     | Accept a pending friend request, become friends. | True      | True              |
| /users/:senderID/decline  | DELETE  | Decline a pending friend request.                | True      | True              |
| /users/:removedID/remove  | DELETE  | Remove someone's from your friend list.          | True      | True              |

| Posts & Comments               | Request | Description                                                   | Protected | Postman Tested |
| ------------------------------ | ------- | ------------------------------------------------------------- | --------- | -------------- |
| /posts                         | GET     | Posts page, gets all newest posts.                            | True      | True           |
| /posts                         | POST    | Create a new post from your account.                          | True      | True           |
| /posts/:postID                 | GET     | Fetch one individual post.                                    | True      | True           |
| /posts/:postID                 | UPDATE  | Update a post and the account data.                           | True      | True           |
| /posts/:postID                 | DELETE  | Delete the post and update the account data.                  | True      | True           |
| /posts/:postID                 | POST    | Create a comment on a specific post, associated with an user. | True      | True           |
| /posts/:postID/like            | POST    | Like/dislike a post.                                          | True      | True           |
| /posts/:postID/:commentID/like | POST    | Like/dislike a comment.                                       | True      | True           |
| /posts/:postID/:commentID      | DELETE  | Delete a comment from a post.                                 | True      | True           |

### Installation and running

```
git clone git@github.com:janaiscoding/fiturself.git
cd fiturself/backend
npm install
npm run dev
Server is listening on localhost:8008
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
