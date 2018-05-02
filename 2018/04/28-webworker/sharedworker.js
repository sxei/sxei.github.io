self.onconnect = (e) => {
	let port = e.ports[0];
	port.addEventListener('message', (e) => {
        console.log(e.data); // 特别注意，共享线程的console.log是看不到的
        port.postMessage('你好，我是SharedWorker！');
	});
	port.start();
}