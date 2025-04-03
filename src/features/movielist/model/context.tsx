"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MovieListState } from './interfaces';
import { loadMovies, handlePageChange, handleSortTypeChange, handleQueryInput, handleCountryChange } from './actions';

interface MovieListContextType extends MovieListState {
    setPage: (value: number) => void;
    setSortType: (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => void;
    getByName: (query: string | null) => void;
    setCountryName: (countries: string) => void;
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
        query: null,
        countries: '',
    });

    // Обновляем список фильмов при изменении параметров
    useEffect(() => {
        loadMovies(state, setState);
    }, [state.page, state.sortField, state.sortType, state.countries]);

    // Выполняем поиск при изменении запроса
    useEffect(() => {
        if (state.query) {
            handleQueryInput(state.query, setState, state);
        }
    }, [state.query]);

    const setPage = useCallback((value: number) => {
        handlePageChange(value, setState);
    }, []);

    const setSortType = useCallback((field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => {
        handleSortTypeChange(field, type, setState);
    }, []);

    const setCountryName = useCallback((countries: string) => {
        handleCountryChange(countries, setState);
    }, []);

    const getByName = useCallback((query: string | null) => {
        handleQueryInput(query, setState, state);
    }, [state]);

    return (
        <MovieListContext.Provider value={{ ...state, setPage, setSortType, getByName, setCountryName }}>
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
