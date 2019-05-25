function onKeyDown2(event) {
  console.log('有人来了，按了' + event.key);
  var x = prompt("请输入暗号！");
  console.log('输入暗号是' + x);

  if (x === "1"){
    alert("welcome");
  } else {
    alert("正在报警！");
  }
}

function onKeyPress(event) {
  console.log('onKeyPress:' + event.key);
}

function onKeyUp(event) {
  console.log('onKeyUp:' + event.key);
}

document.addEventListener('keydown', onKeyDown2);
document.addEventListener('keypress', onKeyPress);
document.addEventListener('keyup', onKeyUp);
