package com.portalevent.core.admin.eventdetailmanagement.repository;

import com.portalevent.core.admin.eventdetailmanagement.model.response.AdminerAgendaItemsDetailResponse;
import com.portalevent.repository.AgendaItemRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminerAgendaItemRepository extends AgendaItemRepository {

    @Query(value = """
        select ROW_NUMBER() OVER(ORDER BY a.last_modified_date DESC) as indexs
        	, a.id as id
        	, a.start_time as startTime
            , a.end_time as endTime
            , a.organizer_id as organizerId
            , a.description as description
        from agenda_item a
        LEFT JOIN event e ON a.event_id = e.id
        where a.event_id = :idevent
    """, countQuery = """
        select count(*)
        from agenda_item a
        LEFT JOIN event e ON a.event_id = e.id
        where a.event_id = :idevent
    """, nativeQuery = true)
    List<AdminerAgendaItemsDetailResponse> getListAgendaItemByEventId(@Param("idevent") String idEvent);

}
