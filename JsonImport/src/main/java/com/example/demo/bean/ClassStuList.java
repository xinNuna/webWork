package com.example.demo.bean;

import java.util.ArrayList;

/**
 * 班级视角
 * hashMap的v的学生信息的实体类
 */
public class ClassStuList {
    private ArrayList<StuOthers> addressArrayList;

    public ArrayList<StuOthers> getAddressArrayList() {
        return addressArrayList;
    }

    public void setAddressArrayList(ArrayList<StuOthers> addressArrayList) {
        this.addressArrayList = addressArrayList;
    }

    @Override
    public String toString() {
        return "ClassStuList{" +
                "addressArrayList=" + addressArrayList +
                '}';
    }
}
