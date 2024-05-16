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

    console.log(client, pending)

    const { client_id, client_secret } = client.value
    const bodyData = {
      client_id, client_secret,
      grant_type: 'password',
      username: 'producer',
      password: 'producer#1'
    }
    console.log('BODYDATA', bodyData)
    const bodyContent = Object.keys(bodyData).map(function(key){
        return encodeURIComponent(key) + '=' + encodeURIComponent(bodyData[key]);
    }).join('&');
    console.log('BODYCONTENT', bodyContent)
    const oauthReq = await $fetch(`https://gas.tube.sh/api/v1/users/token`, {
        method: 'POST',
        body: bodyContent,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log(oauthReq)

    const {
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
      token_type
    } = oauthReq

    return oauthReq
  } catch (err) {
    console.error(err)
  }
}
