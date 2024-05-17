import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export const usePeertubeUserHistory = async (client, count=20) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

    const token = client.access_token

    return await $fetch(
      `https://gas.tube.sh/api/v1/users/me/history/videos?count=${count || 20}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        pick: ['data']
      }
    )
  } catch (err) {
    console.error(err)
  }
}
