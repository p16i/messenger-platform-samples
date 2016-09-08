var parser = require('../parse-message');
var assert = require('chai').assert;

describe('Parse Query', function() {
    describe('#simple one', function() {
        it('best input', function() {
            var text = "ปอ. 511 สุขุมวิท 31";
            var obj = parser._simpleQuery(text);
            var expect = {
                "bound": 1,
                "busNo": 511,
                "origin": "สุขุมวิท 31",
                "stopId": 761
            };
            assert.deepEqual( obj, expect );
        });
    });
});
