package com.portalevent.core.adminh.eventdetailmanagement.repository;

import com.portalevent.core.adminh.eventdetailmanagement.model.response.AdminHewEvidenceResponse;
import com.portalevent.repository.EvidenceRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HoangDV
 */
@Repository
public interface AdminHedEvidenceRepository extends EvidenceRepository {

    @Query(value = """
                SELECT v.name, v.path, v.evidence_type, v.description 
                FROM evidence v LEFT JOIN event e ON v.event_id = e.id
                WHERE event_id = :idEvent
            """, nativeQuery = true)
    List<AdminHewEvidenceResponse> getEvidenceByIdEvent(@Param("idEvent") String id);

}
