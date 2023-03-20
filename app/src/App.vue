<template>
  <MainHeader/>
  <main class="main">
    <WorkArea/>
    <section class="content">
      <div class="map" id="map"></div>
    </section>
  </main>
</template>

<script>
import MainHeader from '@/views/MainHeader.vue';
import WorkArea from '@/views/WorkArea.vue';
// import initMap from '@/helpers/map';

export default {
  components: { MainHeader, WorkArea },
  methods: {
    createdMap() {
      this.$store.commit('initMap');
    },
  },
  mounted() {
    this.createdMap();
  },
  created() {
    this.$store.dispatch('loadWorkList');
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
