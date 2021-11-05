$(function() {
    //点击去注册链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer //利用layui 对象的layer提示消息
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的值，与密码框中的值去进行比较
            var pwd = $('.reg-box [name=password]').val() //拿到的是密码框中的值，利用了属性选择器
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // console.log('注册成功');
                layer.msg('注册成功，请登录')
                    //模拟人的点击行为
                $('#link_login').click();
            }
        })
    });
    // 监听登录表单的监听事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(), //快速获取表单数据
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    //登录成功后，应该将得到的token字符串保存到 localStorage中
                localStorage.setItem('token', res.token);
                //跳转到后台主页  注意是location.href
                location.href = 'index.html';
            }
        })
    });
})