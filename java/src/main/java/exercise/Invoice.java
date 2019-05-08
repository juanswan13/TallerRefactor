package exercise;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Invoice {
  private String customer;
  private Performance[] performances;
}
