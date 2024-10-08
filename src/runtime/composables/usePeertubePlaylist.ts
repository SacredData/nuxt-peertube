import { useCookie, useNuxtApp, useRuntimeConfig } from "#imports";

export const usePeertubePlaylist = async (id, access_token) => {
  try {
    const nuxt = useNuxtApp();
    const { peertube } = useRuntimeConfig().public;
    const config = import.meta.server
      ? useRuntimeConfig()
      : useRuntimeConfig().public;

    const fetchOpts = {
      method: "GET",
    };
    if (access_token) {
      fetchOpts["headers"] = {
        Authorization: `Bearer: ${access_token}`,
      };
    }

    return await $fetch(
      `${peertube.serverUrl}/api/v1/video-playlists/${id}`,
      fetchOpts,
    );
  } catch (err) {
    console.error(err);
  }
};
