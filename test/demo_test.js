var demo = require('../demo');
const assert = require('assert');

function Test_demo() {
    var ret = demo.statement(demo.invoices, demo.players);
    var assert_ret = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;


    assert.strictEqual(ret,assert_ret   )
}

Test_demo();