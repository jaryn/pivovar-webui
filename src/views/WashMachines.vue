<template>
  <div>
    <WashMachine v-for="(item) in wash_machines" :key="item.name"
                 v-bind:wash_machine="item">
    </WashMachine>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import WashMachine from '@/components/WashMachine.vue'

declare var pivovar_state: any;

@Component({
    components: {
        WashMachine
    }
})
export default class WashMachines extends Vue {
    data() {
        return { wash_machines: pivovar_state.wash_machines }
    }
}
</script>
