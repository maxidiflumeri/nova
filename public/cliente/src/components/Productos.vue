<template>
  <div class="container mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div
      v-if="this.$store.state.cargandoProductos"
      class="loading-overlay d-flex justify-content-center"
    >
      <md-progress-spinner
        class="colorSpinner"
        md-mode="indeterminate"
        :md-diameter="50"
        :md-stroke="5"
      ></md-progress-spinner>
    </div>
    <div v-else class="row">
      <div class="col-lg-2 mt-4">
        <div v-if="orden == 1">
          <button class="btn btn-sm btn-outline-info" @click="ordenarPorPrecio">
            Orden por precio
            <md-icon class="pepe">arrow_upward</md-icon>
          </button>
        </div>
        <div v-else>
          <button class="btn btn-sm btn-outline-info" @click="ordenarPorPrecio">
            Orden por precio
            <md-icon>arrow_downward</md-icon>
          </button>
        </div>
        <div class="mt-2">
          <a class="text-secondary" href="#" @click="limpiarFiltros()">Limpiar filtros</a>
        </div>

        <div>
          <h5 class="text-white mt-3">Marca</h5>
          <div v-for="(marca, index) in listaMarcas" :key="index">
            <a
              class="text-secondary"
              href="#"
              @click="filtrarMarca(marca)"
            >{{marca.DESCRIPCION | primeraMayuscula}} ({{contadorMarcas[index]}})</a>
          </div>
        </div>
        <div>
          <h5 class="text-white mt-3">Tipo</h5>
          <div v-for="(tipo, index) in listaTipos" :key="index">
            <a
              class="text-secondary"
              href="#"
              @click="filtrarTipo(tipo)"
            >{{tipo.DESCRIPCION | primeraMayuscula}} ({{contadorTipos[index]}})</a>
          </div>
        </div>
      </div>

      <div class="col-lg-10">
        <div class="row">
          <div
            class="col-lg-4 col-sm-6"
            v-for="(producto, index) in this.listaProductos"
            :key="index"
          >
            <div class="card fondoCard m-3 bg-dark text-white" style="width: 100%;">   
              <div class="middle">           
                <img
                  class="card-img-top"
                  :src="producto.FOTO1"
                  alt="Card image cap"
                />
              </div>
              <div class="card-body ">
                <h5 class="card-title ">$ {{producto.PRECIO | formatoMoneda}}</h5>
                <div v-if="producto.STOCK > 0">
                  <span class="text-success">En Stock</span>
                </div>
                <div v-else>
                  <span class="text-danger">Sin Stock</span>
                </div>
                <p
                  class="card-text mt-2"
                >{{buscarNombreMarca(producto.ID_MARCA)}} {{producto.MODELO}}</p>
                <button
                  href="#"
                  class="btn btn-outline-info"
                  @click="detalleProducto(producto)"
                >Ver detalles</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

  export default  {
    name: 'src-components-productos',
    props: [],
    mounted () {
      this.get()  
      // if(this.$store.state.token){
      //   this.get()     
      // }
      // else{
      //   this.$router.push({path: '/login'})
      // }
      
    },
    data () {
      return {
        listaProductos: [],
        orden: 1,
        contadorMarcas: [],
        contadorTipos: [],
        imagen: "./img/1-1.jpg"
      }
    },
    methods: {

      // metodo que trae todos los productos
      async get() {      
        await this.$store.dispatch('actualizarProductos')
        await this.$store.dispatch('actualizarMarcas')
        await this.$store.dispatch('actualizarTipos')
        this.contarMarcas()
        this.contarTipos()
        this.listaProductos = this.$store.state.listaProductos
        this.listaProductos.sort((a, b) => a.PRECIO - b.PRECIO)
      },

      // metodo que me lleva a la vista del detalle de un producto especifico
      detalleProducto(producto){
        let id = producto.ID_PRODUCTO
        this.$router.push({path: `/ProductoDetalle/${id}`})
      },
      limpiarFiltros(){
        this.listaProductos = this.$store.state.listaProductos
      },

      filtrarTipo(tipo){
        this.listaProductos = this.$store.state.listaProductos        
        let productosFiltrados = this.listaProductos.filter(elemento => elemento.ID_TIPO == tipo.ID_TIPO)
        this.listaProductos = productosFiltrados
      },
      
      filtrarMarca(marca){
        this.listaProductos = this.$store.state.listaProductos        
        let productosFiltrados = this.listaProductos.filter(elemento => elemento.ID_MARCA == marca.ID_MARCA)
        this.listaProductos = productosFiltrados
      },

      buscarNombreMarca(id){ 
        const resultado = this.$store.state.listaMarcas.find( elemento => elemento.ID_MARCA == id );        
        return resultado.DESCRIPCION
      },

      ordenarPorPrecio(){
        if(this.orden == 0){
          this.listaProductos.sort((a, b) => a.PRECIO - b.PRECIO)
          this.orden = 1
        }else{
          this.listaProductos.sort((a, b) => b.PRECIO - a.PRECIO)
           this.orden = 0
        }          
      },
      contarMarcas(){
        for (let index = 0; index < this.listaMarcas.length; index++) {
          this.filtrarMarca(this.listaMarcas[index])
          this.contadorMarcas.push(this.listaProductos.length)
          }
        },
      contarTipos(){
        for (let index = 0; index < this.listaTipos.length; index++) {
          this.filtrarTipo(this.listaTipos[index])
          this.contadorTipos.push(this.listaProductos.length)
        }
      }
    },
    computed: {
      listaTipos(){
        return this.$store.state.listaTipos
      },
      listaMarcas(){
        return this.$store.state.listaMarcas
      }
    }
}


</script>

<style scoped lang="css">
md-table-row md-table-cell {
  color: white !important;
}

.card-expansion {
  height: 100%;
}

.md-card {
  width: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
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

.middle {
  position: relative;
  height:300px;
  background: white;
}

.middle img {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
