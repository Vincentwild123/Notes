//Promise的链式调用返回新的promsie并且设置状态关联
//真正的链式 Promise 是指在当前 Promise 达到 fulfilled 状态后，即开始进行下一个 Promise（后邻 Promise
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
  then(onFulfilled, onRejected) {
    //修改then函数使得注册回调任务交给handle函数,在本函数内只负责新建promise并获得其状态变更权
    return new VinPromise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject,
      });
    });
  }
  //新增handle函数进行关联绑定  bundle包含注册的回调和负责监听这个promise的resolve函数
  _handle(bundle) {
    if (this._state === PENDING) {
      this._subscribers.push(bundle);
      return;
    }
    //设置状态的响应函数
    let resFunction =
      this._state === FULFILLED ? bundle.onFulfilled : bundle.onRejected;
    if (!resFunction) {
      //如果响应函数没有传进来,直接依据当前promise的状态变更  新promise的状态
      let setNewPromiseImm =
        this._state === FULFILLED ? bundle.resolve : bundle.reject;
      setNewPromiseImm(this._value);
      //可以看到,如果没有设置当前promise的状态变更的响应函数的话就会将当前promsie的状态和值传递给下一个promise
      return;
    }
    //将值经过then注册回调的处理后,返回值传递给新建的promise
    let thenReturnValue = resFunction(this._value);
    //获取对应的状态处理函数
    let newPromiseHandle =
      this._state === FULFILLED ? bundle.resolve : bundle.reject;
    newPromiseHandle(thenReturnValue);
  }

  //将状态由 PENDING 改为 FULFILLED 函数 同时通知订阅者更新
  _resolve(value) {
    //假设resolve传进来的还是一个promise就将当前promise的状态变更权交给它
    if (value && (typeof value === "object" || typeof value === "function")) {
      var then = value.then;
      if (typeof then === "function") {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }
    this._state = FULFILLED; //改变状态
    this._value = value; //存储值
    this._subscribers.forEach((bundle) => {
      this._handle(bundle);
    });
  }
  //将状态由 PENDING 改为 REJECTED 函数 通知通知订阅者更新
  _reject(error) {
    this._state = REJECTED; //改变状态
    this._value = error; //储存值
    this._subscribers.forEach((bundle) => {
      this._handle(bundle);
    });
  }
}
