import { Vue } from 'vue-property-decorator';

export class PivovarState {
    wm_url = `http://${location.hostname}:5001`
    wash_machines_names =[ 'wash_machine_1' ]
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

export interface WashMachine {
}

export interface TempLog {
    datetime: string[]
    temps: number[]
}


export var pivovar_state = new PivovarState()


fetch(pivovar_state.wm_url + '/wash_machine')
    .then(response => response.json())
    .catch(error => pivovar_state.addDanger('wm_connect', error))
    .then(response => {
        pivovar_state.removeDanger("wm_connect")
        pivovar_state.updateWashMachine(response.name, response);
    })


export function update_data() {
    pivovar_state.wash_machines_names.forEach(wash_machine_id => {
        var url = `${pivovar_state.wm_url}/temp_log`

        fetch(url).then(response => response.json())
        .catch(error =>
            pivovar_state.addDanger("wm_temp_log", `Error getting ${url}, ${error}`)
        )
        .then(function (temp_log: TempLog) {
            pivovar_state.removeDanger("wm_temp_log");
            pivovar_state.updateWashMachineTempLog(wash_machine_id, temp_log);
        })
    })
}
