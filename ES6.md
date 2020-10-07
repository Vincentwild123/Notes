# ES6

1. for 循环括号内作用域与循环体作用域不同
2. let const 声明的变量有暂时性死区
3. 块级作用域必须有大括号
4. 将对象冻结:object.freeze();彻底冻结

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
};
```

5. let const class 声明的对象不是全局对象属性.
6. ES2020 中设置了 globalthis 作为所有环境下的全局对象.

---

7. 解构赋值,用处,取函数返回值,取 json 值,具有 lterator 接口,结构不成功就是 undefined

- 数组解构赋值:对应模式相同的位置赋值
- 当严格等于 undefined 是默认值生效,如果是表达式惰性求值
- 对象的解构赋值:和 key 相同赋值,赋值的是变量不是 key,key 赋值完是 undefined,可以取得继承值
- 数组和对象可以嵌套赋值
- 对象可以给数组赋值
- 字符串也可以赋值
- 等号右边不是对象就先转成对象再赋值

---

8. 给函数参数赋值中,只要传了值就不用取默认值,给参数默认值还是给参数内的变量默认值
9. 字符串拓展
10. 增加遍历器,可识别大于 0xFFFF 码点
11. 模板字符串:反引号标识,保留空格换行,\${}镶嵌变量,变量没有声明就会报错,不是 string 调用 tostring 方法
12. 正则扩展:y 修饰符,粘连匹配
13. 三点运算符:将取出参数对象中的所有可遍历属性,拷贝到当前对象之中
14. Number 扩展:Number.isFinite,isNaN,前者非数值一律返回 flase,后者非 NaN 一律返回 flase,只对数值有效,将 parseInt,parseFloat 移植到 Number 对象上.Math 对象扩展,Math.trunc 直接去除小数部分
15. 函数扩展:默认参数单独形成一个作用域,将 arguments 类数组对象转换成 rest 对象真数组,增加 length 属性,值为没有指定默认值的参数个数,不包括 rest 参数

- bind:创建一个新函数,绑定执行对上到参数对象上.
- apply:马上执行调用它的函数,参数为数组
- call:马上执行调用它的函数,参数时单个传递的

14. 箭头函数
1. 没有/大于 1 参数要用圆括号,多余一条语句,要用大括号括起来.
1. this 对象是定义时就在的对象,没有 arguments 对象,不能做 generator 函数
1. 不适用场合:定义对象方法,需要动态 this 时,比如监听事件.
1. 数组常用方法
1. push/pop 改变原数组,向数组末尾添加一个元素,返回数组新的长度.
1. shift/unshfit 前面,改变原数组
1. concat 返回新数组,原来的数组不变
1. join 将字符用连接符连接返回
1. sort(function) 默认按 unicode 排序,也可以按照 function 指定顺序
1. map /foreach/fliter/reduce 调用每个元素,前者返回新数组,后者返回 undefined.fliter 返回新数组,元素为符合条件的元素,reduce 递归迭代
1. slice/splice slice 同字符串 slice ,splice(index,howmach,arr1)删除 howmuch 个元素,并插入 arr1
1. every/some,返回 boolean,相当于对每个元素并或操作
1. 数组扩展
1. 三点运算符与 rest 参数,三点运算符将数组转为逗号分割的序列,rest 参数将逗号分割的序列合并成一个数组.空数组不产生任何效果.只有在函数调用时,扩展运算符参可以放入圆括号中.数组赋值只能放在最后.
1. Array.from,将类数组对象和遍历器对象转换成数组
1. fill 填充
1. keys,values,entries,返回遍历器对象,再用 for of 遍历
1. ES5 处理空位:

- forEach(), filter(), reduce(), every() 和 some()都会跳过空位.
- map()会跳过空位,但会保留这个值
- join()和 toString()会将空位视为 undefined,而 undefined 和 null 会被处理成空字符串.
  ES6 将空位转换为 undefined

17. Symbol 表示独一无二的值,新的基本类型
1. 构造函数接受一个字符串作为描述
1. 即使参数相同,得到的 Symbol 也是不一样的
1. 能别的数据类型运算会报错
1. 转为 boolean 值为 true
1. 作为属性名时不能用点运算符赋予
1. 在对象内部的定义属性时只能放在方括号里
1. 用于消除魔法字符串
1. 不会被普通的遍历机制遍历,可以用 Reflect.ownKeys API 遍历
1. Symbol.for 可以查看某个 Symbol 值使用过没有,使用过则重新用,没使用过就注册一个新的
1. Set 和 Map 新的引用型对象,增强数组和对象

- Set:值唯一的数组,接受数组初始化,NaN 等于自身 1.方法: 1.操作方法;add , delete, clear,has 2.遍历方法:遍历顺序时插入顺序,类似队列,keys,values,entries,foreach,默认 values 方法遍历
- map:值可以不是字符串的对象

19. Commonjs AMD ES6

- CommonJS:服务器端模块规范,模块同步加载,输出值的缓存 1.单独文件作为模块,单独作用域
  2.module.exprots 输出对象
  3.require 读取文件并执行,返回 module.exprots 对象
- AMD:异步模块定义,requireJS
- ES6:统一服务器和浏览器模块化规范
  1.  export 对外输出接口 动态绑定
  2.  import 静态加载,按需加载,加载模块,变量名要与输出的变量名一致,变量只读
  3.  as 重命名
  4.  - 全部加载
  5.  export defualt 输出的变量不需要用同名变量接
      6.import()动态加载,返回 promise 对象

20. Class 语法糖
    1.c onstructor 函数定义的属性是实例自己的属性相当于之前的构造函数 2. 其他函数均定义在原型上,供所有实例调用 3. getter,setter,拦截属性 4. 静态方法:直接在类上调用,不被实例继承,但可以被子类继承,继承 extends
21. 构造函数和原型对象

- 构造函数自身的属性和方法无法被共享,而原型对象的属性和方法可以被所有实例对象所共享.

```js
Object:
       getPrototypeOf 返回对象的原型
       setPrototypeOf(nowobject,newobject)为现对象设置原型对象
       create(object) 以此为原型生成对象
       assign(target,soures....)将任意多个源对象可枚举属性拷贝给目标对象
       defineProperties(obj)添加或修改自有属性
       getOwnPropertyNames (obj)返回自身属性名包括不可枚举的属性
       keys(obj) 返回可枚举属性
