import { useCookie, useNuxtApp, useRuntimeConfig } from '#imports'

class UserSettings {
  constructor (userData) {
    const {
      autoPlayNextVideo,
      displayName,
      displayNSFW,
      email,
      p2pEnabled,
      videoLanguages,
      videoHistoryEnabled,
      id,
      username,
      emailPublic,
      emailVerified,
      blocked,
      blockedReason,
      createdAt,
      specialPlaylists,
      adminFlags,
      lastLoginDate,
      twoFactorEnabled,
    } = userData
    this.autoPlayNextVideo = autoPlayNextVideo
    this.displayName = displayName
    this.displayNSFW = displayNSFW
    this.email = email
    this.p2pEnabled = p2pEnabled
    this.videoLanguages = videoLanguages
    this.videoHistoryEnabled = videoHistoryEnabled
    this.id = id
    this.username = username
    this.emailPublic = emailPublic
    this.emailVerified = emailVerified
    this.blocked = blocked
    this.blockedReason = blockedReason
    this.createdAt = createdAt
    this.specialPlaylists = specialPlaylists
    this.adminFlags = adminFlags
    this.lastLoginDate = lastLoginDate
    this.twoFactorEnabled = twoFactorEnabled
  }
}

export const usePeertubeUserSettings = async (client) => {
  try {
    const nuxt = useNuxtApp()
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public

    const token = client.access_token

    const myUserInfo = await $fetch(
      `https://gas.tube.sh/api/v1/users/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        pick: ['data']
      }
    )

    const us = new UserSettings(myUserInfo)
    return us
  } catch (err) {
    console.error(err)
  }
}
