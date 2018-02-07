var colors = ['#2599e4', '#FF4949', '#03C300', '#f90', '#FF00BC', '#FFD800'];

//-------------------------折线图-----------------------//
(function()
{
	var mychart = echarts.init(document.getElementById('echarts_demo_1'));
	var data = mockData(); // 模拟数据
	mychart.setOption(getOptions(data));
	// 缩放数据时触发
	mychart.on('dataZoom', function(params)
	{
		if(params.end - params.start < 20)
		{
			data.timestamps.forEach((item, idx) => {
				data.times[idx] = xei.formatDate(item, 'HH:mm');
			});
		}
		else
		{
			data.timestamps.forEach((item, idx) => {
				data.times[idx] = xei.formatDate(item, 'yyyy/MM/dd');
			});
		}
		mychart.setOption({xAxis: {
			type: 'category',
			boundaryGap: false,
			data: data.times
		}});
	});

	function mockData() {
		var base = +new Date(2016, 5, 23);
		var x = [];
		var y_name = ['张三', '李四', '王二麻子']; 
		var y = []; // 二维数组
		y_name.forEach((name, idx) => {
			y.push([parseFloat((Math.random() * 300).toFixed(2))]);
			// 一年的时间
			for (var i = 0; i < 365; i++) {
				if(idx == 0) {
					// 每5分钟一条数据
					var now = new Date(base += 5 * 60 * 1000);
					x.push(xei.formatDate(now, 'yyyy-MM-dd HH:mm'));
				}
				y[idx].push(y[idx][i - 1] + Math.round((Math.random() - 0.5) * 20));
			}
			y[idx].pop(); //最后一条数据无效
		});
		return {x: x, y: y, y_name: y_name};
	}

	function getOptions(data) {
		var legends = data.y_name;
		var series = [];
		data.y.forEach((item, idx) =>
		{
			var serie =
			{
				name: legends[idx],
				type: 'line',
				data: item
			};
			serie.markPoint = {
				data: [
					{type: 'max', name: '最大值'},
					{type: 'min', name: '最小值'}
				],
				// symbol: 'diamond',
				symbolSize: function(val) {
					// val表示symbol的值
					return [(val+'').length * 20, 30];
				}
			};
			series.push(serie);
		});
		
		var option = {
			tooltip: {
				trigger: 'axis',
				// 坐标轴指示器，坐标轴触发有效
				axisPointer: {
					type: 'line' // 折线图用line，柱状图用shadow
				}
			},
			legend: {
				data: legends
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					// magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false, // x轴两边留白策略，默认true，折线图设置false，柱状图设置true
				data: data.x
			},
			yAxis: {
				// min: 'dataMin',
                // max: 'dataMax',
                // 是否强制从零刻度开始，一般都建议开启，效果会比较好
                // 这个比配置min和max效果要好，因为它会在dataMin的基础上再留点空白
                scale: true,
				type: 'value',
				axisLabel: {
					formatter: '{value}'
				}
			},
			color: colors,
			series: series
		};
		return option;
	}

})();






;(function()
{
	var mychart = echarts.init(document.getElementById('echarts_demo_1'));
	var data = generateData();
	mychart.setOption(getOptions(data));
	// 缩放数据时触发
	mychart.on('dataZoom', function(params)
	{
		if(params.end - params.start < 20)
		{
			data.timestamps.forEach((item, idx) => {
				data.times[idx] = xei.formatDate(item, 'HH:mm');
			});
		}
		else
		{
			data.timestamps.forEach((item, idx) => {
				data.times[idx] = xei.formatDate(item, 'yyyy/MM/dd');
			});
		}
		mychart.setOption({xAxis: {
			type: 'category',
			boundaryGap: false,
			data: data.times
		}});
	});

	function generateData() {
		var base = +new Date(2016, 5, 23);
		var oneDay = 24 * 3600 * 1000;
		var timestamps = [];
		var times = [];
		var data = [Math.random() * 300];

		for (var i = 1; i < 365; i++) {
			var now = new Date(base += oneDay+xei.getRandom(100000));
			timestamps.push(now);
			times.push(xei.formatDate(now, 'yyyy/MM/dd'));
			data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
		}
		return {timestamps: timestamps, times: times, data: data};
	}

	function getOptions(data) {
		var option = {
			tooltip: {
				trigger: 'axis',
				position: function (pt) {
					return [pt[0], '10%'];
				}
			},
			title: {
				left: 'center',
				text: '大数据量面积图',
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: data.times
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%']
			},
			dataZoom: [{
				type: 'inside',
				start: 10,
				end: 30
			}, {
				start: 0,
				end: 10,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			series: [
				{
					name:'模拟数据',
					type:'line',
					smooth:true,
					symbol: 'none',
					sampling: 'average',
					itemStyle: {
						normal: {
							color: 'rgb(255, 70, 131)'
						}
					},
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgb(255, 158, 68)'
							}, {
								offset: 1,
								color: 'rgb(255, 70, 131)'
							}])
						}
					},
					data: data.data
				}
			]
		};
		return option;
	}

});

