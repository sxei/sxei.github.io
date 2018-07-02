;(function() {
    if($('body > .navbar').length) return;
    var html = 
    `<nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#top_navbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="http://haoji.me">好记的DEMO</a>
            </div>
            <div class="collapse navbar-collapse" id="top_navbar">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="http://demo.haoji.me">首页</a>
                    </li>
                    <li class="dropdown">
                        <a href="http://blog.haoji.me">博客</a>
                    </li>
                    <li class="dropdown">
                        <a href="http://tool.haoji.me">工具</a>
                    </li>
                    <li class="dropdown">
                        <a href="https://github.com/sxei/sxei.github.io" target="_blank">本站源码</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">返回相关博文</a></li>
                </ul>
            </div>
        </div>
    </nav>`;
    $('body').prepend(html);
})();
console.log('test demo.js');
