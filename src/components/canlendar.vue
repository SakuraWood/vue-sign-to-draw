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
          <th>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
            <td>日</td>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>8</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
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
      vertical-align: super;

      .prev-month{
        float: left;
        font-size: 1.4rem;
      }

      .next-month{
        font-size: 1.4rem;
        float: right;
      }
    }
  }
</style>
