interface SearchInputProps {
    value: string;
    onSearchChange: (value: string) => void;
}

const SearchInput = ({ value, onSearchChange }: SearchInputProps) => {
    return (
        <input
            type="text"
            placeholder="Поиск по названию"
            className="flex-3 p-2 border rounded-md "
            value={value}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
};

export default SearchInput; 