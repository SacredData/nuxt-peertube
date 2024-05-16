import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'
import { PeerTubePlayer } from '@peertube/embed-api'

export const usePeertubeEmbed = async (videoUuid, opts={}) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

    const videoUrl = `https://gas.tube.sh/videos/embed/${videoUuid}?api=1`

    let player = new PeerTubePlayer(document.querySelector('iframe'))
    await player.ready

    return player
  } catch (err) {
    console.error(err)
  }
}
