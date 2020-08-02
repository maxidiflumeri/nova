<template>
  <div class="container-fluid mt-3">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!------------------------- Creacion de la tabla que muestra los resultados ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div v-if="cargando" class="loading-overlay d-flex justify-content-center">
      <md-progress-spinner class="colorSpinner" md-mode="indeterminate" :md-diameter="50" :md-stroke="5"></md-progress-spinner>
    </div>
    <div v-else>
      <md-table v-model="buscados" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Usuarios</h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input class = "text-primary" placeholder="Buscar usuario..." v-model="busqueda" @input="buscarEnTabla" />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No hay Usuarios" >        
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell  md-label="Id Usuario" md-sort-by="ID_USUARIO">{{ item.ID_USUARIO }}</md-table-cell>
          <md-table-cell  md-label="Nombre" md-sort-by="NOMBRE">{{ item.NOMBRE | primeraMayuscula}}</md-table-cell>
          <md-table-cell  md-label="Apellido" md-sort-by="APELLIDO">{{ item.APELLIDO | MayusculaEnSeparados}}</md-table-cell>        
          <md-table-cell  md-label="Fecha de Nacimiento" md-sort-by="FECHA_NACIMIENTO">{{ item.FECHA_NACIMIENTO | formatearFecha}}</md-table-cell> 
          <md-table-cell  md-label="Correo Electrónico" md-sort-by="CORREO">{{ item.CORREO}}</md-table-cell> 
          <md-table-cell  md-label="Sexo" md-sort-by="SEXO">{{ item.SEXO | primeraMayuscula}}</md-table-cell> 
          <md-table-cell  md-label="Administrador" md-sort-by="ADMINISTRADOR">{{ item.ADMINISTRADOR  }}</md-table-cell> 
        </md-table-row>      
      </md-table>
      <!-- -------------------------------------------------------------------------------------------------------------------- -->    
      <!-------------------------------- Botones de creacion y actualizacion ----------------------------------------------------->
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
        <div class="mt-3 d-flex justify-content-center">
          <md-button class="md-fab bg-success md-mini" @click="getUsuarios()">
            <md-icon>refresh</md-icon>
          </md-button>
        </div>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!-------------------------------- Card que muestra el detalle del elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <div class="d-flex justify-content-center">     
      <form v-if="estaSeleccionado" class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">USUARIO</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-3">
                    <md-field>
                      <label>Id Usuario</label>
                      <md-input name="id_usuario" id="id_usuario" v-model="seleccionadoTemp.id_usuario" disabled />
                    </md-field>
                  </div>
                  <div class="col-lg-5">
                    <md-field>
                      <label>Nombre</label>
                      <md-input name="nombre" id="nombre" v-model="seleccionadoTemp.nombre" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>Apellido</label>
                      <md-input name="apellido" id="apellido" v-model="seleccionadoTemp.apellido" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                </div>
                <!--Linea 2-->
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <label>Fecha Nacimiento</label>
                      <md-input name="fecha_nacimiento" id="fecha_nacimiento" v-model="seleccionadoTemp.fecha_nacimiento" disabled />
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Correo Electrónico</label>
                      <md-input name="correo" id="correo" v-model="seleccionadoTemp.correo" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-1">
                    <md-field>
                      <label>Sexo</label>
                      <md-input name="sexo" id="sexo" v-model="seleccionadoTemp.sexo" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-1">
                    <md-field>
                      <label>Admin</label>
                      <md-input name="administrador" id="administrador" v-model="seleccionadoTemp.administrador" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                </div>
                <!--BOTONERA CARD-->
                <div v-if="!estaEditando" class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini bg-warning" @click="habilitarEdicion()">
                    <md-icon>edit</md-icon>                    
                  </md-button>
                </div>
                <div v-else class="row d-flex justify-content-center">
                  <md-button class="md-fab md-mini md-primary" @click="confirmarEdicion(seleccionadoTemp)">
                    <md-icon>check</md-icon>                    
                  </md-button>
                  <md-button class="md-fab md-mini md-plain" @click="cancelarEdicion()">
                    <md-icon>close</md-icon>                    
                  </md-button>
                </div>
                <!--BOTONERA TELEFONOS Y DIRECCIONES-->
                <div class="row">
                  <div class="ml-4">
                    <md-button class="md-fab md-mini bg-primary" @click="mostrarTelefonos()">
                      <md-icon>phone</md-icon>                    
                    </md-button>
                    <md-button class="md-fab md-mini bg-primary" @click="mostrarDirecciones()">
                      <md-icon>home</md-icon>                    
                    </md-button>
                  </div>
                </div>

                <!--Card de Telefonos-->
                <div v-if="habilitarTelefono">
                  <div class="row d-flex justify-content-center" v-for="(telefono, index) in this.telefonos" :key="index">
                    <div class="col-lg-5">
                      <md-field>
                        <label>Telefono</label>
                        <md-input name="telefono" id="telefono" v-model="telefonoTemp.telefono" :disabled="!estaEditandoTelefono" />
                      </md-field>
                    </div>
                    <div class="col-lg-5">
                      <md-field>
                        <label>Descripcion</label>
                        <md-input name="sexo" id="sexo" v-model="telefonoTemp.descripcion" :disabled="!estaEditandoTelefono" />
                      </md-field>
                    </div>
                    <div v-if="!estaEditandoTelefono" class="col-lg-2 mt-4">
                      <md-button class="md-icon-button md-dense" @click="habilitarEdicionTelefono()">
                        <md-icon class="text-warning">edit</md-icon>                    
                      </md-button>
                      <md-button class="md-icon-button md-dense md-plain" @click="deleteTelefono()" >
                        <md-icon class="text-danger">delete</md-icon>                    
                      </md-button>
                    </div>
                    <div v-else class="col-lg-2 mt-4">
                      <md-button class="md-icon-button md-dense" @click="confirmaEdicionTelefono(telefono)">
                        <md-icon class="text-success">check</md-icon>                    
                      </md-button>
                      <md-button class="md-icon-button md-dense md-plain" @click="cancelarEdicionTelefono()" >
                        <md-icon class="text-danger">close</md-icon>                    
                      </md-button>
                    </div>
                  </div>
                </div>
                <div v-if="habilitarDireccion && habilitarTelefono">
                    <hr>
                  </div>
                <!--Card de Direcciones-->
                <div v-if="habilitarDireccion">
                  <div v-for="(direccion, index) in this.direcciones" :key="index">
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-5">
                        <md-field>
                          <label>Calle</label>
                          <md-input name="calle" id="calle" v-model="direccionTemp.calle" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                      <div class="col-lg-3">
                        <md-field>
                          <label>Nro</label>
                          <md-input name="nro" id="nro" v-model="direccionTemp.numero" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                      <div class="col-lg-2">
                        <md-field>
                          <label>Piso</label>
                          <md-input name="piso" id="piso" v-model="direccionTemp.piso" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                      <div class="col-lg-2">
                        <md-field>
                          <label>Dpto</label>
                          <md-input name="dpto" id="dpto" v-model="direccionTemp.departamento" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-2">
                        <md-field>
                          <label>CP</label>
                          <md-input name="cp" id="cp" v-model="direccionTemp.cp" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                      <div class="col-lg-4">
                        <md-field>
                          <label>Localidad</label>
                          <md-input name="localidad" id="localidad" v-model="direccionTemp.localidad" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                      <div class="col-lg-4">
                        <md-field>
                          <label>Provincia</label>
                          <md-input name="provincia" id="provincia" v-model="direccionTemp.provincia" :disabled="!estaEditandoDireccion" />
                        </md-field>
                      </div>
                      <div v-if="!estaEditandoDireccion" class="col-lg-2 mt-4">
                        <md-button class="md-icon-button md-dense" @click="habilitarEdicionDireccion()">
                          <md-icon class="text-warning">edit</md-icon>                    
                        </md-button>
                        <md-button class="md-icon-button md-dense md-plain" @click="eliminarDireccion()" >
                          <md-icon class="text-danger">delete</md-icon>                    
                        </md-button>
                      </div>
                      <div v-else class="col-lg-2 mt-4">
                        <md-button class="md-icon-button md-dense" @click="confirmaEdicionDireccion(direccion)">
                          <md-icon class="text-success">check</md-icon>                    
                        </md-button>
                        <md-button class="md-icon-button md-dense md-plain" @click="cancelarEdicionDireccion()" >
                          <md-icon class="text-danger">close</md-icon>                    
                        </md-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </md-card-content>          
        </md-card>
      </form>      
    </div>

    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!----------------------------- Modal de mensaje de error al crear, Editar o eliminar elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-alert
      :md-active.sync="hayMensaje"
      :md-content="mensaje"
      md-confirm-text="Ok" />

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
    name: 'src-components-usuarios',
    props: [],
    mounted () {
      this.estaSeleccionado = false
      this.estaEditando = false
      if(this.$store.state.token){
        this.getUsuarios()
      }
      else{
        this.$router.push({path: '/Login'})
      }
      
    },
    data () {
      return {
        busqueda: null,
        buscados: [],
        usuarios: [],
        seleccionado: {},
        estaSeleccionado: false,
        claseCard: 'md-layout-item md-size-100 md-small-size-100',
        estaEditando: false,
        seleccionadoTemp: {},
        activo: false,
        estaCreando: false,
        hayMensaje: false,
        mensaje: '',
        cargando: true,
        habilitarTelefono: false,
        estaEditandoTelefono: false,
        telefonos: [],
        direcciones: [],
        habilitarDireccion: false,
        telefonoTemp: {},
        direccionTemp: {},
        estaEditandoDireccion: false,
        fechaNacimiento: ''
      }
    },
    methods: {
      // activa modal de creacion de elemento
      mostrarNuevo(){
        this.estaCreando = true
        this.formData = this.getDatosIniciales()
      },

      // metodo que trae todos los elementos
      getUsuarios() {
        this.axios.get(url.url + url.urlUsuarios + '/consultar', {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.buscados = res.data 
          this.usuarios = res.data
          this.cargando = false
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },

      // buscador de elemento en la tabla
      buscarEnTabla () {
        this.buscados = buscarPorNombre(this.usuarios, this.busqueda)
      },

      // seleccion de un elemento de la tabla que muestra el card con el detalle del elemento
      onSelect (item) {
        if(item){
          this.fechaNacimiento = item.FECHA_NACIMIENTO
          this.seleccionadoTemp = {
            id_usuario: item.ID_USUARIO,
            nombre: item.NOMBRE,
            apellido: item.APELLIDO,
            fecha_nacimiento: this.formatearFecha(item.FECHA_NACIMIENTO),
            correo: item.CORREO,
            clave: item.CLAVE,
            sexo: item.SEXO,
            administrador: item.ADMINISTRADOR
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
      confirmarEdicion(usuarioPut){  
        usuarioPut.fecha_nacimiento = this.fechaNacimiento  
        this.axios.put(url.url + url.urlUsuarios + '/modificar/'+ this.seleccionado.ID_USUARIO, usuarioPut, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePutOk
              this.getUsuarios()
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
            }      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
      },

      //habilita la vista de telefonos
      mostrarTelefonos(){
        this.habilitarTelefono = !this.habilitarTelefono
        this.getTelefonos()
        
      },

      //Metodo que trae todos los telefonos del usuario seleccionado
      getTelefonos(){
        this.axios.get(url.url + url.urlTelefonos + '/consultar' + "?idUsuario=" + this.seleccionado.ID_USUARIO, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.telefonos = res.data
          this.telefonoTemp = {
            telefono: res.data[0].TELEFONO,
            descripcion: res.data[0].DESCRIPCION 
          } 
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },

      //metodo que habilita la edicion de un telefono
      habilitarEdicionTelefono(){        
        this.estaEditandoTelefono = true
      },

      cancelarEdicionTelefono(){
        this.estaEditandoTelefono = false
        this.habilitarTelefono = false
      },

      confirmaEdicionTelefono(telefonoPut){
        this.axios.put(url.url + url.urlTelefonos + '/modificar/'+ telefonoPut.ID_USUARIO + '/' + telefonoPut.TELEFONO, this.telefonoTemp, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePutOk
              this.getTelefonos()
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
            }      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })

        this.estaEditandoTelefono = false
      },

      deleteTelefono(){
        this.hayMensaje = true
        this.mensaje = 'No se puede eliminar el unico telefono de la cuenta.'
      },

      //habilita la vista de direcciones
      mostrarDirecciones(){
        this.habilitarDireccion = !this.habilitarDireccion
        this.getDirecciones()
        
      },

      //
      getDirecciones(){
        this.axios.get(url.url + url.urlDirecciones + '/consultar' + "?idUsuario=" + this.seleccionado.ID_USUARIO, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
        .then( res => {         
          this.direcciones = res.data
          this.direccionTemp = {
            id_usuario: res.data[0].ID_USUARIO,
            id_direccion: res.data[0].ID_DIRECCION,
            calle: res.data[0].CALLE,
            numero: res.data[0].NUMERO,
            piso: res.data[0].PISO,
            departamento: res.data[0].DEPARTAMENTO,
            cp: res.data[0].CP,
            provincia: res.data[0].PROVINCIA,
            localidad: res.data[0].LOCALIDAD
          } 
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
      },

      habilitarEdicionDireccion(){
        this.estaEditandoDireccion = true  
      },

      cancelarEdicionDireccion(){
        this.estaEditandoDireccion = false
        this.habilitarDireccion = false
      },

      confirmaEdicionDireccion(direccionPut){

        if(!this.direccionTemp.departamento && !this.direccionTemp.piso){
          this.direccionTemp.departamento = ' '
          this.direccionTemp.piso = 0
        }
        this.axios.put(url.url + url.urlDirecciones + '/modificar/'+ direccionPut.ID_USUARIO + '/' + direccionPut.ID_DIRECCION, this.direccionTemp, {
          headers:
            {'token': `${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
          })
          .then( res => {  
            if(res.data.estado == 200){
              this.hayMensaje = true
              this.mensaje = this.$store.state.mensajePutOk
              this.getDirecciones()
            }else{
              this.hayMensaje = true
              this.mensaje = res.data.mensaje || 'No se pudo realizar la operación'
            }      
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })

        this.estaEditandoDireccion = false
      },

      eliminarDireccion(){
        this.hayMensaje = true
        this.mensaje = 'No se puede eliminar la unica direccion de la cuenta.'
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .color{
  background: grey;;
 
}
</style>
