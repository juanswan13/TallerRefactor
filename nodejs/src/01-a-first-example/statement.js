function statement(invoice, plays) {
  return renderPlainText();

  function renderPlainText() {
    let result = invoice.performances.reduce((preview, current) => `${preview}  ${playFor(current).name}: ${usdFormat(amountFor(current))} (${current.audience} seats)\n`, `Statement for ${invoice.customer}\n`);
    result += `Amount owed is ${usdFormat(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
  }

  function totalAmount() {
    return invoice.performances.reduce((preview, current) => preview + amountFor(current), 0);
  }
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
    let volumeCreditsrenderPlainText = Math.max(aPerformance.audience - 30, 0);
    if (playFor(aPerformance).type === 'comedy'){
      volumeCreditsrenderPlainText += Math.floor(aPerformance.audience / 5);
    }
    return volumeCreditsrenderPlainText;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance) {
    let amountrenderPlainText = 0;
    switch (playFor(aPerformance).type) {
      case 'tragedy':
        amountrenderPlainText = 40000;
        if (aPerformance.audience > 30) {
          amountrenderPlainText += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy':
        amountrenderPlainText = 30000;
        if (aPerformance.audience > 20) {
          amountrenderPlainText += 10000 + 500 * (aPerformance.audience - 20);
        }
        amountrenderPlainText += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return amountrenderPlainText;
  }
}

module.exports = statement;
