package fplhn.udpm.identity.core.connection.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetListUserByRoleCodeRequest extends ClientRequest {

    @NotNull
    private String roleCode;

    private List<String> listDepartmentCode;

    @NotNull
    private String campusCode;

}
