function getUrl(): URL | undefined {

    try {
        const location = document.location.href;
        return new URL(location);
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}

export function updateURLQueryParams(): void {
    const q = (document.getElementById('searchInput') as HTMLInputElement).value;
    const url = getUrl();
    if (!url) {
        return;
    }

    url.searchParams.set('q', q);
    window.history.pushState({}, '', url);
}

export function getQuery(): string {
    const url = getUrl()
    if (!url) {
        return '';
    }

    return url.searchParams.get('q') ?? '';
}
