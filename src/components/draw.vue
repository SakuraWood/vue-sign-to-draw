<template lang="html">
  <div class="draw-container">
    <div class="draw-area">
      <img class="draw-title-img" src="../assets/images/turbanner.png" alt="">
      <img class="hidden-img img-san" src="../assets/images/1.png" alt="">
      <img class="hidden-img img-sorry" src="../assets/images/2.png" alt="">
      <div class="slyder">
        <div class="slyder-bg">
          <canvas id="canvas" width="422" height="422"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slyder: {
        slyderText: ['50M免费流量包', '10闪币', '谢谢参与', '5闪币', '10M免费流量包', '20M免费流量包', '20闪币 ', '30M免费流量包', '100M免费流量包', '2闪币'],
        slyderColor: ['#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF'],
        startAngle: 0,
        outsideRadius: 192,
        insideRadius: 68
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._drawSlyder()
    })
  },
  methods: {
    _drawSlyder () {
      // let imgSan = document.getElementsByClassName('img-san')
      // let imgSorry = document.getElementsByClassName('img-sorry')
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

        for (let i = 0; i < itemCount; i++) {
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

          // 设置填充颜色
          ctx.fillStyle = '#e6302f'
        }
      } else {
        alert('浏览器不支持canvas')
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
          width: 100%;
          background-image: url('../assets/images/slyder-bg.png');
          background-size: 100% 100%;

          canvas{
            width: 100%;
          }
        }
      }
    }
  }
</style>
