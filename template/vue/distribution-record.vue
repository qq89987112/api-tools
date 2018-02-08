<template>
  <loading class="consum-record-page" ref="loading">
    <div class="list" v-load-more="loadNext">
        <div class="list-item">

        </div>
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
        list: []
      }
    },
    created() {

    },
    mounted() {
    },
    methods: {
      reLoad(){
        this.params = {
          page:1,
          rows:10
        };
      },
      loadNext(){
        ++this.params.page;
        this.loadPage(this.params);
      },
      loadPage(page){
        this.params.page = page;
        service.dispatchList(this.params)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .consum-record-page {
    height: 100vh !important;
  }
</style>
