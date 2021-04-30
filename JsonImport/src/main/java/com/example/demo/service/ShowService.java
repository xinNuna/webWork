package com.example.demo.service;

import com.example.demo.bean.Result;

public interface ShowService {
    Result showNum2Data(String number) throws Exception;

    Result showHomeData() throws Exception;

    Result showOthersData() throws Exception;

    Result dormData() throws Exception;

    Result addressData() throws Exception;
}
