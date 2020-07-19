<template>
  <div class="container-fluid mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div v-if="!estaCreando">
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
      <div v-else>
        <md-table
          v-model="buscados"
          md-sort="name"
          md-sort-order="asc"
          md-card
          md-fixed-header
          @md-selected="onSelect"
        >
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Administracion de productos</h1>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input
                class="text-primary"
                placeholder="Buscar producto..."
                v-model="busqueda"
                @input="buscarEnTabla"
              />
            </md-field>
          </md-table-toolbar>
          <md-table-empty-state md-label="No hay productos"></md-table-empty-state>
          <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
            <md-table-cell md-label="Id Producto" md-sort-by="ID_PRODUCTO">{{ item.ID_PRODUCTO }}</md-table-cell>
            <md-table-cell md-label="Modelo" md-sort-by="MODELO">{{ item.MODELO | primeraMayuscula}}</md-table-cell>
            <md-table-cell
              md-label="Descripcion"
              md-sort-by="DESCRIPCION"
            >{{ item.DESCRIPCION | primeraMayuscula}}</md-table-cell>
            <md-table-cell md-label="Precio" md-sort-by="PRECIO">$ {{ item.PRECIO | formatoMoneda }}</md-table-cell>
            <md-table-cell md-label="Stock" md-sort-by="STOCK">{{ item.STOCK }}</md-table-cell>
            <md-table-cell
              md-label="Fecha de ingreso"
              md-sort-by="FECHA_INGRESO"
            >{{ item.FECHA_INGRESO | formatearFecha}}</md-table-cell>
          </md-table-row>
        </md-table>
        <!-- -------------------------------------------------------------------------------------------------------------------- -->
        <!-------------------------------- Botones de creacion y actualizacion ----------------------------------------------------->
        <!-- -------------------------------------------------------------------------------------------------------------------- -->
        <div class="mt-3 d-flex justify-content-center">
          <md-button class="md-fab bg-success md-mini" @click="getProductos()">
            <md-icon>refresh</md-icon>
          </md-button>
          <md-button class="md-fab md-primary md-mini" @click="mostrarNuevo()">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!----------------------------- Modal de formulario de creacion de elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div v-else class="container">
      <vue-form :state="formState" @submit.prevent="confirmarAgregar()">
        <md-card class="pepe md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
            <h5 class="mt-3">Nuevo registro</h5>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="md-layout-item">
                      <md-field>
                        <label>Tipo</label>
                        <md-select v-model="tipo">
                          <div v-for="(tipo, index) in listaTipos" :key="index">
                            <md-option :value="tipo.ID_TIPO">{{ tipo.DESCRIPCION }}</md-option>
                          </div>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="md-layout-item">
                      <md-field>
                        <label>Marca</label>
                        <md-select v-model="marca">
                          <div v-for="(marca, index) in listaMarcas" :key="index">
                            <md-option :value="marca.ID_MARCA">{{ marca.DESCRIPCION }}</md-option>
                          </div>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>Modelo</label>
                        <md-input
                          maxlength="50"
                          name="MODELO"
                          id="MODELO"
                          v-model="formData.MODELO"
                          required
                        />
                      </validate>
                    </md-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <validate tag="div">
                      <md-field>
                        <label>Descripcion</label>
                        <md-textarea v-model="formData.DESCRIPCION" required></md-textarea>
                      </md-field>
                    </validate>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>Precio</label>
                        <md-input
                          maxlength="15"
                          name="PRECIO"
                          id="PRECIO"
                          v-model="formData.PRECIO"
                          required
                        />
                      </validate>
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>Stock</label>
                        <md-input
                          maxlength="5"
                          name="STOCK"
                          id="STOCK"
                          v-model="formData.STOCK"
                          required
                        />
                      </validate>
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>Cantidad de Visitas</label>
                        <md-input
                          maxlength="1"
                          name="CANT_VISITAS"
                          id="CANT_VISITAS"
                          v-model="formData.CANT_VISITAS"
                          required
                        />
                      </validate>
                    </md-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>FOTO 1</label>
                        <md-input maxlength="50" name="FOTO1" id="FOTO1" v-model="formData.FOTO1" />
                      </validate>
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>FOTO 2</label>
                        <md-input maxlength="50" name="FOTO2" id="FOTO2" v-model="formData.FOTO2" />
                      </validate>
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <validate tag="div">
                        <label>FOTO 3</label>
                        <md-input maxlength="50" name="FOTO3" id="FOTO3" v-model="formData.FOTO3" />
                      </validate>
                    </md-field>
                  </div>
                </div>
                <div class="row d-flex justify-content-end mt-3">
                  <md-button
                    type="submit"
                    class="md-raised md-primary"
                    :disabled="formState.$invalid"
                  >Agregar</md-button>
                  <md-button class="md-primary" @click="estaCreando = false">Cancelar</md-button>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </vue-form>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!-------------------------------- Card que muestra el detalle del elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div class="mt-3 d-flex justify-content-center">
      <form v-if="estaSeleccionado" class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">PRODUCTO</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <md-field>
                      <label>Id producto</label>
                      <md-input
                        name="ID_PRODUCTO"
                        id="ID_PRODUCTO"
                        v-model="seleccionadoTemp.ID_PRODUCTO"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Modelo</label>
                      <md-input
                        name="MODELO"
                        id="MODELO"
                        v-model="seleccionadoTemp.MODELO"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Descripcion</label>
                      <md-input
                        name="DESCRIPCION"
                        id="DESCRIPCION"
                        v-model="seleccionadoTemp.DESCRIPCION"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Precio</label>
                      <md-input
                        name="PRECIO"
                        id="PRECIO"
                        v-model="seleccionadoTemp.PRECIO"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Stock</label>
                      <md-input
                        name="STOCK"
                        id="STOCK"
                        v-model="seleccionadoTemp.STOCK"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Fecha de Ingreso</label>
                      <md-input
                        name="FECHA_INGRESO"
                        id="FECHA_INGRESO"
                        v-model="seleccionadoTemp.FECHA_INGRESO"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>FOTO 1</label>
                      <md-input
                        name="FECHA_INGRESO"
                        id="FECHA_INGRESO"
                        v-model="seleccionadoTemp.FOTO1"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>FOTO 2</label>
                      <md-input
                        name="FECHA_INGRESO"
                        id="FECHA_INGRESO"
                        v-model="seleccionadoTemp.FOTO2"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>FOTO 3</label>
                      <md-input
                        name="FECHA_INGRESO"
                        id="FECHA_INGRESO"
                        v-model="seleccionadoTemp.FOTO3"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                </div>
                <div v-if="!estaEditando" class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini bg-warning" @click="habilitarEdicion()">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button class="md-fab md-mini md-plain" @click="activo = true">
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
                <div v-else class="row d-flex justify-content-center">
                  <md-button
                    class="md-fab md-mini md-primary"
                    @click="confirmarEdicion(seleccionadoTemp)"
                  >
                    <md-icon>check</md-icon>
                  </md-button>
                  <md-button class="md-fab md-mini md-plain" @click="cancelarEdicion()">
                    <md-icon>close</md-icon>
                  </md-button>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!---------------------------- Modal de confirmacion para eliminar elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-confirm
      :md-active.sync="activo"
      md-title="Atencion"
      md-content="¿Esta seguro que desea eliminar el registro?"
      md-cancel-text="Cancelar"
      md-confirm-text="Aceptar"
      @md-cancel="activo = false"
      @md-confirm="confirmarEliminar(seleccionadoTemp)"
    />
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!----------------------------- Modal de mensaje de error al crear, Editar o eliminar elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-alert :md-active.sync="hayMensaje" :md-content="mensaje" md-confirm-text="Ok" />
  </div>
