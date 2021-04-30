package com.example.demo.bean;

/**
 * json数据实体类
 */
public class Data {
    //父类的protected成员是包内可见的，并且对子类可见
    private Meta meta = new Meta();

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }


}
