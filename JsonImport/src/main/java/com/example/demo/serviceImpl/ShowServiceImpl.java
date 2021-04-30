package com.example.demo.serviceImpl;

import com.example.demo.bean.*;
import com.example.demo.dao.ShowDao;
import com.example.demo.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;


@Service
public class ShowServiceImpl implements ShowService {
    @Autowired
    private ShowDao showDao;
    Result result = new Result();

    /**
     * 展示2、4教视角复习学生信息
     *
     * @param number
     * @return
     * @throws Exception
     */
    @Override
    public Result showNum2Data(String number) throws Exception {
        StuHashMap<String, RAInfoList> hashMap = new StuHashMap<>();
        StuInfoMap stuInfoMap = new StuInfoMap();
        try {
            //从dao层提取数据，存入arraylist
            ArrayList<StuInfo> stuInfoArrayList = showDao.showNum2Data(number);
            if (stuInfoArrayList.isEmpty()) {
                result.getData().getMeta().setMsg("读取失败");
                result.getData().getMeta().setStatus("500");
                return result;
            } else {
                //外层遍历集合，从第一个开始依次取出
                for (int i = 0; i < stuInfoArrayList.size(); i++) {
                    //实例化一个专门用来存储stuName和stuNum的集合,因为有很多个教室的数组，循环依次，实例化一个
                    ArrayList<Stu> stuList = new ArrayList<>();
                    //数组里有很多对象，循环一次，实例化一个对象，再用当前对象设置信息
                    Stu stu = new Stu();
                    //并将其值赋给stu
                    stu.setName(stuInfoArrayList.get(i).getStuName());
                    stu.setSno(stuInfoArrayList.get(i).getStuNum());
                    //将第一个存入集合
                    stuList.add(stu);
                    for (int j = i + 1; j < stuInfoArrayList.size(); j++) {
                        Stu stu1 = new Stu();
                        //将外层循环取出的值依次与集合中的其他元素的复习地址做比较
                        if (stuInfoArrayList.get(i).getReviewAddress()
                                .equals(stuInfoArrayList.get(j).getReviewAddress())) {
                            //如果相等则将其存入和外层取出的元素同一个集合
                            stu1.setName(stuInfoArrayList.get(j).getStuName());
                            stu1.setSno(stuInfoArrayList.get(j).getStuNum());
                            stuList.add(stu1);
                            //将存入集合的数删除，防止重复比较
                            stuInfoArrayList.remove(j);
                            //删除之后集合长度减一，将自增的j值减一，确保每个数都能被比较
                            j--;
                        }
                    }
                    RAInfoList raInfoList = new RAInfoList();
                    //实例化一个包装集合的类，并设置
                    raInfoList.setArrayList(stuList);
                    hashMap.put(stuInfoArrayList.get(i).getReviewAddress(), raInfoList);
                }
                stuInfoMap.getMeta().setMsg("成功选取");
                stuInfoMap.getMeta().setStatus("200");
                stuInfoMap.setClassroom("2教");
                stuInfoMap.setHashMap(hashMap);
                //StuInfoMap继承了Data
                result.setData(stuInfoMap);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 展示居家视角学生复习信息
     *
     * @return
     * @throws Exception
     */
    @Override
    public Result showHomeData() throws Exception {
        //用来存最后返回json信息的集合
        ArrayList<Stu> stuList = new ArrayList<>();
        try {
            //将从数据库读取到的信息直接存入集合
            ArrayList<StuInfo> stuInfoArrayList = showDao.showHomeData();
            if (stuInfoArrayList.isEmpty()) {
                result.getData().getMeta().setMsg("读取失败");
                result.getData().getMeta().setStatus("500");
                return result;
            } else {
                //外层循环将每次取到的学生的信息存入集合
                for (int i = 0; i < stuInfoArrayList.size(); i++) {
                    Stu stu = new Stu();
                    stu.setName(stuInfoArrayList.get(i).getStuName());
                    stu.setSno(stuInfoArrayList.get(i).getStuNum());
                    stuList.add(stu);
                }
                //设置数据头
                HomeList homeList = new HomeList();
                homeList.setPlace("居家");
                homeList.setStudent_homes(stuList);
                homeList.getMeta().setStatus("200");
                homeList.getMeta().setMsg("成功选取");
                result.setData(homeList);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 展示其他视角学生复习信息
     *
     * @return
     * @throws Exception
     */
    @Override
    public Result showOthersData() throws Exception {
        //用来存json数据头hashmap，复习地址为k，学生信息集合为v
        HashMap<String, StuOthersLIst> hashMap = new HashMap<>();
        //实例化集合类
        StuOthersMap stuOthersMap = new StuOthersMap();
        try {
            //用集合来装从数据库查到的信息
            ArrayList<StuInfo> stuInfoArrayList = showDao.showOthersData();
            if (stuInfoArrayList.isEmpty()) {
                result.getData().getMeta().setMsg("读取失败");
                result.getData().getMeta().setStatus("500");
                return result;
            } else {
                //外层循环将每次取到的第一个学生信息
                for (int i = 0; i < stuInfoArrayList.size(); i++) {
                    //每循环一个创建一个新的集合去装不同复习地址的人
                    ArrayList<StuOthers> arrayList = new ArrayList<>();
                    StuOthers stuOthers = new StuOthers();
                    //设置信息
                    stuOthers.setName(stuInfoArrayList.get(i).getStuName());
                    stuOthers.setSno(stuInfoArrayList.get(i).getStuNum());
                    arrayList.add(stuOthers);
                    //因为前面从第一个开始取，每取一个就将所有与其复习地址相同的学生信息从集合中移除，所以在取到这个元素之前不可能会有与其相同的
                    //所以j从i+1开始
                    for (int j = i + 1; j < stuInfoArrayList.size(); j++) {
                        StuOthers stuOthers1 = new StuOthers();
                        //内层循环将外层取到的学生信息的复习地址与在他之后的每一个进行比较
                        if (stuInfoArrayList.get(i).getReviewAddress()
                                .equals(stuInfoArrayList.get(j).getReviewAddress())) {
                            stuOthers1.setSno(stuInfoArrayList.get(j).getStuNum());
                            stuOthers1.setName(stuInfoArrayList.get(j).getStuName());
                            arrayList.add(stuOthers1);
                            //防止重复比较，相同则将其移除集合
                            stuInfoArrayList.remove(j);
                            //删除之后集合长度减一，将自增的j值减一，确保每个数都能被比较
                            j--;
                        }
                    }
                    StuOthersLIst stuOthersLIst = new StuOthersLIst();
                    stuOthersLIst.setArrayList(arrayList);
                    hashMap.put(stuInfoArrayList.get(i).getReviewAddress(), stuOthersLIst);
                }
                stuOthersMap.setHashMap(hashMap);
                stuOthersMap.getMeta().setMsg("成功选取");
                stuOthersMap.getMeta().setStatus("200");
                result.setData(stuOthersMap);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


    /**
     * 寝室视角的考研数据
     *
     * @return
     * @throws Exception
     */
    @Override
    public Result dormData() throws Exception {
        try {
            ArrayList<StuRoomInfo> stuRoomInfos = showDao.showDormData();
            if (stuRoomInfos.isEmpty()) {
                result.getData().getMeta().setMsg("读取失败");
                result.getData().getMeta().setStatus("500");
            } else {
                //实例化一个大数组，每一个元素里装department和hashmap
                DormList dormList = new DormList();
                dormList.setCollege("先进制造学院");
                ArrayList<DormMap> arrayLists = new ArrayList<>();
                dormList.setArrayList(arrayLists);
                for (int i = 0; i < stuRoomInfos.size(); i++) {
                    //外层循环一次实例化一个新的楼栋集合
                    ArrayList<StuRoomInfo> list = new ArrayList<>();
                    //将第一个学生对象直接装入集合中
                    list.add(stuRoomInfos.get(i));
                    //一个楼栋一个集合
                    HashMap<String, StuOthersLIst> roomMap = new HashMap<>();
                    //实例化其中一个楼栋的map对象
                    DormMap dorm = new DormMap();
                    //设置楼栋
                    dorm.setDepartment(stuRoomInfos.get(i).getBuildingNum());

                    for (int j = i + 1; j < stuRoomInfos.size(); j++) {
                        //将集合里的第一个学生的楼栋与后面的每一个依次比较，不一样的放入新实例化的楼栋集合中
                        if (stuRoomInfos.get(i).getBuildingNum().equals(stuRoomInfos.get(j).getBuildingNum())) {

                            list.add(stuRoomInfos.get(j));
                            //在老数组中移除数据
                            stuRoomInfos.remove(j);
                            //回退一次，回到上一个楼栋不同的学生序号上
                            j--;
                        }
                    }

                    //=========================================================
                    //现在已经分成了三个不同楼栋的集合的其中一个

                    //房间号匹配
                    for (int k = 0; k < list.size(); k++) {
                        //实例化一个map，map的k是房间号，v是装有学生信息数组的对象
                        ArrayList<StuOthers> stuInfo = new ArrayList<>();
                        StuOthers stu = new StuOthers();
                        stu.setName(list.get(k).getStuName());
                        stu.setSno(list.get(k).getStuNum());
                        stu.setAddress(list.get(k).getReviewAddress());
                        stuInfo.add(stu);
                        StuOthersLIst stuList = new StuOthersLIst();
                        stuList.setArrayList(stuInfo);
                        //比较宿舍房间号
                        for (int l = k + 1; l < list.size(); l++) {
                            StuOthers stu1 = new StuOthers();
                            if (list.get(k).getRoomNum().equals(list.get(l).getRoomNum())) {
                                stu1.setSno(list.get(l).getStuNum());
                                stu1.setName(list.get(l).getStuName());
                                stu1.setAddress(list.get(l).getReviewAddress());
                                stuInfo.add(stu1);
                                list.remove(l);
                                l--;
                            }
                        }
                        roomMap.put(list.get(k).getRoomNum(), stuList);
                    }
                    dorm.setHashMap(roomMap);
                    arrayLists.add(dorm);

                }
                dormList.getMeta().setMsg("成功选取");
                dormList.getMeta().setStatus("200");
                result.setData(dormList);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 班级视角的考研数据
     *
     * @return
     * @throws Exception
     */
    @Override
    public Result addressData() throws Exception {
        try {
            ArrayList<ClassInfo> data = showDao.showClassData();
            System.out.println(data);
            if (data.isEmpty()) {
                result.getData().getMeta().setMsg("读取失败");
                result.getData().getMeta().setStatus("500");
                return result;
            } else {
                //实例化一个大数组，每一个元素里装professional和hashmap
                ClassList classList = new ClassList();
                classList.setCollege("先进制造考研学生");
                ArrayList<ClassMap> arrayLists = new ArrayList<>();
                classList.setAddressMaps(arrayLists);
                for (int i = 0; i < data.size(); i++) {
                    //外层循环一次实例化一个新的专业集合
                    ArrayList<ClassInfo> list = new ArrayList<>();
                    //将第一个学生对象直接装入集合中
                    list.add(data.get(i));
                    //一个专业一个集合
                    HashMap<String, ClassStuList> roomMap = new HashMap<>();
                    //实例化其中一个专业的map对象
                    ClassMap classMap = new ClassMap();
                    //设置专业
                    classMap.setProfessional(data.get(i).getStuMajor());

                    for (int j = i + 1; j < data.size(); j++) {
                        //将集合里的第一个学生的专业与后面的每一个依次比较，不一样的放入新专业实例化的集合中
                        if (data.get(i).getStuMajor().equals(data.get(j).getStuMajor())) {

                            list.add(data.get(j));
                            //在老数组中移除数据
                            data.remove(j);
                            //回退一次，回到上一个楼栋不同的学生序号上
                            j--;
                        }
                    }
                    //========================================================
                    //现在已经分成了三个不同专业的集合
                    // 到此为其中的一个

                    //班级匹配
                    for (int k = 0; k < list.size(); k++) {
                        //实例化一个map，map的k是班级号，v是装有学生信息数组的对象
                        ArrayList<StuOthers> stuInfo = new ArrayList<>();
                        StuOthers stu = new StuOthers();
                        stu.setName(list.get(k).getStuName());
                        stu.setSno(list.get(k).getStuNum());
                        stu.setAddress(list.get(k).getReviewAddress());
                        stuInfo.add(stu);
                        ClassStuList stuList = new ClassStuList();
                        stuList.setAddressArrayList(stuInfo);
                        //比较班级编号
                        for (int l = k + 1; l < list.size(); l++) {
                            StuOthers stu1 = new StuOthers();
                            if (list.get(k).getStuClass().equals(list.get(l).getStuClass())) {
                                stu1.setSno(list.get(l).getStuNum());
                                stu1.setName(list.get(l).getStuName());
                                stu1.setAddress(list.get(l).getReviewAddress());
                                stuInfo.add(stu1);
                                list.remove(l);
                                l--;
                            }
                        }
                        roomMap.put(list.get(k).getStuClass(), stuList);
                    }
                    classMap.setHashMap(roomMap);
                    arrayLists.add(classMap);

                }
                classList.getMeta().setMsg("提取数据成功");
                classList.getMeta().setStatus("200");
                result.setData(classList);

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}

