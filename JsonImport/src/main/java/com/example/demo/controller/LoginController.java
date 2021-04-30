package com.example.demo.controller;

import com.example.demo.bean.Result;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    //将Service注入Web层
    @Autowired
    LoginService loginService;

    @PostMapping("/register")
    Result register(String username, String password) {
        return loginService.register(username, password);
    }

    @PostMapping("/login")
    Result login(String username, String password) {
        return loginService.login(username, password);
    }
}
