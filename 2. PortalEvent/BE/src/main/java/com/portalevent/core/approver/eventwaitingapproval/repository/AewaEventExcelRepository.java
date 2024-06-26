package com.portalevent.core.approver.eventwaitingapproval.repository;

import com.portalevent.core.approver.eventwaitingapproval.model.respone.AewaEventExcelResponse;
import com.portalevent.core.common.TokenFindRequest;
import com.portalevent.infrastructure.session.PortalEventsSession;
import com.portalevent.repository.EventRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AewaEventExcelRepository extends EventRepository {

    @Query(value = """
             SELECT
             GROUP_CONCAT(DISTINCT m.name SEPARATOR ', ') AS majorName,
             e.name AS eventName,
             e.description AS description,
             ctg.name AS typeOfEvent,
             e.start_time AS startTime,
             e.end_time AS endTime,
             e.expected_participants as expectedNumberOfStudents,
                (
             	SELECT
             		COUNT(*)
             	FROM
             		event_organizer eo
             	WHERE
             		eo.event_id = MAX(e.id)) as numberOfLectures,
             	(
             	SELECT
             		SUM(eo.meeting_hour)
             	FROM
             		event_organizer eo
             	WHERE
             		eo.event_id = MAX(e.id)) as meetingHours,
             	(
                SELECT
                    COUNT(*)
                FROM
                    participant p
                WHERE
                    p.event_id = MAX(e.id)
                    AND p.role = 'SINH_VIEN'
                    AND p.participant_type = 1) as numberOfStudents,
             CASE
              WHEN GROUP_CONCAT(DISTINCT el.formality) LIKE '%1%' AND GROUP_CONCAT(DISTINCT el.formality) LIKE '%0%' THEN 2
              WHEN GROUP_CONCAT(DISTINCT el.formality) LIKE '%1%' THEN 1
              WHEN GROUP_CONCAT(DISTINCT el.formality) LIKE '%0%' THEN 0
              ELSE ''
             END AS formality,
             GROUP_CONCAT(DISTINCT CASE WHEN el.formality = 1 THEN CONCAT(el.name, ' - ', el.path) ELSE NULL END SEPARATOR ', ') AS pathOffline,
             GROUP_CONCAT(DISTINCT CASE WHEN el.formality = 0 THEN CONCAT(el.name, ' - ', el.path) ELSE NULL END SEPARATOR ', ') AS pathOnline,
             e.status AS status
            FROM
             event e
            LEFT JOIN category ctg ON
             e.category_id = ctg.id
            LEFT JOIN event_location el ON
             e.id = el.event_id
            LEFT JOIN event_major em ON
             e.id = em.event_id
            LEFT JOIN major_campus mc ON
             em.major_id = mc.id
            LEFT JOIN major m ON
             m.major_id = mc.major_id
            LEFT JOIN department_campus dc ON
             mc.department_campus_id = dc.department_campus_id
            LEFT JOIN department d ON
             dc.department_id = d.department_id
            LEFT JOIN campus c ON
             dc.campus_id = c.campus_id
            WHERE
             e.status != 1
             AND e.semester_id = :idSemester
            AND c.code = :#{#request.currentTrainingFacilityCode}
            AND d.code = :#{#request.currentSubjectCode}
            GROUP BY
             e.name,
             e.description,
             ctg.name,
             e.start_time,
             e.end_time,
             e.expected_participants,
             e.status
            """, nativeQuery = true)
    List<AewaEventExcelResponse> findAllEventExcel(String idSemester, TokenFindRequest request);

}
