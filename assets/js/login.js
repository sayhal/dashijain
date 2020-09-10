$(function () {
  //登录和注册的点击事件
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //在 layui 中使用 form
  var form = layui.form;
  //在 layui 中使用 layer
  var layer = layui.layer;
  //表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //value代表第一个表单的密码值
    repass: function (value) {
      //获取注册的第二个密码,
      var pwd1 = $(".reg-box [name=password]").val();
      if (pwd1 !== "" && value !== "" && pwd1 !== value) {
        return "两次密码不一致！";
      }
    },
  });
  //表单提交
  $(".reg-form").on("submit", function (e) {
    e.preventDefault();
    $.post(
      //注册地址
      "/api/reguser",
      //序列化表单内容为字符串,用于Ajax请求。
      $(this).serialize(),
      function (rel) {
        if (rel.status !== 0) {
          return layer.msg(rel.message);
        }
        layer.msg(rel.message);
        $("#link_login").click();
      }
    );
  });
  $(".login-form").on("submit", function (e) {
    e.preventDefault();
    $.post(
      //登录地址
      "/api/login",
      //序列化表单内容为字符串,用于Ajax请求。
      $(this).serialize(),
      function (rel) {
        //成功 rel.status=0
        if (rel.status !== 0) {
          //登录失败
          return layer.msg(rel.message);
        }
        //message显示成功还是失败
        layer.msg(rel.message);
        //存储rel.token的值
        localStorage.setItem("token", rel.token);
        //页面跳转
        location.href = "/index.html";
      }
    );
  });
});
