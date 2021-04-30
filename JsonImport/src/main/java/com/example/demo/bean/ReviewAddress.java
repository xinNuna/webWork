package com.example.demo.bean;

/**
 * 存入数据库 复习地址excel标的实体类
 */
public class ReviewAddress {

    private String stuNum;
    private String stuName;
    private String stuMajor;
    private String stuClass;
    private String homeOrSchool;
    private String reviewAddress;


    public String getStuNum() {
        return stuNum;
    }

    public void setStuNum(String stuNum) {
        this.stuNum = stuNum;
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public String getStuMajor() {
        return stuMajor;
    }

    public void setStuMajor(String stuMajor) {
        this.stuMajor = stuMajor;
    }

    public String getStuClass() {
        return stuClass;
    }

    public void setStuClass(String stuClass) {
        this.stuClass = stuClass;
    }

    public String getHomeOrSchool() {
        return homeOrSchool;
    }

    public void setHomeOrSchool(String homeOrSchool) {
        this.homeOrSchool = homeOrSchool;
    }

    public String getReviewAddress() {
        return reviewAddress;
    }

    public void setReviewAddress(String reviewAddress) {
        this.reviewAddress = reviewAddress;
    }
}
