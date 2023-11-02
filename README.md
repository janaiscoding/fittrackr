# Socializer. Full-stack Social Media Platform 🫶

Record and share your amazing life moments, beautiful pictures or random thoughts. Make friends and stay connected.

[Live Deploy 🌎](https://socializerme.vercel.app/) - Also with **demo** account!

# Live preview 👇🏻

![Live socializerme client preview](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/socializerme_preview.gif)

<details>
<summary> See preview on mobile 📱 </summary>
<br>

![Live socializerme mobile preview](https://github.com/janaiscoding/socializer/blob/main/frontend/public/assets/socializerme_mobile.gif)

</details>

### Project details:

- Users can create an account, update their profil and upload new profile pictures
- Users can create posts with or without images attached (limited to 4MB and limited to jpg/png/jpeg/webp file types)
- Users can perform CRUD operations on their posts and comments
- Enhanced the user and developer experience by integrating the React Context API and React Custom Hooks
- Implemented a secure solution for dealing with image manipulation by relying on Cloudinary SaaS CDN
- Secured app details by always using .env variables
- All project routes are protected by verifying JWT Token. You can only access the app by validating the token with the API 
- For UI/UX I followed a mobile-first approach recommended by TailwindCSS and opted for a clean design, temporarily for light-mode only
- Focused on a11y(accessibility) best practices and secured an average score of 10+ contrast 

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

- Postman for API routes testing - see more here: [/backend/README.md](https://github.com/janaiscoding/socializer/tree/main/backend#readme)
- Cloudinary CDN
- Figma for UI/UX design
- Visual Studio Code
- npm package manager
- Linux Terminal
- Git and Github
