<template >
  <div class="container-fluid mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div v-if="this.cargandoPedidos" class="loading-overlay d-flex justify-content-center">
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
            <h1 class="md-title">Pedidos</h1>
          </div>
        </md-table-toolbar>

        <md-table-empty-state md-label="No hay pedidos"></md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Id Pedido" md-sort-by="ID_PEDIDO">{{ item.ID_PEDIDO }}</md-table-cell>
          <md-table-cell md-label="Fecha" md-sort-by="FECHA">{{ item.FECHA | formatearFecha }}</md-table-cell>
          <md-table-cell md-label="Importe" md-sort-by="IMPORTE_TOTAL">$ {{ item.IMPORTE_TOTAL | formatoMoneda}}</md-table-cell>
          <md-table-cell
            md-label="Estado"
            md-sort-by="ID_ESTADO"
          >{{ buscarNombreEstado(item.ID_ESTADO) }}</md-table-cell>
        </md-table-row>
      </md-table>
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
      <!-------------------------------- Botones de creacion y actualizacion ----------------------------------------------------->
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
      <div class="mt-3 d-flex justify-content-center">
        <md-button class="md-fab bg-success md-mini" @click="getPedidos()">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <!-------------------------------- Card que muestra el detalle del elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div class="mt-3 d-flex justify-content-center">
      <form v-if="estaSeleccionado" class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">PEDIDO</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <label>Id Pedido</label>
                      <md-input
                        name="id_pedido"
                        id="id_pedido"
                        v-model="seleccionadoTemp.id_pedido"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>Id Direccion</label>
                      <md-input
                        name="id_direccion"
                        id="id_direccion"
                        v-model="seleccionadoTemp.id_direccion"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>ID Usuario</label>
                      <md-input
                        name="id_usuario"
                        id="id_usuario"
                        v-model="seleccionadoTemp.id_usuario"
                        disabled
                      />
                    </md-field>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <label>Id Estado</label>
                      <md-input
                        name="id_estado"
                        id="id_estado"
                        v-model="seleccionadoTemp.id_estado"
                        :disabled="!estaEditando"
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>Fecha del Pedido</label>
                      <md-input name="fecha" id="fecha" v-model="seleccionadoTemp.fecha" disabled />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>Importe Total</label>
                      <md-input
                        name="importe_total"
                        id="importe_total"
                        v-model="seleccionadoTemp.importe_total"
                        disabled
                      />
                    </md-field>
                  </div>
                </div>
                <hr />
                <h4>Detalle de productos</h4>
                <div class="row" v-for="(producto, index) in this.detallePedido" :key="index">
                  <div class="col-lg-3">
                    <md-field>
                      <label>Id Producto</label>
                      <md-input
                        name="ID_PRODUCTO"
                        id="ID_PRODUCTO"
                        v-model="producto.ID_PRODUCTO"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-3">
                    <md-field>
                      <label>Cantidad</label>
                      <md-input name="CANTIDAD" id="CANTIDAD" v-model="producto.CANTIDAD" disabled />
                    </md-field>
                  </div>
                  <div class="col-lg-3">
                    <md-field>
                      <label>Importe Unitario</label>
                      <md-input
                        name="IMPORTE_UNITARIO"
                        id="IMPORTE_UNITARIO"
                        v-model="producto.IMPORTE_UNITARIO"
                        disabled
                      />
                    </md-field>
                  </div>
                  <div class="col-lg-3">
                    <md-field>
                      <label>Subtotal</label>
                      <md-input
                        name="IMPORTE_UNITARIO"
                        id="IMPORTE_UNITARIO"
                        :value="producto.IMPORTE_UNITARIO * producto.CANTIDAD"
                        disabled
                      />
                    </md-field>
                  </div>
                </div>
                <div v-if="!estaEditando" class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini bg-warning" @click="habilitarEdicion()">
                    <md-icon>edit</md-icon>
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
    <!----------------------------- Modal de mensaje de error al crear, Editar o eliminar elemento ----------------------------->
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-alert :md-active.sync="hayMensaje" :md-content="mensaje" md-confirm-text="Ok" />
  </div>
</template>

<script lang="js">
  import url from '../urls.js'

  export default  {
    name: 'src-components-pedidos',
    props: [],
    mounted () {
      this.getPedidos()
    },
    data () {
      return {
        busqueda: null,
        pedidos: [],
        cargandoPedidos: false,
        buscados: [],
        seleccionado: {},
        estaSeleccionado: false,
        claseCard: 'md-layout-item md-size-100 md-small-size-100',
        estaEditando: false,
        seleccionadoTemp: {},
        activo: false,
        estaCreando: false,
        hayMensaje: false,
        mensaje: '',
        detallePedido: [],
        fechaPedido: ''
      }
    },
    methods: {
      async getPedidos(){ 
        try{
          this.cargandoPedidos = true
          const data = await this.axios.get(url.url + url.urlPedidos + '?idUsuario=' + localStorage.getItem('asdfghj'), {            
            headers:
                {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
            })
          this.pedidos = data.data
          this.buscados = data.data
          await this.$store.dispatch('actualizarEstados')
          this.cargandoPedidos = false
        }catch(error){
            console.log("Error GET: " + error)
        }
      },

      async getPedidosDetalle(){ 
        try{          
          const data = await this.axios.get(url.url + url.urlPedidos + '?idDetalle='+this.seleccionadoTemp.id_pedido, {            
            headers:
                {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
            })
            this.detallePedido = data.data  
        }catch(error){
            console.log("Error GET: " + error)
        }
      },

      // seleccion de un elemento de la tabla que muestra el card con el detalle del elemento
      onSelect (item) {
        if(item){
          this.fechaPedido = item.FECHA
          this.seleccionadoTemp = {
            id_pedido: item.ID_PEDIDO,
            id_usuario: item.ID_USUARIO,
            id_direccion: item.ID_DIRECCION,
            importe_total: item.IMPORTE_TOTAL,
            fecha: this.formatearFecha(item.FECHA),
            id_estado: item.ID_ESTADO,       
          } 
          this.seleccionado = item          
          this.estaSeleccionado = true
          this.estaEditando = false
          this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
          this.getPedidosDetalle()
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
      confirmarEdicion(pedidoPut){
        let pedidoPutOk = {
          id_usuario: pedidoPut.id_usuario,
          id_direccion: pedidoPut.id_direccion,
          importe_total: pedidoPut.importe_total,
          fecha: this.fechaPedido,
          id_estado: pedidoPut.id_estado,
          productos: this.detallePedido
        }  
        this.axios.put(url.url + url.urlPedidos + '/'+ this.seleccionado.ID_PEDIDO, pedidoPutOk, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePutOk
              this.estaSeleccionado = false
              this.getPedidos()
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
      buscarNombreEstado(id){ 
        const resultado = this.listaEstados.find( elemento => elemento.ID_ESTADO == id );        
        return resultado.DESCRIPCION
      }
    },
    computed: {
      listaEstados(){
        return this.$store.state.listaEstados
      }

    }
}


</script>

<style scoped lang="css">
.color {
  background: grey;
}
</style>
