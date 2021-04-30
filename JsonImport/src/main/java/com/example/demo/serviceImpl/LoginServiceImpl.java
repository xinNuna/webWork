package com.example.demo.serviceImpl;

import com.example.demo.bean.LoginUser;
import com.example.demo.bean.Result;
import com.example.demo.dao.LoginDao;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = RuntimeException.class)
@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginDao loginDao;

    @Override
    public Result register(String username, String password) {
        Result result = new Result();
        LoginUser user = new LoginUser();
        user.setUsername(username);
        user.setPassword(password);
        try {
            //先检查该用户是否被注册过
            LoginUser user2 = loginDao.login(username, password);
            if (user2 != null) {
                result.getData().getMeta().setMsg("该用户已被创建");
                result.getData().getMeta().setStatus("400");
                return result;
            }
            //没被创建过就注册
            loginDao.register(user);
            result.getData().getMeta().setMsg("注册成功");
            result.getData().getMeta().setStatus("200");
        } catch (Exception e) {
            e.printStackTrace();
            result.getData().getMeta().setMsg(e.getMessage());
            result.getData().getMeta().setStatus("400");
        }
        return result;
    }

    @Override
    public Result login(String username, String password) {
        Result result = new Result();
        LoginUser user;
        try {
            user = loginDao.login(username, password);
            if (user == null) {
                result.getData().getMeta().setMsg("用户名或者密码错误");
                result.getData().getMeta().setStatus("400");
                return result;
            }
            result.getData().getMeta().setMsg("登录成功");
            result.getData().getMeta().setStatus("200");
        } catch (Exception e) {
            e.printStackTrace();
            result.getData().getMeta().setMsg(e.getMessage());
            result.getData().getMeta().setStatus("400");
        }
        return result;
    }

}
