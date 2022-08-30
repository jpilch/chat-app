export function localStorageGet(key: string): unknown | null {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null;
}

export function localStorageSet(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value))
}