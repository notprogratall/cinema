import { fetchMovies, searchMovies } from '@/features/movielist/api/movieService';
import { MovieListState, MovieApiParams } from './interfaces';

export const loadMovies = async (state: MovieListState,
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({ ...prev, loading: true, error: '' }));
    try {
        const params: MovieApiParams = {
            pagination: { page: state.page, limit: 20 }
        };

        if (state.sortField && state.sortType) {
            params.sort = {
                field: state.sortField,
                type: state.sortType
            };
        }

        params.filter = {};

        if (state.country) {
            params.filter.countries = [state.country];
        }

        if (state.year) {
            params.filter.year = [state.year];
        }

        if (state.genres) {
            params.filter.genres = state.genres;
        }

        if (state.formatTypes) {
            params.filter.formatTypes = state.formatTypes;
        }

        // // Проверка параметров MovieApiParams
        // console.log("MovieApiParams:", params);


        const data = await fetchMovies(params);
        setState(prev => ({
            ...prev,
            movies: data.docs,
            totalPages: data.pages
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        setState(prev => ({ ...prev, error: e.message || 'Ошибка при загрузке фильмов' }));
    } finally {
        setState(prev => ({ ...prev, loading: false }));

        
    }
};


export const handlePageChange = (
    value: number,
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({ ...prev, page: value }));
};


export const handleCountryChange = (
    value: string,
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({
        ...prev,
        country: value,
        page: 1
    }));
};

export const handleYearChange = (
    value: string,
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({
        ...prev,
        year: value,
        page: 1
    }));
};

export const handleGenresChange = (
    value: string[],
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({
        ...prev,
        genres: value,
        page: 1
    }));
};

export const handleFormatTypeChange = (
    value: string[],
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({
        ...prev,
        formatTypes: value,
        page: 1
    }));
};

export const handleSortTypeChange = (
    field: 'year' | 'rating.imdb' | null,
    type: '1' | '-1' | null,
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({
        ...prev,
        sortField: field,
        sortType: type,
        page: 1
    }));
};


export const handleQueryInput = async (
    query: string | null,
    setState: (updater: (prev: MovieListState) => MovieListState) => void,
    state: MovieListState
) => {
    setState(prev => ({ ...prev, loading: true, error: '' }));
    try {
        if (query && query.trim()) {
            const data = await searchMovies(query, {
                pagination: { page: state.page, limit: 20 }
            });
            setState(prev => ({
                ...prev,
                movies: data.docs,
                totalPages: data.pages,
                query: query
            }));
        } else {
            const data = await fetchMovies({
                pagination: { page: state.page, limit: 20 }
            });
            setState(prev => ({
                ...prev,
                movies: data.docs,
                totalPages: data.pages,
                query: null
            }));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        setState(prev => ({ ...prev, error: e.message || 'Ошибка при поиске фильмов' }));
    } finally {
        setState(prev => ({ ...prev, loading: false }));
    }
}; 