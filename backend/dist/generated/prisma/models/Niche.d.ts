import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NicheModel = runtime.Types.Result.DefaultSelection<Prisma.$NichePayload>;
export type AggregateNiche = {
    _count: NicheCountAggregateOutputType | null;
    _min: NicheMinAggregateOutputType | null;
    _max: NicheMaxAggregateOutputType | null;
};
export type NicheMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    active: boolean | null;
};
export type NicheMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    active: boolean | null;
};
export type NicheCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    active: number;
    _all: number;
};
export type NicheMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    active?: true;
};
export type NicheMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    active?: true;
};
export type NicheCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    active?: true;
    _all?: true;
};
export type NicheAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NicheWhereInput;
    orderBy?: Prisma.NicheOrderByWithRelationInput | Prisma.NicheOrderByWithRelationInput[];
    cursor?: Prisma.NicheWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NicheCountAggregateInputType;
    _min?: NicheMinAggregateInputType;
    _max?: NicheMaxAggregateInputType;
};
export type GetNicheAggregateType<T extends NicheAggregateArgs> = {
    [P in keyof T & keyof AggregateNiche]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNiche[P]> : Prisma.GetScalarType<T[P], AggregateNiche[P]>;
};
export type NicheGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NicheWhereInput;
    orderBy?: Prisma.NicheOrderByWithAggregationInput | Prisma.NicheOrderByWithAggregationInput[];
    by: Prisma.NicheScalarFieldEnum[] | Prisma.NicheScalarFieldEnum;
    having?: Prisma.NicheScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NicheCountAggregateInputType | true;
    _min?: NicheMinAggregateInputType;
    _max?: NicheMaxAggregateInputType;
};
export type NicheGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
    _count: NicheCountAggregateOutputType | null;
    _min: NicheMinAggregateOutputType | null;
    _max: NicheMaxAggregateOutputType | null;
};
type GetNicheGroupByPayload<T extends NicheGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NicheGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NicheGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NicheGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NicheGroupByOutputType[P]>;
}>>;
export type NicheWhereInput = {
    AND?: Prisma.NicheWhereInput | Prisma.NicheWhereInput[];
    OR?: Prisma.NicheWhereInput[];
    NOT?: Prisma.NicheWhereInput | Prisma.NicheWhereInput[];
    id?: Prisma.StringFilter<"Niche"> | string;
    name?: Prisma.StringFilter<"Niche"> | string;
    description?: Prisma.StringNullableFilter<"Niche"> | string | null;
    active?: Prisma.BoolFilter<"Niche"> | boolean;
    posts?: Prisma.PostListRelationFilter;
};
export type NicheOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    posts?: Prisma.PostOrderByRelationAggregateInput;
};
export type NicheWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NicheWhereInput | Prisma.NicheWhereInput[];
    OR?: Prisma.NicheWhereInput[];
    NOT?: Prisma.NicheWhereInput | Prisma.NicheWhereInput[];
    name?: Prisma.StringFilter<"Niche"> | string;
    description?: Prisma.StringNullableFilter<"Niche"> | string | null;
    active?: Prisma.BoolFilter<"Niche"> | boolean;
    posts?: Prisma.PostListRelationFilter;
}, "id">;
export type NicheOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    active?: Prisma.SortOrder;
    _count?: Prisma.NicheCountOrderByAggregateInput;
    _max?: Prisma.NicheMaxOrderByAggregateInput;
    _min?: Prisma.NicheMinOrderByAggregateInput;
};
export type NicheScalarWhereWithAggregatesInput = {
    AND?: Prisma.NicheScalarWhereWithAggregatesInput | Prisma.NicheScalarWhereWithAggregatesInput[];
    OR?: Prisma.NicheScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NicheScalarWhereWithAggregatesInput | Prisma.NicheScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Niche"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Niche"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Niche"> | string | null;
    active?: Prisma.BoolWithAggregatesFilter<"Niche"> | boolean;
};
export type NicheCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    active?: boolean;
    posts?: Prisma.PostCreateNestedManyWithoutNicheInput;
};
export type NicheUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    active?: boolean;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutNicheInput;
};
export type NicheUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    posts?: Prisma.PostUpdateManyWithoutNicheNestedInput;
};
export type NicheUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    posts?: Prisma.PostUncheckedUpdateManyWithoutNicheNestedInput;
};
export type NicheCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    active?: boolean;
};
export type NicheUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type NicheUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type NicheCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type NicheMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type NicheMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
};
export type NicheScalarRelationFilter = {
    is?: Prisma.NicheWhereInput;
    isNot?: Prisma.NicheWhereInput;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NicheCreateNestedOneWithoutPostsInput = {
    create?: Prisma.XOR<Prisma.NicheCreateWithoutPostsInput, Prisma.NicheUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: Prisma.NicheCreateOrConnectWithoutPostsInput;
    connect?: Prisma.NicheWhereUniqueInput;
};
export type NicheUpdateOneRequiredWithoutPostsNestedInput = {
    create?: Prisma.XOR<Prisma.NicheCreateWithoutPostsInput, Prisma.NicheUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: Prisma.NicheCreateOrConnectWithoutPostsInput;
    upsert?: Prisma.NicheUpsertWithoutPostsInput;
    connect?: Prisma.NicheWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NicheUpdateToOneWithWhereWithoutPostsInput, Prisma.NicheUpdateWithoutPostsInput>, Prisma.NicheUncheckedUpdateWithoutPostsInput>;
};
export type NicheCreateWithoutPostsInput = {
    id?: string;
    name: string;
    description?: string | null;
    active?: boolean;
};
export type NicheUncheckedCreateWithoutPostsInput = {
    id?: string;
    name: string;
    description?: string | null;
    active?: boolean;
};
export type NicheCreateOrConnectWithoutPostsInput = {
    where: Prisma.NicheWhereUniqueInput;
    create: Prisma.XOR<Prisma.NicheCreateWithoutPostsInput, Prisma.NicheUncheckedCreateWithoutPostsInput>;
};
export type NicheUpsertWithoutPostsInput = {
    update: Prisma.XOR<Prisma.NicheUpdateWithoutPostsInput, Prisma.NicheUncheckedUpdateWithoutPostsInput>;
    create: Prisma.XOR<Prisma.NicheCreateWithoutPostsInput, Prisma.NicheUncheckedCreateWithoutPostsInput>;
    where?: Prisma.NicheWhereInput;
};
export type NicheUpdateToOneWithWhereWithoutPostsInput = {
    where?: Prisma.NicheWhereInput;
    data: Prisma.XOR<Prisma.NicheUpdateWithoutPostsInput, Prisma.NicheUncheckedUpdateWithoutPostsInput>;
};
export type NicheUpdateWithoutPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type NicheUncheckedUpdateWithoutPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type NicheCountOutputType = {
    posts: number;
};
export type NicheCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    posts?: boolean | NicheCountOutputTypeCountPostsArgs;
};
export type NicheCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheCountOutputTypeSelect<ExtArgs> | null;
};
export type NicheCountOutputTypeCountPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
};
export type NicheSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    active?: boolean;
    posts?: boolean | Prisma.Niche$postsArgs<ExtArgs>;
    _count?: boolean | Prisma.NicheCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["niche"]>;
