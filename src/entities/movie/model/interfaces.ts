export interface Movie {
    id: number;
    name: string;
    description: string;
    poster: {
        previewUrl: string;
        url: string;
    };
    rating: {
        imdb: number;
    };
    year: number;
} 

export interface MovieQueryParams {
    page?: number;
    limit?: number;
}