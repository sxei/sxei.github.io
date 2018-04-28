// webworker里面不能访问window，取而代之的是self，而且不能操作DOM
console.log('start');
for(var i=0; i<10000; i++) {
    console.log(i);
}
console.log('end');
// 给主线程发消息，说我已经结束了
postMessage({cmd: 'end'});