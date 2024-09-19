declare class UserSettings {
    constructor(userData: any, token: any);
    getNotifications(): Promise<unknown>;
}
export declare const usePeertubeUserSettings: (client: any) => Promise<UserSettings | undefined>;
export {};
