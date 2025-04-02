import { TypeFilterProps } from '../../model/interfaces';

export const TypeFilter = ({ selectedTypes, onToggleType, disabled = false }: TypeFilterProps) => {
    return (
        <div>
            <label className="block mb-2 font-medium">Тип</label>
            <div className="flex gap-4">
                <button
                    onClick={() => onToggleType('movie')}
                    className={`px-4 py-2 rounded-md ${
                        selectedTypes.includes('movie')
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={disabled}
                >
                    Фильмы
                </button>
                <button
                    onClick={() => onToggleType('series')}
                    className={`px-4 py-2 rounded-md ${
                        selectedTypes.includes('series')
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={disabled}
                >
                    Сериалы
                </button>
            </div>
        </div>
    );
};
