import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Niche: "Niche";
    readonly SocialAccount: "SocialAccount";
    readonly Post: "Post";
    readonly PostAnalytics: "PostAnalytics";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly googleId: "googleId";
    readonly password: "password";
    readonly role: "role";
    readonly refreshToken: "refreshToken";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const NicheScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly active: "active";
};
export type NicheScalarFieldEnum = (typeof NicheScalarFieldEnum)[keyof typeof NicheScalarFieldEnum];
export declare const SocialAccountScalarFieldEnum: {
    readonly id: "id";
    readonly platform: "platform";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly tokenExpiry: "tokenExpiry";
    readonly userId: "userId";
};
export type SocialAccountScalarFieldEnum = (typeof SocialAccountScalarFieldEnum)[keyof typeof SocialAccountScalarFieldEnum];
export declare const PostScalarFieldEnum: {
    readonly id: "id";
    readonly platform: "platform";
    readonly title: "title";
    readonly description: "description";
    readonly videoUrl: "videoUrl";
    readonly postedAt: "postedAt";
    readonly status: "status";
    readonly nichedId: "nichedId";
    readonly userId: "userId";
};
export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum];
export declare const PostAnalyticsScalarFieldEnum: {
    readonly id: "id";
    readonly views: "views";
    readonly likes: "likes";
    readonly comments: "comments";
    readonly collectedAt: "collectedAt";
    readonly postId: "postId";
};
export type PostAnalyticsScalarFieldEnum = (typeof PostAnalyticsScalarFieldEnum)[keyof typeof PostAnalyticsScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
