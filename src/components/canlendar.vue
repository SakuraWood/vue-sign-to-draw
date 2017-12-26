<template lang="html">
  <div class="canlendar-container">
    <div class="cal-header">
      <span class="prev-month" @click="changeMonth(-1)">上个月</span>
      <span class="next-month" @click="changeMonth(1)">下个月</span>
      <span class="year-month">{{date.year}}-{{date.month + 1}}</span>
    </div>
    <div class="cal-body">
      <table class="cal-table">
        <thead>
          <tr>
            <th v-for="td in thead">{{td}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tr in date.days">
              <td v-for="td in tr" :class="{signed : signed.indexOf(parseInt(td)) > -1}">{{td}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      thead: ['一', '二', '三', '四', '五', '六', '日'],
      date: {
        year: 2017,
        month: 12,
        day: 11,
        days: []
      }
    }
  },
  props: {
    signed: {
      required: false,
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    this._initData(new Date())
  },
  methods: {
    _initData (date) {
      this.date.day = date.getDate()
      this.date.month = date.getMonth()
      this.date.year = date.getFullYear()

      let firDate = new Date(this.date.year, this.date.month, 1) // 本月的第一天
      let lastDate = new Date(this.date.year, this.date.month + 1, 0) // 本月的最后一天
      let firWeek = this._dealWeek(firDate.getDay())  // 本月第一天是周几
      let lastDay = lastDate.getDate()   // 本月的共有多少天

      this.date.days = this._proData(firWeek, lastDay)
    },
    _dealWeek (day) {
      return day === 0 ? 7 : day
    },
    _proData (fir, last) {
      let temp = []
      for (let i = 1; i < fir + last; i++) {
        if (i < fir) {
          temp.push('')
          continue
        }
        temp.push(i - fir + 1)
      }
      return this._spliceArray(temp, 0, 7)
    },
    _spliceArray (target, start, count) {
      let temp = []
      if (target.length) {
        do {
          temp.push(target.splice(start, count))
        } while (target.length)
      }
      return temp
    },
    changeMonth (num) {
      this._initData(new Date(this.date.year, this.date.month + num, 1))
    }
  }
}
</script>

<style lang="scss">
  .canlendar-container{
    box-sizing: border-box;
    width: 100%;
    padding: 2rem;
    background-color: #faca34;
    color: #a46626;

    .cal-header{
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      font-weight: bold;
      font-size: 1.6rem;

      .prev-month{
        float: left;
        font-size: 1.4rem;
        line-height: 1.4rem;
        margin-top: 1.3rem;
      }

      .next-month{
        font-size: 1.4rem;
        line-height: 1.4rem;
        float: right;
        margin-top: 1.3rem;
      }
    }

    .cal-body{
      table{
        width: 100%;
        table-layout: fixed;
        text-align: center;

        td,th{
          padding: 1rem;
          background-color: #ffffff;
          border: 1px solid #faca34;
          border-radius: 0.6rem;

          &.signed{
            background-color: #dc7a14;
          }
        }
      }
    }
  }

</style>
