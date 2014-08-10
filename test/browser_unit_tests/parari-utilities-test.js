/**
 * Brower unit test for pr.utilities
 * Runs with Kamra.
 */

"use strict";

describe('pr.utilities', function () {

    var pr = window.parari,
        u = pr.utilities;

    it('toElement', function () {
        expect(u.toElement('__invalid_id__')).toBe(null);
        expect(u.toElement(document.body) === document.body).toBe(true);
    });

    it('copy', function () {
        var src = {foo: 'bar'},
            dest = {foo: 'bbb', baz: 'quz'};
        u.copy(src, dest);
        expect(dest.foo).toEqual('bar');
        expect(dest.baz).toEqual('quz');
    });

    it('Offset sum.', function () {
        var offsetSum = u.offsetSum(document.window);
        expect(offsetSum.top).toBeDefined();
        expect(offsetSum.left).toBeDefined();
    });

    it('toArray.', function () {
        var array = u.toArray(['a', 'b', 'c']);
        expect(array).toBeDefined();
        expect(array[0]).toEqual('a');
        expect(array[1]).toEqual('b');
        expect(array[2]).toEqual('c');
    });

    it('Get min.', function () {
        expect(u.min(2, 5, 1)).toEqual(1);
    });
    it('Get max.', function () {
        expect(u.max(2, 5, 1)).toEqual(5);
    });

    it('extractNumber', function () {
        expect(u.extractNumber('20px')).toEqual(20);
    });


});