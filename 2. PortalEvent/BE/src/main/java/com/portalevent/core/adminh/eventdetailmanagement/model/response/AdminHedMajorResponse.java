package com.portalevent.core.adminh.eventdetailmanagement.model.response;

import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface AdminHedMajorResponse extends IsIdentified {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

}
