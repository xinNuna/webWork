package com.example.demo.bean;

/**
 * 固定result格式
 */
public class Result {
    private Data data = new Data();

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "{" + data +
                '}';
    }
}
