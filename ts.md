# TS
### 原始数据类型
+ boolean,number,string,null,undefined,symbol,bigint

+  void
**空值,表示没有任何返回值**

+ undefined,null是所有类型的子类型

+ Any
**表示任何值和声明时未赋予类型的值**

+ 类型推论
**当声明和赋值同时发生时,引擎会马上推断出值得类型并且不能改变**
**如果定义时没有赋值,不管之后有没有赋值都会被推断成any**

+ 联合类型
```ts
let s:string|number|boolean;
```
**访问联合类型变量得方法只能访问公共拥有的属性和方法,赋值后引擎马上推断出一个类型,随之方法和属性改变**

### 接口 interfaces
+ 定义行为
+ 赋值的时候,变量的形状必须和接口形状保持一致
+ 可选属性(可以存在也可以不存在)
*name:?string*
+ 任意属性
**一旦定义了任意属性,那么确定属性和可选属性的类型都必须是他的类型的子集**
*[propName:string]:any*
+ 只读属性
**只能在声明时赋值,后续赋值报错**
*readonly name:string*

### 数组
1. 类型+方括号 
*:string[]*
**不允许出现不同的类型**
2. 数组泛型
*Array<elemType>*
3. 用接口表示数组

4. 类数组

5. any
**表示数组允许出现任何类型**

### 函数
1. 定义方式
 + 函数声明
```js
function name(params){}
```
 + 函数表达式
```js
let name = function(params){}
```
2. 输入输出的约束
 + 输入参数的约束:类型,数目
 + 函数表达式的约束
 **对左边要赋值变量也要进行约束**
```js
let name:(x:string,y:string)=>number = function(x:string,y:string):number{};
```
3. 可选参数
**?:定义,只能出现在最后一个位置**

4. 参数默认值
**name:string='default'**

### 类型断言
**手动指定一个值的类型**
*值 as 类型*
1. 断言的使用场景
+ 将一个父类型断言为更加的子类型
+ 将任何类型断言为any类型,达到编译时期不报错
+ 将any类型断言为更加具体的类型

2. 断言的限制
**要试A能够被断言成B,要A是兼容B的类型**

3. 总结
**断言是欺骗typescript编译器的行为,在编译完成后就会被删除,只是作为编写代码时不报错的手段**


### 声明文件
**使用第三方库时,要引用它的声明文件,才能获得相应的代码补全,接口提示功能**
1. 语法全解
```js
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举
declare namespace 声明全局对象

interface/type 声明全局类型
export 导出全局变量

declare global 扩展全局变量
declare module 扩展模块
```
### 进阶
1. type:定义类型别名
2. 元组
3. enum:枚举
4. class:类
+ 访问修饰符:public private protected
- public:可以在任何地方访问,可以继承实例化
- protected:可以在本类和子类中使用,可以继承不能实例化
- private:不能在类外部访问,不能继承不能实例化

+ 修饰符和readonly还可以使用在构造函数参数中,等同于在类中定义该属性的同时给该属性赋值

+ 抽象类
**不允许被实例化,抽象方法必须被子类实现**

5. 类和接口
**与面向对象的语言类似,但是接口可以继承类**

6. 泛型
**不预先指定具体类型,使用的时候再指定类型,相当于将类型当成参数**
