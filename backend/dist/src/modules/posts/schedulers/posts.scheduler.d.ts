import { PostsService } from '../posts.service';
export declare class PostsScheduler {
    private readonly postsService;
    constructor(postsService: PostsService);
    handleCron(): Promise<void>;
}
