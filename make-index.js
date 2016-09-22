// 文件说明：自动给所有页面生成索引

var fs = require('fs');

var results = [];
var root = __dirname;
var years = fs.readdirSync(root);
years.forEach(function(year)
{
	if(fs.statSync(root+'/'+year).isFile() || !/^\d{4}$/g.test(year)) return;
	var months = fs.readdirSync(root+'/'+year);
	months.forEach(function(month)
	{
		var days = fs.readdirSync(root+'/'+year+'/'+month);
		days.forEach(function(dayAndName)
		{
			var temp = /^(.+?)-(.*)$/g.exec(dayAndName);
			var htmlPath = root+'/'+year+'/'+month+'/'+dayAndName+'/index.html';
			var html = fs.readFileSync(htmlPath, {encoding: 'utf8'});
			var title = /<head>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<\/head>/gim.exec(html);
			var description = /<head>[\s\S]*?<meta.*?name="description".*?content="(.*)".*?>[\s\S]*?<\/head>/gim.exec(html);
			results.push(
			{
				date: year+'-'+month+'-'+temp[1],
				title: title?title[1]:temp[2],
				description: description?description[1]:null,
				url: year+'/'+month+'/'+dayAndName+'/'
			});
		});
	});
});
fs.writeFile('./index.js', 'var pages = '+JSON.stringify(results, null, '\t'), function(err)
{
	if (err) throw err;
	console.log('保存成功！');
});
