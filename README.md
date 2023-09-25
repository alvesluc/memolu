# Memolu

![image](https://github.com/alvesluc/memolu/assets/42820357/e6d009ae-f73a-434d-a6a7-0c46b281f640)

This is a minimalist audio recorder application. I've created out of curiosity after a friend asked if there was a way to easily loop an audio that herself recorded on her phone.

I've tried two things before diving into building this, these being:

- The default iOS Voice Memos app.
- The Spotify's Local Files feature.

The Voice Memos app has a pretty good set of features, and it if had an looping option it would be enough to satisfy her needs. I like the stopwatch like interface while the audio is being recorded, and I'm thinking of implementing that as a feature, for UX purposes.

The Spotify's case is something else, although it has an fully fledged audio player, the hassle that is to get the file to the Spotify's folder makes some people frustrated. A suggestion that I have is to add the Spotify application to the list of apps that handle the file type, as shown in the screenshot below:

![image](https://github.com/alvesluc/memolu/assets/42820357/a027124e-8d9d-406c-a993-298cd09c8177)

## Features

- Upload existing `.mp3` files.
- Record a new audio.
- Rename the audio.
- Toggleable audio loop.
- Download the audio.
- Delete the audio.

---

### Why Next.js?

As I didn't want to create an app with an object storage (S3, GCS, Azure, etc...) neither wanted to have multiple repositories (one for the API, and one for the UI), Next.js just felt like a good choice as a full-stack framework, as I would have access to Node's `fs` API for handling files and React's JSX to easily build the UI.

### You have experience with Flutter, why not a mobile app?

The main reason is that even though it would be easier for me to build a mobile app, for distance reasons, I wouldn't had a way to installing it on her phone.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies with whatever packager manager you like:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

After that, you just need to open [http://localhost:3000](http://localhost:3000) with your browser to see the app running.
