<template>
  <div id="notify_area">
    <div
      class="alert"
      role="alert"
      v-for="(value, key) in alerts"
      v-bind:key=key
      v-bind:class="{ 'alert-danger': value.danger }"
      :id=key
    >
      {{ value.message }}
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { pivovar_state } from '@/pivovar_state'

@Component({})
export default class NotifyArea extends Vue {
    data() { return { alerts: pivovar_state.alerts } }
}
</script>
