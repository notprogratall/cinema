import { TypeFilterProps } from '../../model/interfaces';

export const TypeFilter = ({
    formatTypes,
    selectedFormatTypes,
    onToggleFormatType,
    disabled = false
}: TypeFilterProps) => {
    return (
        <div>
            <div className="flex gap-4 pb-8">
                {formatTypes.map(type => (
                    <label key={type} className={`flex items-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input
                            type="checkbox"
                            checked={selectedFormatTypes.includes(type)}
                            onChange={() => onToggleFormatType(type)}
                            className="w-4 h-4"
                            disabled={disabled}
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};