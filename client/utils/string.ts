

function truncateStr(longStr: string, length?: number): string {
    if (longStr.length <= (length ? length : 15)) {
        return `${longStr.slice(0, Math.min(longStr.length, length ? length : 15))}`;
    }
    return `${longStr.slice(0, Math.min(longStr.length, length ? length : 15))}...`;
}

export { truncateStr };