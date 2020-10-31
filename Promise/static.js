/**
Promise.resolve
Promise.reject
Promise.all
Promise.race
*/
//错误捕获
/**
1.错误可能发生在new promise时传进来的函数内部
2.也可能发生在 then注册的回调中

对于1:直接调用reject(err)即可
let p = new Promise((resolve,reject)=>{
    dosomething((err,data)=>{
        if(err) reject(err)
    })
    else resolve(data);
})
对于2:try catch
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
  //新增的静态方法
  //1.resolve 用于将非promise实例包装成promise实例
  /**
  四种情况
  1.参数为promise实例：不做任何操作,直接返回
  2.具有then方法：先转换为promise再立即执行then方法
  3.普通基本类型:新建一个promise返回
  4.无任何参数,返回状态为fulfilled的promise
   */
  static resolve(value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (
      value &&
      typeof value === "object" &&
      typeof value.then === "function"
    ) {
      let then = value.then;
      return new Promise((resolve) => {
        then(resolve);
      });
    } else if (value) {
      return new Promise((resolve) => resolve(value));
    } else {
      return new Promise((resolve) => resolve());
    }
  }
  //2.reject 始终返回状态为 reject的promise
  static reject(value) {
    if (
      value &&
      typeof value === "object" &&
      typeof value.then === "function"
    ) {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });
    } else {
      return new Promise((resolve, reject) => reject(value));
    }
  }
  //3.all 等到数组中所有promise都为fulfilled之后再resolve
  static all(promises) {
    new Promise((resovle, reject) => {
      let finishedCount = 0;
      const itemNum = promises.length;
      const rets = Array.from({ length: itemNum });
      promises.forEach((promise, index) => {
        Promise.reslove(promise).then((result) => {
          finishedCount++;
          rets[index] = result;
          if (finishedCount === promises.length) resolve(rets);
        }),
          (reason) => reject(reason);
      });
    });
  }

  //4.race 最先完成的
  static race(promises) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          function (value) {
            return resolve(value);
          },
          function (reason) {
            return reject(reason);
          }
        );
      }
    });
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
    //新增try catch
    let thenReturnValue;
    let newPromiseHandle;
    try {
      thenReturnValue = resFunction(this._value);
      //获取对应的状态处理函数
      newPromiseHandle =
        this._state === FULFILLED ? bundle.resolve : bundle.reject;
    } catch (err) {
      thenReturnValue = err;
      newPromiseHandle = bundle.reject;
    } finally {
      newPromiseHandle(thenReturnValue);
    }
  }
  //新增catch方法,同样是调用then方法
  catch(onError) {
    return this.then(null, onError);
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
