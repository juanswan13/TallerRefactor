package exercise;

import java.text.NumberFormat;
import java.util.Arrays;
import java.util.Locale;

public class Bill {
  public static String statement(Invoice invoice, Play[] plays) throws Exception {
    long totalAmount = 0;
    int volumeCredits = 0;
    String result = "Statement for " + invoice.getCustomer() + "\n";

    for (Performance performance : invoice.getPerformances()) {
      Play play = Arrays.stream(plays)
          .filter(current -> current.getId().equals(performance.getPlayId()))
          .findAny()
          .orElse(null);
      long thisAmount = 0;

      switch (play.getType()) {
        case "tragedy":
          thisAmount = 40000;
          if (performance.getAudience() > 30) {
            thisAmount += 1000 * (performance.getAudience() - 30);
          }
          break;

        case "comedy":
          thisAmount = 30000;

          if (performance.getAudience() > 20) {
            thisAmount += 10000 + 500 * (performance.getAudience() - 20);
          }
          thisAmount += 300 * performance.getAudience();
          break;

          default:
            throw new Exception("unknown type: " + play.getType());
      }

      volumeCredits += Math.max(performance.getAudience() - 30, 0);

      if ("comedy".equals(play.getType())) {
        volumeCredits += Math.floor(performance.getAudience() / 5);
      }

      result += "  " + play.getName() + ": " + NumberFormat.getCurrencyInstance(new Locale("en", "US")).format(thisAmount/100) + " (" + performance.getAudience() + " seats)\n";
      totalAmount += thisAmount;
    }

    result += "Amount owed is " + NumberFormat.getCurrencyInstance(new Locale("en", "US")).format(totalAmount/100) + "\n";
    result += "You earned " + volumeCredits + " credits\n";

    return result;
  }
}
