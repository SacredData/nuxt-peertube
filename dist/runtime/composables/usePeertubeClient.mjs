import { useNuxtApp, useRuntimeConfig } from "#imports";
export const usePeertubeClient = async (username, password, alternateUrl) => {
  try {
    const nuxt = useNuxtApp();
    const { peertube } = useRuntimeConfig().public;
    const config = import.meta.server ? useRuntimeConfig() : useRuntimeConfig().public;
    const serverUrl = alternateUrl && alternateUrl instanceof String ? alternateUrl : peertube.serverUrl;
    const { data: client, pending } = await useAsyncData(
      "local-client",
      async () => {
        const { client_id: client_id2, client_secret: client_secret2 } = await $fetch(
          `${serverUrl}/api/v1/oauth-clients/local`,
          {
            pick: ["client_id", "client_secret"],
            immediate: true,
            lazy: false
          }
        );
        return { client_id: client_id2, client_secret: client_secret2 };
      }
    );
    const { client_id, client_secret } = client.value;
    const bodyData = {
      client_id,
      client_secret,
      grant_type: "password",
      username,
      password
    };
    const bodyContent = Object.keys(bodyData).map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(bodyData[key]);
    }).join("&");
    const oauthReq = await $fetch(`https://gas.tube.sh/api/v1/users/token`, {
      method: "POST",
      body: bodyContent,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    if (window !== void 0) {
      localStorage.setItem("peertube", JSON.stringify(oauthReq));
    }
    const peertubeOauth = useState("peertube", () => oauthReq);
    console.log(peertubeOauth);
    return oauthReq;
  } catch (err) {
    console.error(err);
  }
};