Object.prototype:
       isPrototypeOf:A是否为B的原型
       propertyEnumerable: 判断是否可枚举
```

22. 对象的扩展
1. 描述对象:object.getOwnPropertyDescriptor
1. 对象循环与枚举:尽量用 object.keys()遍历
   - for...in 遍历对象自身的和继承的和可枚举的
   - object.keys 对象自身可枚举
   - object.assign 拷贝自身可枚举
   - object.getOwnPropertyNames 自身可枚举+不可枚举
   - object.getOwnpropertySymbols 返回 Symbol 属性键名
   - reflect.ownKeys 所有键名
     遍历顺序:
   - 首先遍历所有数值键,按照数值升序排列.
   - 其次遍历所有字符串键,按照加入时间升序排列.
   - 最后遍历所有 Symbol 键,按照加入时间升序排列.
1. 三点运算符:将所有自身可遍历但尚未被读取的属性浅拷贝到新对象上.非对象报错.
1. 链判断运算符 ?.
1. Null 判断运算符 ??
1. 深拷贝:序列化和反序列化,reflect.ownkeys 遍历,lodash 库
1. 新增方法
   1. object.assign,只能拷贝原始对象自身的值,不能克隆继承的值,想要克隆继承可以

```js
object.assign(object.create(object.getprototypeof(obj)), origin); //symbol值也会被拷贝
```

- 用途: 1.为对象增加属性 2.为对象添加方法 3.克隆对象

2. object.getownpropertydescriptors:返回描述对象,主要解决 object.assign 不能拷贝 get set 方法问题

```js
const shallowMerge = (target, source) =>
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); //拷贝
```

3. object.getprototypeof,object.setprototypeof,object.create

4. promise,异步编程,为解决回调函数 hell
   1.Promise 对象,异步事件包含容器,对象状态不受外界影响,一旦状态改变就不会再改变 2.状态:pending 进行中,fulfilled 已成功,rejected 已失败 3.缺点:
   无法取消,不设置回调函数,内部错误无法捕捉,pending 状态无法查看进度 4.使用:实例生成后可用 then 函数指定成功,失败的回调函数 then(function1,function2)参数为 promise 参数传出对象

```js
new Promise(function(resolve->将状态改变为成功,reject->将状态改为失败,并传出报错){})
```

5. 特点:promise 新建后马上执行
6. resolve,reject 参数:会将这个函数传递给回调函数,如果参数是 promise 对象,主 promise 自身状态无效,按照参数 promise 状态触发回调.
7. then:方法返回新的 promise 实例,前一个 then,return 的值作为下一个 then 的参数,只能接受函数作为参数,不是函数直接跳过.
8. catch:对前面 promise 对象错误的捕获,不指定错误无法被捕获,promise 内部报错不会影响外部代码执行
9. finally:不管对象最终状态如何都会执行这个回调
10. 一些函数:
11. promise.all([p1,p2,p3]):参数可以不是数组但必须有遍历器接口
    p 的状态: 1.所有成功才会变成成功,返回所有实例返回值组成的数组 2.有一个 reject 就会 reject,返回值为第一个 reject 的返回值 + 注意:如果参数 promise 对象自己捕获了错误,p 不会接收到错误
12. promise.race([p1,p2,p3]):
    p 的状态: 就是参数中第一个改变的状态
13. promise.allSettled([p1,p2,p3]):
    p 的状态:等所有参数实例都完成后(无论成功还是失败),就会变成 fulfilled,回调函数参数是 promise 实例数组
14. promise.any([p1,p2,p3]):
    p 的状态:有一个成功就成功,所有失败才失败
15. promise.resolve(): 1.参数是 promise 实例:原封不动返回这个实例
    2.thenable 对象:转成 promise 对象,再马上把 then 方法加入异步队列 3.不是 thenable 对象或不是对象:返回新的 promise 实例,再将状态变成成功. 4.不带任何参数:同 3,then 回调无参数 5.立即 resolve 的 promise 在本轮事件循环结尾执行
    6.promise.reject():返回一个状态为 reject 的 promise 对象,catch 参数是该函数的参数
16. iterator 遍历器: 1.作用:提供统一的遍历接口
    使元素按某种次序排序
    供 for of 消费 2.默认的 iterator 接口部署在数据结构的 Symbol.iterator 属性上,执行这个函数会返回一个遍历器 3.使用接口遍历的场合: 1.解构赋值 2.扩展运算符 3.接受数组作为参数的场合,数组的遍历器接口只返回具有数字索引的属性
    4.for in 遍历对象,for of 遍历数组
17. Generator 状态机  
     1.函数语法 1.写法:function _ name(){} ,函数内部有 yield 表达式定义每个状态 2.函数调用: 返回一个遍历器对象,用 next 方法移动,遇到 yield 表达式就暂停执行,将 yield 表达式后面的表达式值返回,作为 value 的值,如此这般直到 return,没有 return 则返回对象的 value 属性值为 undefined
    3.next 方法调用:返回一个有 value 和 done 属性的内部状态对象
    4.yield 表达式只能放在 generator 函数内,如果在另一个表达式中,必须放在圆括号里面,用作参数或赋值表达式的右边,可以不加括号
    5.next 方法参数:函数内部的 yield 表达式没有返回值,若想将前一步状态传到下一步就在 next 函数中添加参数  
     6.for of 遍历 generator 函数返回的遍历器对象,最后一个值不会返回
    7.for of 循环,拓展运算符,解构赋值,Array.from 都是使用这个遍历器对象 8.原型函数:
    1.Generator.prototype.throw:遍历器对象在函数体外抛出错误,函数体内捕获,如果函数体内没有部署 try...catch 代码块,将会被外部的 try...catch 代码块捕捉,throw 方法被捕获以后,会附带执行 yield 表达式,不影响遍历,一旦内部错误没有被捕获,函数运行提前结束.
    2.Generator.prototype.return:返回给定的值,并终结函数,不提供参数,返回对象 value 为 undefined
    9.next,throw,return:
    next 函数是将 yield 表达式替换成一个值
    throw 函数是将 yield 表达式替换成一个 throw 语句
    return 是将 yield 表达式替换成一个 return 语句
    10.yield _:用在 Generator 函数内部调用另一个 generator 函数,后面跟一个遍历器对象,遍历遍历器对象  
     11.作为对象属性:简写成 \* functionname(){} 12.协程与线程:,同一时间可以有多个线程处于运行状态,但是运行的协程只能有一个,其他协程都处于暂停状态.此外,普通的线程是抢先式的,到底哪个线程优先得到资源,必须由运行环境决定,但是协程是合作式的,执行权由协程自己分配.
18. Generator 函数的异步应用 1.特性:Generator 函数可以暂停执行和恢复执行,函数体内外的数据交换和错误处理机制.
    2.Thunk 函数,传名调用,将多参数函数转换成一个只接受回调函数作为参数的函数
    3.Thunkify 模块:将控制权由回调函数返回.
    4.co 模块:将控制权由 promise.then 返回
    5.async/await: 1.与 Generator 区别:自带执行器,await 命令后面可以是 promise 对象和原始类型的值,返回值是 promise 对象. 2.语法:
    1.async 函数内部的 return 语句的值会作为 then 方法回调函数的参数.
    2.async 函数内部抛出错误,会导致返回的 Promise 对象变为 reject 状态.抛出的错误对象会被 catch 方法回调函数接收到. 3.返回的 promise 对象只有当函数体内的全部异步操作完成后才能改变状态. 4.任何一个 await 后面的 promise 状态变为 reject,后序都不会执行,并抛出错误,可以用 try...catch 块包裹,使后面的语句照常执行 5.没有前后关系的两个异步操作,让其同步触发

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

6. async 函数保留运行栈
