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
    const statementData = {};
    statementData.customer = invoice.customer;


    statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData, plays);

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        return result;
    }
}

function renderPlainText(data, plays) {
    let result = `Statement for ${data.customer}\n`;

    for (let aPerformance of data.performances) {

        // print line for this order
        result += ` ${playFor(aPerformance).name}: ${usd(amount_for(aPerformance) / 100)} (${aPerformance.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmout() / 100)}\n`;
    result += `You earned ${(totalVolumeCredits())} credits\n`;
    return result;

    function playFor(perf) {
        return plays[perf.playID];
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

    function volumeCreditsFor(aPerformance) {
        let result = 0;
        // add volume credits
        result += Math.max(aPerformance.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(aPerformance).type)
            result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(aNumber);
    }

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let aPerformance of data.performances) {
            volumeCredits += volumeCreditsFor(aPerformance);
        }
        return volumeCredits;
    }

    function totalAmout() {
        let totalAmount = 0;
        for (let aPerformance of data.performances) {
            totalAmount += amount_for(aPerformance);
        }
        return totalAmount;
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

