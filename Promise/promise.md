# Promise

### 1.Promise/A+规范
**社区提出的解决回调函数方式处理异步的处理方法之一,同样的还有Pormise/A,Promise/B等,只是Promise/A+规范被广泛实现**

### 2.标准解读
- 关于状态,一个Promise的状态只能是Pending,fulfilled,rejected三种状态的其中一种,只能由Pending状态到其他两种状态的改变,切不可逆

- 关于返回值,then方法要返回另一个新的Promise

### 3.基本原理
1. 采用观察者模式,then方法作为注册入口,状态改变通知调用
