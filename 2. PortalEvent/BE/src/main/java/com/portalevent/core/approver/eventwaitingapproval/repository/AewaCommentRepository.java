package com.portalevent.core.approver.eventwaitingapproval.repository;

import com.portalevent.core.approver.eventdetail.model.response.AedCommentResponse;
import com.portalevent.core.common.TokenFindRequest;
import com.portalevent.entity.Comment;
import com.portalevent.repository.CommentRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AewaCommentRepository extends CommentRepository {
    @Query(value = """
            SELECT c.* FROM comment c 
            LEFT JOIN event e ON c.event_id = e.id
            WHERE reply_id = :replyId
            AND (:#{#request.currentTrainingFacilityCode} IS NULL OR e.training_facility_code LIKE :#{#request.currentTrainingFacilityCode})
            AND (:#{#request.currentSubjectCode} IS NULL OR e.subject_code LIKE :#{#request.currentSubjectCode})
            """, nativeQuery = true)
    List<Comment> getReplyCommentByReplyId(@Param("replyId") String replyId, TokenFindRequest request);

    @Query(value = """
            SELECT a.id AS id, a.user_id as user_id, 
            a.last_modified_date AS last_modified_date, a.comment, a.reply_id
            FROM comment a 
            LEFT JOIN event e ON a.event_id = e.id
            WHERE a.reply_id IS NOT NULL AND a.event_id = :eventId AND a.reply_id IN :listId
            ORDER BY a.last_modified_date ASC; 
            """, nativeQuery = true)
    List<AedCommentResponse> getReplyCommentByReplyIdAndEventId(@Param("eventId") String eventId, @Param("listId") List<String> listReplyId);

    Page<Comment> findByEventIdAndReplyIdIsNullOrderByLastModifiedDateDesc(String eventId, Pageable pageable);

}
