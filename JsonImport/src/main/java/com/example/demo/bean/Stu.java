package com.example.demo.bean;

/**
 * 在复习的 arrayList集合数组里的学生信息
 */
public class Stu {
    private String name;
    private String sno;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    @Override
    public String toString() {
        return "{" +
                "\"sno\":\"" + sno + '\"' +
                ", \"name\":\"" + name + '\"' +
                '}';
    }
}
