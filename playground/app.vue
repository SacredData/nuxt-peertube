<template>
  <div>
    Nuxt module playground!
  </div>
  <iframe />
</template>

<script setup>
  const { $locally } = useNuxtApp()
  try {
    const oauthStuff = await usePeertubeClient()
    $locally.setItem('access_token', oauthStuff.access_token)
    console.log($locally.getItem('access_token'), ' set access token in local storage ')

    const channel = await usePeertubeChannel('part.of.the.problem', oauthStuff.access_token)
    console.log(channel)

    const videoFromChannel = channel.recentVideos()[0]
    document.querySelector('iframe').src=`https://gas.tube.sh/videos/embed/${videoFromChannel.uuid}?api=1`

  } catch (err) {
    console.error(err)
  }

</script>
