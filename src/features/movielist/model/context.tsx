"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MovieListState } from './interfaces';
import { loadMovies, handlePageChange, handleSortTypeChange, handleQueryInput } from './actions';

interface MovieListContextType extends MovieListState {
    setPage: (value: number) => void;
    setSortType: (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => void;
    getByName: (query: string | null) => void;
}

const MovieListContext = createContext<MovieListContextType | undefined>(undefined);

interface MovieListProviderProps {
    children: ReactNode;
}

export const MovieListProvider = ({ children }: MovieListProviderProps) => {
    const [state, setState] = useState<MovieListState>({
        movies: [],
        page: 1,
        loading: false,
        error: '',
        totalPages: 1,
        sortField: null,
        sortType: null,
        query: null
    });

    useEffect(() => {
        if (state.query) {
            handleQueryInput(state.query, setState, state);
        } else {
            loadMovies(state, setState);
        }
    }, [state.page, state.sortField, state.sortType]);

    const setPage = (value: number) => {
        handlePageChange(value, setState);
    };

    const setSortType = (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => {
        handleSortTypeChange(field, type, setState);
    };

    const getByName = (query: string | null) => {
        handleQueryInput(query, setState, state);
    };


    return (
        <MovieListContext.Provider value={{ ...state, setPage, setSortType, getByName }}>
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