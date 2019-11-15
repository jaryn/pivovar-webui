<template>
    <select v-model="$root.$i18n.locale">
      <option v-for="(lang) in locales" :key="lang" :value="lang">{{ lang }}</option>
    </select>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueI18n from '@/i18n'

@Component({})
export default class Locale extends Vue {
    get locales() {
        return Object.keys(VueI18n.messages)
    }

    guessI18nLanguage() {
        return navigator.languages ? navigator.languages[0] : navigator.language
                //: (navigator.language || navigator.userLanguage)
    }

    mounted() {
        this.$root.$i18n.locale = this.guessI18nLanguage()
    }
}
</script>
