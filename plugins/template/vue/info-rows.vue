<template>
  <loading class="consum-record-page" ref="loading">
    <div class="info-rows">
      <p class="info-row"> <span></span><span class="value"></span></p>
    </div>
  </loading>
</template>

<script>

  import service from "../../js/api/service";

  export default {
    components: {
    },
    name: 'consum-record',
    data() {
      return {
      }
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

    .info-rows {
      margin: R(15) 0;
      padding: R(15);
      background-color: #fff;
      .info-row + .info-row{
        margin-top: R(15);
      }
      .info-row {
        overflow: hidden;
        line-height: 2.5em;

        .value {
          color: #cdcdcd;
          float: right;
        }
      }
    }

  }
</style>
