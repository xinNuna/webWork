package com.example.demo.bean;

import java.util.HashMap;

/**
 * 班级视角
 * 大数组中每一个元素是一个hashMap的实体类
 */
public class ClassMap {
    private String professional;
    private HashMap<String, ClassStuList> hashMap;

    public String getProfessional() {
        return professional;
    }

    public void setProfessional(String professional) {
        this.professional = professional;
    }

    public HashMap<String, ClassStuList> getHashMap() {
        return hashMap;
    }

    public void setHashMap(HashMap<String, ClassStuList> hashMap) {
        this.hashMap = hashMap;
    }

    @Override
    public String toString() {
        return "ClassMap{" +
                "professional='" + professional + '\'' +
                ", hashMap=" + hashMap +
                '}';
    }
}