export type NicheSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    active?: boolean;
}, ExtArgs["result"]["niche"]>;
export type NicheSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    active?: boolean;
}, ExtArgs["result"]["niche"]>;
export type NicheSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    active?: boolean;
};
export type NicheOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "active", ExtArgs["result"]["niche"]>;
export type NicheInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    posts?: boolean | Prisma.Niche$postsArgs<ExtArgs>;
    _count?: boolean | Prisma.NicheCountOutputTypeDefaultArgs<ExtArgs>;
};
export type NicheIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type NicheIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $NichePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Niche";
    objects: {
        posts: Prisma.$PostPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }, ExtArgs["result"]["niche"]>;
    composites: {};
};
export type NicheGetPayload<S extends boolean | null | undefined | NicheDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NichePayload, S>;
export type NicheCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NicheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NicheCountAggregateInputType | true;
};
export interface NicheDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Niche'];
        meta: {
            name: 'Niche';
        };
    };
    findUnique<T extends NicheFindUniqueArgs>(args: Prisma.SelectSubset<T, NicheFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NicheFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NicheFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NicheFindFirstArgs>(args?: Prisma.SelectSubset<T, NicheFindFirstArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NicheFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NicheFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NicheFindManyArgs>(args?: Prisma.SelectSubset<T, NicheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NicheCreateArgs>(args: Prisma.SelectSubset<T, NicheCreateArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NicheCreateManyArgs>(args?: Prisma.SelectSubset<T, NicheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NicheCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NicheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NicheDeleteArgs>(args: Prisma.SelectSubset<T, NicheDeleteArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NicheUpdateArgs>(args: Prisma.SelectSubset<T, NicheUpdateArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NicheDeleteManyArgs>(args?: Prisma.SelectSubset<T, NicheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NicheUpdateManyArgs>(args: Prisma.SelectSubset<T, NicheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NicheUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NicheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NicheUpsertArgs>(args: Prisma.SelectSubset<T, NicheUpsertArgs<ExtArgs>>): Prisma.Prisma__NicheClient<runtime.Types.Result.GetResult<Prisma.$NichePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NicheCountArgs>(args?: Prisma.Subset<T, NicheCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NicheCountAggregateOutputType> : number>;
    aggregate<T extends NicheAggregateArgs>(args: Prisma.Subset<T, NicheAggregateArgs>): Prisma.PrismaPromise<GetNicheAggregateType<T>>;
    groupBy<T extends NicheGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NicheGroupByArgs['orderBy'];
    } : {
        orderBy?: NicheGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NicheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNicheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NicheFieldRefs;
}
export interface Prisma__NicheClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    posts<T extends Prisma.Niche$postsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Niche$postsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NicheFieldRefs {
    readonly id: Prisma.FieldRef<"Niche", 'String'>;
    readonly name: Prisma.FieldRef<"Niche", 'String'>;
    readonly description: Prisma.FieldRef<"Niche", 'String'>;
    readonly active: Prisma.FieldRef<"Niche", 'Boolean'>;
}
export type NicheFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where: Prisma.NicheWhereUniqueInput;
};
export type NicheFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where: Prisma.NicheWhereUniqueInput;
};
export type NicheFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where?: Prisma.NicheWhereInput;
    orderBy?: Prisma.NicheOrderByWithRelationInput | Prisma.NicheOrderByWithRelationInput[];
    cursor?: Prisma.NicheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NicheScalarFieldEnum | Prisma.NicheScalarFieldEnum[];
};
export type NicheFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where?: Prisma.NicheWhereInput;
    orderBy?: Prisma.NicheOrderByWithRelationInput | Prisma.NicheOrderByWithRelationInput[];
    cursor?: Prisma.NicheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NicheScalarFieldEnum | Prisma.NicheScalarFieldEnum[];
};
export type NicheFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where?: Prisma.NicheWhereInput;
    orderBy?: Prisma.NicheOrderByWithRelationInput | Prisma.NicheOrderByWithRelationInput[];
    cursor?: Prisma.NicheWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NicheScalarFieldEnum | Prisma.NicheScalarFieldEnum[];
};
export type NicheCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NicheCreateInput, Prisma.NicheUncheckedCreateInput>;
};
export type NicheCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NicheCreateManyInput | Prisma.NicheCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NicheCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    data: Prisma.NicheCreateManyInput | Prisma.NicheCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NicheUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NicheUpdateInput, Prisma.NicheUncheckedUpdateInput>;
    where: Prisma.NicheWhereUniqueInput;
};
export type NicheUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NicheUpdateManyMutationInput, Prisma.NicheUncheckedUpdateManyInput>;
    where?: Prisma.NicheWhereInput;
    limit?: number;
};
export type NicheUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NicheUpdateManyMutationInput, Prisma.NicheUncheckedUpdateManyInput>;
    where?: Prisma.NicheWhereInput;
    limit?: number;
};
export type NicheUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where: Prisma.NicheWhereUniqueInput;
    create: Prisma.XOR<Prisma.NicheCreateInput, Prisma.NicheUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NicheUpdateInput, Prisma.NicheUncheckedUpdateInput>;
};
export type NicheDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
    where: Prisma.NicheWhereUniqueInput;
};
export type NicheDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NicheWhereInput;
    limit?: number;
};
export type Niche$postsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type NicheDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NicheSelect<ExtArgs> | null;
    omit?: Prisma.NicheOmit<ExtArgs> | null;
    include?: Prisma.NicheInclude<ExtArgs> | null;
};
export {};
