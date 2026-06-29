import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SocialAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$SocialAccountPayload>;
export type AggregateSocialAccount = {
    _count: SocialAccountCountAggregateOutputType | null;
    _min: SocialAccountMinAggregateOutputType | null;
    _max: SocialAccountMaxAggregateOutputType | null;
};
export type SocialAccountMinAggregateOutputType = {
    id: string | null;
    platform: $Enums.Platform | null;
    accessToken: string | null;
    refreshToken: string | null;
    tokenExpiry: Date | null;
    userId: string | null;
};
export type SocialAccountMaxAggregateOutputType = {
    id: string | null;
    platform: $Enums.Platform | null;
    accessToken: string | null;
    refreshToken: string | null;
    tokenExpiry: Date | null;
    userId: string | null;
};
export type SocialAccountCountAggregateOutputType = {
    id: number;
    platform: number;
    accessToken: number;
    refreshToken: number;
    tokenExpiry: number;
    userId: number;
    _all: number;
};
export type SocialAccountMinAggregateInputType = {
    id?: true;
    platform?: true;
    accessToken?: true;
    refreshToken?: true;
    tokenExpiry?: true;
    userId?: true;
};
export type SocialAccountMaxAggregateInputType = {
    id?: true;
    platform?: true;
    accessToken?: true;
    refreshToken?: true;
    tokenExpiry?: true;
    userId?: true;
};
export type SocialAccountCountAggregateInputType = {
    id?: true;
    platform?: true;
    accessToken?: true;
    refreshToken?: true;
    tokenExpiry?: true;
    userId?: true;
    _all?: true;
};
export type SocialAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialAccountWhereInput;
    orderBy?: Prisma.SocialAccountOrderByWithRelationInput | Prisma.SocialAccountOrderByWithRelationInput[];
    cursor?: Prisma.SocialAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SocialAccountCountAggregateInputType;
    _min?: SocialAccountMinAggregateInputType;
    _max?: SocialAccountMaxAggregateInputType;
};
export type GetSocialAccountAggregateType<T extends SocialAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateSocialAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSocialAccount[P]> : Prisma.GetScalarType<T[P], AggregateSocialAccount[P]>;
};
export type SocialAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialAccountWhereInput;
    orderBy?: Prisma.SocialAccountOrderByWithAggregationInput | Prisma.SocialAccountOrderByWithAggregationInput[];
    by: Prisma.SocialAccountScalarFieldEnum[] | Prisma.SocialAccountScalarFieldEnum;
    having?: Prisma.SocialAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SocialAccountCountAggregateInputType | true;
    _min?: SocialAccountMinAggregateInputType;
    _max?: SocialAccountMaxAggregateInputType;
};
export type SocialAccountGroupByOutputType = {
    id: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken: string | null;
    tokenExpiry: Date | null;
    userId: string;
    _count: SocialAccountCountAggregateOutputType | null;
    _min: SocialAccountMinAggregateOutputType | null;
    _max: SocialAccountMaxAggregateOutputType | null;
};
type GetSocialAccountGroupByPayload<T extends SocialAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SocialAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SocialAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SocialAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SocialAccountGroupByOutputType[P]>;
}>>;
export type SocialAccountWhereInput = {
    AND?: Prisma.SocialAccountWhereInput | Prisma.SocialAccountWhereInput[];
    OR?: Prisma.SocialAccountWhereInput[];
    NOT?: Prisma.SocialAccountWhereInput | Prisma.SocialAccountWhereInput[];
    id?: Prisma.StringFilter<"SocialAccount"> | string;
    platform?: Prisma.EnumPlatformFilter<"SocialAccount"> | $Enums.Platform;
    accessToken?: Prisma.StringFilter<"SocialAccount"> | string;
    refreshToken?: Prisma.StringNullableFilter<"SocialAccount"> | string | null;
    tokenExpiry?: Prisma.DateTimeNullableFilter<"SocialAccount"> | Date | string | null;
    userId?: Prisma.StringFilter<"SocialAccount"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type SocialAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type SocialAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SocialAccountWhereInput | Prisma.SocialAccountWhereInput[];
    OR?: Prisma.SocialAccountWhereInput[];
    NOT?: Prisma.SocialAccountWhereInput | Prisma.SocialAccountWhereInput[];
    platform?: Prisma.EnumPlatformFilter<"SocialAccount"> | $Enums.Platform;
    accessToken?: Prisma.StringFilter<"SocialAccount"> | string;
    refreshToken?: Prisma.StringNullableFilter<"SocialAccount"> | string | null;
    tokenExpiry?: Prisma.DateTimeNullableFilter<"SocialAccount"> | Date | string | null;
    userId?: Prisma.StringFilter<"SocialAccount"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type SocialAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.SocialAccountCountOrderByAggregateInput;
    _max?: Prisma.SocialAccountMaxOrderByAggregateInput;
    _min?: Prisma.SocialAccountMinOrderByAggregateInput;
};
export type SocialAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.SocialAccountScalarWhereWithAggregatesInput | Prisma.SocialAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.SocialAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SocialAccountScalarWhereWithAggregatesInput | Prisma.SocialAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SocialAccount"> | string;
    platform?: Prisma.EnumPlatformWithAggregatesFilter<"SocialAccount"> | $Enums.Platform;
    accessToken?: Prisma.StringWithAggregatesFilter<"SocialAccount"> | string;
    refreshToken?: Prisma.StringNullableWithAggregatesFilter<"SocialAccount"> | string | null;
    tokenExpiry?: Prisma.DateTimeNullableWithAggregatesFilter<"SocialAccount"> | Date | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"SocialAccount"> | string;
};
export type SocialAccountCreateInput = {
    id?: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiry?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutSocialAccountsInput;
};
export type SocialAccountUncheckedCreateInput = {
    id?: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiry?: Date | string | null;
    userId: string;
};
export type SocialAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutSocialAccountsNestedInput;
};
export type SocialAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SocialAccountCreateManyInput = {
    id?: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiry?: Date | string | null;
    userId: string;
};
export type SocialAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SocialAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SocialAccountListRelationFilter = {
    every?: Prisma.SocialAccountWhereInput;
    some?: Prisma.SocialAccountWhereInput;
    none?: Prisma.SocialAccountWhereInput;
};
export type SocialAccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SocialAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    tokenExpiry?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type SocialAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    tokenExpiry?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type SocialAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    accessToken?: Prisma.SortOrder;
    refreshToken?: Prisma.SortOrder;
    tokenExpiry?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type SocialAccountCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SocialAccountCreateWithoutUserInput, Prisma.SocialAccountUncheckedCreateWithoutUserInput> | Prisma.SocialAccountCreateWithoutUserInput[] | Prisma.SocialAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialAccountCreateOrConnectWithoutUserInput | Prisma.SocialAccountCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SocialAccountCreateManyUserInputEnvelope;
    connect?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
};
export type SocialAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SocialAccountCreateWithoutUserInput, Prisma.SocialAccountUncheckedCreateWithoutUserInput> | Prisma.SocialAccountCreateWithoutUserInput[] | Prisma.SocialAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialAccountCreateOrConnectWithoutUserInput | Prisma.SocialAccountCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SocialAccountCreateManyUserInputEnvelope;
    connect?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
};
export type SocialAccountUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SocialAccountCreateWithoutUserInput, Prisma.SocialAccountUncheckedCreateWithoutUserInput> | Prisma.SocialAccountCreateWithoutUserInput[] | Prisma.SocialAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialAccountCreateOrConnectWithoutUserInput | Prisma.SocialAccountCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SocialAccountUpsertWithWhereUniqueWithoutUserInput | Prisma.SocialAccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SocialAccountCreateManyUserInputEnvelope;
    set?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    disconnect?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    delete?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    connect?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    update?: Prisma.SocialAccountUpdateWithWhereUniqueWithoutUserInput | Prisma.SocialAccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SocialAccountUpdateManyWithWhereWithoutUserInput | Prisma.SocialAccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SocialAccountScalarWhereInput | Prisma.SocialAccountScalarWhereInput[];
};
export type SocialAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SocialAccountCreateWithoutUserInput, Prisma.SocialAccountUncheckedCreateWithoutUserInput> | Prisma.SocialAccountCreateWithoutUserInput[] | Prisma.SocialAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialAccountCreateOrConnectWithoutUserInput | Prisma.SocialAccountCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SocialAccountUpsertWithWhereUniqueWithoutUserInput | Prisma.SocialAccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SocialAccountCreateManyUserInputEnvelope;
    set?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    disconnect?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    delete?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    connect?: Prisma.SocialAccountWhereUniqueInput | Prisma.SocialAccountWhereUniqueInput[];
    update?: Prisma.SocialAccountUpdateWithWhereUniqueWithoutUserInput | Prisma.SocialAccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SocialAccountUpdateManyWithWhereWithoutUserInput | Prisma.SocialAccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SocialAccountScalarWhereInput | Prisma.SocialAccountScalarWhereInput[];
};
export type EnumPlatformFieldUpdateOperationsInput = {
    set?: $Enums.Platform;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type SocialAccountCreateWithoutUserInput = {
    id?: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiry?: Date | string | null;
};
export type SocialAccountUncheckedCreateWithoutUserInput = {
    id?: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiry?: Date | string | null;
};
export type SocialAccountCreateOrConnectWithoutUserInput = {
    where: Prisma.SocialAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialAccountCreateWithoutUserInput, Prisma.SocialAccountUncheckedCreateWithoutUserInput>;
};
export type SocialAccountCreateManyUserInputEnvelope = {
    data: Prisma.SocialAccountCreateManyUserInput | Prisma.SocialAccountCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SocialAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SocialAccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.SocialAccountUpdateWithoutUserInput, Prisma.SocialAccountUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SocialAccountCreateWithoutUserInput, Prisma.SocialAccountUncheckedCreateWithoutUserInput>;
};
export type SocialAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SocialAccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.SocialAccountUpdateWithoutUserInput, Prisma.SocialAccountUncheckedUpdateWithoutUserInput>;
};
export type SocialAccountUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SocialAccountScalarWhereInput;
    data: Prisma.XOR<Prisma.SocialAccountUpdateManyMutationInput, Prisma.SocialAccountUncheckedUpdateManyWithoutUserInput>;
};
export type SocialAccountScalarWhereInput = {
    AND?: Prisma.SocialAccountScalarWhereInput | Prisma.SocialAccountScalarWhereInput[];
    OR?: Prisma.SocialAccountScalarWhereInput[];
    NOT?: Prisma.SocialAccountScalarWhereInput | Prisma.SocialAccountScalarWhereInput[];
    id?: Prisma.StringFilter<"SocialAccount"> | string;
    platform?: Prisma.EnumPlatformFilter<"SocialAccount"> | $Enums.Platform;
    accessToken?: Prisma.StringFilter<"SocialAccount"> | string;
    refreshToken?: Prisma.StringNullableFilter<"SocialAccount"> | string | null;
    tokenExpiry?: Prisma.DateTimeNullableFilter<"SocialAccount"> | Date | string | null;
    userId?: Prisma.StringFilter<"SocialAccount"> | string;
};
export type SocialAccountCreateManyUserInput = {
    id?: string;
    platform: $Enums.Platform;
    accessToken: string;
    refreshToken?: string | null;
    tokenExpiry?: Date | string | null;
};
export type SocialAccountUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SocialAccountUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SocialAccountUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumPlatformFieldUpdateOperationsInput | $Enums.Platform;
    accessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    refreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SocialAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    tokenExpiry?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialAccount"]>;
