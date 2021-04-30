package com.example.demo.bean;

/**
 * 在二教复习的人加上复习地址的类
 */
public class StuInfo {
    private String stuNum;
    private String stuName;
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

    public String getReviewAddress() {
        return reviewAddress;
    }

    public void setReviewAddress(String reviewAddress) {
        this.reviewAddress = reviewAddress;
    }

    @Override
    public String toString() {
        return "StuInfo{" +
                "stuNum='" + stuNum + '\'' +
                ", stuName='" + stuName + '\'' +
                ", reviewAddress='" + reviewAddress + '\'' +
                '}';
    }
}
