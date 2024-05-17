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
  import {PeerTubePlayer} from '@peertube/embed-api'

  const { $locally } = useNuxtApp()
  const srcRef = ref('')
  try {
    const oauthStuff = await usePeertubeClient()
    $locally.setItem('access_token', oauthStuff.access_token)
    console.log($locally.getItem('access_token'), ' set access token in local storage ')

    const channel = await usePeertubeChannel('part.of.the.problem', oauthStuff.access_token)
    console.log(channel)

    const videosFromChannel = channel.recentVideos(20)
    const videoFromChannel = videosFromChannel[11]


    const vid = await usePeertubeVideo(videoFromChannel.id)
    console.log(vid)
    srcRef.value = `https://gas.tube.sh${vid.embedPath}?api=1`

    if (typeof window !== '') {
      console.log('WINDOW!!')

      let player = new PeerTubePlayer(document.querySelector('iframe'))
      console.log(player)
    }

  } catch (err) {
    console.error(err)
  }

</script>
