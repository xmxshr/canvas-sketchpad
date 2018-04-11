let canvas = document.getElementById('canvas')
//通过js来设置宽高， 如果用100vh的话，canvas会等比拉长，而不是面积变大
let clientWidth = document.body.clientWidth
let clientHeight = document.body.clientHeight
canvas.height = clientHeight
canvas.width = clientWidth

let context = canvas.getContext('2d')

let prevPoint

// 设置橡皮的边框
let clearBox = document.createElement('div')
document.body.appendChild(clearBox)
clearBox.style.position = "absolute"
clearBox.style.top = 0
clearBox.style.left = 0
clearBox.style.border = "1px solid"
clearBox.style.borderRadius = "50%"
clearBox.style.width = "20px"
clearBox.style.height = "20px"
clearBox.style.display = "none"


canvas.addEventListener('touchmove', function(e){
  // e.preventDefault()
  let {clientX, clientY} = e.touches[0]
  //声明橡皮和笔
  let penType = document.querySelector('input[name=penType]:checked').value
  let penColor = document.querySelector('input[name=penColor]:checked').value

  if(penType === 'pen'){
    if(prevPoint){
      clearBox.style.display = "none"
      context.strokeStyle = penColor
      context.beginPath() //开始
      context.moveTo(prevPoint.clientX, prevPoint.clientY) // 从上一个点
      context.lineTo(clientX, clientY) // 画到下一个点
      context.stroke() //边框填色
    }
    prevPoint = { clientX, clientY } //重新定义“上一个点”
  }else if(penType === 'eraser'){
    context.clearRect(clientX-10, clientY-10, 20, 20) 
    setStyle(clientX, clientY)
    
  }
})

// 鼠标抬起后清除 prePoint  防止上一条线和下一条线“首尾相连”
canvas.addEventListener('touchend', function(){
  prevPoint = null
})

canvas.addEventListener('touchstart', function(e){
  let penType = document.querySelector('input[name=penType]:checked').value
  let {clientX, clientY} = e.touches[0]

  if(penType === 'eraser'){
    context.clearRect(clientX-10, clientY-10, 20, 20) 
    setStyle(clientX, clientY)
  }
})

//设置橡皮的位置
function setStyle(clientX, clientY){
  clearBox.style.top = (clientY-10) + "px" 
  clearBox.style.left = (clientX-10) + "px"
  clearBox.style.display = 'block'
}

