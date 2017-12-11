<template lang="html">
  <div class="canlendar-container">
    <div class="cal-header">
      <span class="prev-month">上个月</span>
      <span class="next-month">下个月</span>
      <span class="year-month">2017-02</span>
    </div>
    <div class="cal-body">
      <table class="cal-table">
        <thead>
          <tr>
            <th v-for="td in thead">{{td}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tr in tbody">
              <td v-for="td in tr" :class="{signed : sign.indexOf(parseInt(td)) > -1}">{{td}}</td>
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
      tbody: [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31]
      ]
    }
  },
  props: {
    sign: {
      required: false,
      type: Array,
      default: []
    }
  },
  created () {
    this._initData()
  },
  methods: {
    _initData () {
      let curDate = new Date()
      let curDay = curDate.getDate()
      let curMonth = curDate.getMonth()
      let curYear = curDate.getFullYear()
      console.log('today' + curDay + ' ' + curMonth + ' ' + curYear)
      let firDate = new Date(curYear, curMonth, 1)
      let lastDate = new Date(curYear, curMonth + 1, 0)
      console.log('first day' + firDate)
      console.log('last day' + lastDate)
      let firDay = this._dealWeek(firDate.getDay())  // 本月第一天是周几？
      let lastDay = lastDate.getDate()
      console.log(firDay)
      console.log(lastDay)
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

      // splice分割数组
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
