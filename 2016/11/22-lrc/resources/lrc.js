/**
 * 简单的LRC同步歌词显示插件
 * @satrt 2016-11-22
 * @author lxa
 */
;(function()
{
	'use strict';
	function Plugin(config)
	{
		this.settings = {};
		extend(Plugin.settings, this.settings);
		extend(config, this.settings);
		this.init();
	}
	function extend(from, to)
	{
		for(var i in from) 
		{
			if(from[i] != undefined) to[i] = from[i];
		}
	}
	Plugin.version = '1.0.0';
	Plugin.settings = 
	{
		row: 7,
		lineHeight: 40,
		getCurrentPlayTime: function(){return 0;},
		lrc: [],
		lrcUrl: '',
		wrapper: null,
		wrapperId: '',
		delay: 0, // 延迟秒数，可以小数，负值表示提前
		freq: 250 // 计时器的频率，表示250毫秒计算一次，频率越高越精准，但是对性能要求更高
	};

	// 下载LRC歌词文件
	Plugin.prototype.getLrc = function(url, callback)
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState != 4 ) return; // 4 表示数据发送完毕
			if(xhr.status == 200)
			{
				var rsp = xhr.responseText;
				callback(rsp);
			}
			else callback();
		}
		xhr.open('GET', url, true);
		xhr.send(null);
	};

	// 解析LRC歌词文件
	// 注意存在这种情况：[04:17.60] [04:06.77] [03:01.02] 有手有脚拼搏
	Plugin.prototype.parseLrc = function(lrc)
	{
		var array = lrc.split('\n');
		var result = [];
		for(var i=0; i<array.length; i++)
		{
			var temp = array[i].split(']');
			if(!/^\[\d+:\d+/g.test(temp[0])) continue; // 忽略诸如 [ti:梦醒时分] 这种内容
			var text = temp.pop().trim();
			for(var j=0; j< temp.length; j++)
			{
				var _time = temp[j].replace(/^\s*\[/g, '').split(':');
				var time = parseInt(_time[0])*60 + parseFloat(_time[1]);
				result.push([time, text]); // 去掉可能的空格
			}
		}
		// 普通歌词文件不需要排序，但是对于合并在一起的歌词文件需要特殊处理
		result.sort(function(a, b)
		{
			return a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0);
		});
		return result;
	};

	Plugin.prototype.init = function()
	{
		if(this.settings.wrapperId) this.settings.wrapper = document.getElementById(this.settings.wrapperId);
		var that = this;
		this.getLrc(this.settings.lrcUrl, function(lrc)
		{
			if(!lrc) throw new Error('下载歌词文件失败！');
			console.log(lrc);
			window.fff = lrc;
			that.settings.lrc = that.parseLrc(lrc);
			that.initDOM();
			that.start();
		});
	};

	// 初始化DOM结构
	Plugin.prototype.initDOM = function()
	{
		var child = document.createElement('ul');
		var html = '';
		var lrc = this.settings.lrc;
		for(var i=0; i<lrc.length; i++)
		{
			html += '<li>'+lrc[i][1]+'</li>';
		}
		child.innerHTML = html;
		var parent = document.createElement('div');
		parent.style.height = this.settings.row * this.settings.lineHeight + 'px';
		parent.appendChild(child);
		this.settings.wrapper.appendChild(parent);
		this.childNodes = child.childNodes; // 记录所有的LI节点
		this.ul = child; // 记录UL节点
	};

	Plugin.prototype.start = function()
	{
		var that = this;
		this.currentLine = -1;
		var halfRow = Math.floor(that.settings.row/2); // 一半的行数
		this.interval = setInterval(function()
		{
			var currentTime = that.settings.getCurrentPlayTime() - that.settings.delay;
			var lrc = that.settings.lrc;
			var previousLine = that.currentLine;
			// 为提高搜索效率，默认先从上次的行数开始往后搜索，如果没有找到，再从0开始搜索
			var currentLine = findCurrentLine(lrc, currentTime, previousLine);
			if(currentLine < 0) currentLine = findCurrentLine(lrc, currentTime);
			if(currentLine < 0) currentLine = previousLine;
			if(previousLine == currentLine) return; // 如果没有变化，不作为何处理
			that.currentLine = currentLine;
			if(previousLine >= 0) that.childNodes[previousLine].className = '';
			if(currentLine >= 0) that.childNodes[currentLine].className = 'current';
			if(currentLine > halfRow)
			{
				that.ul.style.top = (halfRow - currentLine) * that.settings.lineHeight + 'px';
			}
		}, this.settings.freq);

		// 查找当前播放的歌词行
		function findCurrentLine(lrc, currentTime, start)
		{
			if(start < 0 || start == undefined) start = 0;
			for(var i=start; i<lrc.length; i++)
			{
				if(currentTime >= lrc[i][0] && (!lrc[i+1] || (lrc[i+1] && currentTime < lrc[i+1][0])))
				{
					return i;
				}
			}
			return -1;
		}
	};

	Plugin.prototype.stop = function()
	{
		if(this.interval) clearInterval(this.interval);
	};

	window.Lrc = Plugin;
})();