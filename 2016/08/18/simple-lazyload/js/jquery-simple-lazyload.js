/**
 * 图片懒加载插件，与绝大多数同类插件不同的是，本插件同时支持img的src和div的背景图懒加载
 * 将图片以背景图的方式展示到div的好处是可以轻松实现图片不变形，所以背景图懒加载的需求还是比较常见的
 * 使用方法：将页面中展示图片的div或者img的图片地址以data-lazy-src="xxx"形式指定
 * 然后引入本JS即可，无需任何其他代码，支持动态生成内容的懒加载，但是每次动态增加内容之后需主动调用一句：
 * $(window).scroll();
 * @start 2016-08-18
 * @last 2016-09-08
 * @author lxa
 */
;(function($)
{
	$(window).on('scroll resize load', function(e)
	{
		var notFoundCount = 0, maxNotFound = 2, screenHeight = $(window).height();
		$('[data-lazy-src]').each(function()
		{
			var pos = this.getBoundingClientRect();
			if(pos.bottom <= 0) return true; // 如果当前图片在视野上方，继续往下查找
			if(pos.top >= screenHeight) return (notFoundCount++) < maxNotFound; // 如果连续超过 maxNotFound 张图片都在视野下方，停止查找，注意只有从上到下的图片布局才能这样判断
			var src = this.dataset.lazySrc;
			if(!src) return;
			if(this.nodeName === 'IMG') this.src = src;
			else this.style.backgroundImage = 'url(' + src + ')';
			this.removeAttribute('data-lazy-src');
		});
	});
})(jQuery);