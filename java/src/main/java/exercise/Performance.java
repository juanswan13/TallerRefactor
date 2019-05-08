package exercise;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
class Performance {
  String playId;
  int audience;
}
