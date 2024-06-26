package fplhn.udpm.identity.core.feature.majorcampus.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMajorCampusRequest {

    @NotNull
    private Long majorId;

    @NotNull
    private Long headMajorId;

}
