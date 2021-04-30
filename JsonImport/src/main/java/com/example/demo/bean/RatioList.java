package com.example.demo.bean;

import java.util.ArrayList;

public class RatioList extends Data {
    private ArrayList<RatioInfo> arrayList;

    public ArrayList<RatioInfo> getArrayList() {
        return arrayList;
    }

    public void setArrayList(ArrayList<RatioInfo> arrayList) {
        this.arrayList = arrayList;
    }

    @Override
    public String toString() {
        return "RatioList{" +
                "arrayList=" + arrayList +
                '}';
    }
}
