import { VideoFormat } from '@prisma/client';
export declare class EditDraftDto {
    title?: string;
    description?: string;
    format?: VideoFormat;
    trimStart?: number;
    trimEnd?: number;
}
