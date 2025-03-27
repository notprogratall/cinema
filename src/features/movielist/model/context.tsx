"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MovieListState } from './interfaces';
import { loadMovies, handlePageChange } from './actions';

interface MovieListContextType extends MovieListState {
    setPage: (value: number) => void;
}

const MovieListContext = createContext<MovieListContextType | undefined>(undefined);

interface MovieListProviderProps {
    children: React.ReactNode;
}

export const MovieListProvider = ({ children }: MovieListProviderProps) => {
    const [state, setState] = useState<MovieListState>({
        movies: [],
        page: 1,
        loading: false,
        error: '',
        totalPages: 1,

    });

    useEffect(() => {
        loadMovies(state, setState);
    }, [state.page]);

    const setPage = (value: number) => {
        handlePageChange(value, setState);
    };

    return (
        <MovieListContext.Provider value={{ ...state, setPage }}>
            {children}
        </MovieListContext.Provider>
    );
};

export const useMovieList = () => {
    const context = useContext(MovieListContext);
    if (context === undefined) {
        throw new Error('useMovieList must be used within a MovieListProvider');
    }
    return context;
};