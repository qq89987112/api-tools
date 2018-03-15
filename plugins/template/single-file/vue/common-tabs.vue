<template>
  <loading class="consum-record-page" ref="loading">
    <div class="tabs">
      <div class="tab" :class="tab==='complete'&&'active'" @click="tab='complete'">已完成</div>
      <div class="tab" :class="tab==='unComplete'&&'active'"  @click="tab='unComplete'">未完成</div>
    </div>
    <div class="tab-contents">
      <div class="tab-content" :class="tab==='complete'&&'active'">
      </div>
      <div class="tab-content" :class="tab==='unComplete'&&'active'">
      </div>
    </div>
  </loading>
</template>

<script>


  export default {
    components: {},
    name: 'consum-record',
    data() {
      return {
        tab: 'complete'
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .consum-record-page {
    height: 100vh !important;
    display: flex;
    flex-direction: column;
    padding: 15px;

    .tabs {
      display: flex;
      line-height: 2em;
      width: R(180);
      margin: R(15) auto 0;
      border: R(1) solid #707071;
      border-radius: R(5);
      .tab {
        flex: 1;
        text-align: center;
        color: #1f1f1f;
        background-color: rgba(0, 0, 0, 0);

        &.active {
          background-color: #222222;
          color: white;
        }
      }
    }

    .tab-contents {
      flex: 1;
      overflow-y: auto;
      .tab-content {
          display: none;
          &.active{
            display: block!important;
          }
      }
    }
  }
</style>
