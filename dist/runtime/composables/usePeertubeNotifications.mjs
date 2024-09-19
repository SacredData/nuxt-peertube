import { useNuxtApp, useRuntimeConfig } from "#imports";
export const usePeertubeNotifications = async (client, count = 20) => {
  try {
    const nuxt = useNuxtApp();
    const { peertube } = useRuntimeConfig().public;
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public;
    const token = client.access_token;
    return await $fetch(
      `${peertube.serverUrl}/api/v1/users/me/notifications?unread=true&count=${count || 20}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        pick: ["data"]
      }
    );
  } catch (err) {
    console.error(err);
  }
};
