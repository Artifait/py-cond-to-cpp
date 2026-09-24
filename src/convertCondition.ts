
// Null - если не найден if/while
// Иначе конвертированную строку
export function convertCondition(lineText: string): string | null {
    let i = lineText.indexOf("if") + "if".length;
    if (i === -1 + "if".length) {
        i = lineText.indexOf("while") + "while".length;
        if (i === -1 + "while".length) {
            return null;
        }
    }

    if (lineText[i] !== ' ' && lineText[i] !== '\t') {
        return null;//у нас чтото на подобии (if|while)X
    }
    i++;
    lineText = lineText.trimEnd();

    let counter_parenthesis: number = 0;
    let result: string = lineText.slice(0, i);
    let index_first_parenthes: number = lineText.indexOf('(', i);

    if (index_first_parenthes !== -1) {
        if (i === index_first_parenthes) {
            result += "(";
            i++;
            counter_parenthesis++;
        } else {
            // если между if/while и первой скобкой находятся только пробелы или табы
            let has_only_space: boolean = true;
            for (let j = i; j < index_first_parenthes; j++) {
                if (lineText[j] !== '\t' && lineText[j] !== ' ') {
                    has_only_space = false;
                    break;
                }
            }
            if (has_only_space) {
                result += "(";
                i = index_first_parenthes + 1;
                counter_parenthesis++;
            } else {
                counter_parenthesis++;
                result += "(";
            }
        }
    } else {
        counter_parenthesis++;
        result += "(";
    }

    let past_symb_is_space = true;
    for (; i < lineText.length; i++) {
        if (lineText[i] === ' ' || lineText[i] === '\t') {
            if (!past_symb_is_space) {
                past_symb_is_space = true;
                result += ' ';
            }
        }
        else {
            past_symb_is_space = false;
            if (lineText[i] === ':') continue;
            if (lineText[i] === '(') {
                counter_parenthesis++;
            } else if (lineText[i] === ')') {
                counter_parenthesis--;
                if (counter_parenthesis < 0) counter_parenthesis = 0;
            }
            result += lineText[i];
        }
    }

    if (counter_parenthesis !== 0) {
        result += ') {'
    }

    return result;
}
