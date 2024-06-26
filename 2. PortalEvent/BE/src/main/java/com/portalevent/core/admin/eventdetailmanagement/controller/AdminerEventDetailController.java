package com.portalevent.core.admin.eventdetailmanagement.controller;

import com.portalevent.core.admin.eventdetailmanagement.model.request.AdminerDeleteCommentRequest;
import com.portalevent.core.admin.eventdetailmanagement.model.request.AdminerPostCommentRequest;
import com.portalevent.core.admin.eventdetailmanagement.model.request.AdminerReplyCommentRequest;
import com.portalevent.core.admin.eventdetailmanagement.service.AdminerEventDetailService;
import com.portalevent.core.admin.eventwaitingapprovalmanagement.model.request.AdminerEventApproveRequest;
import com.portalevent.core.common.ResponseObject;
import com.portalevent.infrastructure.constant.Constants;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constants.UrlPath.URL_API_ADMIN_EVENT_DETAIL)
public class AdminerEventDetailController {

    private final AdminerEventDetailService adedEventDetailService;

    public AdminerEventDetailController(AdminerEventDetailService adedEventDetailService) {
        this.adedEventDetailService = adedEventDetailService;
    }

    @PutMapping("/approve-event")
    public ResponseObject approvalEvent(@RequestBody AdminerEventApproveRequest req) {
        return adedEventDetailService.approvalEvent(req);
    }

    @GetMapping("/waiting-approval/detail/{id}")
    public ResponseObject getEventApprovedDetail(@PathVariable("id") String id) {
        return new ResponseObject(adedEventDetailService.getDetailEventApproved(id));
    }

    @GetMapping("/get-comment/{eventId}")
    public ResponseObject getComment(@PathVariable("eventId") String eventId, @RequestParam("pageNumber") int pageNumber) {
        return new ResponseObject(adedEventDetailService.getComment(eventId, pageNumber));
    }

    @GetMapping("/get-evidence/{idEvent}")
    public ResponseObject getEvidence(@PathVariable("idEvent") String id) {
        return new ResponseObject(adedEventDetailService.getEvidenceByIdEvent(id));
    }

    @PostMapping("/post-comment")
    public ResponseObject postComment(@RequestBody AdminerPostCommentRequest req) {
        return new ResponseObject(adedEventDetailService.postComment(req));
    }

    @DeleteMapping("/delete-comment")
    public ResponseObject deleteComment(@RequestBody AdminerDeleteCommentRequest req) {
        return new ResponseObject(adedEventDetailService.deleteComment(req));
    }

    @PostMapping("/reply-comment")
    public ResponseObject replyComment(@RequestBody AdminerReplyCommentRequest req) {
        return new ResponseObject(adedEventDetailService.replyComment(req));
    }

    @GetMapping("/get-agenda-item/{eventId}")
    public ResponseObject getAgendaItem(@PathVariable("eventId") String eventId) {
        return new ResponseObject(adedEventDetailService.getListAgendaItemByEventId(eventId));
    }

    @GetMapping("/get-resource/{eventId}")
    public ResponseObject getResourceEvent(@PathVariable("eventId") String eventId) {
        return new ResponseObject(adedEventDetailService.getResourcesByEventId(eventId));
    }

    @GetMapping("/get-location/{eventId}")
    public ResponseObject getLocationEvent(@PathVariable("eventId") String eventId) {
        return new ResponseObject(adedEventDetailService.getLocationByEventId(eventId));
    }

    @GetMapping("/get-object/{eventId}")
    public ResponseObject getObjectEvent(@PathVariable("eventId") String eventId) {
        return new ResponseObject(adedEventDetailService.getObjectByEventId(eventId));
    }

    @GetMapping("/get-major/{eventId}")
    public ResponseObject getMajorByIdEvent(@PathVariable("eventId") String id) {
        return new ResponseObject(adedEventDetailService.getMajorByIdEvent(id));
    }

    @PutMapping("/approver-periodic-event")
    public ResponseObject approverPeriodicEvent(@RequestParam("id") String id) {
        return new ResponseObject(adedEventDetailService.approverPeriodicEvent(id));
    }

    @PutMapping("/no-approver-periodic-event")
    public ResponseObject noApproverPeriodicEvent(@RequestParam("id") String id, @RequestParam("reason") String reason) {
        return new ResponseObject(adedEventDetailService.noApproverPeriodicEvent(id, reason));
    }

    @GetMapping("/get-list-organizer/{eventId}")
    public ResponseObject getListOrganizerByIdEvent(@PathVariable("eventId") String id) {
        return new ResponseObject(adedEventDetailService.getListOrganizerByIdEvent(id));
    }

    @GetMapping("/get-event-in-time")
    public ResponseObject getNameEventsInTime(@RequestParam("startTime") Long startTime,
                                              @RequestParam("endTime") Long endTime,
                                              @RequestParam("id") String id) {
        return new ResponseObject(adedEventDetailService.getNameEventsInTime(id, startTime, endTime));
    }

}
