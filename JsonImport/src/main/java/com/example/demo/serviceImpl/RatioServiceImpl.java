package com.example.demo.serviceImpl;

import com.example.demo.bean.RatioInfo;
import com.example.demo.bean.RatioList;
import com.example.demo.bean.Result;
import com.example.demo.bean.User;
import com.example.demo.dao.RatioDao;
import com.example.demo.service.RatioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RatioServiceImpl implements RatioService {
    @Autowired
    RatioDao ratioDao;
    Result result = new Result();

    @Override
    public Result gradeRatio() throws Exception {

        RatioList ratioList = new RatioList();
        ArrayList<RatioInfo> arrayList = new ArrayList<>();
        ratioList.setArrayList(arrayList);
        try {
            ArrayList<User> allData = ratioDao.gradeRatioData1();
            ArrayList<User> data = ratioDao.gradeRatioData2();
            if (data.isEmpty()) {
                result.getData().getMeta().setMsg("数据提取失败");
                result.getData().getMeta().setStatus("500");
                return result;
            } else {
                for (int i = 0; i < allData.size(); i++) {
                    for (int j = 0; j < data.size(); j++) {
                        RatioInfo ratioInfo = new RatioInfo();
                        if (allData.get(i).getStuMajor().equals(data.get(j).getStuMajor())) {

                            ratioInfo.setProfessional(allData.get(i).getStuMajor());
                            double data1 = Double.parseDouble(data.get(j).getCount());
                            double allData1 = Double.parseDouble(allData.get(i).getCount());
                            ratioInfo.setRate(data1 / allData1);
                            // System.out.println( data1/allData1);
                            arrayList.add(ratioInfo);
                            data.remove(j);
                            j--;
                        }

                    }

                }

                ratioList.getMeta().setStatus("200");
                ratioList.getMeta().setMsg("数据提取成功");
                System.out.println(ratioList);
                result.setData(ratioList);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
