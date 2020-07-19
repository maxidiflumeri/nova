import Vue from 'vue'

Vue.filter('formatearFecha', function (value) {
    if (value) {
        let fecha = value.substr(8, 2) + "/" + value.substr(5, 2) + "/" + value.substr(0, 4)
        return fecha
    }
    return value

})

Vue.filter('formatoMoneda', function (value) {
    let val = (value / 1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})

Vue.filter('primeraMayuscula', function (value) {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
    return value
})

Vue.filter('MayusculaEnSeparados', function (value) {
    if (value) {
        let espacio = value.indexOf(" ")
        if (espacio != -1) {
            let palabra1 = value.substr(0, espacio)
            let palabra2 = value.substr(espacio + 1, value.length)
            return palabra1.charAt(0).toUpperCase() + palabra1.slice(1).toLowerCase() + " "
                + palabra2.charAt(0).toUpperCase() + palabra2.slice(1).toLowerCase()

        } else {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        }
    }
    return value
})