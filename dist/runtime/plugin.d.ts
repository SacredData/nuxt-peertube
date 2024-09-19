declare const _default: import("#app").Plugin<{
    peertube: {
        getPlayer(): Promise<any>;
    };
    locally: {
        getItem(item: any): string | null | undefined;
        setItem(item: any, value: any): void;
    };
}> & import("#app").ObjectPlugin<{
    peertube: {
        getPlayer(): Promise<any>;
    };
    locally: {
        getItem(item: any): string | null | undefined;
        setItem(item: any, value: any): void;
    };
}>;
export default _default;
