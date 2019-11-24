<template>
    <div class="wash-machine" v-bind:id="wm_name" >
        <h3>{{ $t("Keg washer", { wm_name }) }}</h3>
      <div class="col-sm-3">
        <h3>{{ $t("Phases") }}</h3>
        <div
          id="phases"
          tag="ol"
          class="list-group"
          handle=".handle"
          ghost-class="ghost"
        >
        <draggable
          id="phases"
          tag="ol"
          class="list-group"
          handle=".handle"
          ghost-class="ghost"
          v-model="phases"
          group="phases"
        >
          <WashMachinePhase v-bind:key=phase_name v-for="phase_name in phases" :wm_id="wm_name" :phase_name="phase_name"></WashMachinePhase>
        </draggable>
        </div>
      </div>
      <div class="col-sm-9">
        <h3>{{ $t("Water temperature in time") }}</h3>
        <div v-bind:id="plot_id" />
      </div>
    </div>
</template>

<script lang="ts">
import { TempLog, pivovar_state } from '@/pivovar_state'
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import WashMachinePhase from '@/components/WashMachinePhase.vue';
import draggable from 'vuedraggable'
var Plotly = require('plotly.js-dist')

window.wm_components = []

@Component({
    components: {
        WashMachinePhase,
        draggable
    }
})
export default class WashMachine extends Vue {

    mounted() {
        window.wm_components.push(this)
    }

    data () {
        return {
            phases: this.wash_machine.phases
        }
    }

    @Prop() private wash_machine!: any;

    get wm_name() {
        return this.wash_machine.name
    }

    get plot_id() {
        return this.wash_machine.name + '_temp_plot';
    }

    get plot_data() {
        return this.wash_machine.plot_data;
    }

    @Watch('plot_data', { immediate: false, deep: true })
    onPlotDataChanged(value: TempLog, oldValue: TempLog) {
        var temp_log = value
        const data = [{
            x: temp_log.datetime,
            y: temp_log.temps,
            mode: 'lines+markers',
            name: '{templota}',
            line: {'shape': 'spline'},
            type: 'scatter'
        }];

        const layout = {
        legend: {
            y: 0.5,
            traceorder: 'reversed',
            font: {size: 16},
            yref: 'paper'
        }};
        Plotly.react(this.plot_id, data, layout);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
