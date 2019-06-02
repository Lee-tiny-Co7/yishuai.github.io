# React

很轻量级的前端框架。和Redux配合，用Redux存全局状态。

工具：建议用 https://github.com/facebookincubator/create-react-app

文档很难看。建议看这个学习视频：
https://egghead.io/courses/getting-started-with-redux

新的标签语言JSX，方便事件监听和动态更新数据。

这部分包括48个FCC，需要时间5.5小时左右。

## 基础

13个FCC，1小时

知识点：JSX，注释，渲染，ClassName，自动闭合，创建函数组件，React组件，组件组合，嵌套

## Props参数

7个FCC，1小时

将 Props 传递给无状态函数组件

知识点：输入，数组输入，默认值，检验输入类型，this.props

## 有状态的组件

9个FCC，1小时

创建一个有状态的组件

知识点：初始化state，访问state，编写程序，setState, 绑定this

## 使用State切换元素

6个FCC，1小时

使用 State 切换元素

知识点：状态操作和UI更新，input，textarea，form，阻止默认刷新，传递state和函数，

## 生命周期钩子

5个FCC，0.5小时

React：使用生命周期方法

知识点：WillMount，DidMount (api调用，keydown捕获), WillReceiveProps（）, WillUpdate, DidUpdate, shouldComponentUpdate,

## 有条件渲染

12个FCC，1小时

介绍内联样式

知识点：样式设定，&&，三元表达式，根据Props，state，map，filter，key设定，服务器渲染

# Redux

Redux管住全局状态。

这部分17个FCC，2小时

## 基础

知识点：Store，state，action，event dispatch，reducer修改状态，action type, subscribe监听器，组合reducer，action.text, 处理异步操作

## 练习：用 Redux 写一个计数器

```js
const INCREMENT = 'INCR'; // 为增量 action 类型定义一个常量
const DECREMENT = 'DECR'; // 为减量 action 类型定义一个常量

const counterReducer = (state = 0, action) => {
    if (action.type == INCREMENT) {
        return state + 1;
    }else if (action.type == DECREMENT) {
        return state - 1;
    }else{
        return state;
    }
}; // 定义计数器，它将根据收到的action增加或减少状态

const incAction = () => {return {type:INCREMENT}}; // 定义一个用于递增的 action creator

const decAction = () => {return {type:DECREMENT}}; // 定义一个用于递减的 action creator

const store = Redux.createStore(counterReducer); // 在这里定义一个 Redux store，传递你的 reducer

store.dispatch(incAction());
console.log(store.getState());
store.dispatch(decAction());
console.log(store.getState())
```

## 永不改变状态

Redux把状态完全屏蔽，外面的代码不能直接改变状态。所以，必须通过return来设定状态。由此，需要一些技巧。

利用的方法：...spread, slice, concate数组操作；Object.assign

```js
return state.concat(action.todo);

return [...state, action.todo];
```

# React 和 Redux

React：渲染，Redux：管理状态

需要把Redux的state和dispatch作为props送给React

FCC练习：

## 首先在本地管理状态

```js
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);    
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(e) {
    this.setState({
       input: e.target.value
    });
  }

  submitMessage() {
    this.setState({
        input: "",
        messages: [...this.state.messages, this.state.input]
    });
  }

  render() {
    return (
      <div>
        <h2>键入新 Message</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.submitMessage}>click</button>
        <ul> {this.state.messages.map(a => <li>{a}</li>)} </ul>
      </div>
    );
  }
};
```

## 提取状态逻辑给Redux

```js
// 请在此处定义 ADD、addMessage()、messageReducer()、store：
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
    };
};

const messageReducer = (state = [], action) => {
  if (action.type == ADD) {
    return state.concat(action.message);
  } else {
    return state;
  }
};

const store = Redux.createStore(messageReducer);
```

## 使用Provider连接Redux和React

```js
// Redux 代码：
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React 代码：
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  render(){
      return (
        <div>
            <Provider store={store}>
                <DisplayMessages />
            </Provider>
        </div>
      )
  }
};
```

## 映射State到Props

```js
const state = [];

const mapStateToProps = (state) => {
    return {
        messages: state
    };
}
```

## 映射Dispatch到Props

```js
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: function(message) {
      dispatch(addMessage(message));
    }
  };
};
```

## 连接React和Redux

```js
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational);
```

## 把Redux连接到App

```js
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// 在此定义 Container 组件：
const Container = connect(mapStateToProps,mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};
```

## state转移到Redux中

```js
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState({
      input: ''
    });
    this.props.submitNewMessage(this.state.input);
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};
```

## 回顾

从'react'导入 React
从'react-dom'导入 ReactDOM
从'react-redux'导入{ Provider, connect }
从'redux'导入{ createStore, combineReducers, applyMiddleware }
从'redux-thunk'导入 thunk

从'./redux/reducers'导入 rootReducer
从'./components/App'导入 App

```js
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
```

## codepen支持React

在 CodePen 中启用 Babel 作为 JavaScript 预处理器，将 React 和 ReactDOM 添加为外部 JavaScript 资源，在那里编写应用。
