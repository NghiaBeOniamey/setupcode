package com.portalevent.core.adminho.eventwaitingapprovalmanagement.repository;

import com.portalevent.core.adminho.eventwaitingapprovalmanagement.model.respone.AdminHOpParticipantResponse;
import com.portalevent.repository.ParticipantRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminHOpParticipantRepository extends ParticipantRepository {

//    @Query(value = """
//            SELECT
//            	s.name as semesterName,
//            	m2.name as subjectCode,
//            	e.name as eventName,
//            	p.participant_name as participantName,
//            	p.email as participantEmail
//            FROM
//            	participant p
//            JOIN event e ON
//            	p.event_id = e.id
//            JOIN semester s ON
//            	e.semester_id = s.id
//            JOIN event_major em ON
//            	e.id = em.event_id
//            JOIN major m1 ON
//            	em.major_id = m1.id
//            JOIN major m2 ON
//            	m1.main_major_id = m2.id
//            WHERE
//                p.lecturer_name IS NOT NULL
//            AND
//                e.event_type IN(0, 2)
//            """, nativeQuery = true)
//    List<AdpParticipantResponse> findAllParticipant();

    @Query(value = """
            SELECT
            	s.name as semesterName,
            	e.name as eventName,
            	p.participant_name as participantName,
            	p.email as participantEmail
            FROM
            	participant p
            JOIN event e ON
            	p.event_id = e.id
            JOIN semester s ON
            	e.semester_id = s.id
            JOIN event_major em ON
            	e.id = em.event_id
            JOIN major m1 ON
            	em.major_id = m1.id
            WHERE
            	m1.code = :subjectCode
            AND
                p.lecturer_name IS NOT NULL
            AND
                e.event_type IN(0, 2)
            """, nativeQuery = true)
    List<AdminHOpParticipantResponse> findAllParticipantWithSubjectCode(String subjectCode);

}
