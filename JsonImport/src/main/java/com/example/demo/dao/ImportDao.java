package com.example.demo.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


@Mapper
@Repository
public interface ImportDao {
    /**
     * 录入数据库
     *
     * @return
     */
    @Insert("insert into user(buildingNum,roomNum,stuNum,stuName,stuClass,stuMajor) values(#{buildingNum}," +
            "#{roomNum},#{stuNum},#{stuName},#{stuClass},#{stuMajor})")
    @Options(useGeneratedKeys = true)
    void dataImport(@Param("buildingNum") String buildingNum, @Param("roomNum") String roomNum,
                    @Param("stuNum") String stuNum, @Param("stuName") String stuName,
                    @Param("stuClass") String stuClass, @Param("stuMajor") String stuMajor);

    /**
     * 录入数据库
     *
     * @return
     */
    @Insert("insert into reviewAddress(stuNum,stuName,stuMajor,stuClass,homeOrSchool,reviewAddress) values(#{stuNum}," +
            "#{stuName},#{stuMajor},#{stuClass},#{homeOrSchool},#{reviewAddress})")

    @Options(useGeneratedKeys = true)
    void addressImport(@Param("stuNum") String stuNum,
                       @Param("stuName") String stuName, @Param("stuMajor") String stuMajor,
                       @Param("stuClass") String stuClass, @Param("homeOrSchool") String homeOrSchool,
                       @Param("reviewAddress") String reviewAddress);

}
