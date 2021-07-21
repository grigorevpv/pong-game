export class LocalStorage {
    private isLSEnable = false

    constructor() {
        this.isLSEnable = !!(window && window.localStorage)
    }

    public getItem(key: string): string | null {
        if (this.isLSEnable) {
            return window.localStorage.getItem(key)
        }

        return null
    }

    public setItem(key: string, value: string): void {
        if (this.isLSEnable) {
            window.localStorage.setItem(key, value)
        }
    }
}

export default new LocalStorage()