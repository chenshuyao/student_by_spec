package com.studentmgmt.backend.controller;

import com.studentmgmt.backend.model.ApiResponse;
import com.studentmgmt.backend.model.StudentDTO;
import com.studentmgmt.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for handling Student-related API endpoints.
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Get all students.
     *
     * @return List of all active students
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentDTO>>> getAllStudents() {
        List<StudentDTO> students = studentService.getAllStudents();
        return ResponseEntity.ok(ApiResponse.success(students, "Students retrieved successfully"));
    }
    
    /**
     * Get all students with pagination.
     *
     * @param page Page number (0-based)
     * @param size Page size
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @return Page of students
     */
    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllStudentsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "ASC") String direction) {
        
        Sort.Direction dir = Sort.Direction.fromString(direction.toUpperCase());
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        Page<StudentDTO> studentPage = studentService.getAllStudents(pageable);
        
        Map<String, Object> response = createPageResponse(studentPage);
        return ResponseEntity.ok(ApiResponse.success(response, "Students retrieved successfully"));
    }

    /**
     * Get a student by ID.
     *
     * @param id Student ID
     * @return Student details if found
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> getStudentById(@PathVariable Long id) {
        Optional<StudentDTO> student = studentService.getStudentById(id);
        
        return student
                .map(s -> ResponseEntity.ok(ApiResponse.success(s, "Student retrieved successfully")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Student not found with ID: " + id)));
    }

    /**
     * Create a new student.
     *
     * @param studentDTO Student data to create
     * @return Created student details
     */
    @PostMapping
    public ResponseEntity<ApiResponse<StudentDTO>> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        StudentDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(createdStudent, "Student created successfully"));
    }

    /**
     * Update an existing student.
     *
     * @param id         Student ID to update
     * @param studentDTO Updated student data
     * @return Updated student details
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentDTO>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentDTO studentDTO) {
        
        Optional<StudentDTO> existingStudent = studentService.getStudentById(id);
        
        if (existingStudent.isPresent()) {
            StudentDTO updatedStudent = studentService.updateStudent(id, studentDTO);
            return ResponseEntity.ok(ApiResponse.success(updatedStudent, "Student updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Student not found with ID: " + id));
        }
    }

    /**
     * Delete a student (soft delete).
     *
     * @param id Student ID to delete
     * @return Success/failure message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        boolean deleted = studentService.deleteStudent(id);
        
        if (deleted) {
            return ResponseEntity.ok(ApiResponse.success(null, "Student deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Student not found with ID: " + id));
        }
    }

    /**
     * Search students by term (name, phone, email).
     *
     * @param term Search term
     * @return List of matching students
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> searchStudents(@RequestParam(required = false) String term) {
        List<StudentDTO> students = studentService.searchStudents(term);
        return ResponseEntity.ok(ApiResponse.success(students, "Search results retrieved successfully"));
    }
    
    /**
     * Search students by term (name, phone, email) with pagination.
     *
     * @param term Search term
     * @param page Page number (0-based)
     * @param size Page size
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @return Page of matching students
     */
    @GetMapping("/search/page")
    public ResponseEntity<ApiResponse<Map<String, Object>>> searchStudentsPaged(
            @RequestParam(required = false) String term,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "ASC") String direction) {
        
        Sort.Direction dir = Sort.Direction.fromString(direction.toUpperCase());
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        Page<StudentDTO> studentPage = studentService.searchStudents(term, pageable);
        
        Map<String, Object> response = createPageResponse(studentPage);
        return ResponseEntity.ok(ApiResponse.success(response, "Search results retrieved successfully"));
    }

    /**
     * Find students by name.
     *
     * @param name Name to search for
     * @return List of matching students
     */
    @GetMapping("/by-name")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> findStudentsByName(@RequestParam String name) {
        List<StudentDTO> students = studentService.findStudentsByName(name);
        return ResponseEntity.ok(ApiResponse.success(students, "Students retrieved successfully"));
    }
    
    /**
     * Find students by name with pagination.
     *
     * @param name Name to search for
     * @param page Page number (0-based)
     * @param size Page size
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @return Page of matching students
     */
    @GetMapping("/by-name/page")
    public ResponseEntity<ApiResponse<Map<String, Object>>> findStudentsByNamePaged(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "ASC") String direction) {
        
        Sort.Direction dir = Sort.Direction.fromString(direction.toUpperCase());
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        Page<StudentDTO> studentPage = studentService.findStudentsByName(name, pageable);
        
        Map<String, Object> response = createPageResponse(studentPage);
        return ResponseEntity.ok(ApiResponse.success(response, "Students retrieved successfully"));
    }

    /**
     * Find students by phone.
     *
     * @param phone Phone number to search for
     * @return List of matching students
     */
    @GetMapping("/by-phone")
    public ResponseEntity<ApiResponse<List<StudentDTO>>> findStudentsByPhone(@RequestParam String phone) {
        List<StudentDTO> students = studentService.findStudentsByPhone(phone);
        return ResponseEntity.ok(ApiResponse.success(students, "Students retrieved successfully"));
    }
    
    /**
     * Find students by phone with pagination.
     *
     * @param phone Phone number to search for
     * @param page Page number (0-based)
     * @param size Page size
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @return Page of matching students
     */
    @GetMapping("/by-phone/page")
    public ResponseEntity<ApiResponse<Map<String, Object>>> findStudentsByPhonePaged(
            @RequestParam String phone,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "ASC") String direction) {
        
        Sort.Direction dir = Sort.Direction.fromString(direction.toUpperCase());
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sort));
        Page<StudentDTO> studentPage = studentService.findStudentsByPhone(phone, pageable);
        
        Map<String, Object> response = createPageResponse(studentPage);
        return ResponseEntity.ok(ApiResponse.success(response, "Students retrieved successfully"));
    }
    
    /**
     * Create a standardized response for paginated results.
     *
     * @param page Page of students
     * @return Map containing page data and metadata
     */
    private Map<String, Object> createPageResponse(Page<StudentDTO> page) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("currentPage", page.getNumber());
        response.put("totalItems", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());
        response.put("size", page.getSize());
        response.put("first", page.isFirst());
        response.put("last", page.isLast());
        response.put("empty", page.isEmpty());
        return response;
    }
} 