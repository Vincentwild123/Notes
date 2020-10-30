/**
promise基本思想
1.观察者模式   then方法赋值添加监听器  resolve负责触发监听器
2.链式调用    内部方法尽量返回新的promise实例表示异步事件的同步性
*/
/**

 */
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class VinPromise {
  //内部属性
  _state = PENDING;
  _value = null;
  _subscribers = [];
  //构造函数
  constructor(fn) {
    //外部传入的函数,立即执行
    fn(this._resolve.bind(this), this._reject.bind(this));
    //绑定promise实例,只改变自身的状态和值
  }
  //注册函数入口
  then(sub) {
    if (this._state === PENDING) this._subscribers.push(sub);
    //如果当前的promise状态还没有发生改变就把订阅者继续推到订阅队列
    else if (this._state === FULFILLED) sub(this._value);
    //如果进行订阅时,状态已经改变完全就直接执行
  }
  //将状态由 PENDING 改为 FULFILLED 函数 同时通知订阅者更新
  _resolve(value) {
    this._state = FULFILLED; //改变状态
    this._value = value; //存储值
    this._subscribers.forEach((sub) => {
      sub(value);
    });
  }
  //将状态由 PENDING 改为 REJECTED 函数 通知通知订阅者更新
  _reject(error) {
    this._state = REJECTED; //改变状态
    this._value = error; //储存值
    this._subscribers.forEach((sub) => {
      sub(error);
    });
  }
}
let p = new VinPromise((resolve, reject) => {
  setTimeout(() => {
    let value = "我是信息";
    console.log("时间到!");
    resolve(value);
  }, 5000);
});
p.then((value) => {
  console.log("订阅者1号收到信息" + value);
});
p.then((value) => {
  console.log("订阅者2号收到信息" + value);
});

setTimeout(() => {
  p.then((value) => {
    console.log("订阅者3号收到信息");
  });
}, 6000);
