import Vue from 'vue'
import Vuex from 'vuex'
import url from './urls.js' 
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        token: null,
        perfil: null,
        listaTipos: [],
        cargandoTipos: false,
        listaMarcas: [],
        cargandoMarcas: false,
        listaEstados: [],
        cargandoEstados: false,
        listaProductos: [],
        cargandoProductos: false,
        mensajePutOk: 'Registro modificado exitosamente',
        mensajePostOk: 'Registro agregado exitosamente', 
        mensajeDelOk: 'Registro eliminado exitosamente',
        carrito: [],
        cantProductos: 0

    },
    actions : {
        login({commit}, data) {
            commit('login', data)
        },
        logout({commit}) {
            commit('logout')
        },

        async actualizarTipos({commit}){ 
            try{
                commit('cambiarCargandoTipos', true)          
                const data = await axios.get(url.url + url.urlTipos, {            
                headers:
                    {'Authorization': `Bearer ${this.state.token.substr(1, this.state.token.length-2)}`}
                })
                commit('actualizarTipos', data.data)
                commit('cambiarCargandoTipos', false) 
            }catch(error){
                console.log("Error GET: " + error)
            }
        },

        async actualizarMarcas({commit}){ 
            try{
                commit('cambiarCargandoMarcas', true)          
                const data = await axios.get(url.url + url.urlMarcas, {            
                headers:
                    {'Authorization': `Bearer ${this.state.token.substr(1, this.state.token.length-2)}`}
                })
                commit('actualizarMarcas', data.data)              
                commit('cambiarCargandoMarcas', false) 
            }catch(error){
                console.log("Error GET: " + error)
            }
        },
        
        async actualizarEstados({commit}){ 
            try{
                commit('cambiarCargandoEstados', true)          
                const data = await axios.get(url.url + url.urlEstados, {            
                headers:
                    {'Authorization': `Bearer ${this.state.token.substr(1, this.state.token.length-2)}`}
                })
                commit('actualizarEstados', data.data)
                commit('cambiarCargandoEstados', false) 
            }catch(error){
                console.log("Error GET: " + error)
            }
        },

        async actualizarProductos({commit}){ 
            try{
                commit('cambiarCargandoProductos', true)          
                const data = await axios.get(url.url + url.urlProductos, {            
                headers:
                    {'Authorization': `Bearer ${this.state.token.substr(1, this.state.token.length-2)}`}
                })
                commit('actualizarProductos', data.data)
                commit('cambiarCargandoProductos', false) 
            }catch(error){
                console.log("Error GET: " + error)
            }
        },

        agregarProductoCarrito({commit}, detalleCarrito){
            const resultado = this.state.carrito.find( elemento => elemento.producto.ID_PRODUCTO == detalleCarrito.producto.ID_PRODUCTO)
            const index = this.state.carrito.indexOf(resultado)
            console.log("RESULTADO: " + index)
            if(index == -1){
                commit('agregarProductoCarrito', detalleCarrito)
            }
            else{

                commit('sumarCantidad', {index: index, cantidad: detalleCarrito.cantidad})
            }
        },
        restarProductoCarrito({commit}, detalleCarrito){
            const resultado = this.state.carrito.find( elemento => elemento.producto.ID_PRODUCTO == detalleCarrito.producto.ID_PRODUCTO)
            const index = this.state.carrito.indexOf(resultado)
            console.log("RESULTADO: " + index)
            commit('restarCantidad', {index: index, cantidad: detalleCarrito.cantidad})
        },

        actualizarCarrito({commit}, carritoCompleto){
            commit('actualizarCarrito', carritoCompleto)
        },

        eliminarProductoCarrito({commit}, idProducto){
            commit('eliminarProductoCarrito', idProducto)
        },

        contarProductos({commit}){
            let cant = 0
            this.state.carrito.forEach(prod => {
                cant = cant + Number(prod.cantidad)
            });
            commit('contarProductos', cant)
        },

        vaciarCarrito({commit}){
            commit('vaciarCarrito')
        }        
    },
    mutations : {
        login(state, data) {
            state.token = data.token
            state.perfil = data.perfil
        },
        logout(state){
            state.token = null
            state.perfil = null
        },
        actualizarTipos(state, listaTipos){
            state.listaTipos = listaTipos
        },
        cambiarCargandoTipos(state, estado){
            state.cargandoTipos = estado
        },
        actualizarMarcas(state, listaMarcas){
            state.listaMarcas = listaMarcas
        },
        cambiarCargandoMarcas(state, estado){            
            state.cargandoMarcas = estado
        },
        actualizarEstados(state, listaEstados){
            state.listaEstados = listaEstados
        },
        cambiarCargandoEstados(state, estado){            
            state.cargandoEstados = estado
        },
        actualizarProductos(state, listaProductos){
            state.listaProductos = listaProductos
        },
        cambiarCargandoProductos(state, estado){            
            state.cargandoProductos = estado
        },
        agregarProductoCarrito(state, productoCant){
            state.carrito.push(productoCant)
        },
        eliminarProductoCarrito(state, idProducto){
            state.carrito.delete(idProducto)
        },
        actualizarCarrito(state, carritoCompleto){
            state.carrito = carritoCompleto
        },
        contarProductos(state, cant){
            state.cantProductos = cant
        },
        sumarCantidad(state, obj){
            state.carrito[obj.index].cantidad = state.carrito[obj.index].cantidad + obj.cantidad
        },
        restarCantidad(state, obj){
            state.carrito[obj.index].cantidad = state.carrito[obj.index].cantidad - obj.cantidad
        },
        vaciarCarrito(state){
            state.carrito = []
        }
    }
})