$(function() {
    $('#username').on('input propertychange', function() {
        let num = $(this).val().length;
        let le = parseInt($(this).attr('maxlength')) - 1; // 这里是获取的 maxlength 属性的值
        if (num > le) {
            alert('长度超过限制！');
        }
    })
    $('#password').on('input propertychange', function() {
        let num = $(this).val().length;
        let le = parseInt($(this).attr('maxlength')) - 1; // 这里是获取的 maxlength 属性的值
        if (num > le) {
            alert('长度超过限制！');
        }
    })
    let login = document.getElementById("login");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    // let params = {};
    login.onclick = function() {
        let xhr = new XMLHttpRequest();
        // 获取用户表单中的值
        let usernameValue = username.value;
        let passwordValue = password.value;
        if (usernameValue.trim().length == 0 || passwordValue.trim().length == 0) {
            alert('请输入正确的用户名或密码');
            return;
        }
        // alert(usernameValue);
        // alert(passwordValue);
        let params = 'username=' + usernameValue + '&password=' + passwordValue;
        xhr.open('post', 'http://localhost:8887/login');
        // post请求必须设置 Content-Type
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(params);
        // 当ajax接收完服务器端的响应就会触发
        xhr.onload = function() {
            // let responseText = JSON.parse(xhr.responseText)
            let res = JSON.parse(xhr.responseText);
            if (res.data.meta.status == 200) {
                alert('登陆成功！');
                localStorage.setItem('kykshLoginFlag', true);
                localStorage.setItem('kykshLogin', res.data.name);
                localStorage.setItem('kykshLoginClass', res.data.classes);
                localStorage.setItem('kykshLoginSno', res.data.sno);
                location.replace('http://localhost:8887/index.html');
            } else if (res.data.meta.status == 400) {
                alert('用户名或密码错误！');
                password.value = "";
            } else {
                alert('服务器发生未知错误！');
                username.value = "";
                password.value = "";
                location.reload();
            }
        }
    }

    password.addEventListener('keyup', function(ev) {
        if (ev.code == "Enter") {
            login.click();
        }
    })
})