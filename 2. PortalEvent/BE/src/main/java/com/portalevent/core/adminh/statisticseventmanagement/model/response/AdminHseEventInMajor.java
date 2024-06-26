package com.portalevent.core.adminh.statisticseventmanagement.model.response;

import com.portalevent.entity.Event;
import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author HoangDV
 */
@Projection(types = {Event.class})
public interface AdminHseEventInMajor extends IsIdentified {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.quantity}")
    Integer getQuantity();

}
