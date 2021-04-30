package com.example.demo.bean;

/**
 * 显示2/4教复习学生信息
 * 装arraylist==>v
 * 复习地址==>k
 */


public class StuInfoMap extends Data {

    private String classroom;

    private StuHashMap<String, RAInfoList> hashMap = new StuHashMap<>();

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public StuHashMap<String, RAInfoList> getHashMap() {
        return hashMap;
    }

    public void setHashMap(StuHashMap<String, RAInfoList> hashMap) {
        this.hashMap = hashMap;
    }

    @Override
    public String toString() {
        return "\"hashMap\":" + hashMap;
    }
}
