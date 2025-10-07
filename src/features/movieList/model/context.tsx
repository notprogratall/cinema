"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MovieListState } from './interfaces';
import { loadMovies, handlePageChange, handleSortTypeChange, handleQueryInput, handleCountryChange, handleYearChange, handleGenresChange, handleFormatTypeChange } from './actions';

interface MovieListContextType extends MovieListState {
    setPage: (value: number) => void;
    setSortType: (field: 'year' | 'rating.imdb' | null, type: '1' | '-1' | null) => void;
    getByName: (query: string | null) => void;
    setCountryName: (country: string ) => void;
    setYear: (year: string) => void;
    setGenresName: (genres: string[]) => void;
    setFormatTypesName: (formatTypes: string[]) => void;
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
        country: '',
        year: '',
        genres: [],
        formatTypes: []
    });

    // Обновляем список фильмов при изменении параметров
    useEffect(() => {
        loadMovies(state, setState);
    }, [state.page, state.sortField, state.sortType, state.country, state.year, state.genres, state.formatTypes]);

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

    const setCountryName = useCallback((country: string) => {
        handleCountryChange(country, setState);
    }, []);

    const setGenresName = useCallback((genres: string[]) => {
        handleGenresChange(genres, setState);
    }, []);

    const setFormatTypesName = useCallback((formatTypes: string[]) => {
        handleFormatTypeChange(formatTypes, setState);
    }, []);

    const setYear = useCallback((year: string) => {
        handleYearChange(year, setState);
    }, []);

    const getByName = useCallback((query: string | null) => {
        handleQueryInput(query, setState, state);
    }, [state]);

    return (
        <MovieListContext.Provider value={{ ...state, setPage, setSortType, getByName, setCountryName, setYear, setGenresName, setFormatTypesName }}>
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
