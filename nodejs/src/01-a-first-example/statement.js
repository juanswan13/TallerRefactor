function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (const aPerformance of invoice.performances) {
    result += `  ${playFor(aPerformance).name}: ${usdFormat(amountFor(aPerformance))} (${aPerformance.audience} seats)\n`;
    totalAmount += amountFor(aPerformance);
  }
  result += `Amount owed is ${usdFormat(totalAmount)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function totalVolumeCredits() {
    return invoice.performances.reduce((preview, current) => preview + volumeCreditsFor(current), 0);
  }

  function usdFormat(aNumber){
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(aNumber/100);
  }
  function volumeCreditsFor(aPerformance) {
    let volumeCreditsResult = Math.max(aPerformance.audience - 30, 0);
    if (playFor(aPerformance).type === 'comedy'){
      volumeCreditsResult += Math.floor(aPerformance.audience / 5);
    }
    return volumeCreditsResult;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
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
