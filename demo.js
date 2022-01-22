createStatementData = require("./createStatementData");
var players = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};

var invoices = {
    "customer": "BigCo",
    "performances": [
        {"playID": "hamlet", "audience": 55},
        {"playID": "as-like", "audience": 35},
        {"playID": "othello", "audience": 40}]
};


function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));


}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;

    for (let aPerformance of data.performances) {

        // print line for this order
        result += ` ${aPerformance.play.name}: ${usd(aPerformance.amount / 100)} (${aPerformance.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;


    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(aNumber);
    }

}

// var ret = statement(invoices, players);
// console.log(ret);

module.exports = {
    "statement": statement,
    "invoices": invoices,
    "players": players
};

//output:
//Statement for BigCo
//   Hamlet: $650.00 (55 seats)
//   As You Like It: $580.00 (35 seats)
//   Othello: $500.00 (40 seats)
// Amount owed is $1,730.00
// You earned 47 credits


// 问题：
//1. 首先，他们希望以HTML格式输出详单。怎么支持？ c-v操作？
//2. 增加新的表演类型： 如：历史具、田园居， 等等； 增加case ？,
//3. 如何应对分类规则和计费规则的变化？

