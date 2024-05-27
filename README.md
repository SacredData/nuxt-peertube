# `nuxt-peertube`
> A Nuxt module for interacting with a remote Peertube instance. Allows
using Nuxt as a front-end to the Peertube instance API.

## Status
> Work-In-Progress

Please do not use this module yet for anything important. We are learning
Nuxt module development as we go and so our module should not be seen as
reference implementation of anything.

## Background
This module is intended to provide convenient functionality for operating
and interacting with a Peertube instance's API.

We are taking work that we had to do for a client's web site, and
generalizing it with this module, so that it can be applied to other sites
that have the same use case.

## TODOs
### Config
- [ ] nuxt config `peertube` key
- [ ] `serverUrl`
### Composables
- [x] `usePeertubeRegistration()` - Register user with the peertube
instance
- [x] `usePeertubeClient()` - Login with user creds and store token in
local storage
- [x] `usePeertubeChannel()` - Get a channel on the peertube
- [x] `usePeertubeVideo()` - Get a video on the peertube
- [x] `usePeertubeSearch()` - Get search results from the peertube
- [x] `usePeertubeUserHistory()` - Get user viewing history for the logged
in user of the Peertube instance
- [x] `usePeertubePodcastFeed()` - get feed for peertube channel
- [x] `usePeertubeNotifications()` - get notifications for logged in user
- [ ] `usePeertubeLive()` - Get a Live on the peertube

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- Composables for common Peertube user and admin functions 
- Embed Peertube videos, playlists, and channels programmatically onto your page
- Makes authentication into Peertube simple and painless
- Acquire the user's watch history, following feeds, and user info
- Search Peertube instance's videos, channels, and playlists

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add my-module
```

That's it! You can now use My Module in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
