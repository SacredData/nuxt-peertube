import { useNuxtApp, useRuntimeConfig, useState, useAsyncData } from "#imports";

interface OAuthClient {
  client_id: string;
  client_secret: string;
}

interface OAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
}

export const usePeertubeClient = async (
  username: string,
  password: string,
  alternateUrl?: string,
): Promise<OAuthResponse | null> => {
  try {
    const nuxt = useNuxtApp();
    const { peertube } = useRuntimeConfig().public;
    const config = import.meta.server
      ? useRuntimeConfig()
      : useRuntimeConfig().public;
    const serverUrl =
      alternateUrl && typeof alternateUrl === "string"
        ? alternateUrl
        : peertube.serverUrl;

    const {
      data: client,
      pending,
      error,
    } = await useAsyncData<OAuthClient>("local-client", async () => {
      const response = await $fetch<OAuthClient>(
        `${serverUrl}/api/v1/oauth-clients/local`,
        {
          pick: ["client_id", "client_secret"],
          immediate: true,
          lazy: false,
        },
      );
      return response;
    });

    if (error.value) {
      throw new Error(`Failed to fetch OAuth client: ${error.value.message}`);
    }

    const { client_id, client_secret } = client.value;
    const bodyData = {
      client_id,
      client_secret,
      grant_type: "password",
      username,
      password,
    };

    const bodyContent = new URLSearchParams(bodyData).toString();

    const oauthReq = await $fetch<OAuthResponse>(
      `${serverUrl}/api/v1/users/token`,
      {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (typeof window !== "undefined") {
      localStorage.setItem("peertube", JSON.stringify(oauthReq));
    }

    const peertubeOauth = useState<OAuthResponse>("peertube", () => oauthReq);
    console.log(peertubeOauth);

    return oauthReq;
  } catch (err) {
    console.error("Error in usePeertubeClient:", err);
    return null;
  }
};
