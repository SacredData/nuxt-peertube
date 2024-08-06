import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export const usePeertubeClient = async () => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public
    const { data: client, pending } = await useAsyncData('local-client', async () => {
      const { client_id, client_secret } = await $fetch('https://gas.tube.sh/api/v1/oauth-clients/local', {
        pick: ['client_id', 'client_secret'],
        immediate: true,
        lazy: false
      })
      return { client_id, client_secret }
    })
    const { client_id, client_secret } = client.value
    const bodyData = {
      client_id, client_secret,
      grant_type: 'password',
      username: 'producer',
      password: 'producer#1'
    }
    const bodyContent = Object.keys(bodyData).map(function(key){
        return encodeURIComponent(key) + '=' + encodeURIComponent(bodyData[key]);
    }).join('&');
    const oauthReq = await $fetch(`https://gas.tube.sh/api/v1/users/token`, {
        method: 'POST',
        body: bodyContent,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if (window !== undefined) {
        localStorage.setItem('peertube', JSON.stringify(oauthReq))
    }
    return oauthReq
  } catch (err) {
    console.error(err)
  }
}
