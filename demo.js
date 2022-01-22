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

function playFor(perf) {
    return players[perf.playID];
}


function amount_for(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;

    for (let aPerformance of invoice.performances) {
        // add volume credits
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(aPerformance).type)
            volumeCredits += Math.floor(aPerformance.audience / 5);

        // print line for this order
        result += ` ${playFor(aPerformance).name}: ${format(amount_for(aPerformance) / 100)} (${aPerformance.audience} seats)\n`;
        totalAmount += amount_for(aPerformance);
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
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

