import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

export const usePeertubeRegistration = async (email, user, name, password) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public
    const registrationUsername = user
    const registrationEmail = email
    const registrationDisplayName = name
    const registrationPassword = password
    const registrationBody = JSON.stringify({
        username: registrationUsername,
        password: registrationPassword,
        email: registrationEmail,
        displayName: registrationDisplayName,
    })
    const { data: register, pending } = await useAsyncData('local-client', async () => {
      const registerReq = await $fetch('https://gas.tube.sh/api/v1/users/register',{
          method: 'POST',
          body: registrationBody,
          headers: {
              'content-type': 'application/json'
          }
      })
      return registerReq
    })
    return register
  } catch (err) {
    console.error(err)
  }
}
