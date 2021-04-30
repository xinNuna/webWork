package com.example.demo.controller;

import com.example.demo.bean.Result;
import com.example.demo.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ShowController {
    @Autowired
    ShowService showService;

    @GetMapping("/showbuliding")
    public Result numBuilding(String number) throws Exception {
        return showService.showNum2Data(number);
    }

    @GetMapping("/home")
    public Result StayHome() throws Exception {
        return showService.showHomeData();
    }

    @GetMapping("/showOthers")
    public Result stayOthers() throws Exception {
        return showService.showOthersData();
    }

    @GetMapping("/dom")
    public Result dorm() throws Exception {
        return showService.dormData();
    }

    @GetMapping("address")
    public Result address() throws Exception {
        return showService.addressData();
    }

}
