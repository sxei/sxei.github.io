//-------------------------折线图-----------------------//
(function()
{
	var myChart = echarts.init(document.getElementById('echarts_demo_1'));
	var data = generateData();
	myChart.setOption(getOptions(data));
	// 缩放数据时触发
	myChart.on('dataZoom', function(params)
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
		myChart.setOption({xAxis: {
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
		data.y.forEach((item, idx) =>
		{
			var serie =
			{
				name: legends[idx],
				type: view_type,
				data: item
			};
			// 如果显示气泡
			if(this.views[i].show_bubble) {
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
			}
			series.push(serie);
		});
		
		var option = {
			tooltip: {
				trigger: 'axis',
				// 坐标轴指示器，坐标轴触发有效
				axisPointer: {
					type: view_type == 'bar' ? 'shadow' : 'line' // 默认为直线，可选为：'line' | 'shadow'
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
				boundaryGap: view_type == 'bar', // x轴两边留白策略，默认true，折线图设置false，柱状图设置true
				data: xdata
			},
			yAxis: {
				min: 'dataMin',
				max: 'dataMax',
				type: 'value',
				axisLabel: {
					formatter: '{value}'
				}
			},
			color: this.colors,
			series: series
		};
		this.echarts_instance[i].setOption(option);
		return option;
	}

})();






(function()
{
	var myChart = echarts.init(document.getElementById('echarts_demo_1'));
	var data = generateData();
	myChart.setOption(getOptions(data));
	// 缩放数据时触发
	myChart.on('dataZoom', function(params)
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
		myChart.setOption({xAxis: {
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

})();

