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

        if (state.countries) {
            params.filter = {
                countries: [state.countries] // Передаём массив
            };
        }


        // Проверка параметров MovieApiParams
        console.log("MovieApiParams:", params);


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
        console.log();
        
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
        countries: value,
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
        page: 1 // Сбрасываем страницу при изменении сортировки
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