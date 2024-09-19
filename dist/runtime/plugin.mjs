import { defineNuxtPlugin } from "#app";
import { PeerTubePlayer } from "@peertube/embed-api";
export default defineNuxtPlugin((_nuxtApp) => {
  console.log("Plugin injected by nuxt-peertube!", _nuxtApp);
  return {
    provide: {
      peertube: {
        async getPlayer() {
          if (process.client) {
            let player = new PeerTubePlayer(document.querySelector("iframe"));
            await player.ready;
            return player;
          }
        }
      },
      locally: {
        getItem(item) {
          if (process.client) {
            return localStorage.getItem(item);
          } else {
            return void 0;
          }
        },
        setItem(item, value) {
          if (process.client) {
            return localStorage.setItem(item, value);
          }
        }
      }
    }
  };
});
