package com.example.demo.controller;


import com.example.demo.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


/**
 * 导入excel文件
 */
@RestController
public class ImportController {
    @Autowired
    private ImportService importService;

    /**
     * 复习地点
     *
     * @param excelData
     * @return
     * @throws Exception
     */
    @PostMapping(path = "/importDep")
    public String excelImport(@RequestBody String excelData) throws Exception {
        importService.dataImport(excelData);
        String result = excelData;
        if (result == null) {
            return "fail";
        } else {
            return "success";
        }

    }

    /**
     * 学生基本信息
     *
     * @param excelData
     * @return
     * @throws Exception
     */
    @PostMapping(path = "/import")
    public String excelAddressImport(@RequestBody String excelData) throws Exception {
        importService.addressImport(excelData);
        String result = excelData;
        if (result == null) {
            return "fail";
        } else {
            return "success";
        }
    }
}