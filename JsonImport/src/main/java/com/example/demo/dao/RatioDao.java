package com.example.demo.dao;

import com.example.demo.bean.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface RatioDao {
    @Select("select stuMajor,count(stuNum) as count  from `user` group by stuMajor")
    ArrayList<User> gradeRatioData1();

    @Select("select stuMajor,count(stuNum) as count from reviewaddress group by stuMajor")
    ArrayList<User> gradeRatioData2();


}
