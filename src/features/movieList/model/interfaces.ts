import { Movie } from '../api/movieService';
export type { MovieApiParams} from '../api/movieService';



export interface MovieListState {
    movies: Movie[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string;
    sortField: 'year' | 'rating.imdb' | null;
    sortType: '1' | '-1' | null;
    country: string | null,
    genres?: string[];
    formatTypes?: string[];
    year?: string | null;
    query: string | null;
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
    formatTypes: string[];
    selectedFormatTypes: string[];
    onToggleFormatType: (type: string) => void;
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


