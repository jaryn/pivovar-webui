const wm_url = `http://${location.hostname}:5001`;

var pivovar_state = {
    wash_machines_names: [ 'wash_machine_1' ],
    wash_machines: {},

    alerts: {
        foo: {
            danger: true,
            message: "HEllo",
        },
        bar: {
            danger: true,
            message: "HEllo",
        }
    },

    updateWashMachine(wm_id, new_state) {
        Vue.set(this.wash_machines, wm_id, this.wash_machines[wm_id] || {})
        wm = this.wash_machines[wm_id]
        Object.assign(wm, new_state)
    },

    updateWashMachineTempLog(wm_id, new_state) {
        wm = this.wash_machines[wm_id] || {}
        Vue.set(wm, 'plot_data', new_state);
    }
};

fetch(wm_url + '/wash_machine')
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        pivovar_state.updateWashMachine(response.name, response);
    }
);

function update_data() {
    pivovar_state.wash_machines_names.forEach(wash_machine_id => {
        $.getJSON(wm_url + '/temp_log', function (temp_log) {
            pivovar_state.updateWashMachineTempLog(wash_machine_id, temp_log);
        }).fail(function() {
            console.error(`Pivovar: Error getting the ${wash_machine_id} temp_log.`);
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
