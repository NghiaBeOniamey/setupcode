package com.portalevent.core.admin.eventdetailmanagement.model.response;

import com.portalevent.entity.Evidence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author HoangDV
 */
@Projection(types = Evidence.class)
public interface AdminerEvidenceResponse {

    @Value("#{target.name}")
    String getName();

    @Value("#{target.path}")
    String getPath();

    @Value("#{target.evidence_type}")
    Integer getEvidenceType();

    @Value("#{target.description}")
    String getDescription();

}
