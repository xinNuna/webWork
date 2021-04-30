package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 主页
 */
@Controller
public class IndexController {
    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/login.html")
    public String login() {
        return "login.html";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

}
