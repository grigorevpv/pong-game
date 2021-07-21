export function getElementById(id: string): HTMLElement | null {
    if (!window || !window.document) {
        return null;
    }

    return window.document.getElementById(id);
}

export function setElementSize(height: number, width: number, element: HTMLElement): void {
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
}

export function getWindowInnerSize(): [number, number] {
    return [window.innerHeight, window.innerWidth];
}
