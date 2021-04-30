package com.example.demo.bean;

/**
 * 其他视角json实体类
 * <p>
 * 寝室视角
 * hashmap的key中包括学生信息的实体类
 * <p>
 * 班级视角学生实体类
 */
public class StuOthers {
    private String sno;
    private String name;
    private String address;

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "StuOthers{" +
                "sno='" + sno + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
