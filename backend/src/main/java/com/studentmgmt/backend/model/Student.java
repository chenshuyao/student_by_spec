package com.studentmgmt.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Student entity representing a student in the database.
 * Contains all student information fields.
 */
@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name", length = 64)
    private String name;

    @Column(name = "gender", length = 8)
    private String gender;

    @Column(name = "phone", length = 16)
    private String phone;

    @Column(name = "age")
    private Integer age;

    @Column(name = "native_place", length = 64)
    private String nativePlace;

    @Column(name = "major", length = 128)
    private String major;

    @Column(name = "email", length = 32)
    private String email;

    @Column(name = "tag", length = 512)
    private String tag;

    @Column(name = "remark", length = 512)
    private String remark;

    @CreationTimestamp
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @UpdateTimestamp
    @Column(name = "modify_time")
    private LocalDateTime modifyTime;

    @Column(name = "is_delete")
    private Integer isDelete = 0;

    @Column(name = "creator")
    private Long creator;
} 