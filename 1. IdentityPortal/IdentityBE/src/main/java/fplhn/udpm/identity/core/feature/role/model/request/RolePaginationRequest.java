package fplhn.udpm.identity.core.feature.role.model.request;

import fplhn.udpm.identity.core.common.PageableRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RolePaginationRequest extends PageableRequest {

    @NotBlank(message = "Mã chức vụ không được để trống")
    private String roleCode;

    @NotBlank(message = "Tên chức vụ không được để trống")
    private String roleName;

    private List<Long> searchValues;

}
