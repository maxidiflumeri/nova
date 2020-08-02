<template>
  <div v-if="cargando" class="loading-overlay d-flex justify-content-center mt-3">
    <md-progress-spinner
      class="colorSpinner"
      md-mode="indeterminate"
      :md-diameter="50"
      :md-stroke="5"
    ></md-progress-spinner>
  </div>
  <div v-else-if="total==0" class="text-white text-center mt-3">
    <h2>Tu carrito está vacío</h2>
    <div class="d-flex justify-content-center">
      <router-link to="/Productos">
        <md-button class="btn btn-lg btn-outline-info">Ver productos</md-button>
      </router-link>
    </div>
  </div>
  <div v-else class="container">
    <div class="text-white mt-5 text-center">
      <h2>Mi Carrito</h2>
    </div>
    <div class="mt-5" v-for="(detalleCarrito,index) in this.$store.state.carrito" :key="index">
      <hr />
      <div class="row text-white mt-3">
        <div class="col-lg-2">
          <img class="imagenCarr" :src="detalleCarrito.producto.FOTO1" alt="foto1" />
        </div>
        <div class="col-lg-5">
          <h5>{{listaTipos[index] | primeraMayuscula}} {{listaMarcas[index] | primeraMayuscula}} {{detalleCarrito.producto.MODELO}}</h5>
        </div>
        <div class="col-lg-2">
          <div class="row">
            <button class="btn btn-sm btn-outline-info ml-3" @click="restar(detalleCarrito)">-</button>
            <input
              readonly
              class="form-control text-center cantidad"
              style="width: 60px !important"
              min="1"
              value="1"
              v-model="detalleCarrito.cantidad"
            />
            <button class="btn btn-sm btn-outline-info" @click="sumar(detalleCarrito)">+</button>
          </div>
        </div>
        <div class="col-lg-2">
          <h5>$ {{detalleCarrito.producto.PRECIO * detalleCarrito.cantidad | formatoMoneda}}</h5>
        </div>
        <div class="col-lg-1">
          <div class="row d-flex align-items-center">
            <md-button class="md-fab md-mini md-plain ml-5" @click="borrarProducto(detalleCarrito)">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <!----------------- Termina el container del listado de productos ----------------->
    <hr />
    <div class="row mt-3">
      <div class="col-lg-6">
        <button class="btn btn-outline-secondary" @click="vaciarCarrito()">
          <md-icon class="fa fa-trash mr-1"></md-icon>Vaciar carrito
        </button>
      </div>
      <div class="col-lg-6 text-right text-white">
        <h3>Total: $ {{total | formatoMoneda }}</h3>
      </div>
    </div>
    <div class="d-flex justify-content-end text-white"></div>
    <div>
      <div class="d-flex justify-content-start"></div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-lg btn-outline-info" @click="confirmarPedido()">Confirmar pedido</button>
    </div>
    <md-dialog-alert
      :md-active.sync="confirmaPedido"
      :md-content="mensaje"
      md-confirm-text="Ok"
      @click="vaciarCarrito"
    />
  </div>
</template>

