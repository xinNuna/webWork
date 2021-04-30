package com.example.demo.bean;

import java.util.ArrayList;

/**
 * 居家视角的集合的类
 */
public class HomeList extends Data {
    private String place;
    private ArrayList<Stu> student_homes;

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public ArrayList<Stu> getStudent_homes() {
        return student_homes;
    }

    public void setStudent_homes(ArrayList<Stu> student_homes) {
        this.student_homes = student_homes;
    }

    @Override
    public String toString() {
        return "HomeList{" +
                "place='" + place + '\'' +
                ", student_homes=" + student_homes +
                '}';
    }
}
