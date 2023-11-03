# Socializer. Full-stack Social Media Platform 🫶

Record and share your amazing life moments, beautiful pictures or random thoughts. Make friends and stay connected.

[Live Deploy 🌎](https://socializerme.vercel.app/) *Also with **demo** account! - [API Documentation 🖨️](https://github.com/janaiscoding/socializer/tree/main/backend#readme)

- Enhanced the user and developer experience by integrating the **React Context API**, **Custom Hooks**.
- Implemented debouncing on certain functions, in order to reduce the API calls and improve overall UX.
- Implemented a stable solution for dealing with image manipulation by relying on Cloudinary SaaS CDN, **improving performance on fetching by 90%**.
- Secured sensitive information by adhering to using .env variables in all branches of the project.
- All project routes are protected by verifying JWT Token. You can only access the app by validating the token with the API.
- For UI I followed a mobile-first approach recommended by TailwindCSS best practices and opted for a clean design, temporarily for light-mode only.
- Focused on creating an accessible-friendly experience, with a **95+ Accessibility score** on Lighthouse scans.

# Media and previews 👇🏻

![Live socializerme client preview](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/preview_desktop.gif)

<details>
<summary> See preview on mobile 📱 </summary>
<br>

![Live socializerme mobile preview](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/preview_mobile.gif)

</details>

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

### Sources

- This project was built as the final Full-Stack JavaScript Path in The Odin Project: NodeJS Course: [OdinBook](https://www.theodinproject.com/lessons/nodejs-odin-book)
