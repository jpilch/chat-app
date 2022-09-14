export function formatMessageContent(content: string) {
    return content.length >= 28
        ? content :
        content.slice(26) + "...";
}