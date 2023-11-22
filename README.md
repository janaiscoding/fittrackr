# Socializer. Full-stack Social Media Platform 🫶

[🌎 Live Deploy](https://socializerme.vercel.app/) | [🖨️ API Documentation](https://github.com/janaiscoding/socializer/tree/main/backend#readme)

* **Customize** your name, avatar, banner and bio
* Create posts with or without images. You can edit and delete your posts anytime
* Comment to posts, you can delete your comments
* You can like posts and comments. If you liked something, you can also remove your like at any time.
* Add or remove different users to your friends list. You can cancel outgoing requests, you can decline outcoming requests.
* You can delete your account at any time. You can try the app with full features with the **demo** account
* Can swap to light or dark mode themes

### How it works 👇🏻

![Live socializerme client preview](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/socializerme.gif)

### Tech stack 🧰

- ReactJs | Next.js | Node.js | MongoDB | JavaScript | TypeScript | TailwindCSS
- Postman for API routes testing | Cloudinary CDN | Figma for UI/UX design | Visual Studio Code | npm | Linux |  Git and Github

### Details 

- Enhanced the user and developer experience by integrating the **React Context API** and **Custom Hooks**.
- Implemented **debouncing** on certain functions, in order to reduce the API calls and improve overall UX.
- Implemented a stable solution for dealing with image manipulation by relying on Cloudinary SaaS CDN, **improving performance by 90%** on fetching posts.
- Secured sensitive information by adhering to using .env variables in all branches of the project.
- All project routes are protected by verifying **JWT Token**. You can only access the app by validating the token with the API.
- For UI I followed a **mobile-first approach** recommended by TailwindCSS best practices, now with Light and Dark mode!
- Focused on creating an **accessible-friendly** experience, with a **95+ overall score** on Lighthouse scans.


### Getting Started ⚙️

```
git clone git@github.com:janaiscoding/socializer.git
cd socializer/frontend
npm install
create .env.local file at root directory of /frontend 
add the following variables:
NEXT_PUBLIC_DEMO_ID
NEXT_PUBLIC_DEMO_PASSWORD
NEXT_PUBLIC_DEMO_EMAIL
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
npm run dev
Listening on localhost:3000
```

### Extras

- This project was built as the final assignment on Full-Stack JavaScript path in The Odin Project: [OdinBook](https://www.theodinproject.com/lessons/nodejs-odin-book)
- Check out more of my repos: [BlogAPI](https://github.com/janaiscoding/blog-client), [ClonnerboxD](https://github.com/janaiscoding/letterboxd-clone), [PhotoTaggingApp](https://github.com/janaiscoding/photo-tagging-app)
- Please feel free to provide any feedback and leave a ⭐ if you liked my project! Thank you 🧡