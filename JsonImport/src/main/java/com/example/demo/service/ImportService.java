package com.example.demo.service;

import com.example.demo.bean.Result;


public interface ImportService {
    Result dataImport(String excelData) throws Exception;

    Result addressImport(String excelData) throws Exception;
}
