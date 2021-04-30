package com.example.demo.bean;

public class StuRoomInfo extends StuInfo {
    private String stuName;
    private String stuNum;
    private String reviewAddress;
    private String roomNum;
    private String BuildingNum;

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }

    public String getBuildingNum() {
        return BuildingNum;
    }

    public void setBuildingNum(String buildingNum) {
        BuildingNum = buildingNum;
    }

    @Override
    public String getStuName() {
        return stuName;
    }

    @Override
    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    @Override
    public String getStuNum() {
        return stuNum;
    }

    @Override
    public void setStuNum(String stuNum) {
        this.stuNum = stuNum;
    }

    @Override
    public String getReviewAddress() {
        return reviewAddress;
    }

    @Override
    public void setReviewAddress(String reviewAddress) {
        this.reviewAddress = reviewAddress;
    }

    @Override
    public String toString() {
        return "StuRoomInfo{" +
                "stuName='" + stuName + '\'' +
                ", stuNum='" + stuNum + '\'' +
                ", reviewAddress='" + reviewAddress + '\'' +
                ", roomNum='" + roomNum + '\'' +
                ", BuildingNum='" + BuildingNum + '\'' +
                '}';
    }
}
