package com.studentmgmt.backend.service;

import com.studentmgmt.backend.model.Student;
import com.studentmgmt.backend.model.StudentDTO;
import com.studentmgmt.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Implementation of the StudentService interface.
 * Provides business logic for student operations.
 */
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findByIsDelete(0)
                .stream()
                .map(StudentDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<StudentDTO> getAllStudents(Pageable pageable) {
        return studentRepository.findByIsDelete(0, pageable)
                .map(StudentDTO::fromEntity);
    }

    @Override
    public Optional<StudentDTO> getStudentById(Long id) {
        return studentRepository.findById(id)
                .filter(student -> student.getIsDelete() == 0)
                .map(StudentDTO::fromEntity);
    }

    @Override
    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = studentDTO.toEntity();
        student.setIsDelete(0);
        Student savedStudent = studentRepository.save(student);
        return StudentDTO.fromEntity(savedStudent);
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        
        if (existingStudent.isPresent() && existingStudent.get().getIsDelete() == 0) {
            Student student = existingStudent.get();
            
            // Update the student with new values
            student.setName(studentDTO.getName());
            student.setGender(studentDTO.getGender());
            student.setPhone(studentDTO.getPhone());
            student.setAge(studentDTO.getAge());
            student.setNativePlace(studentDTO.getNativePlace());
            student.setMajor(studentDTO.getMajor());
            student.setEmail(studentDTO.getEmail());
            student.setTag(studentDTO.getTag());
            student.setRemark(studentDTO.getRemark());
            
            Student updatedStudent = studentRepository.save(student);
            return StudentDTO.fromEntity(updatedStudent);
        }
        
        // If student not found or is deleted, return studentDTO as is
        return studentDTO;
    }

    @Override
    public boolean deleteStudent(Long id) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setIsDelete(1);
            studentRepository.save(student);
            return true;
        }
        
        return false;
    }

    @Override
    public List<StudentDTO> searchStudents(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllStudents();
        }
        
        return studentRepository.searchStudents(searchTerm, 0)
                .stream()
                .map(StudentDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<StudentDTO> searchStudents(String searchTerm, Pageable pageable) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllStudents(pageable);
        }
        
        return studentRepository.searchStudents(searchTerm, 0, pageable)
                .map(StudentDTO::fromEntity);
    }

    @Override
    public List<StudentDTO> findStudentsByName(String name) {
        return studentRepository.findByNameContainingAndIsDelete(name, 0)
                .stream()
                .map(StudentDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<StudentDTO> findStudentsByName(String name, Pageable pageable) {
        return studentRepository.findByNameContainingAndIsDelete(name, 0, pageable)
                .map(StudentDTO::fromEntity);
    }

    @Override
    public List<StudentDTO> findStudentsByPhone(String phone) {
        return studentRepository.findByPhoneContainingAndIsDelete(phone, 0)
                .stream()
                .map(StudentDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<StudentDTO> findStudentsByPhone(String phone, Pageable pageable) {
        return studentRepository.findByPhoneContainingAndIsDelete(phone, 0, pageable)
                .map(StudentDTO::fromEntity);
    }
} 