// 文件说明：创建新页面小工具

var fs = require('fs');
var readline = require('readline');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var jquery = require('jquery');
const demoPath = '2016/01/07-demo-sample/index.html';
var results = {};
var rl = readline.createInterface(process.stdin, process.stdout);
rl.question("请输入页面英文名称：\n", function(en)
{
	results.en = en || 'no-title';
	rl.question("请输入页面中文标题：\n", function(title)
	{
	    results.title = title || '无标题';
	    rl.question("请输入页面描述：\n", function(description)
	    {
	    	results.description = description || results.title;
	    	writeNewFile();
	    	rl.close();
	    });
	});
});
function writeNewFile()
{
	var html = fs.readFileSync(demoPath, {encoding: 'utf8'});
	var dom = new JSDOM(html);
	var window = dom.window;
	var document = window.document;
	var $ = jquery(window);
	document.title = results.title;
	$('meta[name="description"]').attr('content', results.description);
	$('#page_title').html(results.title);
	var date = new Date();
	var outPath = formatDate(new Date(), 'yyyy/MM/dd') + '-' + results.en;
	mkdirsSync(outPath);
	// dom.serialize() 比 document.documentElement.outerHTML 多了DOCTYPE
	var outHtml = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
	fs.writeFileSync(outPath + '/index.html', outHtml, 'utf-8');
	//var exec = require('child_process').exec;
	//exec('explorer.exe /select,"E:\\Workspace\\Java"')
}

//同步创建多层文件夹
function mkdirsSync(dirpath, mode)
{ 
	if (fs.existsSync(dirpath)) return true;
	var temp = '', sep = '/';
	dirpath.split(sep).forEach(function(dirname)
	{
		temp += (temp ? sep : '') + dirname;
		if (fs.existsSync(temp)) return;
		if (!fs.mkdirSync(temp, mode)) return false;
	});
	return true;
}

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
var formatDate = function(date, fmt)
{
    date = date == undefined ? new Date() : date;
    date = typeof date == 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
    {
        'y': date.getFullYear(), // 年份，注意必须用getFullYear
        'M': date.getMonth() + 1, // 月份，注意是从0-11
        'd': date.getDate(), // 日期
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'w': date.getDay(), // 星期，注意是0-6
        'H': date.getHours(), // 24小时制
        'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
        'm': date.getMinutes(), // 分钟
        's': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
    };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for(var i in obj)
    {
        fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
        {
            var val = obj[i] + '';
            if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
            return m.length == 1 ? val : val.substring(val.length - m.length);
        });
    }
    return fmt;
};