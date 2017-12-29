<template lang="html">
  <div class="draw-container">
    <div class="draw-area">
      <img class="draw-title-img" src="../assets/images/turbanner.png" alt="" >
      <img class="hidden-img img-Q" src="../assets/images/1.png" alt="">
      <img class="hidden-img img-sorry" src="../assets/images/2.png" alt="">
      <div class="slyder">
        <div class="slyder-bg" ref="slyder-bg">
          <canvas id="canvas" :width="slyder.canvasL" :height="slyder.canvasL" :style="canvasStyle"></canvas>
          <img src="../assets/images/slyder-pointer.png" alt="转盘指针" class="slyder-ponit" @click="rotateSlyder">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from '../assets/utils'
export default {
  data () {
    return {
      slyder: {
        slyderText: ['50M免费流量包', '10Q币', '谢谢参与', '5Q币', '10M免费流量包', '20M免费流量包', '20Q币 ', '30M免费流量包', '100M免费流量包', '2Q币'],
        slyderColor: ['#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF'],
        canvasL: 422,
        startAngle: 0,
        outsideRadius: 192,
        insideRadius: 68,
        textRadius: 155,
        lineHeight: 20
      },
      rotating: false,
      noneRotate: 0,
      relRotate: 0,
      transitionTime: 2,
      award: 0
    }
  },
  computed: {
    canvasStyle () {
      return `
          transition: transform ${this.transitionTime}s linear;
          transform: rotate(${this.angle}deg);
      `
    },
    angle () {
      return this.noneRotate * 360 + this.relRotate * 360
    }
  },
  mounted () {
    this.$nextTick(() => {
      util.css(this.$refs['slyder-bg'], { // 设置父元素
        height: util.css(this.$refs['slyder-bg'], 'width')
      })
      this._drawSlyder()

      // document.querySelector('#canvas').addEventListener('transitionend', function (a, b) {
      //   console.log('transitionend :' + b)
      //   console.log(new Date())
      // })
    })
  },
  methods: {
    _drawSlyder () {
      // 图片对象
      let Qimg = document.getElementsByClassName('img-Q')[0]
      let Simg = document.getElementsByClassName('img-sorry')[0]
      // 参数
      let itemCount = this.slyder.slyderText.length
      let itemAngle = 2 * Math.PI / itemCount

      let canvas = document.getElementById('canvas')
      if (canvas.getContext) { // 检查支持性
        let ctx = canvas.getContext('2d')
        // 清理一个透明的区域
        ctx.clearRect(0, 0, 422, 422)
        // 设置轮廓样式
        ctx.strokeStyle = '#FFBE04'
        // 设置画布上文本字体
        ctx.font = '16px Microsoft YaHei'

        for (let i = 0; i < this.slyder.slyderText.length; i++) {
          let angle = this.slyder.startAngle + itemAngle * i
          let itemText = this.slyder.slyderText[i]
          ctx.fillStyle = this.slyder.slyderColor[i]

          ctx.beginPath()

          // 绘制各个区域
          ctx.arc(211, 211, this.slyder.outsideRadius, angle, angle + itemAngle, false)
          ctx.arc(211, 211, this.slyder.insideRadius, angle + itemAngle, angle, true)

          // 此处如果闭合路径 stroke会清晰
          ctx.stroke()
          ctx.fill()

          // 保存下现在的画布，后面会对画布进行移动和旋转
          ctx.save()
          // 设置填充颜色
          ctx.fillStyle = '#e6302f'
          // 移动画布
          ctx.translate(this.slyder.canvasL / 2 + Math.cos(angle + itemAngle / 2) * this.slyder.textRadius, this.slyder.canvasL / 2 + Math.sin(angle + itemAngle / 2) * this.slyder.textRadius)
          ctx.rotate(angle + itemAngle / 2 + Math.PI / 2)
          // 填充文字和图片
          if (itemText.indexOf('流量') !== -1) {
            let texts = itemText.split('M')
            let y = 0
            let text = ''
            for (let j = 0; j < texts.length; j++) {
              ctx.font = (j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei')
              y = (j === 0 ? 0 : this.slyder.lineHeight)
              text = (j === 0 ? texts[j] + 'M' : texts[j])
              ctx.fillText(text, -ctx.measureText(text).width / 2, y)
            }
          }

          if (itemText.indexOf('流量') === -1) { // 根据不同的文案配不同的图片
            ctx.font = 'bold 20px Microsoft YaHei'
            ctx.fillText(itemText, -ctx.measureText(itemText).width / 2, 0)

            if (itemText.indexOf('币') !== -1) {
              ctx.drawImage(Qimg, -16, 20)
            } else {
              ctx.drawImage(Simg, -16, 20)
            }
          }

          ctx.restore()
        }
      } else {
        alert('浏览器不支持canvas')
      }
    },
    rotateSlyder () {
      if (!this.rotating) { // 旋转中不可重复触发
        console.log('start rotate!')
        // console.log(new Date())
        this.noneRotate ++
        // this.transitionTime *= 2

        this.rotating = true
        let getAward = new Promise((resolve, reject) => {
          console.log('new promise')
          setTimeout(() => {
            console.log('getAward resolved')
            resolve(util.randomNumber(0, 9))
          }, 2500)
        })

        let noneRo = setInterval(() => {
          this.noneRotate++
          console.log('noneRotate ++')
        }, this.transitionTime * 1000)

        getAward.then(num => {
          console.log('promise then start :' + num)
          this.award = num
          clearInterval(noneRo)
          this.relRotate = (num < 2 ? num + 9 : num) / 10

          let relRote = setInterval(() => {
            if (this.transitionTime < 4) {
              this.transitionTime *= 1.5
            } else {
              console.log('clear relRote')
              clearInterval(relRote)
            }
          }, this.transitionTime / 5 * 1000)
        })
      } else {
        console.log('slyder is rotating')
      }
    }
  }
}
</script>

<style lang="scss">
  .draw-container{
    width: 100%;

    .draw-area{
      background-color: #e60012;
      .draw-title-img{
        width: 100%;
      }
      .hidden-img{
        display: none;
      }

      .slyder{
        width: 90%;
        margin: -5rem auto 0;

        .slyder-bg{
          position: relative;
          width: 100%;
          height: fit-content;
          background-image: url('../assets/images/slyder-bg.png');
          background-size: 100% 100%;

          canvas{
            position: absolute; //为了优化性能，转动的元素使用绝对定位
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            transform: rotate(0deg);
          }

          .slyder-ponit{
            width: 116px;
            position: absolute;
            top: 24%;
            left: 35%;
          }
        }
      }
    }
  }
</style>
