export const blurEmail = (email: string): string => {
    const items = email.split('@')
    if (items.length < 1 || items[0].length < 1) {
        return '****@**';
    }
    return items[0][0] + '****@' + items.slice(1).join('');
}
