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
          <WashMachinePhase v-bind:key=phase_name v-for="phase_name in phases" :wm_id="wm_name" :phase_name="phase_name"></WashMachinePhase>
        </div>
        <!--
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
        -->
      </div>
      <div class="col-sm-9">
        <h3>{{ $t("Water temperature in time") }}</h3>
        <div v-bind:id="plot_id" />
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import WashMachinePhase from '@/components/WashMachinePhase.vue';

declare function update_temp_log(wash_machine_id: string, temp_log: any): void;
declare var pivovar_state: any;

window.wm_components = []

@Component({
    components: {
        WashMachinePhase
    }
})
export default class WashMachine extends Vue {

    mounted() {
        window.wm_components.push(this)
    }

    @Prop() private wash_machine!: any;

    get wm_name() {
        return this.wash_machine.name
    }

    get phases() {
        return this.wash_machine.phases
    }

    get plot_id() {
        return this.wash_machine.name + '_temp_plot';
    }

    get plot_data() {
        return this.wash_machine.plot_data;
    }

    @Watch('plot_data', { immediate: false, deep: true })
    onPlotDataChanged(value: string, oldValue: string) {
        update_temp_log(this.plot_id, value);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
