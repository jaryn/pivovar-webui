<template>
  <div id="app">
    <div id="pivovar">
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand" href="#">{{ $t("Brewery") }}</a>
          </div>
          <ul class="nav navbar-nav">
            <router-link active-class="active" class="nav-item" to="/wash_machines" tag="li"><a>{{ $t("Wash machines") }}</a></router-link>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <router-link active-class="active" class="nav-item" to="/about" tag="li"><a>{{ $t("About") }}</a></router-link>
            <li class="nav-item">
              <Locale  class="form-control"/>
            </li>
          </ul>
        </div>
      </nav>
      <NotifyArea/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import Locale from '@/components/Locale.vue'
import NotifyArea from '@/components/NotifyArea.vue'
import { update_plot } from '@/components/WashMachine.vue'
import { pivovar_state, update_data } from '@/pivovar_state'

declare global {
    interface Window {
        Vue: any;
        wm_components: any;
        pivovar_state: any;
        update_plot: any
    }
}

window.pivovar_state = pivovar_state
window.update_plot = update_plot

@Component({
    components: {
        Locale,
        NotifyArea
    }})
export default class App extends Vue {
  mounted() {
    window.Vue = Vue
    window.setInterval(update_data, 2000);
  }
}
</script>

<style>
</style>
