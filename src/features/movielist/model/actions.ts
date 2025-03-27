import { fetchMovies } from '@/features/movielist/api/movieService';
import { MovieListState } from './interfaces';

export const loadMovies = async (state: MovieListState,
    setState: (updater: (prev: MovieListState) => MovieListState) => void
) => {
    setState(prev => ({ ...prev, loading: true, error: '' }));
    try {
        const data = await fetchMovies({ 
            pagination: { page: state.page, limit: 20},
        });
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