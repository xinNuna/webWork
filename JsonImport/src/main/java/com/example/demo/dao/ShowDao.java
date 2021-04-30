package com.example.demo.dao;

import com.example.demo.bean.ClassInfo;
import com.example.demo.bean.StuInfo;
import com.example.demo.bean.StuRoomInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Mapper
@Repository
public interface ShowDao {
    /**
     * 筛选数据库中复习地址中第一个字为2/4的  ==》在2、4教复习
     *
     * @param number
     * @return
     */
    @Select("select stuName,stuNum,reviewAddress from reviewAddress where reviewAddress like concat(#{number},'%') ")
    ArrayList<StuInfo> showNum2Data(@Param("number") String number);

    /**
     * 筛选数据库中复习地址中 居家 ==》在家复习
     *
     * @return
     */
    @Select("select stuName,stuNum,reviewAddress from reviewAddress where reviewAddress like '居家' ")
    ArrayList<StuInfo> showHomeData();

    /**
     * 不在2，4教和家里复习的人
     *
     * @return
     */
    @Select("select stuName,stuNum,reviewAddress from reviewAddress where reviewAddress " +
            "not like '居家' and reviewAddress not like '2%' and reviewAddress not like '4%' ")
    ArrayList<StuInfo> showOthersData();

    /**
     * 寝室视角
     * 通过user的stuNum查找reviewAddress中其考研复习地点
     *
     * @return
     */
    @Select("select `user`.stuName,`user`.buildingNum,`user`.roomNum,`user`.stuNum," +
            "reviewAddress.reviewAddress from `user`,reviewAddress WHERE `user`.stuNum=reviewAddress.stuNum")
    ArrayList<StuRoomInfo> showDormData();


    /**
     * 班级视角
     *
     * @return
     */
    @Select("select `user`.stuName,`user`.stuMajor,`user`.stuClass,`user`.stuNum," +
            "reviewAddress.reviewAddress from `user`,reviewAddress WHERE `user`.stuNum=reviewAddress.stuNum")
    ArrayList<ClassInfo> showClassData();


}

