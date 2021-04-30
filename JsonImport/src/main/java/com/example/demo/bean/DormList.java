package com.example.demo.bean;

import java.util.ArrayList;

/**
 * 寝室视角
 * 最外层大数组的类
 */
public class DormList extends Data {
    private String college;
    private ArrayList<DormMap> arrayList;

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public ArrayList<DormMap> getArrayList() {
        return arrayList;
    }

    public void setArrayList(ArrayList<DormMap> arrayList) {
        this.arrayList = arrayList;
    }

    @Override
    public String toString() {
        return "DormList{" +
                "college='" + college + '\'' +
                ", arrayList=" + arrayList +
                '}';
    }
}
