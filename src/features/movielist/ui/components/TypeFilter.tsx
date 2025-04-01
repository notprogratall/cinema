interface TypeFilterProps {
    selectedTypes: string[];
    onToggleType: (type: 'movie' | 'series') => void;
}

const TypeFilter = ({ selectedTypes, onToggleType }: TypeFilterProps) => {
    return (
        <div className="space-y-2">
            <span className="block mb-2 font-medium">Тип</span>
            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedTypes.includes('movie')}
                        onChange={() => onToggleType('movie')}
                        className="w-4 h-4"
                    />
                    Фильмы
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedTypes.includes('series')}
                        onChange={() => onToggleType('series')}
                        className="w-4 h-4"
                    />
                    Сериалы
                </label>
            </div>
        </div>
    );
};

export default TypeFilter; 