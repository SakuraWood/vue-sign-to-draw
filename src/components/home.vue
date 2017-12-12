<template lang="html">
  <div class="home-container">
    <div class="header-banner">
      <img src="../assets/images/qdBanner.jpg" alt="签到宣传图">
    </div>
    <canlendar :signed='signed'></canlendar>
    <div class="sign-area">
      <button type="button" class="sign-today" :class="{signed : isTodaySign}" @click="signedToday">{{isTodaySign ? '已签到' : '今日签到'}}</button>
    </div>
    <div class="gift-area">
      <div class="title border-bottom">
        累计签到礼包
      </div>
      <ul class="gift-list">
        <li v-for="gift in gifts" class="border-bottom">
          <div class="img-wrapper">
            <img src="../assets/images/dou.png" alt="笑脸图标">
          </div>
          <div class="des-area">
            <div class="gift-title">{{gift.title}}</div>
            <div class="gift-des">{{gift.des}}</div>
          </div>
          <button type="button" name="button" :class="{active : gift.active}" @click="getGift(gift)">领取</button>
        </li>
      </ul>
    </div>
    <div class="dialog" v-show="showdialog">
      <div class="gifts">
        <figure>
          <img src="../assets/images/hld.jpg" alt="欢乐豆图片">
          <figcaption>恭喜你获得1000欢乐豆！同时获得一次抽奖机会!</figcaption>
        </figure>
        <button @click="goDraw">前往抽奖</button>
      </div>
    </div>
  </div>
</template>

<script>
import canlendar from './canlendar.vue'
export default {
  data () {
    return {
      signed: [],
      isTodaySign: false,
      gifts: [
        {
          title: '1天礼包（欢乐豆1000个）',
          des: '累计签到1天即可领取',
          type: '1',
          active: false
        },
        {
          title: '3天礼包（欢乐豆5000个）',
          des: '累计签到3天即可领取',
          type: '3',
          active: false
        },
        {
          title: '10天礼包（欢乐斗地主人物玩偶1个）',
          des: '累计签到10天即可领取',
          type: '10',
          active: false
        },
        {
          title: '20天礼包（ipad 一台！）',
          des: '累计签到20天即可领取',
          type: '20',
          active: false
        },
        {
          title: '整月礼包（iphoneX 一台！）',
          des: '当月每天签到即可领取',
          type: 'month',
          active: false
        },
        {
          title: '整年礼包（人民币1000w）',
          des: '今年每天签到即可领取',
          type: 'year',
          active: false
        }
      ],
      showdialog: false
    }
  },
  watch: {
    signed (newVal) {
      if (newVal.length > 0) {
        this.gifts[0].active = true
      }
    }
  },
  components: {
    canlendar
  },
  methods: {
    signedToday () {
      if (!this.isTodaySign) {
        let today = new Date()
        this.signed.push(today.getDate())
        this.isTodaySign = true
      }
    },
    getGift (gift) {
      // 处理不同的礼物类型 这里只是简单demo
      if (gift.active) {
        this.showdialog = true
        gift.active = false
      }
    },
    goDraw () {
      this.showdialog = false
      this.$router.push({
        name: 'draw'
      })
    }
  }
}
</script>

<style lang="scss">
  .border-bottom{
    border: none;
    border-bottom: 1px solid #e8e9eb;
  }

  .home-container{
    min-height: 100%;

    .header-banner{
      img{
        display: block;
        width: 100%;
      }
    }

    .sign-area{
      background-color: #faca34;

      button{
        display: block;
        position: relative;
        top: 1.5rem;
        margin: 0 auto;
        height: 4rem;
        width: 10rem;
        border-radius: 2rem;
        background-color: #58bc8d;
        border: 0.5rem solid #faca34;
        font-size: 1.4rem;
        font-weight: bold;
        color: #fff;

        &.signed{
          background-color: rgb(157, 157, 157);
        }
      }
    }

    .gift-area{
      padding: 0 2rem;
      .title{
        padding: 1rem 0 0.5rem 0;
        font-size: 1.4rem;
        font-weight: bold;
      }

      .gift-list{

        li{
          display: flex;
          padding: 0.5rem 0;

          .img-wrapper{
            width: 3rem;
            margin-right: 0.5rem;

            img{
              display: block;
              width: 100%;
            }
          }

          .des-area{
            flex: 1;
            .gift-title{
              font-size: 1.1rem;
            }
            .gift-des{
              color: #777;
              font-size: 1rem;
            }
          }

          button{
            width: 5rem;
            padding: 0.5rem 0;
            border: none;
            border-radius: 0.5rem;
            background-color: rgb(157, 157, 157);
            font-size: 1.1rem;
            color: #ffffff;

            &.active{
              background-color: #e60012;
            }
          }
        }
      }
    }
  }

  .dialog{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(#666666,0.6);
    z-index: 100;

    .gifts{
      width: 80%;
      margin: 60% auto 0;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #ffffff;

      img{
        display: block;
        width: 8rem;
        margin: 0 auto;
      }

      figcaption{
        margin: 1rem 1rem;
        font-size: 1.1rem;
        font-weight: bold;
        text-align: center;
      }

      button{
        display: block;
        margin: 0 auto;
        border: none;
        padding: 1.0rem 2rem;
        border-radius: 0.5rem;
        color: #ffffff;
        background-color: #e60012;
      }
    }
  }

</style>
