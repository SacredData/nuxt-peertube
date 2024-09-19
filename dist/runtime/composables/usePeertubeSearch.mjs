import { useNuxtApp, useRuntimeConfig } from "#imports";
export const usePeertubeSearch = async (term, count = 100, access_token = "") => {
  try {
    const nuxt = useNuxtApp();
    const { peertube } = useRuntimeConfig().public;
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public;
    const fetchOpts = {
      method: "GET"
    };
    if (access_token instanceof String && access_token !== "") {
      fetchOpts["headers"] = {
        Authorization: `Bearer ${access_token}`
      };
    }
    return await $fetch(
      `${peertube.serverUrl}/api/v1/search/videos?search=${term}&count=${count || 100}`,
      fetchOpts
    );
  } catch (err) {
    console.error(err);
  }
};
