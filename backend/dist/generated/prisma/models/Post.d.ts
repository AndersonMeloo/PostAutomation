import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PostModel = runtime.Types.Result.DefaultSelection<Prisma.$PostPayload>;
export type AggregatePost = {
    _count: PostCountAggregateOutputType | null;
    _min: PostMinAggregateOutputType | null;
    _max: PostMaxAggregateOutputType | null;
};
export type PostMinAggregateOutputType = {
    id: string | null;
    platform: $Enums.Platform | null;
    title: string | null;
    description: string | null;
    videoUrl: string | null;
    postedAt: Date | null;
    status: $Enums.PostStatus | null;
    nichedId: string | null;
    userId: string | null;
};
export type PostMaxAggregateOutputType = {
    id: string | null;
    platform: $Enums.Platform | null;
    title: string | null;
    description: string | null;
    videoUrl: string | null;
    postedAt: Date | null;
    status: $Enums.PostStatus | null;
    nichedId: string | null;
    userId: string | null;
};
export type PostCountAggregateOutputType = {
    id: number;
    platform: number;
    title: number;
    description: number;
    videoUrl: number;
    postedAt: number;
    status: number;
    nichedId: number;
    userId: number;
    _all: number;
};
export type PostMinAggregateInputType = {
    id?: true;
    platform?: true;
    title?: true;
    description?: true;
    videoUrl?: true;
    postedAt?: true;
    status?: true;
    nichedId?: true;
    userId?: true;
};
export type PostMaxAggregateInputType = {
    id?: true;
    platform?: true;
    title?: true;
    description?: true;
    videoUrl?: true;
    postedAt?: true;
    status?: true;
    nichedId?: true;
    userId?: true;
};
export type PostCountAggregateInputType = {
    id?: true;
    platform?: true;
    title?: true;
    description?: true;
    videoUrl?: true;
    postedAt?: true;
    status?: true;
    nichedId?: true;
    userId?: true;
    _all?: true;
};
export type PostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostCountAggregateInputType;
    _min?: PostMinAggregateInputType;
    _max?: PostMaxAggregateInputType;
};
export type GetPostAggregateType<T extends PostAggregateArgs> = {
    [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePost[P]> : Prisma.GetScalarType<T[P], AggregatePost[P]>;
};
export type PostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput | Prisma.PostOrderByWithAggregationInput[];
    by: Prisma.PostScalarFieldEnum[] | Prisma.PostScalarFieldEnum;
    having?: Prisma.PostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostCountAggregateInputType | true;
    _min?: PostMinAggregateInputType;
    _max?: PostMaxAggregateInputType;
};
export type PostGroupByOutputType = {
    id: string;
    platform: $Enums.Platform;
    title: string;
    description: string | null;
    videoUrl: string | null;
    postedAt: Date | null;
    status: $Enums.PostStatus;
    nichedId: string;
    userId: string;
    _count: PostCountAggregateOutputType | null;
    _min: PostMinAggregateOutputType | null;
    _max: PostMaxAggregateOutputType | null;
};
type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostGroupByOutputType[P]>;
}>>;
export type PostWhereInput = {
    AND?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    OR?: Prisma.PostWhereInput[];
    NOT?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    id?: Prisma.StringFilter<"Post"> | string;
    platform?: Prisma.EnumPlatformFilter<"Post"> | $Enums.Platform;
    title?: Prisma.StringFilter<"Post"> | string;
    description?: Prisma.StringNullableFilter<"Post"> | string | null;
    videoUrl?: Prisma.StringNullableFilter<"Post"> | string | null;
    postedAt?: Prisma.DateTimeNullableFilter<"Post"> | Date | string | null;
    status?: Prisma.EnumPostStatusFilter<"Post"> | $Enums.PostStatus;
    nichedId?: Prisma.StringFilter<"Post"> | string;
    userId?: Prisma.StringFilter<"Post"> | string;
    niche?: Prisma.XOR<Prisma.NicheScalarRelationFilter, Prisma.NicheWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    analytics?: Prisma.PostAnalyticsListRelationFilter;
};
export type PostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    postedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    nichedId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    niche?: Prisma.NicheOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    analytics?: Prisma.PostAnalyticsOrderByRelationAggregateInput;
};
export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    OR?: Prisma.PostWhereInput[];
    NOT?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    platform?: Prisma.EnumPlatformFilter<"Post"> | $Enums.Platform;
    title?: Prisma.StringFilter<"Post"> | string;
    description?: Prisma.StringNullableFilter<"Post"> | string | null;
    videoUrl?: Prisma.StringNullableFilter<"Post"> | string | null;
    postedAt?: Prisma.DateTimeNullableFilter<"Post"> | Date | string | null;
    status?: Prisma.EnumPostStatusFilter<"Post"> | $Enums.PostStatus;
    nichedId?: Prisma.StringFilter<"Post"> | string;
    userId?: Prisma.StringFilter<"Post"> | string;
    niche?: Prisma.XOR<Prisma.NicheScalarRelationFilter, Prisma.NicheWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    analytics?: Prisma.PostAnalyticsListRelationFilter;
}, "id">;
export type PostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    postedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    nichedId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.PostCountOrderByAggregateInput;
    _max?: Prisma.PostMaxOrderByAggregateInput;
    _min?: Prisma.PostMinOrderByAggregateInput;
};
export type PostScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostScalarWhereWithAggregatesInput | Prisma.PostScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostScalarWhereWithAggregatesInput | Prisma.PostScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Post"> | string;
    platform?: Prisma.EnumPlatformWithAggregatesFilter<"Post"> | $Enums.Platform;
    title?: Prisma.StringWithAggregatesFilter<"Post"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Post"> | string | null;
    videoUrl?: Prisma.StringNullableWithAggregatesFilter<"Post"> | string | null;
    postedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null;
    status?: Prisma.EnumPostStatusWithAggregatesFilter<"Post"> | $Enums.PostStatus;
    nichedId?: Prisma.StringWithAggregatesFilter<"Post"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Post"> | string;
};
export type PostCreateInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    niche: Prisma.NicheCreateNestedOneWithoutPostsInput;
    user: Prisma.UserCreateNestedOneWithoutPostsInput;
    analytics?: Prisma.PostAnalyticsCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    nichedId: string;
    userId: string;
    analytics?: Prisma.PostAnalyticsUncheckedCreateNestedManyWithoutPostInput;
};
export type PostUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    niche?: Prisma.NicheUpdateOneRequiredWithoutPostsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPostsNestedInput;
    analytics?: Prisma.PostAnalyticsUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    nichedId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    analytics?: Prisma.PostAnalyticsUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateManyInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    nichedId: string;
    userId: string;
};
export type PostUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
};
export type PostUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    nichedId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostListRelationFilter = {
    every?: Prisma.PostWhereInput;
    some?: Prisma.PostWhereInput;
    none?: Prisma.PostWhereInput;
};
export type PostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    nichedId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    nichedId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    postedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    nichedId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PostScalarRelationFilter = {
    is?: Prisma.PostWhereInput;
    isNot?: Prisma.PostWhereInput;
};
export type PostCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutUserInput | Prisma.PostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutUserInput | Prisma.PostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutUserInput | Prisma.PostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutUserInput | Prisma.PostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutUserInput | Prisma.PostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutUserInput | Prisma.PostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostCreateNestedManyWithoutNicheInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutNicheInput, Prisma.PostUncheckedCreateWithoutNicheInput> | Prisma.PostCreateWithoutNicheInput[] | Prisma.PostUncheckedCreateWithoutNicheInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutNicheInput | Prisma.PostCreateOrConnectWithoutNicheInput[];
    createMany?: Prisma.PostCreateManyNicheInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUncheckedCreateNestedManyWithoutNicheInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutNicheInput, Prisma.PostUncheckedCreateWithoutNicheInput> | Prisma.PostCreateWithoutNicheInput[] | Prisma.PostUncheckedCreateWithoutNicheInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutNicheInput | Prisma.PostCreateOrConnectWithoutNicheInput[];
    createMany?: Prisma.PostCreateManyNicheInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUpdateManyWithoutNicheNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutNicheInput, Prisma.PostUncheckedCreateWithoutNicheInput> | Prisma.PostCreateWithoutNicheInput[] | Prisma.PostUncheckedCreateWithoutNicheInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutNicheInput | Prisma.PostCreateOrConnectWithoutNicheInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutNicheInput | Prisma.PostUpsertWithWhereUniqueWithoutNicheInput[];
    createMany?: Prisma.PostCreateManyNicheInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutNicheInput | Prisma.PostUpdateWithWhereUniqueWithoutNicheInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutNicheInput | Prisma.PostUpdateManyWithWhereWithoutNicheInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostUncheckedUpdateManyWithoutNicheNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutNicheInput, Prisma.PostUncheckedCreateWithoutNicheInput> | Prisma.PostCreateWithoutNicheInput[] | Prisma.PostUncheckedCreateWithoutNicheInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutNicheInput | Prisma.PostCreateOrConnectWithoutNicheInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutNicheInput | Prisma.PostUpsertWithWhereUniqueWithoutNicheInput[];
    createMany?: Prisma.PostCreateManyNicheInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutNicheInput | Prisma.PostUpdateWithWhereUniqueWithoutNicheInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutNicheInput | Prisma.PostUpdateManyWithWhereWithoutNicheInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type EnumPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.PostStatus;
};
export type PostCreateNestedOneWithoutAnalyticsInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutAnalyticsInput, Prisma.PostUncheckedCreateWithoutAnalyticsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutAnalyticsInput;
    connect?: Prisma.PostWhereUniqueInput;
};
export type PostUpdateOneRequiredWithoutAnalyticsNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutAnalyticsInput, Prisma.PostUncheckedCreateWithoutAnalyticsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutAnalyticsInput;
    upsert?: Prisma.PostUpsertWithoutAnalyticsInput;
    connect?: Prisma.PostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PostUpdateToOneWithWhereWithoutAnalyticsInput, Prisma.PostUpdateWithoutAnalyticsInput>, Prisma.PostUncheckedUpdateWithoutAnalyticsInput>;
};
export type PostCreateWithoutUserInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    niche: Prisma.NicheCreateNestedOneWithoutPostsInput;
    analytics?: Prisma.PostAnalyticsCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutUserInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    nichedId: string;
    analytics?: Prisma.PostAnalyticsUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutUserInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput>;
};
export type PostCreateManyUserInputEnvelope = {
    data: Prisma.PostCreateManyUserInput | Prisma.PostCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostUpdateWithoutUserInput, Prisma.PostUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput>;
};
export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutUserInput, Prisma.PostUncheckedUpdateWithoutUserInput>;
};
export type PostUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PostScalarWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyWithoutUserInput>;
};
export type PostScalarWhereInput = {
    AND?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
    OR?: Prisma.PostScalarWhereInput[];
    NOT?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
    id?: Prisma.StringFilter<"Post"> | string;
    platform?: Prisma.EnumPlatformFilter<"Post"> | $Enums.Platform;
    title?: Prisma.StringFilter<"Post"> | string;
    description?: Prisma.StringNullableFilter<"Post"> | string | null;
    videoUrl?: Prisma.StringNullableFilter<"Post"> | string | null;
    postedAt?: Prisma.DateTimeNullableFilter<"Post"> | Date | string | null;
    status?: Prisma.EnumPostStatusFilter<"Post"> | $Enums.PostStatus;
    nichedId?: Prisma.StringFilter<"Post"> | string;
    userId?: Prisma.StringFilter<"Post"> | string;
};
export type PostCreateWithoutNicheInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    user: Prisma.UserCreateNestedOneWithoutPostsInput;
    analytics?: Prisma.PostAnalyticsCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutNicheInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    userId: string;
    analytics?: Prisma.PostAnalyticsUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutNicheInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutNicheInput, Prisma.PostUncheckedCreateWithoutNicheInput>;
};
export type PostCreateManyNicheInputEnvelope = {
    data: Prisma.PostCreateManyNicheInput | Prisma.PostCreateManyNicheInput[];
    skipDuplicates?: boolean;
};
export type PostUpsertWithWhereUniqueWithoutNicheInput = {
    where: Prisma.PostWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostUpdateWithoutNicheInput, Prisma.PostUncheckedUpdateWithoutNicheInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutNicheInput, Prisma.PostUncheckedCreateWithoutNicheInput>;
};
export type PostUpdateWithWhereUniqueWithoutNicheInput = {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutNicheInput, Prisma.PostUncheckedUpdateWithoutNicheInput>;
};
export type PostUpdateManyWithWhereWithoutNicheInput = {
    where: Prisma.PostScalarWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyWithoutNicheInput>;
};
export type PostCreateWithoutAnalyticsInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    niche: Prisma.NicheCreateNestedOneWithoutPostsInput;
    user: Prisma.UserCreateNestedOneWithoutPostsInput;
};
export type PostUncheckedCreateWithoutAnalyticsInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    nichedId: string;
    userId: string;
};
export type PostCreateOrConnectWithoutAnalyticsInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutAnalyticsInput, Prisma.PostUncheckedCreateWithoutAnalyticsInput>;
};
export type PostUpsertWithoutAnalyticsInput = {
    update: Prisma.XOR<Prisma.PostUpdateWithoutAnalyticsInput, Prisma.PostUncheckedUpdateWithoutAnalyticsInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutAnalyticsInput, Prisma.PostUncheckedCreateWithoutAnalyticsInput>;
    where?: Prisma.PostWhereInput;
};
export type PostUpdateToOneWithWhereWithoutAnalyticsInput = {
    where?: Prisma.PostWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutAnalyticsInput, Prisma.PostUncheckedUpdateWithoutAnalyticsInput>;
};
export type PostUpdateWithoutAnalyticsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    niche?: Prisma.NicheUpdateOneRequiredWithoutPostsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPostsNestedInput;
};
export type PostUncheckedUpdateWithoutAnalyticsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    nichedId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostCreateManyUserInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    nichedId: string;
};
export type PostUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    niche?: Prisma.NicheUpdateOneRequiredWithoutPostsNestedInput;
    analytics?: Prisma.PostAnalyticsUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    nichedId?: Prisma.StringFieldUpdateOperationsInput | string;
    analytics?: Prisma.PostAnalyticsUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    nichedId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostCreateManyNicheInput = {
    id?: string;
    platform: $Enums.Platform;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    postedAt?: Date | string | null;
    status?: $Enums.PostStatus;
    userId: string;
};
export type PostUpdateWithoutNicheInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    user?: Prisma.UserUpdateOneRequiredWithoutPostsNestedInput;
    analytics?: Prisma.PostAnalyticsUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutNicheInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    analytics?: Prisma.PostAnalyticsUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateManyWithoutNicheInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    postedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostCountOutputType = {
    analytics: number;
};
export type PostCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    analytics?: boolean | PostCountOutputTypeCountAnalyticsArgs;
};
export type PostCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostCountOutputTypeSelect<ExtArgs> | null;
};
export type PostCountOutputTypeCountAnalyticsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostAnalyticsWhereInput;
};
export type PostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    title?: boolean;
    description?: boolean;
    videoUrl?: boolean;
    postedAt?: boolean;
    status?: boolean;
    nichedId?: boolean;
    userId?: boolean;
    niche?: boolean | Prisma.NicheDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    analytics?: boolean | Prisma.Post$analyticsArgs<ExtArgs>;
    _count?: boolean | Prisma.PostCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    title?: boolean;
    description?: boolean;
    videoUrl?: boolean;
    postedAt?: boolean;
    status?: boolean;
    nichedId?: boolean;
    userId?: boolean;
    niche?: boolean | Prisma.NicheDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    title?: boolean;
    description?: boolean;
    videoUrl?: boolean;
    postedAt?: boolean;
    status?: boolean;
    nichedId?: boolean;
    userId?: boolean;
    niche?: boolean | Prisma.NicheDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectScalar = {
    id?: boolean;
    platform?: boolean;
    title?: boolean;
    description?: boolean;
    videoUrl?: boolean;
    postedAt?: boolean;
    status?: boolean;
    nichedId?: boolean;
    userId?: boolean;
};
export type PostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "platform" | "title" | "description" | "videoUrl" | "postedAt" | "status" | "nichedId" | "userId", ExtArgs["result"]["post"]>;
export type PostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    niche?: boolean | Prisma.NicheDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    analytics?: boolean | Prisma.Post$analyticsArgs<ExtArgs>;
    _count?: boolean | Prisma.PostCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    niche?: boolean | Prisma.NicheDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    niche?: boolean | Prisma.NicheDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Post";
    objects: {
        niche: Prisma.$NichePayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        analytics: Prisma.$PostAnalyticsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        platform: $Enums.Platform;
        title: string;
        description: string | null;
        videoUrl: string | null;
        postedAt: Date | null;
        status: $Enums.PostStatus;
        nichedId: string;
        userId: string;
    }, ExtArgs["result"]["post"]>;
    composites: {};
};
export type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostPayload, S>;
export type PostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostCountAggregateInputType | true;
};
export interface PostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Post'];
        meta: {
            name: 'Post';
        };
    };
    findUnique<T extends PostFindUniqueArgs>(args: Prisma.SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostFindFirstArgs>(args?: Prisma.SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostFindManyArgs>(args?: Prisma.SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostCreateArgs>(args: Prisma.SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostCreateManyArgs>(args?: Prisma.SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostDeleteArgs>(args: Prisma.SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostUpdateArgs>(args: Prisma.SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostUpdateManyArgs>(args: Prisma.SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostUpsertArgs>(args: Prisma.SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostCountArgs>(args?: Prisma.Subset<T, PostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostCountAggregateOutputType> : number>;
    aggregate<T extends PostAggregateArgs>(args: Prisma.Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>;
    groupBy<T extends PostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostGroupByArgs['orderBy'];
    } : {
        orderBy?: PostGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostFieldRefs;
}
export interface Prisma__PostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    niche<T extends Prisma.NicheDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NicheDefaultArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    analytics<T extends Prisma.Post$analyticsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$analyticsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostFieldRefs {
    readonly id: Prisma.FieldRef<"Post", 'String'>;
    readonly platform: Prisma.FieldRef<"Post", 'Platform'>;
    readonly title: Prisma.FieldRef<"Post", 'String'>;
    readonly description: Prisma.FieldRef<"Post", 'String'>;
    readonly videoUrl: Prisma.FieldRef<"Post", 'String'>;
    readonly postedAt: Prisma.FieldRef<"Post", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Post", 'PostStatus'>;
    readonly nichedId: Prisma.FieldRef<"Post", 'String'>;
    readonly userId: Prisma.FieldRef<"Post", 'String'>;
}
export type PostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>;
};
export type PostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostCreateManyInput | Prisma.PostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    data: Prisma.PostCreateManyInput | Prisma.PostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput>;
    where: Prisma.PostWhereUniqueInput;
};
export type PostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyInput>;
    where?: Prisma.PostWhereInput;
    limit?: number;
};
export type PostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyInput>;
    where?: Prisma.PostWhereInput;
    limit?: number;
    include?: Prisma.PostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput>;
};
export type PostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    limit?: number;
};
export type Post$analyticsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    where?: Prisma.PostAnalyticsWhereInput;
    orderBy?: Prisma.PostAnalyticsOrderByWithRelationInput | Prisma.PostAnalyticsOrderByWithRelationInput[];
    cursor?: Prisma.PostAnalyticsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostAnalyticsScalarFieldEnum | Prisma.PostAnalyticsScalarFieldEnum[];
};
export type PostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
};
export {};
