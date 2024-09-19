declare class PeertubeChannel {
    constructor(channel: any, videos?: {});
    recentVideos(count?: number): any;
}
export declare const usePeertubeChannel: (id: any, access_token: any) => Promise<PeertubeChannel | undefined>;
export {};
