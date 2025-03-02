package com.portalevent.core.admin.periodiceventmanagement.model.request;

import com.portalevent.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

/**
 * @author thangncph26123
 */
@Getter
@Setter
public class AdminerDPDFindPeriodEventRequest extends PageableRequest {

    private String name;

    private String categoryId;

    private Integer eventType;

    private String majorId;

    private String objectId;

}
