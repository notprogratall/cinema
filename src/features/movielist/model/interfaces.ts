import { Movie } from '@/entities/movie/model/interfaces';


export interface MovieListState {
    movies: Movie[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string;
    sortField: 'year' | 'rating.imdb' | null;
    sortType: '1' | '-1' | null;
    country?: string;
    genre?: string[];
    year?: number;
    query: string | null;
} 

export interface MovieApiParams {
    pagination: {
        page: number;
        limit: number;
    };
    sort?: {
        field: 'year' | 'rating.imdb';
        type: '1' | '-1';
    };
}


