package exercise;

import java.util.ArrayList;
import java.util.List;
import org.junit.Test;

import static org.junit.Assert.*;

public class BIllTest {
  @Test
  public void createStatement() throws Exception {
    List<Performance> performances = new ArrayList<>();

    performances.add(Performance.builder().playId("hamlet").audience(55).build());
    performances.add(Performance.builder().playId("as-like").audience(35).build());
    performances.add(Performance.builder().playId("othello").audience(40).build());

    Invoice invoice = Invoice
        .builder()
        .customer("BigCo")
        .performances(performances.toArray(new Performance[performances.size()]))
        .build();


    List<Play> plays = new ArrayList<>();
    plays.add(Play.builder().id("hamlet").name("Hamlet").type("tragedy").build());
    plays.add(Play.builder().id("as-like").name("As You Like It").type("comedy").build());
    plays.add(Play.builder().id("othello").name("Othello").type("tragedy").build());

    String result = Bill.statement(invoice, plays.toArray(new Play[plays.size()]));

    assertEquals("Statement for BigCo\n" +
        "  Hamlet: $650.00 (55 seats)\n" +
        "  As You Like It: $580.00 (35 seats)\n" +
        "  Othello: $500.00 (40 seats)\n" +
        "Amount owed is $1,730.00\n" +
        "You earned 47 credits\n", result);
  }
}
