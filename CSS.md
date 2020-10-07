# CSS
### 盒子阴影
**box-shadow(x偏移,y偏移,blur 模糊度,spread,color,postion,insert内阴影)**
+ 多边框 box-shadow:0  0  0  1px red;
+ 设置blur会蔓延到周围,spread会使阴影沿z轴收缩和扩张 
---
### 背景
+ background-origin 定位区域 [content-box/border-box]
+ background-clip  绘制区域
---
### 文字
+ work-wrap:work-break 对超出范围的长单词断句
+ text-overflow 设置省略号
+ font-face 新字体
---
### 2d和3d转换
+ 2d translate平移  rotate旋转  skew偏移  scale放缩   matrix矩阵
+ 3d 同上
---
### transition
### 多列
### 伪类和伪元素  
+ 伪类是: 伪元素是::
+ 伪类可以叠加使用,伪元素只能出现在末尾
+ 伪类优先级同类,伪元素优先级同标签
---
### 选择器优先级
+ !important > 行内样式> ID选择器 > 类选择器/伪类> 标签/伪元素 > 通配符 > 继承 > 浏览器默认
---
### link和@import
+ link是html标签,链接css只是其中一种用法,@import是完全的css范畴,只能用于导入css
+ link兼容好,link在html解析过程中加载,@import在html解析完成后加载
---
### 浮动清除(处理子元素浮动,高度坍缩问题)
+ 给父元素设置高度
+ 父元素设置overflow:hidden触发BFC
+ 增加一个clear:both空标签
+ 使用伪类after和zoom 1

+ 在类名为clearfix的元素后面加入内容
```css
.clearfix::after{
  display: block;
  clear: both;
  content: "";
  height: 0;
  line-height: 0;
  visibility: hidden;
}
.clearfix{
  zoom: 1;  //因为IE6不支持:after伪类 zoom放缩
}
```
---
### 垂直水平居中
+ position top left transform
+ position top left right bottom margin
+ table-cell text-align vertical-align
+ line-height text-align
+ flex
---
### BFC
1. 条件
+ 设置浮动float
+ position:[absolute/fixed]
+ display:[inline-block/table-cell/table-caption]
+ overflow:[hidden/auto/scroll]
2. 特性
+ 外边距margin相加(正常文档流中兄弟box之间距离为外边距较大者)
+ 不能被浮动元素覆盖
+ 两栏布局中,左边栏设置左浮动,右一列设置BFC宽度自适应
+ BFC高度计算包含浮动子元素
---
### 浏览器兼容
+ margin和padding默认值不同
+ IE6双边距
+ 图片默认有边距
+ cursor:hand在safari不支持
###
--- 
+ position:absolute/fixed优先级最高,有他们在时,float不起作用,display值需要调整.float或者absolute定位的元素只能是块元素或表格
---
### px,em,rem,rpx
+ px:精确像素
+ em:相对单位,父节点字体的大小,font-size计算
+ rem:相对单位,根节点字体大小font-size计算
+ rpx:(responsive pixel),微信小程序,规定屏幕宽为750rpx
---
### flexbox
1. 启动Flexbox格式化上下文
**display:flex || inline-flex 自动变成flex容器,子元素自动变成flex-item**
2. flex容器属性
  1. 设置item的排列方向和顺序
**flex-direction:row||column||row-reverse||column-reverse**
  2. 设置item在容器内是否换行,默认不换行,wrap-reverse设置换行并且行的顺序反方向排列
**flex-wrap:wrap||nowrap||wrap-reverse**
  3. flex-flow:flex-direction和flex-wrap的速记写法
  4. 设置item在主轴方向上的对齐方式,flex-start为默认值
**justity-content:flex-start||flex-end||center||space-between||space-around**
  5. 设置items在副轴方向上的对齐方式,stretch是默认值
**align-items:flex-start||flex-end||center||stretch||baseline**
  + stretch:让所有item高度和flex容器一样高
  + flex-start:顶部对齐
  + flex-end:底部对齐 
  + center:居中
  + baseline:基线对齐
  6. 用于多行item在副轴上的排列方式
**align-content:flex-start||flex-end||center||stretch**
3. flex项目属性
 1. order:默认值为0,此时按照html中的顺序排列,设置为正数,越大排越后,相同按照html中的顺序
 2. flex-grow/flex-shrink
**控制flex项目在容器有多余空间时如何放大和缩小,0就是关闭,1是开启,默认情况下扩大为0,缩小为1**
 3. flex-basis
**设置容器初始大小,单位不能省略,默认是auto**
 4. flex速记写法
**flex:flex-grow flex-shrink flex-basis**
 5. align-self:auto||flex-start||flex-end||center||baseline||stretch
   + 没flex-basis,或者flex为0是绝对的,只基于flex-grow比例布局
   + 有flex-basis是相对的,基于内容大小.
   + flex:none相当于 flex:0 0 auto
   + flex:auto 相当于 flex:1 1 auto
   + flex:positive number相当于flex:x 1 0,按照比例算
 6. 在item设置margin值,justify-content失效,margin方向会占据剩余空间
4. flex-item-size的宽度计算:一个item宽度为margin+border+padding+content
 1. 元素没有默认固定宽高,flex-basis 的优先级比 width[height]: 非auto; 高
 2. 元素有默认固定宽高,比如input,以固定宽高为下限,flex-basis为上限
 3. 对于设置了min||max-height||width的元素,最大最小值,分别为上下限,flex-basis在限度内,则为flex-basis
 4. height/width:auto,内容长度比 flex-basis 大,则 flex-item content以内容长度来决定,且无法shrink
 5. 如果设置了 visibility: hidden; | visibility: collapse; | transform: scale;的flex-item content 依然被算进主轴尺寸,CSS 解析器依然会以他们 flex-grow | flex-shrink 将可用空间 或者 负可用空间 分配给他们,如果设置了display: none; CSS解析器不会对该item的空间进行计算,也不会对其grow空间
5. flex-item设置absolute对位置的影响
1. 有top,left定位的,按top,left定位,没有的按照justify-content,align-items对齐
2. 上一步后,margin影响位置,padding只影响大小
