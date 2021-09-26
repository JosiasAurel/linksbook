
import DOMPurify from "dompurify";

function truncateStr(longStr: string, length?: number): string {
    if (longStr.length <= (length ? length : 15)) {
        return `${longStr.slice(0, Math.min(longStr.length, length ? length : 15))}`;
    }
    return `${longStr.slice(0, Math.min(longStr.length, length ? length : 15))}...`;
}

function handleChange(event, handler): void {
    handler(DOMPurify.sanitize(event.target.value));
}

export { truncateStr, handleChange };