</template>

<script lang="js">
  import url from '../urls.js'  

    const toLower = text => {
    return text.toString().toLowerCase()
  }

  const buscarPorNombre = (lista, valor) => {
    if (valor) {
      return lista.filter(item => toLower(item.DESCRIPCION).includes(toLower(valor)))
    }
    return lista
  }

  export default  {
    name: 'src-components-productos-admin',
    props: [],
    mounted () {   
      this.estaSeleccionado = false
      this.estaEditando = false 
      if(this.$store.state.token){
        this.getProductos()
        this.$store.dispatch("actualizarTipos")
        this.$store.dispatch("actualizarMarcas")
      }
      else{
        this.$router.push({path: '/login'})
      }
    },
    data () {
      return {
        busqueda: null,
        buscados: [],
        seleccionado: {},
        estaSeleccionado: false,
        claseCard: 'md-layout-item md-size-100 md-small-size-100',
        estaEditando: false,
        seleccionadoTemp: {},
        activo: false,
        estaCreando: false,
        formState: {},
        formData: this.getDatosIniciales(),
        hayMensaje: false,
        mensaje: '',
        cargando: true,
        tipo: null,
        tipos: [],
        marca: null,
        marcas: [],
        fechaProducto: ''

      }
    },
    methods: {

      // incializa datos del objeto de creacion de elemento
      getDatosIniciales(){
        return {
          MODELO: '',
          ID_TIPO: '',
          ID_MARCA: '',
          DESCRIPCION: '',
          PRECIO: '',   
          STOCK: '',
          FECHA_INGRESO: '',
          CANT_VISITAS: ''
        }
      },

      // metodo que trae todos los elementos
      async getProductos() {      
        await this.$store.dispatch('actualizarProductos')
        this.buscados = this.$store.state.listaProductos
      },

      // buscador de elemento en la tabla
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.$store.state.listaProductos, this.busqueda)
      },

      // activa modal de creacion de elemento
      mostrarNuevo () {
       this.estaCreando = true
       this.estaSeleccionado = false
       this.tipo = null
       this.marca = null
       this.formData = this.getDatosIniciales()
      },

      // seleccion de un elemento de la tabla que muestra el card con el detalle del elemento
      onSelect (item) {
        if(item){
          this.fechaProducto = item.FECHA_INGRESO
          this.seleccionadoTemp = {
            ID_PRODUCTO: item.ID_PRODUCTO,
            ID_TIPO: item.ID_TIPO,
            ID_MARCA: item.ID_MARCA,
            MODELO: item.MODELO,
            DESCRIPCION: item.DESCRIPCION,
            STOCK: item.STOCK,
            PRECIO: item.PRECIO,
            CANT_VISITAS: item.CANT_VISITAS,
            FECHA_INGRESO: this.formatearFecha(item.FECHA_INGRESO),
            FOTO1: item.FOTO1,
            FOTO2: item.FOTO2,
            FOTO3: item.FOTO3
          } 
          this.seleccionado = item          
          this.estaSeleccionado = true
          this.estaEditando = false
          this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
        }else{
          this.estaSeleccionado = false
          this.estaEditando = false              
            
        }    
        
      },

       // habilita el card para la edición del elemento
      habilitarEdicion(){          
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
        this.estaEditando = true
      },
      
      // cancela la edición del elemento
      cancelarEdicion(){
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
        this.seleccionadoTemp = this.seleccionado   
        this.estaSeleccionado = false      
      },

      // metodo que modifica el elemento
      confirmarEdicion(productoPut){
           
        let prodNuevo=
        {
            ID_TIPO:productoPut.ID_TIPO,
            ID_MARCA:productoPut.ID_MARCA,
            MODELO:productoPut.MODELO,
            DESCRIPCION:productoPut.DESCRIPCION,
            STOCK:productoPut.STOCK,
            PRECIO:productoPut.PRECIO,
            CANT_VISITAS:productoPut.CANT_VISITAS,
            FECHA_INGRESO:this.fechaProducto,
            FOTO1: productoPut.FOTO1,
            FOTO2: productoPut.FOTO2,
            FOTO3: productoPut.FOTO3
         }     
        this.axios.put(url.url + url.urlProductos + '/'+ this.seleccionado.ID_PRODUCTO, prodNuevo, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePutOk
              this.estaSeleccionado = false
              this.getProductos() 
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
              this.estaSeleccionado = false
            }     
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
       
      },

       // metodo que agrega el elemento
      confirmarAgregar(){
        this.formData.ID_MARCA = this.marca
        this.formData.ID_TIPO = this.tipo
        this.axios.post(url.url + url.urlProductos , this.formData, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => { 
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePostOk
              this.estaSeleccionado = false               
              this.getProductos() 
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
            }                                    
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        this.estaCreando = false

      },

      // metodo que elimina el elemento
      confirmarEliminar(productoDel){
        this.axios.delete(url.url + url.urlProductos + '/'+ productoDel.ID_PRODUCTO, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajeDelOk
              this.estaSeleccionado = false               
              this.getProductos() 
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
              this.estaSeleccionado = false
            }                      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })      
      },
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
.color {
  background: grey;
}
.colorTitulo {
  color: #1d1b38 !important;
}

md-menu-content {
  z-index: 99999 !important;
}
</style>