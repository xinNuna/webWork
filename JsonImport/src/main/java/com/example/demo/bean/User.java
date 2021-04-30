package com.example.demo.bean;

/**
 * 考研率实体类
 */

public class User {


    //    private String buildingNum;
//    private String roomNum;
//    private String stuNum;
//    private String stuName;
//    private String stuClass;
    private String stuMajor;
    private String count;


//    public String getBuildingNum() {
//        return buildingNum;
//    }
//
//    public void setBuildingNum(String buildingNum) {
//        this.buildingNum = buildingNum;
//    }
//
//    public String getRoomNum() {
//        return roomNum;
//    }
//
//    public void setRoomNum(String roomNum) {
//        this.roomNum = roomNum;
//    }
//
//    public String getStuNum() {
//        return stuNum;
//    }
//
//    public void setStuNum(String stuNum) {
//        this.stuNum = stuNum;
//    }
//
//    public String getStuName() {
//        return stuName;
//    }
//
//    public void setStuName(String stuName) {
//        this.stuName = stuName;
//    }
//
//    public String getStuClass() {
//        return stuClass;
//    }
//
//    public void setStuClass(String stuClass) {
//        this.stuClass = stuClass;
//    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getStuMajor() {
        return stuMajor;
    }

    public void setStuMajor(String stuMajor) {
        this.stuMajor = stuMajor;
    }

    @Override
    public String toString() {
        return "User{" +
                "stuMajor='" + stuMajor + '\'' +
                ", count='" + count + '\'' +
                '}';
    }
}
