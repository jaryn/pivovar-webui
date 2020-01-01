import { Vue } from 'vue-property-decorator';
import { httpget, WashMachine, TempLog } from '@/pivovar_client'

export class PivovarState {
    wm_url = `http://${location.hostname}:5001`
    wash_machines: { [id: string] : WashMachine } = {};
    alerts = {}

    updateWashMachine(wm_id: string, new_state: WashMachine) {
        Vue.set(this.wash_machines, wm_id, this.wash_machines[wm_id] || {})
        var wm = this.wash_machines[wm_id]
        Object.assign(wm, new_state)
    }

    updateWashMachineTempLog(wm_id: string, new_state: TempLog) {
        var wm = this.wash_machines[wm_id] || {}
        Vue.set(wm, 'plot_data', new_state);
    }

    addDanger(id: string, message: string) {
        Vue.set(this.alerts, id, {
            danger: true,
            message
        })
    }

    removeDanger(id: string) {
        Vue.delete(this.alerts, id)
    }
}

export interface Alert {
    danger: boolean
    message: string
}

export var pivovar_state = new PivovarState()

{
    (async() => {
        const url = `${pivovar_state.wm_url}/wash_machine`
        var res = await httpget(url) as WashMachine
        pivovar_state.updateWashMachine(res.name, res)
        update_data()
    })();
}



export function update_data() {
    var url = `${pivovar_state.wm_url}/temp_log`
    Object.values(pivovar_state.wash_machines).forEach(async wash_machine => {
        var temp_log = await httpget(url) as TempLog
        pivovar_state.removeDanger("wm_temp_log")
        pivovar_state.updateWashMachineTempLog(wash_machine.name, temp_log)
    })
}