<script lang="js">
  import url from '../urls.js'  

  export default  {
    name: 'src-components-mi-carrito',
    props: [],
    mounted () {
      this.getProductosMarcasTipos()
    },
    data () {
      return {
        listaMarcas: [],
        listaTipos: [],
        total: 0,
        confirmaPedido: false,
        cargando: false,
        mensaje: ''
      }
    },
    methods: {
      async getProductosMarcasTipos(){
        this.cargando = true
        await this.$store.dispatch('actualizarMarcas')
        await this.$store.dispatch('actualizarTipos')
        await this.$store.dispatch('actualizarProductos')
        this.completarListas()
        this.cargando = false
      },
      buscarProductoId(id){ 
        const resultado = this.$store.state.listaProductos.find( elemento => elemento.ID_PRODUCTO == id );    
        return resultado
      },
      buscarNombreMarca(id){ 
        const resultado = this.$store.state.listaMarcas.find( elemento => elemento.ID_MARCA == id );
        return resultado.DESCRIPCION
      },
      buscarNombreTipo(id){ 
        const resultado = this.$store.state.listaTipos.find( elemento => elemento.ID_TIPO == id );
        return resultado.DESCRIPCION
      },
      completarListas(){
        this.$store.state.carrito.forEach(element => {
          this.listaMarcas.push(this.buscarNombreMarca(element.producto.ID_MARCA))
          this.listaTipos.push(this.buscarNombreTipo(element.producto.ID_TIPO))
          this.calcularTotal()
        });
      },
      sumar(detalleCarrito){
        this.$store.dispatch('agregarProductoCarrito', {producto: detalleCarrito.producto, cantidad: 1})
        localStorage.setItem('carrito', JSON.stringify(this.$store.state.carrito))
        this.$store.dispatch('contarProductos')
        this.calcularTotal()
      },
      restar(detalleCarrito){
        if(detalleCarrito.cantidad > 1){
          this.$store.dispatch('restarProductoCarrito', {producto: detalleCarrito.producto, cantidad: 1})
          localStorage.setItem('carrito', JSON.stringify(this.$store.state.carrito))
          this.$store.dispatch('contarProductos')
          this.calcularTotal()
        }
      },

      borrarProducto(producto){
        this.$store.dispatch('eliminarProductoCarrito', producto)
        localStorage.setItem('carrito', JSON.stringify(this.$store.state.carrito))
        this.$store.dispatch('contarProductos')
        this.calcularTotal()
      },

      calcularTotal(){
        this.total = 0
        this.$store.state.carrito.forEach(element => {
          this.total += (element.producto.PRECIO * element.cantidad)
        })
      },
      vaciarCarrito(){
        localStorage.setItem('carrito', [])
        this.$store.dispatch('vaciarCarrito')
        this.$store.dispatch('contarProductos')
        this.calcularTotal()
      },
      confirmarPedido(){
        if(this.$store.state.token){ //si tiene token OK
          let pedido = {
            id_usuario: localStorage.getItem('asdfghj'),
            importe_total: this.total,
            fecha: this.obtenerFecha(), //formatea la fecha
            id_estado: "I",
            productos: this.$store.state.carrito
          }

          this.axios.post(url.url + url.urlPedidos + '/agregar' , pedido, {
            headers:
              {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
            })
            .then( res => { 
              console.log(res.data)
              if(res.data.estado == 200){
                this.confirmaPedido = true
                this.mensaje = this.$store.state.mensajePostOk
              }else{
                this.confirmaPedido = true
                this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
              }                                    
          })
          .catch(error => {
            console.log('ERROR GET HTTP', error)
          })
        }else{
          this.$router.push('/login')//si no tiene token se tiene que loguear
        }

      },

      obtenerFecha(){
        let fecha_ob = new Date();
        let dia = ("0" + fecha_ob.getDate()).slice(-2);
        let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
        let anio = fecha_ob.getFullYear();
        let fechaAct = anio + "-" + mes + "-" + dia

        return fechaAct

      }
    },
    computed: {
    }
}


</script>

<style scoped lang="css">
.src-components-mi-carrito {
}

.imagenCarr {
  width: 50%;
}
hr {
  background-color: white;
}
.btn-outline-info {
  color: white;
  border-color: #1d1b38;
  background-color: #1d1b38;
}
.btn-outline-info:hover {
  color: #fff;
  background-color: #39356e;
  border-color: #1d1b38;
}
.btn-outline-info.focus,
.btn-outline-info:focus {
  box-shadow: 0 0 0 0.2rem rgba(29, 27, 56, 1);
}

.btn-outline-info:not(:disabled):not(.disabled).active,
.btn-outline-info:not(:disabled):not(.disabled):active,
.show > .btn-outline-info.dropdown-toggle {
  color: #fff;
  background-color: #1d1b38;
  border-color: #1d1b38;
}
.btn-outline-info.disabled,
.btn-outline-info:disabled {
  color: #1d1b38;
  background-color: transparent;
}
</style>
