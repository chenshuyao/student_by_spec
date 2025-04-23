package com.studentmgmt.backend.service;

import com.studentmgmt.backend.model.Student;
import com.studentmgmt.backend.model.StudentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for handling Student-related operations.
 */
public interface StudentService {

    /**
     * Get all non-deleted students.
     *
     * @return List of students
     */
    List<StudentDTO> getAllStudents();
    
    /**
     * Get all non-deleted students with pagination.
     *
     * @param pageable Pagination information
     * @return Page of students
     */
    Page<StudentDTO> getAllStudents(Pageable pageable);

    /**
     * Get a student by ID.
     *
     * @param id Student ID
     * @return Optional student if found
     */
    Optional<StudentDTO> getStudentById(Long id);

    /**
     * Create a new student.
     *
     * @param studentDTO Student data to create
     * @return Created student data
     */
    StudentDTO createStudent(StudentDTO studentDTO);

    /**
     * Update an existing student.
     *
     * @param id         Student ID to update
     * @param studentDTO Updated student data
     * @return Updated student data
     */
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);

    /**
     * Delete a student (soft delete).
     *
     * @param id Student ID to delete
     * @return True if deleted successfully
     */
    boolean deleteStudent(Long id);

    /**
     * Search students by term (name, phone, email).
     *
     * @param searchTerm Term to search for
     * @return List of matching students
     */
    List<StudentDTO> searchStudents(String searchTerm);
    
    /**
     * Search students by term (name, phone, email) with pagination.
     *
     * @param searchTerm Term to search for
     * @param pageable   Pagination information
     * @return Page of matching students
     */
    Page<StudentDTO> searchStudents(String searchTerm, Pageable pageable);

    /**
     * Find students by name.
     *
     * @param name Name to search for
     * @return List of matching students
     */
    List<StudentDTO> findStudentsByName(String name);
    
    /**
     * Find students by name with pagination.
     *
     * @param name     Name to search for
     * @param pageable Pagination information
     * @return Page of matching students
     */
    Page<StudentDTO> findStudentsByName(String name, Pageable pageable);

    /**
     * Find students by phone.
     *
     * @param phone Phone number to search for
     * @return List of matching students
     */
    List<StudentDTO> findStudentsByPhone(String phone);
    
    /**
     * Find students by phone with pagination.
     *
     * @param phone    Phone number to search for
     * @param pageable Pagination information
     * @return Page of matching students
     */
    Page<StudentDTO> findStudentsByPhone(String phone, Pageable pageable);
} 