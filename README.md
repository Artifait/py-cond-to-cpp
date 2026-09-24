# py-cond-to-cpp

VS Code-расширение: превращает python условие из `if`/`while` в C++-синтаксис
(скобки, `{`, `and`/`or` → `&&`/`||`) на текущей строке.

`if 0 <= x < 10 and flag:` → `if (0 <= x && x < 10 && flag) {`

**Триггер:** `Alt+Enter`, только в `.c` / `.cpp` / `.h`.

## Запуск

```bash
npm install
npm run compile
```

## Тесты

```bash
npm run test:unit
```
