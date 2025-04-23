package com.studentmgmt.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * Data Transfer Object for Student entity.
 * Used for transferring student data between client and server.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private Long userId;

    @NotBlank(message = "Name is required")
    @Size(max = 64, message = "Name must be less than 64 characters")
    private String name;

    @Size(max = 8, message = "Gender must be less than 8 characters")
    private String gender;

    @Pattern(regexp = "^[0-9]*$", message = "Phone must contain only digits")
    @Size(max = 16, message = "Phone must be less than 16 characters")
    private String phone;

    private Integer age;

    @Size(max = 64, message = "Native place must be less than 64 characters")
    private String nativePlace;

    @Size(max = 128, message = "Major must be less than 128 characters")
    private String major;

    @Email(message = "Email should be valid")
    @Size(max = 32, message = "Email must be less than 32 characters")
    private String email;

    @Size(max = 512, message = "Tag must be less than 512 characters")
    private String tag;

    @Size(max = 512, message = "Remark must be less than 512 characters")
    private String remark;

    private Long creator;

    // Conversion methods
    public static StudentDTO fromEntity(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setUserId(student.getUserId());
        dto.setName(student.getName());
        dto.setGender(student.getGender());
        dto.setPhone(student.getPhone());
        dto.setAge(student.getAge());
        dto.setNativePlace(student.getNativePlace());
        dto.setMajor(student.getMajor());
        dto.setEmail(student.getEmail());
        dto.setTag(student.getTag());
        dto.setRemark(student.getRemark());
        dto.setCreator(student.getCreator());
        return dto;
    }

    public Student toEntity() {
        Student student = new Student();
        student.setId(this.id);
        student.setUserId(this.userId);
        student.setName(this.name);
        student.setGender(this.gender);
        student.setPhone(this.phone);
        student.setAge(this.age);
        student.setNativePlace(this.nativePlace);
        student.setMajor(this.major);
        student.setEmail(this.email);
        student.setTag(this.tag);
        student.setRemark(this.remark);
        student.setCreator(this.creator);
        student.setIsDelete(0);
        return student;
    }
} 