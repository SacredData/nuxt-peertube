/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as peertubeTypes from "@peertube/peertube-types";
import { useNuxtApp, useRuntimeConfig } from "#imports";

class UserSettings {
  token: string;
  userData: peertubeTypes.User;

  constructor(userData: peertubeTypes.User, token: string) {
    this.token = token;
    this.userData = userData;
  }

  async getNotifications(): Promise<any> {
    try {
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
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      throw error;
    }
  }
}

export const usePeertubeUserSettings = async (client: {
  access_token: string;
}): Promise<UserSettings | null> => {
  try {
    const { peertube } = useRuntimeConfig().public;

    const token = client.access_token;

    const myUserInfo = await $fetch(`${peertube.serverUrl}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      pick: ["data"],
    });

    const userData: peertubeTypes.User = myUserInfo.data;
    const userSettings = new UserSettings(userData, token);
    return userSettings;
  } catch (error) {
    console.error("Failed to fetch user settings:", error);
    return null;
  }
};
