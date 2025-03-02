package com.portalevent.core.admin.registrationlistmanagement.model.request;

import com.portalevent.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminerEventParticipantRequest extends PageableRequest {

    private String idEvent;

    private String email;

    String participantCode;

    String participantName;

    Long startTimeSearch;

    Long endTimeSearch;

}
