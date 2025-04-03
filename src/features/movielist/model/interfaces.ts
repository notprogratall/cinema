import { Movie } from '@/entities/movie/model';



export interface MovieListState {
    movies: Movie[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string;
    sortField: 'year' | 'rating.imdb' | null;
    sortType: '1' | '-1' | null;
    countries: string | null,
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
    filter?: {
        countries?: string[];

    }

}

export interface BaseFilterProps {
    disabled?: boolean;
}

export interface SortProps {
    label: string;
    value: string;
    field: 'year' | 'rating.imdb' | null;
    type: '1' | '-1' | null;
}

export interface SortSelectProps extends BaseFilterProps {
    onSortChange: (
        sortField: SortProps["field"],
        sortType: SortProps["type"],
    ) => void;
}

export interface CountrySelectProps extends BaseFilterProps {
    value: string;
    onChange: (value: string) => void;
    countries: string[];
}

export interface YearInputProps extends BaseFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export interface TypeFilterProps extends BaseFilterProps {
    selectedTypes: string[];
    onToggleType: (type: 'movie' | 'series') => void;
}

export interface GenreFilterProps extends BaseFilterProps {
    genres: string[];
    selectedGenres: string[];
    onToggleGenre: (genre: string) => void;
}

export interface SearchInputProps extends BaseFilterProps {
    value: string;
    onSearchChange: (value: string) => void;
}


