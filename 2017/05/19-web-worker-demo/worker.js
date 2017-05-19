onmessage = function(e)
{
	var data = e.data;
	if(data.cmd == 'start')
	{
		console.log(`第${data.idx}个worker开始工作！`, Date.now());
		fetch('http://demo.liuxianan.com').then(resp => resp.text()).then(html => {
			console.log(`第${data.idx}个worker结束！`, Date.now());
			//postMessage(Date.now());
		});
	}
};

