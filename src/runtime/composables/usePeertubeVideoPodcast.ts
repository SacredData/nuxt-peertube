import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export const usePeertubeVideoPodcast = async (client={access_token:''}, id=null) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

    const fetchOpts = {
      method: 'GET',
    }
    if (client.access_token &&
        client.access_token instanceof String &&
        client.access_token !== '') {
      fetchOpts['headers'] = {
        'Authorization': `Bearer ${client.access_token}`
      }
    }

    const feedReq = `https://gas.tube.sh/feeds/podcast/videos.xml?videoChannelId=${id}`
    const feed = await $fetch(feedReq)

    return feed
  } catch (err) {
    console.error(err)
  }
}
