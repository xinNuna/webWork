package com.example.demo.bean;
/**
 * 显示2/4教复习学生信息
 * 包装arrayList的类使其变成一个类
 */

import java.util.ArrayList;

public class RAInfoList {
    private ArrayList<Stu> arrayList = new ArrayList<>();

    public ArrayList<Stu> getArrayList() {
        return arrayList;
    }

    public void setArrayList(ArrayList<Stu> arrayList) {
        this.arrayList = arrayList;
    }

    @Override
    public String toString() {
        return "{" +
                "\"arrayList\":" + arrayList +
                '}';
    }
}
