<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
  const { $locally } = useNuxtApp()
  try {
    const oauthStuff = await usePeertubeClient()
    $locally.setItem('access_token', oauthStuff.access_token)
    console.log($locally.getItem('access_token'), ' set access token in local storage ')

    const channel = await usePeertubeChannel('part.of.the.problem', oauthStuff.access_token)
    console.log(channel)

    const videoFromChannel = channel.recentVideos()
    console.log(videoFromChannel[0])


/* no worky
    onMounted(async () => {
      const embed = await usePeertubeEmbed(videoFromChannel[0].uuid)
      console.log(embed)
    })
*/
  } catch (err) {
    console.error(err)
  }

</script>
