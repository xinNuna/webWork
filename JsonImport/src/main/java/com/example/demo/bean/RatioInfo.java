package com.example.demo.bean;

/**
 * 考研率
 */
public class RatioInfo {
    private String professional;
    private double rate;

    public String getProfessional() {
        return professional;
    }

    public void setProfessional(String professional) {
        this.professional = professional;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    @Override
    public String toString() {
        return "RatioInfo{" +
                "professional='" + professional + '\'' +
                ", rate='" + rate + '\'' +
                '}';
    }
}
