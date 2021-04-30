package com.example.demo.bean;

import java.util.HashMap;

/**
 * 其他视角的json集合类
 */
public class StuOthersMap extends Data {
    private String classroom;
    private HashMap<String, StuOthersLIst> hashMap;

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public HashMap<String, StuOthersLIst> getHashMap() {
        return hashMap;
    }

    public void setHashMap(HashMap<String, StuOthersLIst> hashMap) {
        this.hashMap = hashMap;
    }

    @Override
    public String toString() {
        return "StuOthersMap{" +
                "classroom='" + classroom + '\'' +
                ", hashMap=" + hashMap +
                '}';
    }
}
