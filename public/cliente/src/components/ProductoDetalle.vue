<template>

  <div class="container-fluid">
    <div
      v-if="cargando"
      class="loading-overlay d-flex justify-content-center mt-3"
      >
      <md-progress-spinner
        class="colorSpinner"
        md-mode="indeterminate"
        :md-diameter="50"
        :md-stroke="5"
      ></md-progress-spinner>
    </div>
    <div v-else class="row mt-5">
      <div class="col-lg-6">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active inactive"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1" class="inactive"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2" class="inactive"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active"> 
              <div class="middle">
                <img :src="`.${producto.FOTO1}`" alt="First slide" >
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img :src="`.${producto.FOTO2}`" alt="Second slide">
              </div>
            </div>
            <div class="carousel-item">
              <div class="middle">
                <img :src="`.${producto.FOTO3}`" alt="Third slide">
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <h1 class="text-white">
              {{marca | primeraMayuscula}} 
              {{tipo | primeraMayuscula}} 
              {{producto.MODELO | primeraMayuscula}}
            </h1>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-12 d-flex justify-content-center">
            <div v-if="producto.STOCK > 0">
              <h3 class="text-success">En Stock</h3>
            </div>
            <div v-else>
              <h3 class="text-danger">Sin Stock</h3>
            </div>
          </div>        
        </div>  
        <div class="row mt-3">
          <div class="col-lg-12 d-flex justify-content-center">
              <h1 class="text-white">$ {{producto.PRECIO | formatoMoneda }}</h1>
          </div>        
        </div>
        <div class="row mt-3 d-flex justify-content-center">
          <button class="btn btn-sm btn-outline-info" @click="agregarProductoCarrito()">Agregar al carrito</button>
          <button class="btn btn-sm btn-outline-info ml-3" @click="restar()">-</button>
          <input readonly class="form-control text-center cantidad" style="width: 60px !important" min="1" value="1" v-model="cantidad">
          <button class="btn btn-sm btn-outline-info" @click="sumar()">+</button>
        </div>   
      </div>  
    </div>
    <div class="row text-center justify-content-center mt-5 desc">
      <h2>Caracteristicas</h2>
    </div>
    <div class="row justify-content-center mt-5 desc">
      <h5 class="text-white">{{producto.DESCRIPCION}}</h5>
    </div>
  </div>

</template>

<script lang="js">
  import url from '../urls.js' 

  export default  {
    name: 'src-components-producto-detalle',
    props:{
      id_prod: String
    },
    mounted () {
      this.getProductoPorId()
    },
    data () {
      return {
        producto: {},
        marca: '',
        tipo: '',
        cargando: false,
        cantidad: 1,
      }
    },
    methods: {
      async getProductoPorId(){ 
        try{
          this.cargando = true
          const data = await this.axios.get(url.url + url.urlProductos + '?id_producto=' + this.id_prod)
          await this.$store.dispatch('actualizarMarcas')
          await this.$store.dispatch('actualizarTipos')
          this.producto = data.data[0]
          this.buscarNombreMarca(this.producto.ID_MARCA)
          this.buscarNombreTipo(this.producto.ID_TIPO)
          this.cargando = false
        }catch(error){
            console.log("Error GET: " + error)
        }
      },

      buscarNombreMarca(id){
        const resultado = this.$store.state.listaMarcas.find( elemento => elemento.ID_MARCA == id );
        this.marca = resultado.DESCRIPCION
      },

      buscarNombreTipo(id){ 
        const resultado = this.$store.state.listaTipos.find( elemento => elemento.ID_TIPO == id );
        this.tipo = resultado.DESCRIPCION
      },

      agregarProductoCarrito(){
        let productoCant = {
          producto: this.producto,
          cantidad: this.cantidad
        }
        this.$store.dispatch('agregarProductoCarrito', productoCant)
        localStorage.setItem('carrito', JSON.stringify(this.$store.state.carrito))
        this.$store.dispatch('contarProductos')
      },

      sumar(){
        this.cantidad ++
      },
      restar(){
        if(this.cantidad > 1){
          this.cantidad --
        }
      }
    },
    computed: {
    }
}


</script>

<style scoped lang="css">

.desc{
  color: white;
}
.cantidad{
  width: 10% !important;
}
.carousel-indicators .inactive{
    background-color: #48448a;
}

.carousel-indicators .active{
    background-color: #1D1B38;
}

.carousel {
  width: 80%;
  height: 100%;
  background-color: white;
} 
.middle {
  position: relative;
  height:500px;
}

.middle img {
  max-width: 100%;
  max-height:100%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
