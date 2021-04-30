package com.example.demo.service;

import com.example.demo.bean.Result;

public interface LoginService {
    Result register(String username,String password);
    Result login(String username, String password);

}
