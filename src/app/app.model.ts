import { SafeUrl } from "@angular/platform-browser";

export interface FileHandler {
    file: File;
    url: SafeUrl;
}

export interface ProductWithImage {
    name: string;
    description: string;
    price: number;
    images: ImageDto[];
}

export interface ImageDto {
    id: number;
    filename: string;
    filetype: string;
    base64: string;
}