export type SocialAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    tokenExpiry?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialAccount"]>;
export type SocialAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    tokenExpiry?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialAccount"]>;
export type SocialAccountSelectScalar = {
    id?: boolean;
    platform?: boolean;
    accessToken?: boolean;
    refreshToken?: boolean;
    tokenExpiry?: boolean;
    userId?: boolean;
};
export type SocialAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "platform" | "accessToken" | "refreshToken" | "tokenExpiry" | "userId", ExtArgs["result"]["socialAccount"]>;
export type SocialAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SocialAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SocialAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SocialAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SocialAccount";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        platform: $Enums.Platform;
        accessToken: string;
        refreshToken: string | null;
        tokenExpiry: Date | null;
        userId: string;
    }, ExtArgs["result"]["socialAccount"]>;
    composites: {};
};
export type SocialAccountGetPayload<S extends boolean | null | undefined | SocialAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload, S>;
export type SocialAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SocialAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SocialAccountCountAggregateInputType | true;
};
export interface SocialAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SocialAccount'];
        meta: {
            name: 'SocialAccount';
        };
    };
    findUnique<T extends SocialAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, SocialAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SocialAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SocialAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SocialAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, SocialAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SocialAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SocialAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SocialAccountFindManyArgs>(args?: Prisma.SelectSubset<T, SocialAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SocialAccountCreateArgs>(args: Prisma.SelectSubset<T, SocialAccountCreateArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SocialAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, SocialAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SocialAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SocialAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SocialAccountDeleteArgs>(args: Prisma.SelectSubset<T, SocialAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SocialAccountUpdateArgs>(args: Prisma.SelectSubset<T, SocialAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SocialAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, SocialAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SocialAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, SocialAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SocialAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SocialAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SocialAccountUpsertArgs>(args: Prisma.SelectSubset<T, SocialAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__SocialAccountClient<runtime.Types.Result.GetResult<Prisma.$SocialAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SocialAccountCountArgs>(args?: Prisma.Subset<T, SocialAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SocialAccountCountAggregateOutputType> : number>;
    aggregate<T extends SocialAccountAggregateArgs>(args: Prisma.Subset<T, SocialAccountAggregateArgs>): Prisma.PrismaPromise<GetSocialAccountAggregateType<T>>;
    groupBy<T extends SocialAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SocialAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: SocialAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SocialAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SocialAccountFieldRefs;
}
export interface Prisma__SocialAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SocialAccountFieldRefs {
    readonly id: Prisma.FieldRef<"SocialAccount", 'String'>;
    readonly platform: Prisma.FieldRef<"SocialAccount", 'Platform'>;
    readonly accessToken: Prisma.FieldRef<"SocialAccount", 'String'>;
    readonly refreshToken: Prisma.FieldRef<"SocialAccount", 'String'>;
    readonly tokenExpiry: Prisma.FieldRef<"SocialAccount", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"SocialAccount", 'String'>;
}
export type SocialAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where: Prisma.SocialAccountWhereUniqueInput;
};
export type SocialAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where: Prisma.SocialAccountWhereUniqueInput;
};
export type SocialAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where?: Prisma.SocialAccountWhereInput;
    orderBy?: Prisma.SocialAccountOrderByWithRelationInput | Prisma.SocialAccountOrderByWithRelationInput[];
    cursor?: Prisma.SocialAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialAccountScalarFieldEnum | Prisma.SocialAccountScalarFieldEnum[];
};
export type SocialAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where?: Prisma.SocialAccountWhereInput;
    orderBy?: Prisma.SocialAccountOrderByWithRelationInput | Prisma.SocialAccountOrderByWithRelationInput[];
    cursor?: Prisma.SocialAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialAccountScalarFieldEnum | Prisma.SocialAccountScalarFieldEnum[];
};
export type SocialAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where?: Prisma.SocialAccountWhereInput;
    orderBy?: Prisma.SocialAccountOrderByWithRelationInput | Prisma.SocialAccountOrderByWithRelationInput[];
    cursor?: Prisma.SocialAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialAccountScalarFieldEnum | Prisma.SocialAccountScalarFieldEnum[];
};
export type SocialAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SocialAccountCreateInput, Prisma.SocialAccountUncheckedCreateInput>;
};
export type SocialAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SocialAccountCreateManyInput | Prisma.SocialAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SocialAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    data: Prisma.SocialAccountCreateManyInput | Prisma.SocialAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SocialAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SocialAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SocialAccountUpdateInput, Prisma.SocialAccountUncheckedUpdateInput>;
    where: Prisma.SocialAccountWhereUniqueInput;
};
export type SocialAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SocialAccountUpdateManyMutationInput, Prisma.SocialAccountUncheckedUpdateManyInput>;
    where?: Prisma.SocialAccountWhereInput;
    limit?: number;
};
export type SocialAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SocialAccountUpdateManyMutationInput, Prisma.SocialAccountUncheckedUpdateManyInput>;
    where?: Prisma.SocialAccountWhereInput;
    limit?: number;
    include?: Prisma.SocialAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SocialAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where: Prisma.SocialAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialAccountCreateInput, Prisma.SocialAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SocialAccountUpdateInput, Prisma.SocialAccountUncheckedUpdateInput>;
};
export type SocialAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
    where: Prisma.SocialAccountWhereUniqueInput;
};
export type SocialAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialAccountWhereInput;
    limit?: number;
};
export type SocialAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialAccountSelect<ExtArgs> | null;
    omit?: Prisma.SocialAccountOmit<ExtArgs> | null;
    include?: Prisma.SocialAccountInclude<ExtArgs> | null;
};
export {};
