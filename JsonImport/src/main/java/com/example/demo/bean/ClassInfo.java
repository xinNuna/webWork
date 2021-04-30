package com.example.demo.bean;

/**
 * 班级视角的从数据库取数据的实体类
 */
public class ClassInfo {
    private String stuName;
    private String stuNum;
    private String reviewAddress;
    private String StuMajor;
    private String StuClass;

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public String getStuNum() {
        return stuNum;
    }

    public void setStuNum(String stuNum) {
        this.stuNum = stuNum;
    }

    public String getReviewAddress() {
        return reviewAddress;
    }

    public void setReviewAddress(String reviewAddress) {
        this.reviewAddress = reviewAddress;
    }

    public String getStuMajor() {
        return StuMajor;
    }

    public void setStuMajor(String stuMajor) {
        StuMajor = stuMajor;
    }

    public String getStuClass() {
        return StuClass;
    }

    public void setStuClass(String stuClass) {
        StuClass = stuClass;
    }

    @Override
    public String toString() {
        return "ClassInfo{" +
                "stuName='" + stuName + '\'' +
                ", stuNum='" + stuNum + '\'' +
                ", reviewAddress='" + reviewAddress + '\'' +
                ", StuMajor='" + StuMajor + '\'' +
                ", StuClass='" + StuClass + '\'' +
                '}';
    }
}
