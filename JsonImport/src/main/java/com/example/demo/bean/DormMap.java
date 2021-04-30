package com.example.demo.bean;


import java.util.HashMap;

/**
 * 寝室视角
 * 每个楼栋的map类
 */
public class DormMap {
    private String department;
    private HashMap<String, StuOthersLIst> hashMap;

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public HashMap<String, StuOthersLIst> getHashMap() {
        return hashMap;
    }

    public void setHashMap(HashMap<String, StuOthersLIst> hashMap) {
        this.hashMap = hashMap;
    }

    @Override
    public String toString() {
        return "DormArrayList{" +
                "department='" + department + '\'' +
                ", hashMap=" + hashMap +
                '}';
    }
}
