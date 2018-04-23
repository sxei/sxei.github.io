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
		var y_name = ['张三', '李四']; 
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
				type: idx == (data.y.length-1) ? 'line' : 'bar', // 最后一个看作折线图
				data: item,
				smooth: true, // 平滑曲线
				yAxisIndex: idx == (data.y.length-1) ? 1: 0 , //  放在哪个Y坐标轴
				barMaxWidth: 60
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
				// 为了加一个百分号，写这么多代码
				formatter(params) {
					console.log(params)
					let html = '';
					// 注意params经过大盘线时不是数组
					params = params instanceof Array ? params : [params];
					params.forEach((param, i) => {
						let percentMode = param.seriesIndex == 1; // 最后一个看成百分比
						if(i == 0) html += param.name + '<br>';
						html += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${param.color}"></span>`;
						html += `${param.seriesName}：${param.value}${percentMode?'%':''}<br>`;
					});
					return html;
				},
				// 这种方式没法为多个系列配置格式化模板
				//formatter: '{b}:<br>{a0}：{c0}%<br>',
				// 坐标轴指示器，坐标轴触发有效
				axisPointer: {
					type: 'line'
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
			yAxis: [
				{
					name: '身高',
					type: 'value',
					scale: false,
					axisLabel: {
						formatter: '{value}'
					}
				},
				{
					name: '百分比',
					type: 'value',
					scale: true,
					axisLabel: {
						formatter: '{value}%'
					}
				}
			],
			color: [colors[0], '#ed7d31'],
			series: series
		};
		return option;
	}
})();



//-------------------------特殊折线图-----------------------//
;(function() {
	var mychart = echarts.init(document.getElementById('echarts_demo_4'));
	var data = mockData(); // 模拟数据
	mychart.setOption(getOptions(data));

	function mockData() {
		var base = +new Date(2016, 5, 23);
		var x = [];
		var y_name = ['张三', '李四', '王二麻子']; 
		var y = []; // 这是一个二维数组
		y_name.forEach((name, idx) => {
			y.push([]);
			for (var i = 0; i < 20; i++) {
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

			if(idx == 1) {
				serie.markLine = {
					data: [{
						name: '平均线',
						type: 'average',
						//yAxis: 50
					}]
				};
			}

			serie.markPoint = {
				data: [
					{type: 'max', name: '最大值'},
					{type: 'min', name: '最小值'}
				],
				// symbol: 'diamond',
				symbolSize: function(val) {
					console.log(val);
					// val表示symbol的值
					return [((val || 100)+'').length * 20, 30];
				}
			};
			if(idx == 1) {
				serie.markPoint.data.push({coord: [data.x[100], item[100]], name: '特殊标注值1'})
				serie.markPoint.data.push({coord: [data.x[150], item[150]], name: '特殊标注值2'})
			}
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
				data: data.x,
				axisLabel: {
					rotate: 45, // 文字旋转45度
					interval: 0, // 强制显示所有X轴刻度，1每隔1个显示，2表示每隔2个显示，auto表示自动，默认auto
				}
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
			grid: {
				left: 40, // 控制左右边距，默认为10%
				right: 40
			},
			color: colors,
			series: series
		};
		return option;
	}
})();




//-------------------------特殊柱状图-----------------------//
;(function() {
	var mychart = echarts.init(document.getElementById('echarts_demo_5'));
	var data = mockData(); // 模拟数据
	mychart.setOption(getOptions(data));

	function mockData() {
		var base = +new Date(2016, 5, 23);
		var x = [];
		var y_name = ['张三']; 
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

			// 特殊需求：把第1个系列、第2和4条数据标粗
			if(idx == 0) {
				serie.data[2] = {
					value: serie.data[2],
					itemStyle: {
						normal: {
							color: 'red',
							//borderWidth: 2
						}
					}
				}
				serie.data[4] = {
					value: serie.data[4],
					itemStyle: {
						normal: {
							borderColor: '#000',
							borderWidth: 2
						}
					}
				}
			}

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
