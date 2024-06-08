import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

class PeertubeChannel {
  constructor(channel, videos={}) {
    const { url, name, avatars, id, isLocal, displayName, updatedAt, ownerAccount } = channel
    const { total, data } = videos
    this.url = url
    this.name = name
    this.avatar = avatars[0]
    this.id = id
    this.isLocal = isLocal
    this.displayName = displayName
    this.updatedAt = updatedAt
    this.ownerAccount = ownerAccount
    this.totalVideos = total
    this.videos = data
  }
  recentVideos(count=1) {
    return this.videos.slice(0, count)
  }
}

export const usePeertubeChannel = async (id, access_token) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public
    const { data: channelWithVideos, error, execute, pending, refresh, status } = await useAsyncData(`video-channel-${id}`, async () => {
      const [channel, videos] = await Promise.all([
        $fetch(`https://gas.tube.sh/api/v1/video-channels/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        }),
        $fetch(`https://gas.tube.sh/api/v1/video-channels/${id}/videos`, {
          method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        })
      ])
      return { channel, videos }
    })
    const { channel, videos } = channelWithVideos.value
    console.log(channel, videos)
    return new PeertubeChannel(channel, videos)
  } catch (err) {
    console.error(err)
  }
}
