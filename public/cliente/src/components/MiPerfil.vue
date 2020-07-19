<template >

  <section class="src-components-mi-perfil text-center mt-5">
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!-------------------------------- Card que muestra el detalle del elemento ------------------------------------------------>
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    
    
    <div class="d-flex justify-content-center">     
      <form class="md-layout">
        <md-card :class="claseCard">
          <md-card-header>
            <div class="md-title d-flex justify-content-center">Mi Perfil</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="container">
                <div class="row">
                  <div class="col-lg-3">
                    <md-field>
                      <label>Id Usuario</label>
                      <md-input name="id_usuario" id="id_usuario" v-model="usuario.ID_USUARIO" disabled />
                    </md-field>
                  </div>
                  <div class="col-lg-5">
                    <md-field>
                      <label>Nombre</label>
                      <md-input name="nombre" id="nombre" v-model="usuario.NOMBRE" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-4">
                    <md-field>
                      <label>Apellido</label>
                      <md-input name="apellido" id="apellido" v-model="usuario.APELLIDO" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                </div>
                <!--Linea 2-->
                <div class="row">
                  <div class="col-lg-4">
                    <md-field>
                      <label>Fecha Nacimiento</label>
                      <md-input name="fecha_nacimiento" id="fecha_nacimiento" v-model="usuario.FECHA_NACIMIENTO" disabled/>
                    </md-field>
                  </div>
                  <div class="col-lg-6">
                    <md-field>
                      <label>Correo Electrónico</label>
                      <md-input name="correo" id="correo" v-model="usuario.CORREO" :disabled="!estaEditando" />
                    </md-field>
                  </div>
                  <div class="col-lg-1">
                    <md-field>
                      <label>Sexo</label>
                      <md-input name="sexo" id="sexo" v-model="usuario.SEXO" :disabled="!estaEditando" />
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
                  <md-button class="md-fab md-mini md-primary" @click="confirmarEdicion(usuario)">
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
    <!-- -------------------------------------------------------------------------------------------------------------------- -->    
    <!----------------------------- Modal de mensaje al crear, Editar o eliminar elemento ----------------------------->
    <!-- -------------------------------------------------------------------------------------------------------------------- -->
    <md-dialog-alert
      :md-active.sync="hayMensaje"      
      :md-content="mensaje"
      md-confirm-text="Ok" />   
    </div>
  </section>

</template>

<script lang="js">
  import url from '../urls.js'  

  export default  {
    name: 'src-components-mi-perfil',
    props: [],
    mounted () {
      this.getUsuarioPorId()
      

    },
    data () {
      return {
        claseCard: 'md-layout-item md-size-100 md-small-size-100',
        estaEditando: false,
        usuario: {},
        activo: false,
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
      async getUsuarioPorId(){
        let id =  localStorage.getItem('asdfghj')
        try{          
          const usuario = await this.axios.get(url.url + url.urlUsuarios + '?idUsuario=' + id, {            
          headers:
              {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
          })
          this.usuario = usuario.data[0]
          this.fechaNacimiento = this.usuario.FECHA_NACIMIENTO
          this.usuario.FECHA_NACIMIENTO = this.formatearFecha(this.usuario.FECHA_NACIMIENTO)
        }catch(error){
            console.log("Error GET: " + error)
        }
      },

      habilitarEdicion(){          
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100 color' 
        this.estaEditando = true
      },
      
      // cancela la edición del elemento
      cancelarEdicion(){
        this.estaEditando = false
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
        this.estaSeleccionado = false      
      },

      // metodo que modifica el elemento
      confirmarEdicion(usuarioPut){  
        let usuarioPutok = {
          id_usuario: usuarioPut.ID_USUARIO,
          nombre: usuarioPut.NOMBRE,
          apellido: usuarioPut.APELLIDO,
          correo: usuarioPut.CORREO,
          clave: usuarioPut.CLAVE,
          administrador: usuarioPut.ADMINISTRADOR,
          fecha_nacimiento: this.fechaNacimiento,
          sexo: usuarioPut.SEXO
        }
        
        this.axios.put(url.url + url.urlUsuarios + '/'+ this.usuario.ID_USUARIO, usuarioPutok, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
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
        this.claseCard = 'md-layout-item md-size-100 md-small-size-100' 
      },


      //habilita la vista de telefonos
      mostrarTelefonos(){
        this.habilitarTelefono = !this.habilitarTelefono
        this.getTelefonos()
        
      },

      //Metodo que trae todos los telefonos del usuario seleccionado
      getTelefonos(){
        this.axios.get(url.url + url.urlTelefonos + "?idUsuario=" + this.usuario.ID_USUARIO, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
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
        this.axios.put(url.url + url.urlTelefonos + '/'+ telefonoPut.ID_USUARIO + '/' + telefonoPut.TELEFONO, this.telefonoTemp, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
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
        this.axios.get(url.url + url.urlDirecciones + "?idUsuario=" + this.usuario.ID_USUARIO, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}
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
        this.axios.put(url.url + url.urlDirecciones + '/'+ direccionPut.ID_USUARIO + '/' + direccionPut.ID_DIRECCION, this.direccionTemp, {
          headers:
            {'Authorization': `Bearer ${this.$store.state.token.substr(1, this.$store.state.token.length-2)}`}          
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
