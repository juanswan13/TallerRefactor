package exercise;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Play {
  String id;
  String type;
  String name;

}
