package com.portalevent.core.admin.eventdetailmanagement.model.response;

import com.portalevent.entity.EventObject;
import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = EventObject.class)
public interface AdminerObjectEventResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

}
