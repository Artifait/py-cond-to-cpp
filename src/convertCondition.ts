
// Null - если не найден if/while
// Иначе конвертированную строку
export function convertCondition(lineText: string): string | null {
    let i = lineText.indexOf("if");
    if (i === -1) {
        i = lineText.indexOf("while");
    }

    if (i === -1) {
        return null;
    }

    return lineText;
}
