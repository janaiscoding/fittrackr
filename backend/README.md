# Backend API for Socializer

### API Endpoints:

| API endpoints | Request | Description                         | Protected | Postman tested | Body Content                           |
| ------------- | ------- | ----------------------------------- | --------- | -------------- | -------------------------------------- |
| /             | GET     | Home page, gets all newest posts.   | True      | True           | -                                      |
| /signup       | POST    | Create a new user.                  | False     | True           | first_name, last_name, email, password |
| /login        | POST    | Log in to your existing account.    | False     | True           | email, password                        |
| /verify       | POST    | Verify Token and re-send user data. | False     | True           | -                                      |

Token expires in 24hr.

| Users                     | Request | Description                                      | Protected | Postman tested | Body Content                  |
| ------------------------- | ------- | ------------------------------------------------ | --------- | -------------- | ----------------------------- |
| /users                    | GET     | Fetch all users in the platform.                 | True      | True           | -                             |
| /users/:userID            | GET     | Fetch existing user data.                        | True      | True           | -                             |
| /users/:userID/username   | GET     | Fetch existing user username.                    | True      | True           | -                             |
| /users/:userID/posts      | GET     | Fetch existing user posts.                       | True      | True           | -                             |
| /users/:userID            | PUT     | Update existing user data.                       | True      | True           | ufirst_name, ulast_name, ubio |
| /users/:userID/avatar     | POST    | Upload user profile picture.                     | True      | True           | -                             |
| /users/:userID/banner     | POST    | Upload user profile banner.                      | True      | True           | -                             |
| /users/:userID            | DELETE  | Delete user from database cleanup all user data. | True      | True           | -                             |
| /users/:userID/friends    | GET     | Fetch user's friends list.                       | True      | True           | -                             |
| /users/:userID/received   | GET     | Fetch user's received friend requests.           | True      | True           | -                             |
| /users/:userID/sent       | GET     | Fetch user's sent friend requests.               | True      | True           | senderID                      |
| /users/:receiverID/send   | POST    | Send a friend request to a different user.       | True      | True           | senderID                      |
| /users/:receiverID/cancel | DELETE  | Cancel a pending friend request.                 | True      | True           | senderID                      |
| /users/:senderID/accept   | PUT     | Accept a pending friend request, become friends. | True      | True           | receiverID                    |
| /users/:senderID/decline  | DELETE  | Decline a pending friend request.                | True      | True           | receiverID                    |
| /users/:removedID/remove  | DELETE  | Remove someone's from your friend list.          | True      | True           | removerID                     |

| Posts & Comments               | Request | Description                                                   | Protected | Postman Tested | Body Content    |
| ------------------------------ | ------- | ------------------------------------------------------------- | --------- | -------------- | --------------- |
| /posts                         | GET     | Posts page, gets all newest posts.                            | True      | True           | -               |
| /posts                         | POST    | Create a new post from your account                           | True      | True           | userID, text    |
| /posts/:postID                 | GET     | Fetch one individual post.                                    | True      | True           | -               |
| /posts/:postID                 | PUT     | Update a post with a new description.                         | True      | True           | uDescription    |
| /posts/:postID                 | DELETE  | Delete the post and update the account data.                  | True      | True           | userID          |
| /posts/:postID                 | POST    | Create a comment on a specific post, associated with an user. | True      | True           | userID, comment |
| /posts/:postID/like            | POST    | Like/dislike a post.                                          | True      | True           | userID          |
| /posts/:postID/:commentID/like | POST    | Like/dislike a comment.                                       | True      | True           | userID          |
| /posts/:postID/:commentID      | DELETE  | Delete a comment from a post.                                 | True      | True           | userID          |

### Installation and running

```
git clone git@github.com:janaiscoding/socializer.git
cd socializer/backend
npm install
create .env file with your `MONGODB_URI` and `secret` variables
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
