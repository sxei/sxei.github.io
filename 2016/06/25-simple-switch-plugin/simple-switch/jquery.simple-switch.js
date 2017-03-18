/**
 * 简单的开关插件<br>
 * 切换开关状态：$('#switchId').simpleSwitch('toggle');
 * 打开开关：$('#switchId').simpleSwitch('toggle', true);
 * 关闭开关：$('#switchId').simpleSwitch('toggle', false);
 * 获取开关状态：$('#switchId').simpleSwitch('state');
 * 事件监听：$('#switchId').on('switch-change', function(e){console.log(e.detail);});
 * @date 2016-06-25
 * @author lxa
 */
;(function($)
{
	$.fn.extend(
	{
		simpleSwitch: function(method, value)
		{
			var that = this;
			method = method || 'init';
			function toggle(flag)
			{
				that.each(function()
				{
					var isActive = $(this).hasClass('active');
					if(flag != undefined && flag == isActive) return;
					var value = flag == undefined ? !isActive : flag;
					$(this).toggleClass('active', value);
					$(this).children('input[type="checkbox"]').prop('checked', value);
					var event = document.createEvent("CustomEvent");
					event.initCustomEvent("switch-change", true, true, value);
					this.dispatchEvent(event);
				});
			}
			if(method == 'state') return this.children('input[type="checkbox"]').prop('checked');
			else if(method == 'toggle') toggle(value);
			else if(method == 'init') // 初始化
			{
				this.each(function()
				{
					var checked = $(this).children('input[type="checkbox"]').prop('checked');
					$(this).toggleClass('active', checked)
						.append('<span class="switch-handler"></span>');
				})
			}
			else if(method == 'bindEvent') // 绑定事件
			{
				this.on('click', function()
				{
					$(this).simpleSwitch('toggle');
				});
			}
			return this;
		}
	});
	$(function()
	{
		// 由于初始化效果不太好，暂时屏蔽
		//$('.simple-switch').simpleSwitch('init');
		$('.simple-switch').simpleSwitch('bindEvent');
	});
})(jQuery);