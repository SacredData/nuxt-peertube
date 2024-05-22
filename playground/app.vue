<template>
  <div>
    Nuxt module playground!
  </div>
  <iframe
    :src="srcRef"
    width="1280"
    height="720"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    allowfullscreen
 />
</template>

<script setup>
  //import {PeerTubePlayer} from '@peertube/embed-api'

  const { $locally } = useNuxtApp()
  const srcRef = ref('')
  try {
    // Login!
    const oauthStuff = await usePeertubeClient()
    $locally.setItem('access_token', oauthStuff.access_token)
    console.log($locally.getItem('access_token'), ' set access token in local storage ')

    // Get user history of logged in user!
    const history = await usePeertubeUserHistory(oauthStuff)
    console.log(history, 'HISTORY')

    const myUser = await usePeertubeUserSettings(oauthStuff)
    console.log(myUser, 'MYUSER')

    const myNotifs = await myUser.getNotifications()
    console.log(myNotifs, 'MYNOTIFICATIONS')

    // Get a peertube channel!
    const channel = await usePeertubeChannel('part.of.the.problem', oauthStuff.access_token)
    console.log(channel)

    // Get a peertube channel's videos!
    const videosFromChannel = channel.recentVideos(20)
    const videoFromChannel = videosFromChannel[11]


    // Perform a search on a peertube!
    const searchTerm = 'war'
    const searchResults = await usePeertubeSearch(searchTerm, 20)
    console.log(searchResults)

    // Get a video!
    const vid = await usePeertubeVideo(videoFromChannel.id)
    console.log(vid)
    srcRef.value = `https://gas.tube.sh${vid.embedPath}?api=1`

    const playlist = await usePeertubePlaylist(2)
    console.log(playlist)

    // Play a video!
    /*if (typeof window !== '') {
      console.log('WINDOW!!')

      let player = new PeerTubePlayer(document.querySelector('iframe'))
      console.log(player)
    }*/

  } catch (err) {
    console.error(err)
  }

</script>
