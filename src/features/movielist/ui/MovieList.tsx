"use client";

import MovieCard from './MovieCard';
import Pagination from './Pagination';
import Filters  from './Filters';
import Preloader from '@/shared/ui/Preloader';
import { useMovieList } from '../model/context';
import { useEffect } from 'react';

export const MovieList = () => {
    const { movies, page, loading, error, setPage, totalPages } = useMovieList();

    // Проверка контекста
    const context = useMovieList();
    useEffect(() => {
        console.log('MovieList Context updated:', context);
    }, [context]);

    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <Filters />

                {loading ? (
                    <Preloader />
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-4">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </>
                )}
                {error && <p className="text-red-500 text-4xl">{error}</p>}
                <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
            </div>
        </>
    );
};
