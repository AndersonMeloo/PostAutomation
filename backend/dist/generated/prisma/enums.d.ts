export declare const Platform: {
    readonly YOUTUBE: "YOUTUBE";
    readonly TIKTOK: "TIKTOK";
};
export type Platform = (typeof Platform)[keyof typeof Platform];
export declare const PostStatus: {
    readonly PENDING: "PENDING";
    readonly POSTED: "POSTED";
    readonly FAILED: "FAILED";
};
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
