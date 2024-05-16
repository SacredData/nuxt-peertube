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
  } catch (err) {
    console.error(err)
  }

</script>
