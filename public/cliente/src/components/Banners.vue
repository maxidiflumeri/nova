<template>

  <div class="container-fluid mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div
      v-if="this.$store.state.cargandoBanners"
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
            <h1 class="md-title">Banners</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input
              class="text-primary"
              placeholder="Buscar banner..."
              v-model="busqueda"
              @input="buscarEnTabla"
            />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="No hay Banners"></md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Id Banner" md-sort-by="id_banner">{{ item.id_banner }}</md-table-cell>
          <md-table-cell
            md-label="Imagen"
            md-sort-by="img"
          >{{ item.img | primeraMayuscula}}</md-table-cell>
        </md-table-row>
      </md-table>
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
      <!-------------------------------- Botones de creacion y actualizacion ----------------------------------------------------->
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
      <div class="mt-3 d-flex justify-content-center">
        <md-button class="md-fab bg-success md-mini" @click="getBanners()">
          <md-icon>refresh</md-icon>
        </md-button>
        <!-- <md-button class="md-fab md-primary md-mini" @click="mostrarNuevo()">
          <md-icon>add</md-icon>
        </md-button> -->
      </div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!-------------------------------- Card que muestra el detalle del elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->

    <div class="mt-3 d-flex justify-content-center">
      <form v-if="estaSeleccionado" class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">BANNER</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <md-field>
                      <label>Id Banner</label>
                      <md-input
                        name="id_banner"
                        id="id_banner"
                        v-model="seleccionadoTemp.id_banner"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Imagen</label>
                      <md-input
                        name="img"
                        id="img"
                        v-model="seleccionadoTemp.img"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                </div>
                <div v-if="!estaEditando" class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini bg-warning" @click="habilitarEdicion()">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <!-- <md-button class="md-fab md-mini md-plain" @click="activo = true">
                    <md-icon>delete</md-icon>
                  </md-button> -->
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
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!----------------------------- Modal de formulario de creacion de elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog :md-active.sync="estaCreando">
      <md-dialog-title>Nuevo registro</md-dialog-title>
      <vue-form :state="formState" @submit.prevent="confirmarAgregar()">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <md-field>
                  <validate tag="div">
                    <label>Imagen</label>
                    <md-input
                      maxlength="30"
                      name="img"
                      id="img"
                      v-model="formData.img"
                      required
                    />
                  </validate>
                </md-field>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <md-dialog-actions>
          <md-button
            type="submit"
            class="md-raised md-primary"
            :disabled="formState.$invalid"
          >Agregar</md-button>
          <md-button class="md-primary" @click="estaCreando = false">Cancelar</md-button>
        </md-dialog-actions>
      </vue-form>
    </md-dialog>
  </div>

</template>

<script lang="js">
  import url from '../urls.js'  

    const toLower = text => {
    return text.toString().toLowerCase()
  }

  const buscarPorNombre = (lista, valor) => {
    if (valor) {
      return lista.filter(item => toLower(item.img).includes(toLower(valor)))
    }
    return lista
  }

  export default  {
    name: 'src-components-banner',
    props: [],
    mounted () {
      this.estaSeleccionado = false
      this.estaEditando = false 
      if(this.$store.state.token && localStorage.getItem('perfil')){
        this.getBanners()               
      }
      else{
        this.$router.push({path: '/productos'})
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
        mensaje: ''
      }
    },
    methods: {
      // activa modal de creacion de elemento
      mostrarNuevo(){
        this.estaCreando = true
        this.formData = this.getDatosIniciales()
      },

      // incializa datos del objeto de creacion de elemento
      getDatosIniciales(){
        return {
          img: ''
        }
      },  

      // metodo que trae todos los elementos    
      async getBanners() {      
        await this.$store.dispatch('actualizarBanners')
        this.buscados = this.$store.state.listaBanners
      },

      // buscador de elemento en la tabla
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.$store.state.listaBanners, this.busqueda)
      },

      // seleccion de un elemento de la tabla que muestra el card con el detalle del elemento
      onSelect (item) {
        if(item){
          this.seleccionadoTemp = {
            id_banner: item.id_banner,
            img: item.img           
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
      confirmarEdicion(bannerPut){        
        this.axios.put(url.url + url.urlBanners + '/modificar/'+ this.seleccionado.id_banner, {img: bannerPut.img}, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePutOk
              this.estaSeleccionado = false               
              this.getBanners() 
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
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
        this.axios.post(url.url + url.urlBanners + '/agregar' , this.formData, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => { 
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePostOk
              this.estaSeleccionado = false               
              this.getBanners() 
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
      confirmarEliminar(bannerDel){
        this.axios.delete(url.url + url.urlBanners + '/eliminar/'+ bannerDel.id_banner, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajeDelOk
              this.estaSeleccionado = false               
              this.getBanners() 
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
            }  
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })

      },
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.color {
  background: gray;
}

.colorTitulo {
  color: #1d1b38 !important;
}
</style>
