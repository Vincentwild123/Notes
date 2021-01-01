# React

### react 优势:纯 js,生态活跃,易于定制化和拓展

## JSX

1. js 的拓展
2. 与 xml 类似
3. 冲突解决

## 组件

1. 无状态组件---专注于 UI 和简单逻辑,比较小型
2. 有状态组件---有自己的一套状态,较高级封装

## 有状态组件

1. useState：初始状态,值或者说函数
2. useRef：拿到最新更新的 state

```js
function someComponent() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;
  useEffect(() => {
    const id = setInterval(() => {
      console.log(countRef.current);
      setCount((currentCount) => currentCount + 1);
    });
    return () => {
      clearInterval(id);
    };
  }, []);
  return <h1>See what's printed in console</h1>;
}
```

## 组件间通信

**因为 react 是单向数据流的,所以只会涉及父类组件更新子类组件的状态，子类组件是完全被父类组件掌控的,其上的属性和事件都都父组件掌控**

1. 父子组件 ---- 子组件通过 props 获得状态，父类通过注册函数获得事件掌控权，和状态变更掌控权

```js
function father() {
  const [sonColor, setSonColor] = useState("red");
  const dealWithSonClick = () => {
    setSonColor("black");
  };
  return (
    <Son onClick={dealWithSonClick} color={sonColor}>
      hello world
    </Son>
  );
}
function Son(props) {
  const { color, children } = props;
  return <h1 style={"background-color" + color}>{children}</h1>;
}
```

2. 兄弟组件 --- 状态提升

```js
function Bro1(props) {
  const [color] = useState(() => props.color);
  return <h2 style={"background-color" + color}>bro1,h2</h2>;
}
function Bro2(props) {
  const { fatherControl } = props;
  return <h2 onClick={fatherControl}>bro2,h2</h2>;
}
function father(){
  const [color,setColor] = useState('red');
  const fatherControl = ()=>{
      setColor('black');
  }
  return (
     <Bro1 color={color}/>
     <Bro2 fatherControl={fatherControl}/>
  )
}
```

3. 爷孙通信

- children 穿透
- context

```js
// children穿透  利用children插槽性质,中间组件只负责传递,相当于拍扁组件树
function Son(props) {
  const { money } = props;
  return <p>{money}</p>;
}
function Father(props) {
  const { children } = props;
  return <h1>{children}</h1>;
}
function Pa() {
  const [money, setMoney] = useState(0);
  return (
    <Father>
      <Son money={money}></Son>
    </Father>
  );
}
```

```js
/*
 * 1. createContext
 * 2. provider包裹
 * 3. useContext
 */

// 1. createContext
const context = createContext({
  moneyForDady: 0,
  moneyForMe: 0,
});
function Son(){
  const ctx = useContext(context);
  return <h1>{ctx.moneyForMe}</h1>
}
function Father(){
  const ctx = useContext(context);
  return <h1>{ctx.moneyForDady}</h1>
}
function Pa() {
  const [moneyForDady] = useState(1);
  const [moneyForMe] = useState(2);

  return (
    <context.Provider value={{ moneyForDady, moneyForMe }}>
     <Father>
       <Son/>
     <Father/>
    </context.Provider>
  );
}
```

## useEffect --- 每次渲染生效的时候调用

_useLayoutEffect VS useEffect:前者更新 DOM 树后同步调用，后者异步调用_

```js
function useGetData(params) {
  const { pageIndex = 1 } = params;
  const [loading, SetLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const cancel = false;
    getData(pageIndex).then((resp) => {
      if (cancel) return;
      setData(resp.data);
    });
    return () => (cancel = true);
  }, [pageIndex]);
}
```

## useMemo --- 缓存耗时计算，在依赖不变的时候重用上次计算的值

## useCallback --- 同 useMemo ，方便缓存函数引用

## 生命周期

1. render 阶段，组件函数本体执行阶段
2. commit 阶段，拿到返回结果去更新 dom 的阶段 useLayoutEffect
3. dom 更新结束，感知 useEffect


## 什么时候会render
1. hook返回的状态改变函数被调用
2. 父组件重绘
3. props变更


