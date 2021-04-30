package com.example.demo.dao;

import com.example.demo.bean.LoginUser;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface LoginDao {

    @Insert("insert into LoginUser(username,password) values(#{username},#{password})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void register(LoginUser user);

    @Select("select * from LoginUser where username=#{username} and password=#{password}")
            LoginUser login(@Param("username")String username,@Param("password")String password);


}
