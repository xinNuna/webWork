package com.example.demo.serviceImpl;

import com.example.demo.bean.Result;
import com.example.demo.dao.ImportDao;
import com.example.demo.service.ImportService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImportServiceImpl implements ImportService {
    @Autowired
    private ImportDao importDao;

    @Override
    public Result dataImport(String excelData) throws Exception {
        Result result = new Result();

        //转成JsonObject对象
        JSONObject jsonObject = JSONObject.fromObject(excelData);
        //取出data数据头的数组
        JSONArray jsonArray = jsonObject.getJSONArray("data");
        //遍历数组
        for (int i = 1; i < jsonArray.size(); i++) {

            //取出数组{}中的值,转成jsonObject对象
            String data = jsonArray.getString(i);
            JSONObject jsonObject1 = JSONObject.fromObject(data);
            //调用赋值
            String stuName = jsonObject1.get("__EMPTY_2").toString();
            String stuClass = jsonObject1.get("__EMPTY_3").toString();
            String stuNum = jsonObject1.get("__EMPTY_1").toString();
            String stuMajor = jsonObject1.get("__EMPTY_4").toString();
            String buildingNum = jsonObject1.get("基本信息").toString();
            String roomNum = jsonObject1.get("__EMPTY").toString();
            importDao.dataImport(buildingNum, roomNum, stuNum, stuName, stuClass, stuMajor);

        }
        return result;
    }

    @Override
    public Result addressImport(String excelData) throws Exception {
        Result result1 = new Result();

        //转成JsonObject对象
        JSONObject jsonObject1 = JSONObject.fromObject(excelData);
        //取出data数据头的数组
        JSONArray jsonArray = jsonObject1.getJSONArray("data");
        //遍历数组
        for (int i = 1; i < jsonArray.size(); i++) {

            //取出数组{}中的值,转成jsonObject对象
            String data = jsonArray.getString(i);
            JSONObject jsonObject2 = JSONObject.fromObject(data);
            //调用赋值

            String stuClass = jsonObject2.get("__EMPTY_2").toString();
            String stuNum = jsonObject2.get("基本信息").toString();
            String stuMajor = jsonObject2.get("__EMPTY_1").toString();
            String homeOrSchool = jsonObject2.get("__EMPTY_3").toString();
            String stuName = jsonObject2.get("__EMPTY").toString();
            String reviewAddress = jsonObject2.get("__EMPTY_4").toString();
            importDao.addressImport(stuNum, stuName, stuMajor, stuClass, homeOrSchool, reviewAddress);
        }
        return result1;
    }
}
