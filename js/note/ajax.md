# Ajax

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## fetch api

XMLHttpRequest老了。FCC是基于它的。最新的是Fetch API，更容易调用。实战里的，都是调用Fetch API

fetch('a.txt');
返回一个Promise，它管理异步事件返回的结果（三种状态：pending，fulfilled，rejected）。
然后用一个then()方法，指定onSuccess和onError的事件处理器（attach）。
可以绑定一串。
不能file://本地fetch，要python -m http.server启动一个web server，然后访问 http://localhost:8000/

## 获取摄像头

两种方法

1. callback

2. Promise

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

response.status
200： success
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

```js
function onSuccess(response) {
  }
function onFail(response) {
  }
fetch('images.txt').then(onSuccess, onFail);
```

response.text()异步地读返回的stream，也返回一个Promise，接着then绑定其处理事件。

```js
function onStreamProcessed(text) {
  console.log(text);
}
function onResponse(response) {
  console.log(response.status); response.text().then(onStreamProcessed);
}
function onError(error) {
  console.log('Error: ' + error);
}
fetch('images.txt').then(onResponse, onError);
```

顺序执行异步的actions

```js
function onStreamProcessed(text) {
 console.log(text);
}
function onResponse(response) {
 return response.text();
}
fetch('images.txt')
   .then(onResponse, onError)
   .then(onStreamProcessed);
```

练习：12-images-text

## JSON

对象-字符串之间相互转换
JSON.stringify()
JSON.parse()

```js
const bearString =
      '{"name":"Ice Bear","hobbies":["knitting","cooking","dancing"]}';

const bear = JSON.parse(bearString);
console.log(bear);
```

```js
const bear = {
  name: 'Ice Bear',
  hobbies: ['knitting', 'cooking', 'dancing']
};

const serializedBear = JSON.stringify(bear);
console.log(serializedBear);
```

## fetch JSON

```js
function onStreamProcessed(json) {
  console.log(json);
}
function onResponse(response) {
  return response.json();
}
fetch('songs.json')
  .then(onResponse, onError)
  .then(onStreamProcessed);
```

## REST api

类似fetch即可。

搜索GIF
https://github.com/Giphy/GiphyAPI#search-endpoint

## Fetch限制

不能读本地硬盘
老浏览器不支持：用 https://github.com/jquery/PEP，封装的
CORS: Cross-Origin Resource Sharing
  abc.com访问zyx.com
  可以img images，link css，script js
  不能XHR，也不能fetch
  除非web server配置说可以：https://enable-cors.org/server_apache.html
  也可以配得连image也不可以

# Ajax

AJAX. Asynchronous communication. Callback functions. The get and post formats. Same-origin policy. Cross-origin requests with JSONP. AJAX polling. (Flanagan Chapter 18，19)

```JavaScript
var request = new XMLHttpRequest();
request.open("GET","data.csv");
request.setRequestHeader("Content-Type", "text/plain");
request.send(null)
```

## jQuery Ajax
1. load
2. get, post

```JavaScript
jQuery.get("debug.txt",alert);
```

## FCC

1. 请求，结果处理

XMLHttpRequest请求，JSON，filter，forEach，getElementsByClassName，innerHTML设置

document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('getMessage').onclick=function(){
    req=new XMLHttpRequest();
    req.open("GET",'/json/cats.json',true);
    req.send();
    req.onload=function(){
      json=JSON.parse(req.responseText);
      json = json.filter((val) => val.id !== 1);

      var html = "";
      json.forEach(function(val){
        var keys = Object.keys(val);
        html += "<div class='cat'>";
        keys.forEach(function(key){
          html += "<strong>" + key + "</strong> " + val[key] + "<br>";
        });
        html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";
        html += "</div><br>";
      });
      console.log(html)
      document.getElementsByClassName('message')[0].innerHTML=html;
    };
  };
});

2. 获得用户的经纬度

<script>
  // 在这行下面添加代码
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(pos){
        document.getElementById('data').innerHTML = "Lat: " + pos.coords.latitude + "<br> Long. " + pos.coords.longitude;
      }
    );
  };

  // 在这行上面添加代码
</script>
<h4>You are here:</h4>
<div id="data">

</div>

3. POST

<script>
  document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('sendMessage').onclick=function(){
      var userName=document.getElementById('name').value;
      req=new XMLHttpRequest();
      req.open("POST",'/',true);
      req.setRequestHeader('Content-Type','text/plain');
      console.log(userName);
      req.onreadystatechange=function(){
          console.log(req);
          if(req.readyState==4 && req.status==200){
    document.getElementsByClassName('message')[0].innerHTML=req.responseText;
          };
      };
      req.send(userName);
    };
  });
</script>

<style>
  body {
    text-align: center;
    font-family: "Helvetica", sans-serif;
  }
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
  .box {
    border-radius: 5px;
    background-color: #eee;
    padding: 20px 5px;
  }
  button {
    color: white;
    background-color: #4791d0;
    border-radius: 5px;
    border: 1px solid #4791d0;
    padding: 5px 10px 8px 10px;
  }
  button:hover {
    background-color: #0F5897;
    border: 1px solid #0F5897;
  }
</style>

<h1>Cat Friends</h1>
<p class="message box">
  Reply from Server will be here
</p>
<p>
  <label for="name">Your name:
    <input type="text" id="name"/>
  </label>
  <button id="sendMessage">
    Send Message
  </button>
</p>

4.
