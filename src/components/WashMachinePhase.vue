<template>
  <li class="list-group-item">
    <i class="handle glyphicon glyphicon-move"></i>{{ phase_name }}
  </li>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class WashMachinePhase extends Vue {
    @Prop({default: 'Some wm id'}) wm_id!: string
    @Prop({default: 'Some phase'}) phase_name!: string
}
</script>
