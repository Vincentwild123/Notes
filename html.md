# HTML
### 新增的段落区块元素
+ section部分,article文章,nav导航,header网页头,footer页脚,aside边栏,hgroup整合section
---
### audio和video
##### audio
1. 属性
+ controls显示控制界面  autoplay加载完后自动播放  loop循环播放  currenttime播放时间  volume音量 duration播放时间 ended是否播放完毕 starttime起始播放时间 currentsrc 正在播放的文件
2. 事件
+ load加载  play播放  pause暂停
##### video 
1. 属性
+ src poster封面 preload 预加载  autoplay自动播放  loop循环播放 Controls 控制条  width宽度  height高度
---
### 其他新增标签
+ Mark高亮  figure代表独立的内容  figcaption描述  data  progress进度条 
---
### box-sizing盒子模型
+ content-box宽度就是盒子内用宽度标准盒模型
+ border-box包含border和padding  怪异盒模型
---
### 块级元素和行内元素及其包含关系
1. 自闭标签:br换行 hr 水平线  input表单组件  img图片容器 meta link
2. 常用的块级元素:表单 标题 li  新增区块元素 表格 audio
3. 常用行级元素:button img  input  video  设置高度可以设置line-height margin padding 都只是设置左右有效
### 元素居中5种方法
1. position absolute top 50%  left 50%   trsnlate(-50%,-50%)
2. flexbox
3. absulote  top 0 left 0 right 0 bottom  0  margin 0 auto
4. father table-cell vertical-align middle  son margin 0 auto
5. margin 0 auto  margin-top  width/2
### 常问
##### doctype的意义是什么？
+ 让浏览器以标准模式渲染
+ 让浏览器知道元素的合法性
##### html,xhtml,html5之间有什么关系？
+ HTML属于SGML
+ XHTML属于XML(HTML是XML严格化的结果)
+ HTML5不属于SGML或XML,比XHTML宽松
##### HTML5带来了哪些变化？
+ 新的语义化元素(section,nav,sidebar...)
+ 表单增强(html5验证)
+ 新的API(离线,音视频,canvas,svg,本地存储)
+ 分类和嵌套的变更
##### em和i有什么区别？
+ em是语义化的标签,表强调
+ i标签是纯样式化的标签,表示斜体,现在更多用于做icon
+ html5中不推荐使用i标签,现在一般用于做icon
##### input标签的name属性有什么意义？
+ name 属性规定 <input> 元素的名称.
+ name 属性用于在 JavaScript 中引用元素,或者在表单提交后引用表单数据.
+ 注意:只有设置了name属性的表单元素才能在提交表单时传递它们的值.
##### label标签的for属性有什么意义？
+ label可以通过for和<input type = "check" name ="xxx">的name进行绑定
+ 起到点击label时等同于点击了input的作用
##### 通过ajax提交的情况下,是否需要form？
+ submit,reset等type需要form才可以使用
+ jq中有针对form的获取表单数据的方法
+ 框架或验证组件可以更好地做表单验证
+ 对用户十分友好
+ 凡是涉及到表单元素的地方都建议放上form标签
##### 如何理解HTML？
+ HTML可以看做是一种文档, 一种结构,骨架,尤其是html5新增标签让这种结构增色不少.
##### HTML元素的嵌套关系是如何的？
+ 块级元素可以包含行内元素
+ 块级元素不一定能包含块级元素
+ 行内元素一般不能包含块级元素(a元素是个例外)
##### 为什么a元素包裹div元素是合法的？
+ a标签能否包含div取决于a元素的上层元素,如果a元素的上层元素能够包含div,则可以,否则不可以(相当于a是透明的)
##### 如何理解语义化？
+ 让人更容易读懂(增加代码可读性)
+ 机器容易理解结构(搜索,读屏软件)
+ 有助于SEO(让搜索引擎更容易读懂)
##### 默认情况下,哪些HTML标签是块级元素？哪些标签是内联元素？
+ 块级元素:display:block/table;有div h1 h2 table ul ol p等(独占一行)
+ 内联元素:display:inline/inline-block；有span img input button等
##### 哪些元素可以自闭？
+ input img br hr meta link
##### HTML和DOM的关系是什么？
+ HTML是死的,就是一个字符串而已,而DOM是由HTML解析而来的,是活的,我们可以通过JS维护DOM(DOM操作)
##### property和attribute的区别是什么？
+ attribute是死的,是HTML中标签上的属性
+ property是活的,是DOM树上的属性
##### form的作用有哪些？
+ 直接提交表单
+ 可以使用submit/reset按钮
+ 便于浏览器保存表单
+ 第三方库可以整体提取表单
+ 第三方库可以进行表单验证
##### 常见浏览器内核:
+ IE trident 三叉戟
+ 火狐 Gecko 壁虎
+ Chorme和safari用webkit 铬  
+ 国产:极速模式webkit内核 兼容trident内核  

