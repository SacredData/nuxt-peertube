import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('Plugin injected by my-module!')
    return {
        provide: {
            locally: {
                getItem(item) {
                    if (process.client) {
                        return localStorage.getItem(item)
                    } else {
                        return undefined
                    }
                },

                setItem(item, value) {
                    if (process.client) {
                        return localStorage.setItem(item, value)
                    }
                }
            }
        }
    }
})


/*
export default defineNuxtPlugin((_nuxtApp) => {
})
*/
