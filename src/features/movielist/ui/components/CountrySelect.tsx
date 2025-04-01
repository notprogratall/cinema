interface CountrySelectProps {
    value: string;
    onChange: (value: string) => void;
    countries: string[];
}

const CountrySelect = ({ value, onChange, countries }: CountrySelectProps) => {
    return (
        <div>
            <label className="block mb-2 font-medium">Страна</label>
            <select
                className="w-full p-2 border rounded-md"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Все страны</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelect; 