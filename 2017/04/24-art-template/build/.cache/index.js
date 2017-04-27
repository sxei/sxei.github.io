/*TMODJS:{"version":1,"md5":"6302add0fe1046a9c56e4d0b584ad890"}*/
template('index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,user=$data.user,$escape=$utils.$escape,$each=$utils.$each,peoples=$data.peoples,$value=$data.$value,$index=$data.$index,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<!DOCTYPE html> <html lang="zh-cn"> <head> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta charset="utf-8"> <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> <meta name="renderer" content="webkit"> <meta name="keys" content="柳夏南,liuxianan,小茗同学,个人网站,官网,官方网站,博客,个人博客,it,web,前端,码农,程序员,js,css3,html5,java,android"> <link rel="shortcut icon" href="http://liuxianan.com/favicon.ico" type="image/x-icon"> <link rel="stylesheet" type="text/css" href="../../../res/lib/bootstrap/3.3.1/css/bootstrap.min.css"> <link rel="stylesheet" type="text/css" href="../../../res/lib/font-awesome/4.2.0/css/font-awesome.css"> <link rel="stylesheet" type="text/css" href="../../../res/css/demo.css"> <title>artTemplate演示</title> <meta name="description" content="JS模板引擎artTemplate简单演示"> <style type="text/css"> </style> </head> <body> <nav class="navbar navbar-default navbar-static-top"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#top_navbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="http://liuxianan.com">DEMO-柳夏南的个人网站</a> </div> <div class="collapse navbar-collapse" id="top_navbar"> <ul class="nav navbar-nav"> <li class="dropdown"> <a href="http://demo.liuxianan.com">首页</a> </li> <li class="dropdown"> <a href="http://blog.liuxianan.com">博客</a> </li> <li class="dropdown"> <a href="http://tool.liuxianan.com">工具</a> </li> <li class="dropdown"> <a href="https://github.com/liuxianan/liuxianan.github.io" target="_blank">本站源码</a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li><a href="#">返回相关博文</a></li> </ul> </div> </div> </nav> <div class="container"> <h2 id="page_title">artTemplate演示</h2> <div class="row"> <div class="col-sm-12"> <h3>条件判断</h3> <div id="target_0"></div> <h3>数组循环</h3> <div id="target_1"></div> <h3>对象循环</h3> <div id="target_2"></div> <h3>引入</h3> <div id="target_3"></div> </div> </div> </div> <script type="text/javascript" src="../../../res/lib/jquery/2.1.1/jquery.min.js"></script> <script type="text/javascript" src="../../../res/js/demo.js"></script> <script type="text/javascript" src="js/art-template-web-4.2.2.js"></script> <script id="tpl_0" type="text/html"> ';
if(user){
$out+=' <p>姓名：';
$out+=$escape(user.name);
$out+='</p> <p>性别：';
$out+=$escape(user.gender);
$out+='</p> ';
}
$out+=' </script> <script id="tpl_1" type="text/html"> <p>与会人员：</p> ';
$each(peoples,function($value,$index){
$out+=' ';
$out+=$escape($index+1);
$out+=': ';
$out+=$escape($value);
$out+='<br> ';
});
$out+=' </script> <script id="tpl_2" type="text/html"> ';
$each($data,function($value,$index){
$out+=' ';
$out+=$escape($index);
$out+=': ';
$out+=$escape($value);
$out+='<br> ';
});
$out+=' </script> <script id="tpl_3" type="text/html"> ';
include('./header.art');
$out+=' </script> <script type="text/javascript"> $(\'#target_0\').html(template(\'tpl_0\', { user: { name: \'小茗同学\', gender: \'男\' } })); $(\'#target_1\').html(template(\'tpl_1\', { peoples: [\'小茗同学\', \'张三\', \'李四\', \'王二麻子\'] })); $(\'#target_2\').html(template(\'tpl_2\', { name: \'测试\', age: 12, province: \'江西\' })); $(\'#target_3\').html(template(\'tpl_3\', { name: \'测试\', age: 12, province: \'江西\' })); </script> </body></html>';
return new String($out);
});