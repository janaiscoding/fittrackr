# Socializer Frontend

See main repo for [full project description](https://github.com/janaiscoding/socializer/blob/main/README.md)

See [live preview here](https://socializerme.vercel.app/)

## TODO:

### Main Tasks:

- [x] Add debounce request on likes (posts, comments) in order to reduce unsynchronized or abusive API calls.
- [x] Integrate update post functionality;
- [x] Update post description field now resizes automatically;
- [x] Integrate delete account functionality on desktop;
- [x] Add a loading state when clicking on the login buttons;
- [x] Add profile banners: displays on every user instance;
- [ ] Integrate delete account functionality on mobile;
- [ ] Friend suggestions;
- [ ] Integrate escape keys from modals;
- [ ] Integrate clicking outside of a modal to close certain things;
- [ ] Improve UI design pattern (Add homepage/multiple columns/etc.);
- [ ] Allow post authors to delete comments under their posts.

### Known bugs:

- [x] Delete account modals aren't displaying properly - z-index on overlay is currently broken. (fixed)
- Turning light mode on from user doesn't stay on the whole app
- [x] Bug with avatar on posts it sets all to current - Fixed from avatar image component

### Nice to have:

- [ ] CSS Animations on load/enter viewport
