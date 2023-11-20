# Socializer. Full-stack Social Media Platform 🫶

Record and share your amazing life moments, beautiful pictures or random thoughts. Make friends and stay connected.

* Set your avatar/banner/ name and bio
* Create posts with/without images
* Can edit and delete your posts
* Can comment to posts
* Can delete your comments
* Can like posts and comments
* Add/Remove different users to your friends list
* Can delete your account at any time
* Can use the app from the demo account
* Can swap to light or dark mode themes


[🌎 Live Deploy](https://socializerme.vercel.app/) | [🖨️ API Documentation](https://github.com/janaiscoding/socializer/tree/main/backend#readme)

- Enhanced the user and developer experience by integrating the **React Context API** and **Custom Hooks**.
- Implemented **debouncing** on certain functions, in order to reduce the API calls and improve overall UX.
- Implemented a stable solution for dealing with image manipulation by relying on Cloudinary SaaS CDN, **improving performance by 90%** on fetching posts.
- Secured sensitive information by adhering to using .env variables in all branches of the project.
- All project routes are protected by verifying **JWT Token**. You can only access the app by validating the token with the API.
- For UI I followed a **mobile-first approach** recommended by TailwindCSS best practices, now with Light and Dark mode!
- Focused on creating an **accessible-friendly** experience, with a **95+ overall score** on Lighthouse scans.

# Media and previews 👇🏻

![Live socializerme client preview](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/socializerme-preview.gif)

<details>
<summary> See Lighthouse Report 📊</summary>
<br>

![Lighthouse report](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/lighthouse_reports.png)

</details>

## Getting Started ⚙️

```
git clone git@github.com:janaiscoding/socializer.git
cd socializer/frontend
npm install
npm run dev
Listening on localhost:3000
```

# Built with 🧰

### Technologies

- ReactJs, Next.js
- Node.js, MongoDB
- JavaScript, TypeScript
- TailwindCSS

### Tools Used

- Postman for API routes testing
- Cloudinary CDN
- Figma for UI/UX design
- Visual Studio Code
- npm package manager
- Linux Terminal
- Git and Github

### Extras

- This project was built as the final assignment on Full-Stack JavaScript path in The Odin Project: [OdinBook](https://www.theodinproject.com/lessons/nodejs-odin-book)
- Check out more of my repos: [BlogAPI](https://github.com/janaiscoding/blog-client), [ClonnerboxD](https://github.com/janaiscoding/letterboxd-clone), [PhotoTaggingApp](https://github.com/janaiscoding/photo-tagging-app)
- Please feel free to provide any feedback and leave a ⭐ if you liked my project! Thank you 🧡