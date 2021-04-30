package com.example.demo.bean;

import java.util.ArrayList;

/**
 * 班级视角
 * 最外层的大数组实体类
 */
public class ClassList extends Data {
    private String college;
    private ArrayList<ClassMap> addressMaps;

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public ArrayList<ClassMap> getAddressMaps() {
        return addressMaps;
    }

    public void setAddressMaps(ArrayList<ClassMap> addressMaps) {
        this.addressMaps = addressMaps;
    }

    @Override
    public String toString() {
        return "ClassList{" +
                "college='" + college + '\'' +
                ", addressMaps=" + addressMaps +
                '}';
    }
}
