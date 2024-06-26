package com.portalevent.core.organizer.registrationList.model.response;

import com.portalevent.entity.Participant;
import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Participant.class})
public interface OrlQuestionResponse extends IsIdentified {

    String getEmail();

    Integer getIndexs();

    String getParticipantCode();

    String getParticipantName();

    String getRole();

    Long getCreateDate();
}
