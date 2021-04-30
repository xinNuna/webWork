$(function() {

    var outIndex = 0;
    var innerIndex = 0;

    let list_erjiao = [];
    let list_sijiao = [];
    let list_class = [];
    let list_dom = [];
    let list_home = [];
    let list_other = [];

    let links_erjiao = [];
    let links_sijiao = [];
    let links_class = [];
    let links_dom = [];
    let links_home = [];
    let links_other = [];

    let series_pro = [];
    let classRate_xAxis = [];
    let classRate_xData = [];
    let classRatepieData = [];
    let domRateData = [];

    let legend = [];
    let categories = [];
    let colors = [{
        c1: "#00c7ef",
        c2: "#0AF3FF"
    }, {
        c1: "#FF8E14",
        c2: "#FFA12F"
    }, {
        c1: "#AF5AFF",
        c2: "#B62AFF"
    }, {
        c1: "#25dd59",
        c2: "#29f463"
    }, {
        c1: "#6E35FF",
        c2: "#6E67FF"
    }, {
        c1: "#002AFF",
        c2: "#0048FF"
    }, {
        c1: "#8CD282",
        c2: "#95F300"
    }, {
        c1: "#3B0EFF",
        c2: "#604BFF"
    }, {
        c1: "#00BE74",
        c2: "#04FDB8"
    }, {
        c1: "#4a3ac6",
        c2: "#604BFF"
    }];
    let legendColor = colors.map(item => item.c2);
    let flag_class = true;
    let class_key = [];
    let flag_dom = true;

    let loginRole = "";
    let loginText = "";
    let loginUrl = "";

    axios.defaults.baseURL = 'http://localhost:8887';

    // tab栏
    $(".items").children(".item").click(function() {
        $(this).addClass("current").siblings().removeClass('current');
        outIndex = $(this).index();
        // 不均
        innerIndex = innerIndex == 0 ? 0 : innerIndex;
        innerIndex = innerIndex > $(this).children("li").length - 1 ? 0 : innerIndex;
        $(".mainContain").children().eq(outIndex).show().siblings().hide();
    });

    // 查询 写在tab后
    $(".queryData").on({
        'click': function() {
            screen(outIndex, innerIndex);
        }
    })
    $(".aroundMe").on({
        'click': function() {
            screen(outIndex, innerIndex);
        }
    })

    // 子列
    $(".pos,.rate,.aroundMe").on({
        mouseover: function() {
            $(this).children().stop().slideDown("normal");
        },
        mouseleave: function() {
            $(this).children().stop().slideUp("normal");
        },
        click: function() {
            screen(outIndex, innerIndex);
        }
    });

    // 子项
    $(".pos-view,.rate-view,.aroundMe-view").children("li").on({
        mouseover: function() {
            $(this).addClass("active").siblings().removeClass('active');
        },
        mouseleave: function() {
            $(this).removeClass('active');
        },
        click: function(event) {
            event.stopPropagation();
            outIndex = $(this).parent().parent().index();
            innerIndex = $(this).index();
            $(this).parent().parent().addClass("current").siblings().removeClass("current");
            $(this).parent().hide();
            $(".mainContain").children().eq(outIndex).show().siblings().hide();
            screen(outIndex, innerIndex);
        }
    });

    // 切换
    function screen(outIndex, innerIndex) {
        switch (outIndex) {
            case 1:
                $(".position").siblings().hide();
                $(".position").children().eq(innerIndex).show().siblings().hide();
                switch (innerIndex) {
                    case 0:
                        {
                            pos_erjiao();
                            break;
                        }
                    case 1:
                        {
                            pos_sijiao();
                            break;
                        }
                    case 2:
                        {
                            pos_class();
                            break;
                        }
                    case 3:
                        {
                            pos_dom();
                            break;
                        }
                    case 4:
                        {
                            pos_home();
                            break;
                        }
                    case 5:
                        {
                            pos_other();
                            break;
                        }
                    default:
                        break;
                }
                break;
            case 2:
                $(".rates").siblings().hide();
                $(".rates").children().eq(innerIndex).show().siblings().hide();
                switch (innerIndex) {
                    case 0:
                        {
                            rate_pro();
                            break;
                        }
                    case 1:
                        {
                            rate_class();
                            break;
                        }
                    case 2:
                        {
                            rate_dom();
                            break;
                        }
                    default:
                        break;
                }
                break;
            case 3:
                $(".around").siblings().hide();
                $(".around").children().eq(innerIndex).show().siblings().hide();
                if (String(localStorage.getItem('kykshLoginFlag')) == "false" || Boolean(localStorage.getItem('kykshLoginFlag')) == false) {
                    let aroundHtml = template('unLogin', { loginText: "[登录]" });
                    document.querySelector(".around_dom").innerHTML = aroundHtml;
                    document.querySelector(".around_class").innerHTML = aroundHtml;
                    break;
                } else {
                    switch (innerIndex) {
                        case 0:
                            {
                                aroundMe_dom();
                                break;
                            }
                        case 1:
                            {
                                aroundMe_class();
                                break;
                            }
                        default:
                            break;
                    }
                }
                break;
            case 4:
                $(".query").show();
                $(".query").siblings().hide();
                if (String(localStorage.getItem('kykshLoginFlag')) == "false" || Boolean(localStorage.getItem('kykshLoginFlag')) == false) {
                    let queryHtml = template('unLogin', { loginText: "[登录]" });
                    document.querySelector(".query").innerHTML = queryHtml;
                    break;
                }
                let queryOk = template("queryOK", {});
                document.querySelector(".query").innerHTML = "";
                document.querySelector(".query").innerHTML = queryOk;
                $("#query_inp").on({
                    'keyup': function(ev) {
                        if (ev.keyCode == 13) {
                            query_data(ev.target.value);
                        }
                    }
                })
                $("#query_btn").on({
                    'click': function() {
                        query_data($("#query_inp").val());
                    }
                })
                break;
            default:
                break;
        }
    }

    // 我的寝室
    // 显示异常代码
    function aroundMe_dom() {
        let mySno = localStorage.getItem('kykshLoginSno');
        let param = "sno=" + mySno;
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:8887/aroundyourself?' + param);
        xhr.send();
        xhr.onload = function() {
            let res = JSON.parse(xhr.responseText);
            let around_data_dom = res.data.classesAddressList.arrayList;
            let aroundHtml = template("aroundMeDom", { around_data_dom: around_data_dom });
            document.querySelector('.around_dom').innerHTML = aroundHtml;
        }
    }

    // 我的班级
    function aroundMe_class() {
        let mySno = localStorage.getItem('kykshLoginSno');
        let param = "sno=" + mySno;
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:8887/aroundyourself?' + param);
        xhr.send();
        xhr.onload = function() {
            let res = JSON.parse(xhr.responseText);
            let around_data_class = res.data.stu_inforList.arrayList;
            let aroundHtml = template("aroundMeClass", { around_data_class: around_data_class });
            document.querySelector('.around_class').innerHTML = aroundHtml;
            // 有两个aroundBox
            if ($(".aroundBox_class").height() <= $(".aroundBox_class").children("table").height()) {
                $(".aroundBox_class").addClass("scroll-y");
            } else {
                $(".aroundBox_class").removeClass("scroll-y");
            }
        }
    }

    // 班级表格滚动条
    window.onresize = function() {
        if ($(".aroundBox_class").height() <= $(".aroundBox_class").children("table").height()) {
            $(".aroundBox_class").addClass("scroll-y");
        } else {
            $(".aroundBox_class").removeClass("scroll-y");
        }
    }

    // 查询
    function query_data(queryName) {
        // 匹配中文
        let reg = /[\u4e00-\u9fa5]/;
        if (!reg.test(queryName)) {
            alert("请输入正确的姓名！");;
            $("#query_inp").val("");
            return;
        }
        let xhr = new XMLHttpRequest();
        let param = "name=" + queryName;
        xhr.open('get', 'http://localhost:8887/select?' + param);
        xhr.send();
        xhr.onload = function() {
            let res = JSON.parse(xhr.responseText);
            // 不存在
            if (res.data.meta.status == 0) {
                alert("该用户不存在！");
                return;
            }
            let queryData = {
                data: []
            };
            let addresses = res.data.addresses;
            addresses.forEach(value => {
                queryData.data.push(value);
            });
            let queryOk = template("queryOK", { queryName: queryName, queryData: queryData.data });
            document.querySelector(".query").innerHTML = "";
            document.querySelector(".query").innerHTML = queryOk;
            $("#query_inp").on({
                'keyup': function(ev) {
                    if (ev.keyCode == 13) {
                        query_data(ev.target.value);
                    }
                }
            })
            $("#query_btn").on({
                'click': function() {
                    query_data($("#query_inp").val());
                }
            })
        }
    }

    // 登录显示
    function loginDisp() {
        // 未登录
        // 先判断是不是第一次登录
        // 再判断是不是有值
        if (String(localStorage.getItem('kykshLoginFlag')) == "false" || Boolean(localStorage.getItem('kykshLoginFlag')) == false) {
            unLogin();
        }
        // 登录
        if (String(localStorage.getItem('kykshLoginFlag')) == "true") {
            logined();
        }
    }

    // 初始化登录显示
    loginDisp();

    // 登录与注销
    $(".cancle").on({
        'click': function(ev) {
            // ev.preventDefault();
            if (Boolean(localStorage.getItem('kykshLoginFlag')) == true) {
                unLogin();
                location.reload();
                localStorage.setItem('kykshLogin', false);
                localStorage.setItem('kykshLoginClass', false);
            } else {
                logined();
                localStorage.setItem('kykshLoginFlag', true);
            }
        }
    })

    // 未登录
    function unLogin() {
        loginRole = "游客 ";
        loginText = "[登录]";
        loginUrl = "./login.html";
        let loginHtml = template("loginTpl", { loginRole: loginRole, loginText: loginText, loginUrl: loginUrl });
        document.querySelector('.loginStatus').innerHTML = loginHtml;
        localStorage.setItem('kykshLoginFlag', false);
    }

    // 登录
    function logined() {
        loginRole = localStorage.getItem('kykshLogin') + " ";
        loginText = "[注销]";
        loginUrl = "javascript:;";
        let loginHtml = template("loginTpl", { loginRole: loginRole, loginText: loginText, loginUrl: loginUrl });
        document.querySelector('.loginStatus').innerHTML = loginHtml;
    }

    // 二教
    function getErjiaoData(stuData) {
        let data = {
            name: stuData.data.classroom,
            value: 0,
            list: []
        };
        for (key1 in stuData.data.hashMap) {
            let obj = {
                name: key1,
                value: key1,
                list: [],
            };
            for (var i = 0; i < stuData.data.hashMap[key1].arrayList.length; i++) {
                let obj2 = {
                    name: stuData.data.hashMap[key1].arrayList[i].name,
                    value: i,
                };
                obj.list.push(obj2);
            };
            data.list.push(obj);
        }
        var arr = [];
        arr.push(data);
        return arr;
    }

    function handleErjiao_1(arr, idx, color, category) {
        arr.forEach((item, index) => {
            if (item.name === null) {
                return false;
            }
            let symbolSize = 10;
            switch (idx) {
                case 0:
                    symbolSize = 90;
                    break;
                case 1:
                    symbolSize = 60;
                    break;
                default:
                    symbolSize = 20;
                    break;
            }
            let label = null;
            switch (idx) {
                case 0:
                    label = {
                        position: "inside",
                        fontSize: 18,
                        rotate: 0
                    };
                    break;
                case 1:
                    label = {
                        position: "inside",
                        rotate: 0
                    };
                    break;
                default:
                    break;
            }
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            let lineStyle = {
                color: color.c2
            };
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.8,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)"
                    }],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.4,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: color.c2
                    }],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj = {
                name: item.name,
                symbolSize: symbolSize,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            };
            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list_erjiao.push(obj);
            if (item.list && item.list.length > 0) {
                handleErjiao_1(item.list, idx + 1, color, category);
            }
        });
    }

    function handleErjiao_2(arr, index, color) {
        arr.forEach(item => {
            if (item.list) {
                item.list.forEach((item2, eq) => {
                    if (index === 0) {
                        color = colors.find((itemm, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target"
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source"
                                }
                            };
                            break;
                    }
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle
                    };
                    let findFlag = links_erjiao.some(function(item) {
                        return (item.source == obj.target) && (item.target == obj.source) || (item.source == obj.source) && (item.target == obj.target);
                    })
                    if (!findFlag) {
                        links_erjiao.push(obj);
                    }
                    if (item2.list && item.list.length > 0) {
                        handleErjiao_2(item.list, index + 1);
                    }
                });
            }

        });
    }

    async function pos_erjiao() {
        list_erjiao = [];
        links_erjiao = [];
        let myChart_erjiao = echarts.init(document.querySelector('.pos_erjiao'));
        myChart_erjiao.showLoading();

        let ret = await axios.get('/showbuliding?number=2');
        let stuData = ret.data;
        let listData = getErjiaoData(stuData);
        categories = listData[0].list.map(item => {
            return {
                name: item.name
            };
        });
        handleErjiao_1(JSON.parse(JSON.stringify(listData)), 0);
        handleErjiao_2(JSON.parse(JSON.stringify(listData)), 0);

        myChart_erjiao.hideLoading();

        let option_erjiao = {
            title: {
                show: true,
                text: '考研分布-二教',
                left: '5%',
                top: '5%',
                textStyle: {
                    // color: '#fff',
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: 22,
                }
            },
            // backgroundColor: "#000",
            backgroundColor: "transparent",
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    // color: "#fff",
                    color: "#333",
                    fontSize: 10
                },
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                },
            },
            selectedMode: "false",
            bottom: 20,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "考研分布",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 170,
                    edgeLength: 120,
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list_erjiao,
                links: links_erjiao,
                categories: categories,
                focusNodeAdjacency: true,
                scaleLimit: {
                    min: 0.5,
                    max: 2
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 8],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        // color: "#fff",
                        color: "#333",
                        distance: 5,
                        fontSize: 14
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1.5,
                        curveness: 0,
                        type: "solid"
                    }
                }
            }]
        };
        myChart_erjiao.setOption(option_erjiao);
        window.addEventListener("resize", function() {
            myChart_erjiao.resize();
        })
    }

    // 四教
    function getSijiaoData(stuData) {
        let data = {
            name: stuData.data.classroom,
            value: 0,
            list: []
        };
        for (key1 in stuData.data.hashMap) {
            let obj = {
                name: key1,
                value: key1,
                list: [],
            };
            for (var i = 0; i < stuData.data.hashMap[key1].arrayList.length; i++) {
                let obj2 = {
                    name: stuData.data.hashMap[key1].arrayList[i].name,
                    value: i,
                };
                obj.list.push(obj2);
            };
            data.list.push(obj);
        }
        var arr = [];
        arr.push(data);
        return arr;
    }

    function handleSijiao_1(arr, idx, color, category) {
        arr.forEach((item, index) => {
            if (item.name === null) {
                return false;
            }
            let symbolSize = 10;
            switch (idx) {
                case 0:
                    symbolSize = 70;
                    break;
                case 1:
                    symbolSize = 50;
                    break;
                default:
                    symbolSize = 30;
                    break;
            }
            let label = null;
            switch (idx) {
                case 0:
                case 1:
                    label = {
                        position: "inside",
                        rotate: 0
                    };
                    break;
                default:
                    break;
            }
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            let lineStyle = {
                color: color.c2
            };
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.8,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)"
                    }],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.4,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: color.c2
                    }],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj = {
                name: item.name,
                symbolSize: symbolSize,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            };
            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list_sijiao.push(obj);
            if (item.list && item.list.length > 0) {
                handleSijiao_1(item.list, idx + 1, color, category);
            }
        });
    }

    function handleSijiao_2(arr, index, color) {
        arr.forEach(item => {
            if (item.list) {
                item.list.forEach((item2, eq) => {
                    if (index === 0) {
                        color = colors.find((itemm, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target"
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source"
                                }
                            };
                            break;
                    }
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle
                    };
                    let findFlag = links_sijiao.some(function(item) {
                        return (item.source == obj.target) && (item.target == obj.source) || (item.source == obj.source) && (item.target == obj.target);
                    })
                    if (!findFlag) {
                        links_sijiao.push(obj);
                    }
                    if (item2.list && item.list.length > 0) {
                        handleSijiao_2(item.list, index + 1);
                    }
                });
            }

        });
    }

    async function pos_sijiao() {
        list_sijiao = [];
        links_sijiao = [];
        let myChart_sijiao = echarts.init(document.querySelector('.pos_sijiao'));
        myChart_sijiao.showLoading();

        let ret = await axios.get('/showbuliding?number=4');
        let stuData = ret.data;

        let listData = getSijiaoData(stuData);

        categories = listData[0].list.map(item => {
            return {
                name: item.name
            };
        });

        handleSijiao_1(JSON.parse(JSON.stringify(listData)), 0);
        handleSijiao_2(JSON.parse(JSON.stringify(listData)), 0);

        myChart_sijiao.hideLoading();

        let option_sijiao = {
            backgroundColor: "transparent",
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            title: {
                show: true,
                text: '考研分布-四教',
                left: '5%',
                top: '5%',
                textStyle: {
                    // color: '#fff',
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: 22,
                }
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    // color: "#fff",
                    color: "#333",
                    fontSize: 10
                },
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                }
            },
            selectedMode: "false",
            bottom: 20,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "考研分布",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 300,
                    edgeLength: 100
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list_sijiao,
                links: links_sijiao,
                categories: categories,
                focusNodeAdjacency: true,
                scaleLimit: {
                    min: 0.5, //最小的缩放值
                    max: 2 //最大的缩放值
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 8],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        // color: "#fff",
                        color: "#333",
                        distance: 5,
                        fontSize: 14
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1.5,
                        curveness: 0,
                        type: "solid"
                    }
                }
            }]
        };

        myChart_sijiao.setOption(option_sijiao);
        window.addEventListener("resize", function() {
            myChart_sijiao.resize();
        })
    }

    // 班级
    function getclassesData(stuData) {
        let data = {
            name: stuData.data.college,
            value: 0,
            list: []
        };
        stuData.data.addressMaps.forEach((value, index) => {
            let obj = {
                name: value.professional,
                value: value.professional,
                list: []
            }
            for (key in value.hashMap) {
                let obj1 = {
                    name: key,
                    value: key
                }
                obj.list.push(obj1)
            }
            data.list.push(obj);
        })
        var arr = [];
        arr.push(data);
        return arr;
    }

    function getClassData(addressMaps, className) {
        let data = {
            name: className,
            value: 0,
            list: []
        };
        addressMaps.forEach((value, index) => {
            for (key in value.hashMap) {
                if (key == className) {
                    value.hashMap[key].addressArrayList.forEach((value1, index1) => {
                        let obj1 = {
                            name: value1.name,
                            value: value1.name,
                            list: []
                        }
                        let obj2 = {
                            name: value1.address,
                            value: value1.address
                        }
                        obj1.list.push(obj2);
                        data.list.push(obj1);
                    })
                }
            }
        })
        var arr = [];
        arr.push(data);
        return arr;
    }

    function handleClass_1(arr, idx, color, category) {
        arr.forEach((item, index) => {
            if (item.name === null) {
                return false;
            }
            let symbolSize = 10;
            switch (idx) {
                case 0:
                    symbolSize = 90;
                    break;
                case 1:
                    symbolSize = 60;
                    break;
                default:
                    symbolSize = 20;
                    break;
            }
            let label = null;
            switch (idx) {
                case 0:
                    label = {
                        position: "inside",
                        fontSize: 18,
                        rotate: 0
                    };
                    break;
                case 1:
                    label = {
                        position: "inside",
                        rotate: 0
                    };
                    break;
                default:
                    break;
            }
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            let lineStyle = {
                color: color.c2
            };
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.8,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)"
                    }],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.4,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: color.c2
                    }],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj = {
                name: item.name,
                symbolSize: symbolSize,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            };
            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list_class.push(obj);
            if (item.list && item.list.length > 0) {
                handleClass_1(item.list, idx + 1, color, category);
            }
        });
    }

    function handleClass_2(arr, index, color) {
        arr.forEach(item => {
            if (item.list) {
                item.list.forEach((item2, eq) => {
                    if (index === 0) {
                        color = colors.find((itemm, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target"
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source"
                                }
                            };
                            break;
                    }
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle
                    };
                    let findFlag = links_class.some(function(item) {
                        return (item.source == obj.target) && (item.target == obj.source) || (item.source == obj.source) && (item.target == obj.target);
                    })
                    if (!findFlag) {
                        links_class.push(obj);
                    }
                    if (item2.list && item.list.length > 0) {
                        handleClass_2(item.list, index + 1);
                    }
                });
            }

        });
    }

    function reSetClass(params, addressMaps, option) {
        let classData = getClassData(addressMaps, params.name);
        let newobj = {};
        list_class = [];
        links_class = [];
        categories = classData[0].list.map(item => {
            return {
                name: item.name
            };
        });
        handleClass_1(JSON.parse(JSON.stringify(classData)), 0);
        handleClass_2(JSON.parse(JSON.stringify(classData)), 0);

        list_class = list_class.reduce((preVal, curVal) => {
            newobj[curVal.name] ? '' : newobj[curVal.name] = preVal.push(curVal);
            return preVal;
        }, []);

        option.series[0].data = list_class;
        option.series[0].links = links_class;
        option.series[0].force = {
            repulsion: 400,
            edgeLength: 100
        };
        option.series[0].categories = categories;
    }

    function setBackClass(backData, option) {
        list_class = [];
        links_class = [];
        legend = [];
        categories = backData[0].list.map(item => {
            return {
                name: item.name
            };
        });
        handleClass_1(JSON.parse(JSON.stringify(backData)), 0);
        handleClass_2(JSON.parse(JSON.stringify(backData)), 0);
        option.series[0].data = list_class;
        option.series[0].links = links_class;
        option.series[0].force = {
            repulsion: 500,
            edgeLength: 200
        };
        option.series[0].categories = categories;
    }

    async function pos_class() {
        list_class = [];
        links_class = [];
        let myChart_class = echarts.init(document.querySelector('.pos_class'));
        myChart_class.showLoading();

        let ret = await axios.get('/address');
        let stuData = ret.data;
        let {
            data: {
                addressMaps
            }
        } = stuData;
        let keys = stuData.data.addressMaps;
        // 遍历数组
        keys.forEach((val, index) => {
            for (let key in val.hashMap) {
                class_key.push(key)
            }
        });
        let listData = getclassesData(stuData);

        categories = listData[0].list.map(item => {
            return {
                name: item.name
            };
        });

        handleClass_1(JSON.parse(JSON.stringify(listData)), 0);
        handleClass_2(JSON.parse(JSON.stringify(listData)), 0);

        myChart_class.hideLoading();

        let option_class = {
            title: {
                show: true,
                text: '考研分布-班级',
                left: '5%',
                top: '5%',
                textStyle: {
                    // color: '#fff',
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: 22,
                }
            },
            backgroundColor: "transparent",
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    // color: "#fff",
                    color: "#333",
                    fontSize: 10
                },
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                }
            },
            selectedMode: "false",
            bottom: 20,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "考研分布",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 500,
                    edgeLength: 200
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list_class,
                links: links_class,
                categories: categories,
                focusNodeAdjacency: true,
                scaleLimit: {
                    min: 0.5, //最小的缩放值
                    max: 2 //最大的缩放值
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 8],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        // color: "#fff",
                        color: "#333",
                        distance: 5,
                        fontSize: 14
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1.5,
                        curveness: 0,
                        type: "solid"
                    }
                }
            }]
        };

        myChart_class.setOption(option_class);

        myChart_class.on('click', function(params) {
            switch (class_key.includes(params.name)) {
                case false:
                    break;
                default:
                    flag_class === true ? reSetClass(params, addressMaps, option_class) : setBackClass(listData, option_class);
                    myChart_class.setOption(option_class);
                    flag_class = !flag_class;
            }
        });
        window.addEventListener("resize", function() {
            myChart_class.resize();
        })
    }

    // 寝室
    function getDomData(stuData) {
        let data = {
            name: stuData.data.college,
            value: 0,
            list: []
        };
        stuData.data.arrayList.forEach((value, index) => {
            if (value.department) {
                let obj = {
                    name: value.department,
                    value: value.department,
                    list: []
                }
                for (key in value.hashMap) {
                    let obj1 = {
                        name: key,
                        value: key
                    }
                    obj.list.push(obj1)
                }
                data.list.push(obj);
            }
        })
        var arr = [];
        arr.push(data);
        return arr;
    }

    function getRoomData(arrayList, params) {
        let root = {
            name: params.name,
            value: 0,
            list: []
        }
        let departData = arrayList.find((ele) => {
            return ele.department == params.data.category;
        })
        for (key in departData.hashMap) {
            if (key == params.name) {
                departData.hashMap[key].arrayList.forEach((value, index) => {
                    let obj = {
                        name: value.name,
                        value: value.name,
                        list: []
                    }
                    let obj1 = {
                        name: value.address,
                        value: value.address,
                    }
                    obj.list.push(obj1);
                    root.list.push(obj);
                })
                break;
            }
        }

        var arr = [];
        arr.push(root);
        return arr;
    }

    function handleDom_1(arr, idx, color, category) {
        arr.forEach((item, index) => {
            if (item.name === null) {
                return false;
            }
            let symbolSize = 10;
            switch (idx) {
                case 0:
                    symbolSize = 90;
                    break;
                case 1:
                    symbolSize = 60;
                    break;
                default:
                    symbolSize = 20;
                    break;
            }
            let label = null;
            switch (idx) {
                case 0:
                    label = {
                        position: "inside",
                        fontSize: 18,
                        rotate: 0
                    };
                    break;
                case 1:
                    label = {
                        position: "inside",
                        rotate: 0
                    };
                    break;
                default:
                    break;
            }
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            let lineStyle = {
                color: color.c2
            };
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.8,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)"
                    }],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.4,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: color.c2
                    }],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj = {
                name: item.name,
                symbolSize: symbolSize,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            };
            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list_dom.push(obj);
            if (item.list && item.list.length > 0) {
                handleDom_1(item.list, idx + 1, color, category);
            }
        });
    }

    function handleDom_2(arr, index, color) {
        arr.forEach(item => {
            if (item.list) {
                item.list.forEach((item2, eq) => {
                    if (index === 0) {
                        color = colors.find((itemm, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target"
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source"
                                }
                            };
                            break;
                    }
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle
                    };

                    let findFlag_dom = links_dom.some(function(item) {
                        return (item.source == obj.target) && (item.target == obj.source) || (item.source == obj.source) && (item.target == obj.target);
                    })
                    if (!findFlag_dom) {
                        links_dom.push(obj);
                    }
                    if (item2.list && item.list.length > 0) {
                        handleDom_2(item.list, index + 1);
                    }
                });
            }

        });
    }

    function reSetDom(params, arrayList, option) {
        let classData = getRoomData(arrayList, params);
        let newobj = {};
        list_dom = [];
        links_dom = [];
        categories = classData[0].list.map(item => {
            return {
                name: item.name
            };
        });
        handleDom_1(JSON.parse(JSON.stringify(classData)), 0);
        handleDom_2(JSON.parse(JSON.stringify(classData)), 0);

        list_dom = list_dom.reduce((preVal, curVal) => {
            newobj[curVal.name] ? '' : newobj[curVal.name] = preVal.push(curVal);
            return preVal;
        }, []);

        option.series[0].data = list_dom;
        option.series[0].links = links_dom;
        option.series[0].force = {
            repulsion: 250,
            edgeLength: 100
        };
        option.series[0].categories = categories;
    }

    function setBackDom(backData, option) {
        list_dom = [];
        links_dom = [];
        legend = [];
        categories = backData[0].list.map(item => {
            return {
                name: item.name
            };
        });
        handleDom_1(JSON.parse(JSON.stringify(backData)), 0);
        handleDom_2(JSON.parse(JSON.stringify(backData)), 0);
        option.series[0].data = list_dom;
        option.series[0].links = links_dom;
        option.series[0].force = {
            repulsion: 300,
            edgeLength: 200
        };
        option.series[0].categories = categories;
    }

    async function pos_dom() {
        list_dom = [];
        links_dom = [];
        let myChart_dom = echarts.init(document.querySelector('.pos_dom'));
        myChart_dom.showLoading();

        let ret = await axios.get('/dom');
        let stuData = ret.data;
        let {
            data: {
                arrayList
            }
        } = stuData;
        let listData = getDomData(stuData);
        categories = listData[0].list.map(item => {
            return {
                name: item.name
            };
        });
        handleDom_1(JSON.parse(JSON.stringify(listData)), 0);
        handleDom_2(JSON.parse(JSON.stringify(listData)), 0);

        myChart_dom.hideLoading();

        let option_dom = {
            title: {
                show: true,
                text: '考研分布-寝室',
                left: '5%',
                top: '5%',
                textStyle: {
                    // color: '#fff',
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: 22,
                }
            },
            backgroundColor: "transparent",
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    // color: "#fff",
                    color: "#333",
                    fontSize: 10
                },
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                }
            },
            selectedMode: "false",
            bottom: 20,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "考研分布",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 300,
                    edgeLength: 100
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list_dom,
                links: links_dom,
                categories: categories,
                focusNodeAdjacency: true,
                scaleLimit: {
                    min: 0.5, //最小的缩放值
                    max: 2 //最大的缩放值
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 8],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        // color: "#fff",
                        color: "#333",
                        distance: 5,
                        fontSize: 14
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1.5,
                        curveness: 0,
                        type: "solid"
                    }
                }
            }]
        };
        myChart_dom.setOption(option_dom);

        myChart_dom.on('click', function(params) {
            flag_dom === true ? reSetDom(params, JSON.parse(JSON.stringify(arrayList)), option_dom) : setBackDom(JSON.parse(JSON.stringify(listData)), option_dom);
            flag_dom = !flag_dom;
            myChart_dom.setOption(option_dom);
        });

        window.addEventListener("resize", function() {
            myChart_dom.resize();
        })
    }

    // 居家
    function getHomeData(stuData) {
        let data = {
            name: stuData.data.place,
            value: 0,
            list: []
        };
        stuData.data.student_homes.forEach((value, index) => {
            obj = {
                name: value.name,
                value: value.sno
            }
            data.list.push(obj);
        })
        var arr = [];
        arr.push(data);
        return arr;
    }

    function handleHome_1(arr, idx, color, category) {
        arr.forEach((item, index) => {
            if (item.name === null) {
                return false;
            }
            let symbolSize = 10;
            switch (idx) {
                case 0:
                    symbolSize = 90;
                    break;
                case 1:
                    symbolSize = 60;
                    break;
                default:
                    symbolSize = 20;
                    break;
            }
            let label = null;
            switch (idx) {
                case 0:
                    label = {
                        position: "inside",
                        fontSize: 18,
                        rotate: 0
                    };
                    break;
                case 1:
                    label = {
                        position: "inside",
                        rotate: 0
                    };
                    break;
                default:
                    break;
            }
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            let lineStyle = {
                color: color.c2
            };
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.8,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)"
                    }],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.4,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: color.c2
                    }],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj = {
                name: item.name,
                symbolSize: symbolSize,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            };
            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list_home.push(obj);
            if (item.list && item.list.length > 0) {
                handleHome_1(item.list, idx + 1, color, category);
            }
        });
    }

    function handleHome_2(arr, index, color) {
        arr.forEach(item => {
            if (item.list) {
                item.list.forEach((item2, eq) => {
                    if (index === 0) {
                        color = colors.find((itemm, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list && item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target"
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source"
                                }
                            };
                            break;
                    }
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle
                    };
                    let findFlag = links_home.some(function(item) {
                        return (item.source == obj.target) && (item.target == obj.source) || (item.source == obj.source) && (item.target == obj.target);
                    })
                    if (!findFlag) {
                        links_home.push(obj);
                    }
                    if (item2.list && item.list.length > 0) {
                        handleHome_2(item.list, index + 1);
                    }
                });
            }

        });
    }

    async function pos_home() {
        list_home = [];
        links_home = [];

        let myChart_home = echarts.init(document.querySelector('.pos_home'));
        myChart_home.showLoading();

        let ret = await axios.get('/home');
        let stuData = ret.data;
        let listData = getHomeData(stuData);

        let categories = listData[0].list.map(item => {
            return {
                name: item.name
            };
        });

        handleHome_1(JSON.parse(JSON.stringify(listData)), 0);
        handleHome_2(JSON.parse(JSON.stringify(listData)), 0);

        myChart_home.hideLoading();

        let option_home = {
            backgroundColor: "transparent",
            title: {
                show: true,
                text: '考研分布-居家',
                left: '5%',
                top: '5%',
                textStyle: {
                    // color: '#fff',
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: 22,
                }
            },
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    // color: "#fff",
                    color: "#333",
                    fontSize: 10
                },
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                }
            },
            selectedMode: "false",
            bottom: 20,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "考研分布-居家",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 400,
                    edgeLength: 200
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list_home,
                links: links_home,
                categories: categories,
                focusNodeAdjacency: true,
                scaleLimit: {
                    min: 0.5,
                    max: 2
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 8],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        // color: "#fff",
                        color: "#333",
                        distance: 5,
                        fontSize: 14
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1.5,
                        curveness: 0,
                        type: "solid"
                    }
                }
            }]
        };

        myChart_home.setOption(option_home);

        window.addEventListener("resize", function() {
            myChart_home.resize();
        })
    }

    // 其他
    function getOtherData(stuData) {
        let data = {
            name: '其他',
            value: 0,
            list: []
        };
        for (key in stuData.data.hashMap) {
            let obj = {
                name: key,
                value: key,
                list: [],
            };
            stuData.data.hashMap[key].arrayList.forEach((item, index) => {
                let obj1 = {
                    name: item.name,
                    value: item.name,
                }
                obj.list.push(obj1);
            })
            data.list.push(obj);
        }
        var arr = [];
        arr.push(data);
        return arr;
    }

    function handleOther_1(arr, idx, color, category) {
        arr.forEach((item, index) => {
            if (item.name === null) {
                return false;
            }
            let symbolSize = 10;
            switch (idx) {
                case 0:
                    symbolSize = 90;
                    break;
                case 1:
                    symbolSize = 60;
                    break;
                default:
                    symbolSize = 20;
                    break;
            }
            let label = null;
            switch (idx) {
                case 0:
                    label = {
                        position: "inside",
                        fontSize: 18,
                        rotate: 0
                    };
                    break;
                case 1:
                    label = {
                        position: "inside",
                        rotate: 0
                    };
                    break;
                default:
                    break;
            }
            if (idx === 0) {
                color = colors[0];
            }
            if (idx == 1) {
                color = colors.find((itemm, eq) => eq == index % 10);
                legend.push(item.name);
            }
            let lineStyle = {
                color: color.c2
            };
            let bgcolor = null;
            if (idx === 0) {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.8,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: "rgba(0, 0, 0, 0.3)"
                    }],
                    global: false
                };
            } else {
                bgcolor = {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0,
                        color: color.c1
                    }, {
                        offset: 0.4,
                        color: color.c1
                    }, {
                        offset: 1,
                        color: color.c2
                    }],
                    global: false
                };
            }
            let itemStyle = null;
            if (item.list && item.list.length !== 0) {
                itemStyle = {
                    borderColor: color.c2,
                    color: bgcolor
                };
            } else {
                item.isEnd = true;
                if (item.isdisease == "true") {
                    itemStyle = {
                        color: color.c2,
                        borderColor: color.c2
                    };
                } else {
                    itemStyle = {
                        color: "transparent",
                        borderColor: color.c2
                    };
                }
            }
            itemStyle = Object.assign(itemStyle, {
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10
            });

            if (idx == 1) {
                category = item.name;
            }
            let obj = {
                name: item.name,
                symbolSize: symbolSize,
                category: category,
                label,
                color: bgcolor,
                itemStyle,
                lineStyle
            };
            obj = Object.assign(item, obj);
            if (idx === 0) {
                obj = Object.assign(obj, {
                    root: true
                });
            }
            if (item.list && item.list.length === 0) {
                obj = Object.assign(obj, {
                    isEnd: true
                });
            }
            list_other.push(obj);
            if (item.list && item.list.length > 0) {
                handleOther_1(item.list, idx + 1, color, category);
            }
        });
    }

    function handleOther_2(arr, index, color) {
        arr.forEach(item => {
            if (item.list) {
                item.list.forEach((item2, eq) => {
                    if (index === 0) {
                        color = colors.find((itemm, eq2) => eq2 == eq % 10);
                    }
                    let lineStyle = null;
                    switch (index) {
                        case 0:
                            if (item2.list.length > 0) {
                                lineStyle = {
                                    normal: {
                                        color: "target"
                                    }
                                };
                            } else {
                                lineStyle = {
                                    normal: {
                                        color: color.c2
                                    }
                                };
                            }
                            break;
                        default:
                            lineStyle = {
                                normal: {
                                    color: "source"
                                }
                            };
                            break;
                    }
                    let obj = {
                        source: item.name,
                        target: item2.name,
                        lineStyle
                    };
                    let findFlag = links_other.some(function(item) {
                        return (item.source == obj.target) && (item.target == obj.source) || (item.source == obj.source) && (item.target == obj.target);
                    })
                    if (!findFlag) {
                        links_other.push(obj);
                    }
                    if (item2.list && item.list.length > 0) {
                        handleOther_2(item.list, index + 1);
                    }
                });
            }

        });
    }

    async function pos_other() {
        list_other = [];
        links_other = [];
        let myChart_other = echarts.init(document.querySelector('.pos_other'));
        myChart_other.showLoading();

        let ret = await axios.get('/showOthers');
        let stuData = ret.data;

        let listData = getOtherData(stuData);

        categories = listData[0].list.map(item => {
            return {
                name: item.name
            };
        });

        handleOther_1(JSON.parse(JSON.stringify(listData)), 0);
        handleOther_2(JSON.parse(JSON.stringify(listData)), 0);

        myChart_other.hideLoading();

        let option_other = {
            title: {
                show: true,
                text: '考研分布-其他',
                left: '5%',
                top: '5%',
                textStyle: {
                    // color: '#fff',
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: 22,
                }
            },
            backgroundColor: "transparent",
            toolbox: {
                show: true,
                left: "right",
                right: 20,
                top: "bottom",
                bottom: 20,
            },
            color: legendColor,
            legend: {
                show: true,
                data: legend,
                textStyle: {
                    // color: "#fff",
                    color: "#333",
                    fontSize: 10
                },
                icon: "circle",
                type: "scroll",
                orient: "vertical",
                left: "right",
                right: 20,
                top: 20,
                bottom: 80,
                pageIconColor: "#00f6ff",
                pageIconInactiveColor: "#fff",
                pageIconSize: 12,
                pageTextStyle: {
                    color: "#fff",
                    fontSize: 12
                },
            },
            selectedMode: "false",
            bottom: 20,
            left: 0,
            right: 0,
            top: 0,
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [{
                name: "考研分布",
                type: "graph",
                hoverAnimation: true,
                layout: "force",
                force: {
                    repulsion: 200,
                    edgeLength: 120,
                },
                nodeScaleRatio: 0.6,
                draggable: true,
                roam: true,
                symbol: "circle",
                data: list_other,
                links: links_other,
                categories: categories,
                focusNodeAdjacency: true,
                scaleLimit: {
                    min: 0.5,
                    max: 2
                },
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 8],
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        // color: "#fff",
                        color: "#333",
                        distance: 5,
                        fontSize: 14
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1.5,
                        curveness: 0,
                        type: "solid"
                    }
                }
            }]
        };

        myChart_other.setOption(option_other);

        window.addEventListener("resize", function() {
            myChart_other.resize();
        })
    }

    // 年级率
    function getProSeries(rateData, colors) {
        let num = rateData.length;
        rateData.forEach((item, index) => {
            let pos = 100 / (num + 1) * (index + 1) + "%";
            let obj = {
                center: [pos, "50%"],
                radius: ["18%", "20%"],
                clockWise: false,
                hoverAnimation: true,
                type: 'pie',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                itemStyle: proItemStyles(colors[index % 10].c1, colors[index % 10].c2),
                data: [{
                    name: " ",
                    value: (1 - item.rate) * 100,
                    itemStyle: {
                        borderWidth: 0
                    }
                }, {
                    name: "",
                    label: {
                        show: true,
                        rich: {
                            a: {
                                color: '#fff',
                                // color: '#333',
                                align: 'center',
                                fontSize: 24,
                                fontWeight: "bold"
                            },
                            b: {
                                color: '#fff',
                                // color: '#333',
                                align: 'center',
                                fontSize: 18
                            }
                        },
                        formatter: "{a|" + (rateData[index].rate * 100).toFixed(2) + "%}\n\n" + "{b|" + rateData[index].professional + "}",
                        position: 'center'
                    },
                    value: item.rate * 100
                }]
            }
            series_pro.push(obj);
        })
        return series_pro;
    }

    function proItemStyles(color1, color2) {
        return {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color1
            }, {
                offset: 1,
                color: color2
            }]),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color1
            }, {
                offset: 1,
                color: color2
            }]),
            borderWidth: 8
        }
    };

    async function rate_pro() {
        let myChart_proRate = echarts.init(document.querySelector('.rate_pro'));
        myChart_proRate.showLoading();

        let ret = await axios.get("/professionalRate");
        let proRate = ret.data;
        let {
            data: {
                arrayList
            }
        } = proRate;

        series_pro = getProSeries(arrayList, colors);

        myChart_proRate.hideLoading();

        option_proRate = {
            backgroundColor: '#0e2147',
            // backgroundColor: 'transparent',
            series: series_pro
        };
        myChart_proRate.setOption(option_proRate);

        window.addEventListener("resize", function() {
            myChart_proRate.resize();
        })
    }

    // 班级率
    function getClassRateData(rateData) {
        let pieData = [];
        classRate_xAxis = [];
        classRate_xData = [];
        rateData.forEach(item => {
            item.arrayList.forEach(innerItem => {
                classRate_xAxis.push(innerItem.classes);
                classRate_xData.push(parseFloat(innerItem.rate).toFixed(2))
                obj = {
                    name: innerItem.classes,
                    value: (innerItem.rate * 100).toFixed(2)
                }
                pieData.push(obj)
            })
        })
        return pieData;
    }

    async function rate_class() {
        let myChart_classRate = echarts.init(document.querySelector('.rate_class'));
        myChart_classRate.showLoading();

        let ret = await axios.get("/ClassRate");
        let classRate = ret.data;
        let {
            data: {
                arrayList: arrayList_class
            }
        } = classRate;

        classRatepieData = getClassRateData(arrayList_class);

        myChart_classRate.hideLoading();

        let option_classRate = {
            backgroundColor: '#071347',
            // backgroundColor: 'transparent',
            color: ["#006cff", "#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} "
            },
            grid: {
                left: "5%",
                top: "5%",
                right: "5%",
                bottom: "5%",
                containLabel: true
            },
            axisPointer: {
                type: "shadow"
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff'
                        // color: '#333'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                            // color: '#333'
                    }
                },
                axisLabel: {
                    fontSize: 18
                },
                data: classRate_xAxis,
            },
            yAxis: {
                max: 1,
                type: 'value',
                name: '考研率',
                nameTextStyle: {
                    color: '#fff'
                        // color: '#333'
                },
                axisLabel: {
                    color: '#fff'
                        // color: '#333'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                            // color: '#333'
                    }
                },
                axisLabel: {
                    fontSize: 18
                },
            },
            series: [{
                name: "班级考研率",
                type: 'bar',
                barWidth: "25%",
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            x2: 0,
                            y: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#00b0ff'
                            }, {
                                offset: 0.8,
                                color: '#7052f4'
                            }],
                            global: false,
                        },
                        barBorderRadius: 10
                    },
                },
                data: classRate_xData,
            }, {
                name: "班级考研率",
                type: "pie",
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}% </br>年级考研占比: {d}%",
                    // color: "#333"
                },
                radius: ["10%", "30%"],
                center: ["85%", "22%"],
                roseType: "radius",
                data: classRatepieData,
                label: {
                    fontSize: 12,
                    formatter(params) {
                        return params.percent + '%'
                    }
                },
                labelLine: {
                    length: 10,
                    length2: 10
                }
            }]
        };

        myChart_classRate.setOption(option_classRate);

        window.addEventListener("resize", function() {
            myChart_classRate.resize();
        })
    }

    // 寝室率
    function getData(arr) {
        let finalData = []
        arr.forEach((item, index) => {
            let obj = {
                count: item.count,
                rate: item.rate
            }
            finalData.push(obj);
        })
        return finalData;
    }

    function mySort(domData) {
        for (let i = 0; i < domData.length - 1; i++) {
            for (let j = 0; j < domData.length - i - 1; j++) {
                if (domData[j].rate > domData[j + 1].rate) {
                    let temp = domData[j];
                    domData[j] = domData[j + 1];
                    domData[j + 1] = temp;
                }
            }
        }
        return domData;
    }

    function mySplit(domData) {
        let rate = [];
        let count = [];
        domData.forEach(item => {
            rate.push(parseFloat(item.rate).toFixed(2) * 100 + "%");
            count.push(item.count);
        })
        return {
            count: count,
            rate: rate
        }
    }

    function domStack(count) {
        let newCount = [];
        count.forEach((value, index) => {
            if (!index) {
                newCount.push(value)
            } else {
                newCount.push(newCount[index - 1] + value);
            }
        })
        return newCount;
    }

    async function rate_dom() {
        let myChart_domRate = echarts.init(document.querySelector('.rate_dom'));
        myChart_domRate.showLoading();

        let ret = await axios.get("/domrate");
        let domRate = ret.data;
        let {
            data: {
                arrayList: arrayList_dom
            }
        } = domRate;


        domRateData = mySort(getData(arrayList_dom));

        let gridData = mySplit(domRateData);

        let lineStack = domStack(gridData.count);

        let allDom = lineStack[lineStack.length - 1];

        let lineData = gridData.count.map(value => {
            return (value / allDom).toFixed(2);
        })

        myChart_domRate.hideLoading();

        let option_dom = {
            backgroundColor: "#05224d",
            // backgroundColor: "transparent",
            tooltip: {},
            grid: {
                top: '8%',
                left: '1%',
                right: '1%',
                bottom: '8%',
                containLabel: true,
            },
            legend: {
                itemGap: 50,
                data: ['总寝室占比', '寝室数'],
                textStyle: {
                    color: '#f9f9f9',
                    borderColor: '#fff'
                },
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#f9f9f9'
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#d1e6eb',
                        margin: 15,
                    },
                },
                axisTick: {
                    show: false,
                },
                data: gridData.rate,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#0a3256'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#d1e6eb',

                    },
                },
                axisTick: {
                    show: false,
                },
            }, {
                type: 'value',
                min: 0,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#0a3256'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: '#d1e6eb',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '总寝室占比',
                type: 'line',
                yAxisIndex: 1,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "#28ffb3",
                    },
                    borderColor: '#f0f'
                },
                label: {
                    show: true,
                    position: 'bottom',
                    textStyle: {
                        color: '#fff',
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#28ffb3",

                    }
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,154,120,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(0,0,0, 0)'
                        }], false),
                        shadowColor: 'rgba(53,142,215, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: lineData
            }, {
                name: '寝室数',
                type: 'bar',
                barWidth: '20%',
                tooltip: {
                    show: false
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#fff',
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#14c8d4'
                                }, {
                                    offset: 1,
                                    color: '#43eec6'
                                }]
                            )
                            // color: function(params) {
                            //     var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                            //     return colorList[params.dataIndex];
                            // }
                    }
                },
                data: gridData.count
            }]
        };

        myChart_domRate.setOption(option_dom);

        window.addEventListener("resize", function() {
            myChart_domRate.resize();
        })
    }

    // 清空localStorage
    // window.onunload = function() {
    //     localStorage.clear();
    // }
})