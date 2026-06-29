import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PostAnalyticsModel = runtime.Types.Result.DefaultSelection<Prisma.$PostAnalyticsPayload>;
export type AggregatePostAnalytics = {
    _count: PostAnalyticsCountAggregateOutputType | null;
    _avg: PostAnalyticsAvgAggregateOutputType | null;
    _sum: PostAnalyticsSumAggregateOutputType | null;
    _min: PostAnalyticsMinAggregateOutputType | null;
    _max: PostAnalyticsMaxAggregateOutputType | null;
};
export type PostAnalyticsAvgAggregateOutputType = {
    views: number | null;
    likes: number | null;
    comments: number | null;
};
export type PostAnalyticsSumAggregateOutputType = {
    views: number | null;
    likes: number | null;
    comments: number | null;
};
export type PostAnalyticsMinAggregateOutputType = {
    id: string | null;
    views: number | null;
    likes: number | null;
    comments: number | null;
    collectedAt: Date | null;
    postId: string | null;
};
export type PostAnalyticsMaxAggregateOutputType = {
    id: string | null;
    views: number | null;
    likes: number | null;
    comments: number | null;
    collectedAt: Date | null;
    postId: string | null;
};
export type PostAnalyticsCountAggregateOutputType = {
    id: number;
    views: number;
    likes: number;
    comments: number;
    collectedAt: number;
    postId: number;
    _all: number;
};
export type PostAnalyticsAvgAggregateInputType = {
    views?: true;
    likes?: true;
    comments?: true;
};
export type PostAnalyticsSumAggregateInputType = {
    views?: true;
    likes?: true;
    comments?: true;
};
export type PostAnalyticsMinAggregateInputType = {
    id?: true;
    views?: true;
    likes?: true;
    comments?: true;
    collectedAt?: true;
    postId?: true;
};
export type PostAnalyticsMaxAggregateInputType = {
    id?: true;
    views?: true;
    likes?: true;
    comments?: true;
    collectedAt?: true;
    postId?: true;
};
export type PostAnalyticsCountAggregateInputType = {
    id?: true;
    views?: true;
    likes?: true;
    comments?: true;
    collectedAt?: true;
    postId?: true;
    _all?: true;
};
export type PostAnalyticsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostAnalyticsWhereInput;
    orderBy?: Prisma.PostAnalyticsOrderByWithRelationInput | Prisma.PostAnalyticsOrderByWithRelationInput[];
    cursor?: Prisma.PostAnalyticsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostAnalyticsCountAggregateInputType;
    _avg?: PostAnalyticsAvgAggregateInputType;
    _sum?: PostAnalyticsSumAggregateInputType;
    _min?: PostAnalyticsMinAggregateInputType;
    _max?: PostAnalyticsMaxAggregateInputType;
};
export type GetPostAnalyticsAggregateType<T extends PostAnalyticsAggregateArgs> = {
    [P in keyof T & keyof AggregatePostAnalytics]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePostAnalytics[P]> : Prisma.GetScalarType<T[P], AggregatePostAnalytics[P]>;
};
export type PostAnalyticsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostAnalyticsWhereInput;
    orderBy?: Prisma.PostAnalyticsOrderByWithAggregationInput | Prisma.PostAnalyticsOrderByWithAggregationInput[];
    by: Prisma.PostAnalyticsScalarFieldEnum[] | Prisma.PostAnalyticsScalarFieldEnum;
    having?: Prisma.PostAnalyticsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostAnalyticsCountAggregateInputType | true;
    _avg?: PostAnalyticsAvgAggregateInputType;
    _sum?: PostAnalyticsSumAggregateInputType;
    _min?: PostAnalyticsMinAggregateInputType;
    _max?: PostAnalyticsMaxAggregateInputType;
};
export type PostAnalyticsGroupByOutputType = {
    id: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt: Date;
    postId: string;
    _count: PostAnalyticsCountAggregateOutputType | null;
    _avg: PostAnalyticsAvgAggregateOutputType | null;
    _sum: PostAnalyticsSumAggregateOutputType | null;
    _min: PostAnalyticsMinAggregateOutputType | null;
    _max: PostAnalyticsMaxAggregateOutputType | null;
};
type GetPostAnalyticsGroupByPayload<T extends PostAnalyticsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostAnalyticsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostAnalyticsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostAnalyticsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostAnalyticsGroupByOutputType[P]>;
}>>;
export type PostAnalyticsWhereInput = {
    AND?: Prisma.PostAnalyticsWhereInput | Prisma.PostAnalyticsWhereInput[];
    OR?: Prisma.PostAnalyticsWhereInput[];
    NOT?: Prisma.PostAnalyticsWhereInput | Prisma.PostAnalyticsWhereInput[];
    id?: Prisma.StringFilter<"PostAnalytics"> | string;
    views?: Prisma.IntFilter<"PostAnalytics"> | number;
    likes?: Prisma.IntFilter<"PostAnalytics"> | number;
    comments?: Prisma.IntFilter<"PostAnalytics"> | number;
    collectedAt?: Prisma.DateTimeFilter<"PostAnalytics"> | Date | string;
    postId?: Prisma.StringFilter<"PostAnalytics"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
};
export type PostAnalyticsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
};
export type PostAnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PostAnalyticsWhereInput | Prisma.PostAnalyticsWhereInput[];
    OR?: Prisma.PostAnalyticsWhereInput[];
    NOT?: Prisma.PostAnalyticsWhereInput | Prisma.PostAnalyticsWhereInput[];
    views?: Prisma.IntFilter<"PostAnalytics"> | number;
    likes?: Prisma.IntFilter<"PostAnalytics"> | number;
    comments?: Prisma.IntFilter<"PostAnalytics"> | number;
    collectedAt?: Prisma.DateTimeFilter<"PostAnalytics"> | Date | string;
    postId?: Prisma.StringFilter<"PostAnalytics"> | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
}, "id">;
export type PostAnalyticsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    _count?: Prisma.PostAnalyticsCountOrderByAggregateInput;
    _avg?: Prisma.PostAnalyticsAvgOrderByAggregateInput;
    _max?: Prisma.PostAnalyticsMaxOrderByAggregateInput;
    _min?: Prisma.PostAnalyticsMinOrderByAggregateInput;
    _sum?: Prisma.PostAnalyticsSumOrderByAggregateInput;
};
export type PostAnalyticsScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostAnalyticsScalarWhereWithAggregatesInput | Prisma.PostAnalyticsScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostAnalyticsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostAnalyticsScalarWhereWithAggregatesInput | Prisma.PostAnalyticsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PostAnalytics"> | string;
    views?: Prisma.IntWithAggregatesFilter<"PostAnalytics"> | number;
    likes?: Prisma.IntWithAggregatesFilter<"PostAnalytics"> | number;
    comments?: Prisma.IntWithAggregatesFilter<"PostAnalytics"> | number;
    collectedAt?: Prisma.DateTimeWithAggregatesFilter<"PostAnalytics"> | Date | string;
    postId?: Prisma.StringWithAggregatesFilter<"PostAnalytics"> | string;
};
export type PostAnalyticsCreateInput = {
    id?: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutAnalyticsInput;
};
export type PostAnalyticsUncheckedCreateInput = {
    id?: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt?: Date | string;
    postId: string;
};
export type PostAnalyticsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutAnalyticsNestedInput;
};
export type PostAnalyticsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostAnalyticsCreateManyInput = {
    id?: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt?: Date | string;
    postId: string;
};
export type PostAnalyticsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostAnalyticsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostAnalyticsListRelationFilter = {
    every?: Prisma.PostAnalyticsWhereInput;
    some?: Prisma.PostAnalyticsWhereInput;
    none?: Prisma.PostAnalyticsWhereInput;
};
export type PostAnalyticsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostAnalyticsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type PostAnalyticsAvgOrderByAggregateInput = {
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
};
export type PostAnalyticsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type PostAnalyticsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    collectedAt?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
};
export type PostAnalyticsSumOrderByAggregateInput = {
    views?: Prisma.SortOrder;
    likes?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
};
export type PostAnalyticsCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostAnalyticsCreateWithoutPostInput, Prisma.PostAnalyticsUncheckedCreateWithoutPostInput> | Prisma.PostAnalyticsCreateWithoutPostInput[] | Prisma.PostAnalyticsUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostAnalyticsCreateOrConnectWithoutPostInput | Prisma.PostAnalyticsCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostAnalyticsCreateManyPostInputEnvelope;
    connect?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
};
export type PostAnalyticsUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostAnalyticsCreateWithoutPostInput, Prisma.PostAnalyticsUncheckedCreateWithoutPostInput> | Prisma.PostAnalyticsCreateWithoutPostInput[] | Prisma.PostAnalyticsUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostAnalyticsCreateOrConnectWithoutPostInput | Prisma.PostAnalyticsCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostAnalyticsCreateManyPostInputEnvelope;
    connect?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
};
export type PostAnalyticsUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostAnalyticsCreateWithoutPostInput, Prisma.PostAnalyticsUncheckedCreateWithoutPostInput> | Prisma.PostAnalyticsCreateWithoutPostInput[] | Prisma.PostAnalyticsUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostAnalyticsCreateOrConnectWithoutPostInput | Prisma.PostAnalyticsCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostAnalyticsUpsertWithWhereUniqueWithoutPostInput | Prisma.PostAnalyticsUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostAnalyticsCreateManyPostInputEnvelope;
    set?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    disconnect?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    delete?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    connect?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    update?: Prisma.PostAnalyticsUpdateWithWhereUniqueWithoutPostInput | Prisma.PostAnalyticsUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostAnalyticsUpdateManyWithWhereWithoutPostInput | Prisma.PostAnalyticsUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostAnalyticsScalarWhereInput | Prisma.PostAnalyticsScalarWhereInput[];
};
export type PostAnalyticsUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostAnalyticsCreateWithoutPostInput, Prisma.PostAnalyticsUncheckedCreateWithoutPostInput> | Prisma.PostAnalyticsCreateWithoutPostInput[] | Prisma.PostAnalyticsUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostAnalyticsCreateOrConnectWithoutPostInput | Prisma.PostAnalyticsCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostAnalyticsUpsertWithWhereUniqueWithoutPostInput | Prisma.PostAnalyticsUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostAnalyticsCreateManyPostInputEnvelope;
    set?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    disconnect?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    delete?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    connect?: Prisma.PostAnalyticsWhereUniqueInput | Prisma.PostAnalyticsWhereUniqueInput[];
    update?: Prisma.PostAnalyticsUpdateWithWhereUniqueWithoutPostInput | Prisma.PostAnalyticsUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostAnalyticsUpdateManyWithWhereWithoutPostInput | Prisma.PostAnalyticsUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostAnalyticsScalarWhereInput | Prisma.PostAnalyticsScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PostAnalyticsCreateWithoutPostInput = {
    id?: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt?: Date | string;
};
export type PostAnalyticsUncheckedCreateWithoutPostInput = {
    id?: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt?: Date | string;
};
export type PostAnalyticsCreateOrConnectWithoutPostInput = {
    where: Prisma.PostAnalyticsWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostAnalyticsCreateWithoutPostInput, Prisma.PostAnalyticsUncheckedCreateWithoutPostInput>;
};
export type PostAnalyticsCreateManyPostInputEnvelope = {
    data: Prisma.PostAnalyticsCreateManyPostInput | Prisma.PostAnalyticsCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type PostAnalyticsUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostAnalyticsWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostAnalyticsUpdateWithoutPostInput, Prisma.PostAnalyticsUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.PostAnalyticsCreateWithoutPostInput, Prisma.PostAnalyticsUncheckedCreateWithoutPostInput>;
};
export type PostAnalyticsUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostAnalyticsWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostAnalyticsUpdateWithoutPostInput, Prisma.PostAnalyticsUncheckedUpdateWithoutPostInput>;
};
export type PostAnalyticsUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.PostAnalyticsScalarWhereInput;
    data: Prisma.XOR<Prisma.PostAnalyticsUpdateManyMutationInput, Prisma.PostAnalyticsUncheckedUpdateManyWithoutPostInput>;
};
export type PostAnalyticsScalarWhereInput = {
    AND?: Prisma.PostAnalyticsScalarWhereInput | Prisma.PostAnalyticsScalarWhereInput[];
    OR?: Prisma.PostAnalyticsScalarWhereInput[];
    NOT?: Prisma.PostAnalyticsScalarWhereInput | Prisma.PostAnalyticsScalarWhereInput[];
    id?: Prisma.StringFilter<"PostAnalytics"> | string;
    views?: Prisma.IntFilter<"PostAnalytics"> | number;
    likes?: Prisma.IntFilter<"PostAnalytics"> | number;
    comments?: Prisma.IntFilter<"PostAnalytics"> | number;
    collectedAt?: Prisma.DateTimeFilter<"PostAnalytics"> | Date | string;
    postId?: Prisma.StringFilter<"PostAnalytics"> | string;
};
export type PostAnalyticsCreateManyPostInput = {
    id?: string;
    views: number;
    likes: number;
    comments: number;
    collectedAt?: Date | string;
};
export type PostAnalyticsUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostAnalyticsUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostAnalyticsUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    views?: Prisma.IntFieldUpdateOperationsInput | number;
    likes?: Prisma.IntFieldUpdateOperationsInput | number;
    comments?: Prisma.IntFieldUpdateOperationsInput | number;
    collectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostAnalyticsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    views?: boolean;
    likes?: boolean;
    comments?: boolean;
    collectedAt?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postAnalytics"]>;
