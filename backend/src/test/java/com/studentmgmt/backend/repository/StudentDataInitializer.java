package com.studentmgmt.backend.repository;

import com.studentmgmt.backend.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 学生数据初始化器
 * 用于向数据库中添加测试数据
 */
@SpringBootTest
public class StudentDataInitializer {

    @Autowired
    private StudentRepository studentRepository;
    
    private final Random random = new Random();
    
    /**
     * 生成并保存20个学生测试数据
     */
    @Test
    public void initializeStudentData() {
        List<Student> students = new ArrayList<>();
        
        // 创建20个随机学生
        for (int i = 1; i <= 20; i++) {
            Student student = createStudent(i);
            students.add(student);
        }
        
        // 保存所有学生到数据库
        studentRepository.saveAll(students);
        
        System.out.println("成功初始化20个学生测试数据!");
    }
    
    /**
     * 创建一个随机学生
     */
    private Student createStudent(int index) {
        Student student = new Student();
        
        // 基本信息
        student.setName(getRandomName());
        student.setGender(getRandomGender());
        student.setAge(getRandomAge());
        student.setPhone(getRandomPhone());
        student.setEmail(generateEmail(student.getName()));
        
        // 学术信息
        student.setMajor(getRandomMajor());
        student.setNativePlace(getRandomCity());
        student.setTag(getRandomTags());
        student.setRemark("测试学生 #" + index + "，自动生成的测试数据");
        
        // 系统信息
        student.setUserId(Long.valueOf(random.nextInt(1000)));
        student.setCreator(1L);
        student.setIsDelete(0);
        student.setCreateTime(LocalDateTime.now());
        student.setModifyTime(LocalDateTime.now());
        
        return student;
    }
    
    /**
     * 生成随机姓名
     */
    private String getRandomName() {
        String[] firstNames = {"张", "王", "李", "赵", "刘", "陈", "杨", "黄", "吴", "周"};
        String[] middleNames = {"", "", "小", "大", "亦", "子", "雨", "嘉", "宇", ""};
        String[] lastNames = {"明", "华", "强", "伟", "芳", "娟", "秀英", "丽", "敏", "静", "磊", "勇"};
        
        return firstNames[random.nextInt(firstNames.length)] + 
               middleNames[random.nextInt(middleNames.length)] + 
               lastNames[random.nextInt(lastNames.length)];
    }
    
    /**
     * 生成随机性别
     */
    private String getRandomGender() {
        String[] genders = {"男", "女"};
        return genders[random.nextInt(genders.length)];
    }
    
    /**
     * 生成随机年龄
     */
    private int getRandomAge() {
        return 18 + random.nextInt(12); // 18-29岁
    }
    
    /**
     * 生成随机手机号
     */
    private String getRandomPhone() {
        StringBuilder phone = new StringBuilder("1");
        int prefix = random.nextInt(8) + 3; // 3-10, 对应 13x-20x
        phone.append(prefix);
        
        // 剩余9位数字
        for (int i = 0; i < 9; i++) {
            phone.append(random.nextInt(10));
        }
        
        return phone.toString();
    }
    
    /**
     * 根据姓名生成邮箱
     */
    private String generateEmail(String name) {
        String[] domains = {"gmail.com", "qq.com", "163.com", "126.com", "outlook.com", "hotmail.com"};
        String pinyin = getPinyinFromName(name);
        return pinyin + random.nextInt(1000) + "@" + domains[random.nextInt(domains.length)];
    }
    
    /**
     * 模拟将中文姓名转为拼音（简化实现）
     */
    private String getPinyinFromName(String name) {
        // 实际应用中应该使用专业的拼音转换库
        // 这里用简化逻辑模拟
        String simplified = name.replaceAll("[^\\x00-\\xff]", "");
        if (simplified.isEmpty()) {
            return "student" + random.nextInt(9999);
        }
        return simplified.toLowerCase();
    }
    
    /**
     * 生成随机专业
     */
    private String getRandomMajor() {
        String[] majors = {
            "计算机科学与技术", "软件工程", "人工智能", "数据科学", "通信工程",
            "电子信息工程", "机械工程", "土木工程", "化学工程", "生物技术",
            "金融学", "会计学", "市场营销", "企业管理", "国际贸易",
            "英语", "日语", "法语", "医学", "法学"
        };
        
        return majors[random.nextInt(majors.length)];
    }
    
    /**
     * 生成随机城市（籍贯）
     */
    private String getRandomCity() {
        String[] cities = {
            "北京", "上海", "广州", "深圳", "杭州",
            "南京", "武汉", "成都", "重庆", "西安",
            "长沙", "郑州", "天津", "苏州", "青岛",
            "大连", "宁波", "厦门", "福州", "哈尔滨"
        };
        
        return cities[random.nextInt(cities.length)];
    }
    
    /**
     * 生成随机标签
     */
    private String getRandomTags() {
        String[] allTags = {
            "学生会", "社团活动", "志愿者", "体育特长", "音乐特长",
            "美术特长", "编程", "外语能力", "奖学金", "比赛获奖",
            "实习经验", "研究项目", "出国交流", "创业经验", "演讲能力"
        };
        
        // 选择1-3个标签
        int tagCount = 1 + random.nextInt(3);
        StringBuilder tags = new StringBuilder();
        
        for (int i = 0; i < tagCount; i++) {
            if (i > 0) {
                tags.append(",");
            }
            
            // 随机选择一个未使用的标签
            String tag;
            do {
                tag = allTags[random.nextInt(allTags.length)];
            } while (tags.toString().contains(tag));
            
            tags.append(tag);
        }
        
        return tags.toString();
    }
} 