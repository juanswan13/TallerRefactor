function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (const perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    result += `  ${playFor(perf).name}: ${usdFormat(amountFor(perf))} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${usdFormat(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function usdFormat(aNumber){
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(aNumber/100);
  }
  function volumeCreditsFor(perf) {
    let volumeCreditsResult = Math.max(perf.audience - 30, 0);
    if (playFor(perf).type === 'comedy'){
      volumeCreditsResult += Math.floor(perf.audience / 5);
    }
    return volumeCreditsResult;
  }

  function playFor(perf) {
    return plays[perf.playID];
  }

  function amountFor(aPerformance) {
    let amountResult = 0;
    switch (playFor(aPerformance).type) {
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return amountResult;
  }
}

module.exports = statement;
