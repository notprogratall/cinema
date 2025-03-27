export function buildQueryString(params: Record<string, unknown>): string {
    // В TypeScript угловые скобки < > используются для указания типа (generic type)
    return Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
            }
            return `${key}=${encodeURIComponent(value as string)}`;
        })
        .join("&");
}


// Record<string, unknown> — это специальный тип TypeScript, который обозначает объект, у которого:
// Ключи (string) — всегда строки.
// Значения (unknown) — могут быть любыми (но нужно явно указывать, с чем работаем).

// Object.entries(obj) — метод, который преобразует объект в массив пар[ключ, значение].

// Метод.map() применяется к массиву и преобразует каждый его элемент в новый формат.
// Самый распространенный пример: const doubled = numbers.map((num) => num * 2);

// encodeURIComponent(str) — функция JavaScript, которая кодирует строку в формат, безопасный для URL.
// Она заменяет спецсимволы(пробелы, &, ?, =, / и др.) на код.