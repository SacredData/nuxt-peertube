import { useCookie, useNuxtApp, useRuntimeConfig } from "#imports";

class UserSettings {
  constructor(userData, token) {
    this.token = token;

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
    } = userData;
    this.autoPlayNextVideo = autoPlayNextVideo;
    this.displayName = displayName;
    this.displayNSFW = displayNSFW;
    this.email = email;
    this.p2pEnabled = p2pEnabled;
    this.videoLanguages = videoLanguages;
    this.videoHistoryEnabled = videoHistoryEnabled;
    this.id = id;
    this.username = username;
    this.emailPublic = emailPublic;
    this.emailVerified = emailVerified;
    this.blocked = blocked;
    this.blockedReason = blockedReason;
    this.createdAt = createdAt;
    this.specialPlaylists = specialPlaylists;
    this.adminFlags = adminFlags;
    this.lastLoginDate = lastLoginDate;
    this.twoFactorEnabled = twoFactorEnabled;
  }
  async getNotifications() {
    const notifs = await $fetch(
      "https://gas.tube.sh/api/v1/users/me/notifications",
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        pick: ["total", "data"],
      },
    );
    return notifs;
  }
}

export const usePeertubeUserSettings = async (client) => {
  try {
    const nuxt = useNuxtApp();
    const { peertube } = useRuntimeConfig().public;
    const config = import.meta.server
      ? useRuntimeConfig()
      : useRuntimeConfig().public;

    const token = client.access_token;

    const myUserInfo = await $fetch(`${peertube.serverUrl}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      pick: ["data"],
    });

    const us = new UserSettings(myUserInfo, token);
    return us;
  } catch (err) {
    console.error(err);
  }
};
