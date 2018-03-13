var colors = ['#2599e4', '#FF4949', '#03C300', '#f90', '#FF00BC', '#FFD800'];


//-------------------------折线图-----------------------//
;(function() {
	var mychart = echarts.init(document.getElementById('echarts_demo_1'));
	var data = mockData(); // 模拟数据
	mychart.setOption(getOptions(data));
	// 缩放数据时触发
/*	mychart.on('dataZoom', function(params)
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
	});*/

	function mockData() {
		var base = +new Date(2016, 5, 23);
		var x = [];
		var y_name = ['张三', '李四', '王二麻子']; 
		var y = []; // 这是一个二维数组
		y_name.forEach((name, idx) => {
			y.push([]);
			for (var i = 0; i < 365; i++) {
				if(idx == 0) {
					var now = new Date(base += 24 * 3600 * 1000);
					x.push(xei.formatDate(now, 'yyyy-MM-dd'));
				}
				if(i == 0) y[idx].push(Math.round(Math.random() * 300));
				else y[idx].push(y[idx][i - 1] + Math.round((Math.random() - 0.5) * 20));
			}
		});
		return {x: x, y: y, y_name: y_name};
	}

	function getOptions(data) {
		var legends = data.y_name;
		var series = [];
		data.y.forEach((item, idx) => {
			var serie = {
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




//-------------------------柱状图-----------------------//
;(function() {
	var mychart = echarts.init(document.getElementById('echarts_demo_2'));
	var data = mockData(); // 模拟数据
	mychart.setOption(getOptions(data));

	function mockData() {
		var base = +new Date(2016, 5, 23);
		var x = [];
		var y_name = ['张三', '李四', '王二麻子']; 
		var y = []; // 这是一个二维数组
		y_name.forEach((name, idx) => {
			y.push([]);
			for (var i = 0; i < 7; i++) {
				if(idx == 0) {
					var now = new Date(base += 24 * 3600 * 1000);
					x.push(xei.formatDate(now, 'yyyy-MM-dd'));
				}
				if(i == 0) y[idx].push(Math.round(Math.random() * 300));
				else y[idx].push(y[idx][i - 1] + Math.round((Math.random() - 0.5) * 20));
			}
		});
		return {x: x, y: y, y_name: y_name};
	}

	function getOptions(data) {
		var legends = data.y_name;
		var series = [];
		data.y.forEach((item, idx) => {
			var serie = {
				name: legends[idx],
				type: 'bar',
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
					type: 'shadow' // 折线图用line，柱状图用shadow
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
				boundaryGap: true, // x轴两边留白策略，默认true，折线图设置false，柱状图设置true
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



//-------------------------双Y轴-----------------------//
;(function() {
	var mychart = echarts.init(document.getElementById('echarts_demo_3'));
	var data = mockData(); // 模拟数据
	mychart.setOption(getOptions(data));

	function mockData() {
		var base = +new Date(2016, 5, 23);
		var x = [];
		var y_name = ['张三', '李四', '王二麻子']; 
		var y = []; // 这是一个二维数组
		y_name.forEach((name, idx) => {
			y.push([]);
			for (var i = 0; i < 7; i++) {
				if(idx == 0) {
					var now = new Date(base += 24 * 3600 * 1000);
					x.push(xei.formatDate(now, 'yyyy-MM-dd'));
				}
				if(i == 0) y[idx].push(Math.round(Math.random() * 300));
				else y[idx].push(y[idx][i - 1] + Math.round((Math.random() - 0.5) * 20));
			}
		});
		return {x: x, y: y, y_name: y_name};
	}

	function getOptions(data) {
		var legends = data.y_name;
		var series = [];
		data.y.forEach((item, idx) => {
			var serie = {
				name: legends[idx],
				type: 'bar',
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
					type: 'shadow' // 折线图用line，柱状图用shadow
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
				boundaryGap: true, // x轴两边留白策略，默认true，折线图设置false，柱状图设置true
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
