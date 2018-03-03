let canvas = document.getElementById('canvas')
//通过js来设置宽高， 如果用100vh的话，canvas会等比拉长，而不是面积变大
let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight
canvas.height = clientHeight
canvas.width = clientWidth

let context = canvas.getContext('2d')

let prevPoint

canvas.addEventListener('touchmove', function(e){
  // e.preventDefault()
  let {clientX, clientY} = e.touches[0]
  let penType = document.querySelector('input[name=penType]:checked').value
  let penColor = document.querySelector('input[name=penColor]:checked').value
  
  if(penType === 'pen'){
    if(prevPoint){
      context.strokeStyle = penColor
      context.beginPath() //开始
      context.moveTo(prevPoint.clientX, prevPoint.clientY) // 从上一个点
      context.lineTo(clientX, clientY) // 画到下一个点
      context.stroke() //边框填色
    }
    prevPoint = { clientX, clientY } //重新定义“上一个点”
  }else if(penType === 'eraser'){
    context.clearRect(clientX-10, clientY-10, 20, 20) 
  }
})

// 鼠标抬起后清除 prePoint  防止上一条线和下一条线“首尾相连”
canvas.addEventListener('touchend', function(){
  prevPoint = null
})
