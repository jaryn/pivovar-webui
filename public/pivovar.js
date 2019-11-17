var pivovar_state = {
    wm_url: `http://${location.hostname}:5001`,

    wash_machines_names: [ 'wash_machine_1' ],
    wash_machines: {},

    alerts: {
    },

    updateWashMachine(wm_id, new_state) {
        Vue.set(this.wash_machines, wm_id, this.wash_machines[wm_id] || {})
        wm = this.wash_machines[wm_id]
        Object.assign(wm, new_state)
    },

    updateWashMachineTempLog(wm_id, new_state) {
        wm = this.wash_machines[wm_id] || {}
        Vue.set(wm, 'plot_data', new_state);
    },

    addDanger(id, message) {
        Vue.set(this.alerts, id, {
            danger: true,
            message
        })
    },

    removeDanger(id) {
        Vue.delete(this.alerts, id)
    }
};

fetch(pivovar_state.wm_url + '/wash_machine')
    .then(response => response.json())
    .catch(error => pivovar_state.addDanger('wm_connect', error))
    .then(response => {
        pivovar_state.removeDanger("wm_connect")
        pivovar_state.updateWashMachine(response.name, response);
    }
);

function update_data() {
    pivovar_state.wash_machines_names.forEach(wash_machine_id => {
        url = `${pivovar_state.wm_url}/temp_log`
        $.getJSON(url, function (temp_log) {
            pivovar_state.removeDanger("wm_temp_log");
            pivovar_state.updateWashMachineTempLog(wash_machine_id, temp_log);
        }).fail(function() {
            pivovar_state.addDanger("wm_temp_log", `Error getting ${url}`)
        });
    });
}

function update_temp_log(plot_id, temp_log) {
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
    Plotly.react(plot_id, data, layout);
}
