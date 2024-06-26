import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

class PeertubeVideo {
  constructor(video) {
    const {
      id,
      uuid,
      embedPath,
      previewPath,
      thumbnailPath,
      duration,
      name,
    } = video

    this.id = id
    this.uuid = uuid
    this.embedPath = embedPath
    this.previewPath = previewPath
    this.thumbnailPath = thumbnailPath
    this.duration = duration
    this.name = name
  }
}

export const usePeertubeVideo = async (id, access_token='') => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

    const fetchOpts = {
      method: 'GET',
    }
    if (access_token instanceof String && access_token !== '') {
      fetchOpts['headers'] = {
        'Authorization': `Bearer ${access_token}`
      }
    }

    return new PeertubeVideo(await $fetch(`https://gas.tube.sh/api/v1/videos/${id}`, fetchOpts))
  } catch (err) {
    console.error(err)
  }
}
