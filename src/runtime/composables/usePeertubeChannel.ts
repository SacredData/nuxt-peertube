import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export const usePeertubeChannel = async (id, access_token) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public
    const channel = await $fetch(`https://gas.tube.sh/api/v1/video-channels/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
    })

    const videos = await $fetch(`https://gas.tube.sh/api/v1/video-channels/${id}/videos`, {
      method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
    })
    return { channel, videos }
  } catch (err) {
    console.error(err)
  }
}
