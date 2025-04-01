interface SortProps {
    label: string;
    value: string;
    field: 'year' | 'rating.imdb' | null;
    type: '1' | '-1' | null;
}

interface sortSelectProps {
    onSortChange: (
        sortField: SortProps["field"],
        sortType: SortProps["type"],
    ) => void;
}

const sortOptions: SortProps[] = [
    { label: 'Без сортировки', value: '', field: null, type: null },
    { label: 'Рейтинг по возрастанию', value: 'rating_asc', field: 'rating.imdb', type: '1' },
    { label: 'Рейтинг по убыванию', value: 'rating_desc', field: 'rating.imdb', type: '-1' },
    { label: 'Год выпуска по возрастанию', value: 'year_asc', field: 'year', type: '1' },
    { label: 'Год выпуска по убыванию', value: 'year_desc', field: 'year', type: '-1' },
];

const SortSelect = ({ onSortChange }: sortSelectProps) => {
    const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedOption = sortOptions[selectedIndex];
        onSortChange(selectedOption.field, selectedOption.type);
    };

    return (
        <select
            className="flex-1 p-2 border rounded-md"
            onChange={handleSortTypeChange}
        >
            {sortOptions.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SortSelect;
