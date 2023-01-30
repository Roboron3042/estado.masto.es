const data = {
	2022: {
		11: {
			"servidor": 29.99,
			"correo": 10.97,
			"donaciones": 9,
		},
		12: {
			"servidor": 30.49,
			"correo": 11.56,
            "media": 6.87,
			"donaciones": 77.13,
		},
	},
	2023: {
		1: {
			"servidor": 30.49,
            "correo": 8,
            "media": 3.87,
			"donaciones": 102.28,
		},
	}
}

const data_dominio = {
    2022: 8.57,
    2023: 0
}

let suma_vertical = [];
let acumulado = 0
let gasto_mensual = 0

const reiniciar_suma = () => {
    suma_vertical = []
    for(i=0; i < 13; i++) {
        suma_vertical.push(0);
    }
}

const add_row = (year, concepto, positivo) => {
    let tablas = `<tr><td>${concepto.charAt(0).toUpperCase() + concepto.slice(1)}</td>`
    let coste_acumulado = 0;
    Object.keys(data[year]).forEach((mes) => {
        const cifra = data[year][mes][concepto] ?? 0
        suma_vertical[mes - 1] += positivo ? cifra : -cifra
        coste_acumulado += cifra
        tablas += `<td class=${positivo ? "green" : "red"}>${cifra}€</td>`
    })
    tablas += `<td class=${positivo ? "green" : "red"}>${coste_acumulado}€</td>`
    tablas += '</tr>'
    return tablas;
}

const add_row_total = (year) => {
    let tablas = `<tr><td>Balance mensual</td>`
    suma_vertical.forEach((sum, i) => {
        if( data[year][i+1] || i == 12) {
            if(i != 12) suma_vertical[12] += sum
            tablas += `<td class=${sum > 0 ? "green" : "red"}>${sum.toFixed(2)}€</td>`
        }
    })
    tablas += '</tr>'
    return tablas
}

const add_row_acumulado = (year) => {
    let tablas = `<tr><td>Balance acumulado</td>`
    suma_vertical.forEach((sum, i) => {
        if( data[year][i+1] || i == 12) {
            if(i != 12) { 
                acumulado += sum 
            } else {
                acumulado += -data_dominio[year]
            }
            tablas += `<td class=${acumulado > 0 ? "green" : "red"}>${acumulado.toFixed(2)}€</td>`
        }
    })
    tablas += '</tr>'
    return tablas
}

Object.keys(data).forEach((year) => {
    reiniciar_suma()
    let tablas = `<details><summary>${year}</summary>`
    tablas += '<table>'
    tablas += '<tr><th>Concepto</th>'
    Object.keys(data[year]).forEach((mes) => {
        tablas += `<th>${mes}</th>`
    })
    tablas += '<th>Anual</th></tr>'
    tablas += add_row(year, "servidor", false)
    tablas += add_row(year, "correo", false)
    tablas += add_row(year, "media", false)
    tablas += add_row(year, "donaciones", true)
    tablas += add_row_total(year);
    tablas += add_row_acumulado(year);
    tablas += '</table></details>'
    document.getElementById("tablas").innerHTML += tablas
})

let resumen = `Balance acumulado: <span class=${acumulado > 0 ? "green" : "red"}>${acumulado.toFixed(2)}€</span>`
resumen += '<br><br>Con las previsiones actuales de gastos e ingresos, masto.es seguirá en funcionamiento indefinidamente 🙂'
document.getElementById("resumen").innerHTML+= resumen
