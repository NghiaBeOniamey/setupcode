package com.portalevent.core.admin.statisticseventmanagement.model.response;

import com.portalevent.entity.Semester;
import com.portalevent.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author HoangDV
 */
@Projection(types = {Semester.class})
public interface AdminerSemesterResponse extends IsIdentified {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.start_time}")
    Long getStartTime();

    @Value("#{target.end_time}")
    Long getEndTime();

}
