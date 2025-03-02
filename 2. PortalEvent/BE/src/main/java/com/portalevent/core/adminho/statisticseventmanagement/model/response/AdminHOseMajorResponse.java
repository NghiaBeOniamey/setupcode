package com.portalevent.core.adminho.statisticseventmanagement.model.response;

import com.portalevent.entity.Major;
import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author HoangDV
 */
@Projection(types = {Major.class})
public interface AdminHOseMajorResponse extends IsIdentified {

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.name}")
    String getName();

}
