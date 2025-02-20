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
			"otros": 6.87,
			"donaciones": 77.13,
		},
	},
	2023: {
		1: {
			"servidor": 30.49,
			"correo": 7.09,
			"otros": 3.87,
			"donaciones": 109.34,
		},
		2: {
			"servidor": 30.49,
			"correo": 4.78,
			"otros": 3.87,
			"donaciones": 28.25,
		},
		3: {
			"servidor": 30.49,
			"correo": 4.00,
			"otros": 3.87,
			"donaciones": 48.72,
		},
		4: {
			"servidor": 82.16,
			"correo": 4.16,
			"donaciones": 41.92,
		},
		5: {
			"servidor": 51.67,
			"correo": 2.05,
			"donaciones": 103.01,
		},
		6: {
			"servidor": 51.67,
			"correo": 1.25,
			"donaciones": 59.14,
		},
		7: {
			"servidor": 51.67,
			"correo": 9.47,
			"donaciones": 97.67,
		},
		8: {
			"servidor": 51.67,
			"correo": 2.81,
			"donaciones": 50.02,
		},
		9: {
			"servidor": 51.67,
			"correo": 2.33,
			"donaciones": 89.37,
		},
		10: {
			"servidor": 51.67,
			"correo": 2.41,
			"donaciones": 92.08,
		},
		11: {
			"servidor": 51.67,
			"correo": 2.37,
			"donaciones": 101.83,
		},
		12: {
			"servidor": 51.67,
			"correo": 2.28,
			"donaciones": 137.36,
		},
	},
	2024: {
		01: {
			"servidor": 51.67,
			"correo": 2.55,
			"donaciones": 95.66,
		},
		02: {
			"servidor": 51.67,
			"correo": 2.10,
			"donaciones": 48.22,
			"otros": 28.83,
		},
		03: {
			"servidor": 51.67,
			"correo": 2.75,
			"donaciones": 54.17, // Patreon: 44.53, Ko-Fi: 9.64
		},
		04: {
			"servidor": 51.67,
			"correo": 13.12,
			"donaciones": 92.69, // Patreon: 38.03, Stripe: 54.66, Paypal: 30.8
		},
		05: {
			"servidor": 51.67,
			"correo": 1.48,
			"donaciones": 144.29, // Patreon: 45.66, Stripe: 93.81, Paypal: 4.82
		},
		06: {
			"servidor": 51.67,
			"correo": 1.36,
			"donaciones": 49.36, // Patreon: 44.54, Stripe: 0, Paypal: 4.82
		},
		07: {
			"servidor": 51.67,
			"correo": 1.22,
			"donaciones": 97.89, // Patreon: 43.42, Stripe: 49.65, Paypal: 4.82
		},
		08: {
			"servidor": 51.67,
			"correo": 3.24,
			"donaciones": 95.42, // Patreon: 47.7, Stripe: 13.04, Paypal: 34.68
		},
		09: {
			"servidor": 51.67,
			"correo": 3.49,
			"donaciones": 68.52, // Patreon: 46.57, Stripe: 9.60, Paypal: 12.35
		},
		10: {
			"servidor": 51.67,
			"correo": 2.89,
			"donaciones": 106.47, // Patreon: 53,43, Stripe: 41.31, Paypal: 11.73
			"otros": 156.19
		},
		11: {
			"servidor": 51.67,
			"correo": 4.41,
			"donaciones": 213.21, // Patreon: 46.08, Stripe: 129.73, Paypal: 37.4
		},
		12: {
			"servidor": 51.67,
			"correo": 3.42,
			"donaciones": 287.34, // Patreon: 51.86, Stripe: 105.84, Paypal: 129,64
		},
	},

}

const data_dominio = {
    2022: 8.57,
    2023: 9.78,
	2024: 9.78,
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
    tablas += `<td class=${positivo ? "green" : "red"}>${coste_acumulado.toFixed(2)}€</td>`
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
    tablas += add_row(year, "otros", false)
    tablas += add_row(year, "donaciones", true)
    tablas += add_row_total(year);
    tablas += add_row_acumulado(year);
    tablas += '</table></details>'
    document.getElementById("tablas").innerHTML += tablas
})

let resumen = `Balance acumulado: <span class=${acumulado > 0 ? "green" : "red"}>${acumulado.toFixed(2)}€</span>`
resumen += '<br><br>Con las previsiones actuales de gastos e ingresos, masto.es seguirá en funcionamiento indefinidamente 🙂'
document.getElementById("resumen").innerHTML+= resumen
