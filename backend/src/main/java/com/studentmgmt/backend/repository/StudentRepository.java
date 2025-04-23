package com.studentmgmt.backend.repository;

import com.studentmgmt.backend.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Student entity.
 * Provides methods to access students data from the database.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    /**
     * Find all students that are not marked as deleted.
     *
     * @return List of active students
     */
    List<Student> findByIsDelete(Integer isDelete);
    
    /**
     * Find all students that are not marked as deleted with pagination.
     *
     * @param isDelete Deletion status
     * @param pageable Pagination information
     * @return Page of active students
     */
    Page<Student> findByIsDelete(Integer isDelete, Pageable pageable);

    /**
     * Find students by name containing the given string and not deleted.
     *
     * @param name     Name to search for
     * @param isDelete Deletion status
     * @return List of matching students
     */
    List<Student> findByNameContainingAndIsDelete(String name, Integer isDelete);
    
    /**
     * Find students by name containing the given string and not deleted with pagination.
     *
     * @param name     Name to search for
     * @param isDelete Deletion status
     * @param pageable Pagination information
     * @return Page of matching students
     */
    Page<Student> findByNameContainingAndIsDelete(String name, Integer isDelete, Pageable pageable);

    /**
     * Find students by phone containing the given string and not deleted.
     *
     * @param phone    Phone to search for
     * @param isDelete Deletion status
     * @return List of matching students
     */
    List<Student> findByPhoneContainingAndIsDelete(String phone, Integer isDelete);
    
    /**
     * Find students by phone containing the given string and not deleted with pagination.
     *
     * @param phone    Phone to search for
     * @param isDelete Deletion status
     * @param pageable Pagination information
     * @return Page of matching students
     */
    Page<Student> findByPhoneContainingAndIsDelete(String phone, Integer isDelete, Pageable pageable);

    /**
     * Search students by term (name, phone, email).
     *
     * @param searchTerm Search term to look for in name, phone or email
     * @param isDelete   Deletion status
     * @return List of matching students
     */
    @Query("SELECT s FROM Student s WHERE " +
            "(LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.phone) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
            "AND s.isDelete = :isDelete")
    List<Student> searchStudents(@Param("searchTerm") String searchTerm, @Param("isDelete") Integer isDelete);
    
    /**
     * Search students by term (name, phone, email) with pagination.
     *
     * @param searchTerm Search term to look for in name, phone or email
     * @param isDelete   Deletion status
     * @param pageable   Pagination information
     * @return Page of matching students
     */
    @Query("SELECT s FROM Student s WHERE " +
            "(LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.phone) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
            "AND s.isDelete = :isDelete")
    Page<Student> searchStudents(@Param("searchTerm") String searchTerm, @Param("isDelete") Integer isDelete, Pageable pageable);
} 