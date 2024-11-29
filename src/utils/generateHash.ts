export const generateHash = (url: string): string => {
    return url.split('').reduce((acc, char) => {
        const hash = (acc << 5) - acc + char.charCodeAt(0);
        return hash & hash;
    }, 0).toString(36);
}