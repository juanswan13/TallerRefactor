function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const { format } = new Intl.NumberFormat('en-US',
    {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  for (const perf of invoice.performances) {
    thisAmount = amountFor(playFor(perf), perf);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if (playFor(perf).type === 'comedy') volumeCredits += Math.floor(perf.audience / 5);

    // print line for this order
    result += `  ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function playFor(perf) {
    return plays[perf.playID];
  }

  function amountFor(aPlay, aPerformance) {
    let amountResult = 0;
    switch (aPlay.type) {
      case 'tragedy':
        amountResult = 40000;
        if (aPerformance.audience > 30) {
          amountResult += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy':
        amountResult = 30000;
        if (aPerformance.audience > 20) {
          amountResult += 10000 + 500 * (aPerformance.audience - 20);
        }
        amountResult += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${aPlay.type}`);
    }
    return amountResult;
  }
}

module.exports = statement;
