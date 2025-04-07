import { useState } from 'react';
import { SearchInput, SortSelect, CountrySelect, YearInput, TypeFilter, GenreChip} from './components';
import { useFiltersLogic } from '../lib/hooks/useFiltersLogic';

const Filters = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const {
        filters,
        countries,
        genres,
        formatTypes,
        isSearchActive,
        handleSearchChange,
        handleSortChange,
        handleCountrySelection,
        handleYearChange,
        handleToggleFormatType,
        handleGenresChange
    } = useFiltersLogic();

    return (
        <div className="p-4 mb-6">
            <div className="flex flex-wrap gap-4 mb-4">
                <SearchInput value={filters.searchQuery} onSearchChange={handleSearchChange} />
                <SortSelect onSortChange={handleSortChange} disabled={isSearchActive} />
            </div>

            <div className="w-full my-3 p-3 font-medium shadow-md rounded-lg">
                <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full font-medium mb-4 h-4"
                >
                    {isFiltersOpen ? 'Скрыть фильтры' : 'Показать дополнительные фильтры'}
                </button>

                {isFiltersOpen && (
                    <div className="space-y-4 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CountrySelect
                                value={filters.selectedCountry}
                                onChange={handleCountrySelection}
                                countries={countries}
                                disabled={isSearchActive}
                            />
                            <YearInput value={filters.releaseYear} onChange={handleYearChange} disabled={isSearchActive} />
                        </div>

                        <TypeFilter
                            formatTypes={Object.keys(formatTypes)}
                            selectedFormatTypes={filters.selectedFormatTypes}
                            onToggleFormatType={handleToggleFormatType}
                            disabled={isSearchActive}
                        />

                        <GenreChip
                            genres={Object.keys(genres)}
                            selectedGenres={filters.selectedGenres}
                            onToggleGenre={handleGenresChange}
                            disabled={isSearchActive}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;
