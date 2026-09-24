import * as assert from 'assert';
import { convertCondition } from '../convertCondition';

suite('Extension Test Suite', () => {
    // Basa
    test('if basic', () => {
        assert.strictEqual(convertCondition('if x > 5:'), 'if (x > 5) {');
    });

    test('while basic', () => {
        assert.strictEqual(convertCondition('while running:'), 'while (running) {');
    });

    test('indent spaces', () => {
        assert.strictEqual(convertCondition('    if x > 5:'), '    if (x > 5) {');
    });

    test('indent tab', () => {
        assert.strictEqual(convertCondition('\tif x > 5:'), '\tif (x > 5) {');
    });

    test('no colon', () => {
        assert.strictEqual(convertCondition('if x > 5'), 'if (x > 5) {');
    });

    test('extra spaces', () => {
        assert.strictEqual(convertCondition('if   x > 5  :'), 'if (x > 5) {');
    });

    // and / or 

    test('and -> &&', () => {
        assert.strictEqual(
            convertCondition('if x > 5 and y < 10:'),
            'if (x > 5 && y < 10) {'
        );
    });

    test('or -> ||', () => {
        assert.strictEqual(convertCondition('if x or y:'), 'if (x || y) {');
    });

    test('and + or mix', () => {
        assert.strictEqual(
            convertCondition('if x and y or z:'),
            'if (x && y || z) {'
        );
    });

    test('word not touched', () => {
        assert.strictEqual(
            convertCondition('if android_mode:'),
            'if (android_mode) {'
        );
    });

    test('range simple', () => {
        assert.strictEqual(
            convertCondition('if 0 <= x < 10:'),
            'if (0 <= x && x < 10) {'
        );
    });

    test('range strict', () => {
        assert.strictEqual(
            convertCondition('if a < x < b:'),
            'if (a < x && x < b) {'
        );
    });

    test('range with and', () => {
        assert.strictEqual(
            convertCondition('if 0 <= x < 10 and flag:'),
            'if (0 <= x && x < 10 && flag) {'
        );
    });

    test('own parens', () => {
        assert.strictEqual(convertCondition('if x > (a + b):'), 'if (x > (a + b)) {');
    });

    test('function call', () => {
        assert.strictEqual(convertCondition('if is_valid(x):'), 'if (is_valid(x)) {');
    });

    // Not found cases

    test('no if/while -> null', () => {
        assert.strictEqual(convertCondition('x = 5'), null);
    });

    test('empty -> null', () => {
        assert.strictEqual(convertCondition(''), null);
    });

    test('only indent -> null', () => {
        assert.strictEqual(convertCondition('    '), null);
    });

    test('else -> null', () => {
        assert.strictEqual(convertCondition('else:'), null);
    });

    test('for -> null', () => {
        assert.strictEqual(convertCondition('for i in range(10):'), null);
    });

    test('ifX identifier -> null', () => {
        assert.strictEqual(convertCondition('ifX > 5:'), null);
    });

    // Prostotak
    test('already cpp -> not touched', () => {
        assert.strictEqual(convertCondition('if (x > 5) {'), 'if (x > 5) {');
    });
});
