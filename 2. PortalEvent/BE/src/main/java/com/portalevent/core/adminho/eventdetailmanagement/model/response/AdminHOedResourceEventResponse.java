package com.portalevent.core.adminho.eventdetailmanagement.model.response;

import com.portalevent.entity.Resource;
import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = Resource.class)
public interface AdminHOedResourceEventResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.path}")
    String getPath();

    @Value("#{target.description}")
    String getDescription();
}
