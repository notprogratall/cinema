import { useState } from 'react';
import { YearInputProps } from '../../model/interfaces';

export const YearInput = ({ value, onChange, disabled = false }: YearInputProps) => {
    const [showError, setShowError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Разрешаем только цифры или пустую строку
        if (inputValue === '' || /^\d+$/.test(inputValue)) {
            onChange(inputValue);

            // Проверяем, что год не меньше 1800 (если поле не пустое)
            setShowError(inputValue !== '' && parseInt(inputValue) < 1850);
        }
    };

    return (
        <div className="relative mb-6">
            <label className="block mb-2 font-medium">Год выпуска</label>
            <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${showError
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Например: 2023"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />

            {/* Анимированное сообщение об ошибке */}
            <div className={`
                absolute left-0 mt-1 w-full 
                transition-all duration-300 ease-in-out 
                ${showError ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}>
                {showError && (
                    <div className="
                        flex items-start
                        text-sm text-white 
                        bg-red-800 opacity-60 px-3 py-2 rounded-lg
                        shadow-sm
                    ">
                        Год должен быть не менее 1850
                    </div>
                )}
            </div>
        </div>
    );
};
