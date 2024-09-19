declare class PeertubeVideo {
    constructor(video: any);
    mountPlayer(player: any): Promise<void>;
}
export declare const usePeertubeVideo: (id: any, access_token?: string) => Promise<PeertubeVideo | undefined>;
export {};
