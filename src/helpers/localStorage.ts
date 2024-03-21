interface LocalStorageItem<T> {
    key: string;
    value: T;
}

export function setLocalStorageItem<T>(key: string, data: T): void {
    if (typeof window !== 'undefined') {
        try {
            const item: LocalStorageItem<T> = { key, value: data };
            localStorage.setItem(`hk_${key}`, JSON.stringify(item));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
}

export function getLocalStorageItem<T>(key: string): T | null {
    if (typeof window !== 'undefined') {
        try {
            const itemString = localStorage.getItem(`hk_${key}`);

            if (itemString) {
                const item: LocalStorageItem<T> = JSON.parse(itemString);
                return item.value;
            }

            return null;
        } catch (error) {
            console.error('Error retrieving from localStorage:', error);
            return null;
        }
    }
}

export function removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem(`hk_${key}`);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
}

export function clearLocalStorageByPrefix(): void {
    if (typeof window !== 'undefined') {
        try {
            const pattern = /^hk_/;
            for (const key in localStorage) {
                if (key.match(pattern)) {
                    localStorage.removeItem(key);
                }
            }
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
}

export function generateRandomHash(length: number = 16): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    let hash: string = '';

    for (let i = 0; i < length; i++) {
        hash += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return hash;
}
