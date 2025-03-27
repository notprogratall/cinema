import { Movie } from '@/entities/movie/model/interfaces';

export interface MovieListState {
    movies: Movie[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string;
} 