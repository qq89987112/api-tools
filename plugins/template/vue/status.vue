<template>
    <span class="status-component" :class="classes">
      <slot></slot>
    </span>
</template>
<script>
  export default {
    name: 'register-page',
    // ACCEPTING("10", "受理中", ColorEnum.BLUE),
    // ACCEPTED("20", "已受理", ColorEnum.PINK),
    // RECEIVED("30", "服务工已接单", ColorEnum.PINK),
    // COMPLETED("70", "已完成", ColorEnum.GREEN),
    // EVALUATED("75", "已评价", ColorEnum.ORANGE),
    // CLOSED("80", "已关闭", ColorEnum.RED);
    props: ["id"],
    data() {
      return {}
    },
    computed: {
      classes() {
        let obj = {
          10: 'inAcceptance',
          20: 'acceptance',
          70: 'completed',
          75: 'evaluated',
          80: 'close'
        }
        return obj[this.id] || '';
      }
    },
    methods: {},
    created() {

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .status-component {
    text-align: center;
    min-width: R(45);
    line-height: R(20);
    padding: 0 R(10);

    color: white;
    background-color: rgba(51, 51, 51,0.5);

    &.inAcceptance {
      color: #00aa36;
      background-color:  rgba(0, 170, 54,0.1);
    }
    &.acceptance {
      color: #989696;
      background-color: rgba(152, 150, 150,0.1);
    }
    &.completed {
      color: #ff6300;
      background-color: rgba(255, 99, 0, 0.1);
    }
    &.close {
      color: #EE5544;
      background-color: rgba(238, 85, 68,0.1);
    }
    &.evaluated{
      color: #3fa2fe;
      background-color: rgba(63, 162, 254, 0.1);
    }
  }
</style>
