package com.example.demo.bean;

/**
 * 返回网页状态码
 */
public class Meta {
    private String status;

    private String msg;

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return this.msg;
    }

    @Override
    public String toString() {
        return "{" +
                "\"status\":\"" + status + '\"' +
                ", \"msg\":\"" + msg + '\"' +
                '}';
    }
}
