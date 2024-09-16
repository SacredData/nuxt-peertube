import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((_nuxtApp) => {
  console.log("Plugin injected by nuxt-peertube!", _nuxtApp);
  return {
    provide: {
      peertube: { hello: "fuckyouworld" },
      locally: {
        getItem(item) {
          if (process.client) {
            return localStorage.getItem(item);
          } else {
            return undefined;
          }
        },

        setItem(item, value) {
          if (process.client) {
            return localStorage.setItem(item, value);
          }
        },
      },
    },
  };
});
