import { CountrySelectProps } from '../../model/interfaces';

export const CountrySelect = ({ value, onChange, countries, disabled = false }: CountrySelectProps) => {
    return (
        <div>
            <label className="block mb-2 font-medium">Страна</label>
            <select
                className={`w-full p-2 border rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                <option value="">Все страны</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );
};