export type PostAnalyticsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    views?: boolean;
    likes?: boolean;
    comments?: boolean;
    collectedAt?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postAnalytics"]>;
export type PostAnalyticsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    views?: boolean;
    likes?: boolean;
    comments?: boolean;
    collectedAt?: boolean;
    postId?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postAnalytics"]>;
export type PostAnalyticsSelectScalar = {
    id?: boolean;
    views?: boolean;
    likes?: boolean;
    comments?: boolean;
    collectedAt?: boolean;
    postId?: boolean;
};
export type PostAnalyticsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "views" | "likes" | "comments" | "collectedAt" | "postId", ExtArgs["result"]["postAnalytics"]>;
export type PostAnalyticsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type PostAnalyticsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type PostAnalyticsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
};
export type $PostAnalyticsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PostAnalytics";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        views: number;
        likes: number;
        comments: number;
        collectedAt: Date;
        postId: string;
    }, ExtArgs["result"]["postAnalytics"]>;
    composites: {};
};
export type PostAnalyticsGetPayload<S extends boolean | null | undefined | PostAnalyticsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload, S>;
export type PostAnalyticsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostAnalyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostAnalyticsCountAggregateInputType | true;
};
export interface PostAnalyticsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PostAnalytics'];
        meta: {
            name: 'PostAnalytics';
        };
    };
    findUnique<T extends PostAnalyticsFindUniqueArgs>(args: Prisma.SelectSubset<T, PostAnalyticsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostAnalyticsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostAnalyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostAnalyticsFindFirstArgs>(args?: Prisma.SelectSubset<T, PostAnalyticsFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostAnalyticsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostAnalyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostAnalyticsFindManyArgs>(args?: Prisma.SelectSubset<T, PostAnalyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostAnalyticsCreateArgs>(args: Prisma.SelectSubset<T, PostAnalyticsCreateArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostAnalyticsCreateManyArgs>(args?: Prisma.SelectSubset<T, PostAnalyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostAnalyticsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostAnalyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostAnalyticsDeleteArgs>(args: Prisma.SelectSubset<T, PostAnalyticsDeleteArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostAnalyticsUpdateArgs>(args: Prisma.SelectSubset<T, PostAnalyticsUpdateArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostAnalyticsDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostAnalyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostAnalyticsUpdateManyArgs>(args: Prisma.SelectSubset<T, PostAnalyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostAnalyticsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostAnalyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostAnalyticsUpsertArgs>(args: Prisma.SelectSubset<T, PostAnalyticsUpsertArgs<ExtArgs>>): Prisma.Prisma__PostAnalyticsClient<runtime.Types.Result.GetResult<Prisma.$PostAnalyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostAnalyticsCountArgs>(args?: Prisma.Subset<T, PostAnalyticsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostAnalyticsCountAggregateOutputType> : number>;
    aggregate<T extends PostAnalyticsAggregateArgs>(args: Prisma.Subset<T, PostAnalyticsAggregateArgs>): Prisma.PrismaPromise<GetPostAnalyticsAggregateType<T>>;
    groupBy<T extends PostAnalyticsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostAnalyticsGroupByArgs['orderBy'];
    } : {
        orderBy?: PostAnalyticsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostAnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostAnalyticsFieldRefs;
}
export interface Prisma__PostAnalyticsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostAnalyticsFieldRefs {
    readonly id: Prisma.FieldRef<"PostAnalytics", 'String'>;
    readonly views: Prisma.FieldRef<"PostAnalytics", 'Int'>;
    readonly likes: Prisma.FieldRef<"PostAnalytics", 'Int'>;
    readonly comments: Prisma.FieldRef<"PostAnalytics", 'Int'>;
    readonly collectedAt: Prisma.FieldRef<"PostAnalytics", 'DateTime'>;
    readonly postId: Prisma.FieldRef<"PostAnalytics", 'String'>;
}
export type PostAnalyticsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    where: Prisma.PostAnalyticsWhereUniqueInput;
};
export type PostAnalyticsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    where: Prisma.PostAnalyticsWhereUniqueInput;
};
export type PostAnalyticsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PostAnalyticsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PostAnalyticsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PostAnalyticsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostAnalyticsCreateInput, Prisma.PostAnalyticsUncheckedCreateInput>;
};
export type PostAnalyticsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostAnalyticsCreateManyInput | Prisma.PostAnalyticsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostAnalyticsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    data: Prisma.PostAnalyticsCreateManyInput | Prisma.PostAnalyticsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostAnalyticsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostAnalyticsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostAnalyticsUpdateInput, Prisma.PostAnalyticsUncheckedUpdateInput>;
    where: Prisma.PostAnalyticsWhereUniqueInput;
};
export type PostAnalyticsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostAnalyticsUpdateManyMutationInput, Prisma.PostAnalyticsUncheckedUpdateManyInput>;
    where?: Prisma.PostAnalyticsWhereInput;
    limit?: number;
};
export type PostAnalyticsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostAnalyticsUpdateManyMutationInput, Prisma.PostAnalyticsUncheckedUpdateManyInput>;
    where?: Prisma.PostAnalyticsWhereInput;
    limit?: number;
    include?: Prisma.PostAnalyticsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostAnalyticsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    where: Prisma.PostAnalyticsWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostAnalyticsCreateInput, Prisma.PostAnalyticsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostAnalyticsUpdateInput, Prisma.PostAnalyticsUncheckedUpdateInput>;
};
export type PostAnalyticsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
    where: Prisma.PostAnalyticsWhereUniqueInput;
};
export type PostAnalyticsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostAnalyticsWhereInput;
    limit?: number;
};
export type PostAnalyticsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostAnalyticsSelect<ExtArgs> | null;
    omit?: Prisma.PostAnalyticsOmit<ExtArgs> | null;
    include?: Prisma.PostAnalyticsInclude<ExtArgs> | null;
};
export {};
