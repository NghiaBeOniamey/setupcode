package com.portalevent.core.adminho.eventdetailmanagement.model.request;

import com.portalevent.infrastructure.constant.EntityProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminHOedPostCommentRequest {

    @NotBlank
    @NotEmpty
    private String eventId;

    @NotBlank
    @NotEmpty
    private String userId;

    @NotEmpty
    @Size(max = EntityProperties.LENGTH_COMMENT)
    private String comment;

}
