<template>
  <div class="container mt-5">
    <vue-form :state="formState" @submit.prevent="registroDeUsuario()">
      <md-steppers :md-active-step.sync="activo" md-linear class="fondo">
        <md-step id="primero" md-label="Datos Personales" :md-done.sync="primero">
          <md-card class="md-layout-item md-size-100 md-small-size-100 mt-3">
            <md-card-content>
              <div class="">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-6">
                      <md-field>
                        <validate tag="div">
                          <label>Nombre</label>
                          <md-input  maxlength="50" name="nombre" id="nombre" v-model="formData.nombre" required/>      
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-6">
                      <md-field>
                        <validate tag="div">
                          <label >Apellido</label>
                          <md-input maxlength="50" name="apellido" id="apellido" v-model="formData.apellido" required/>
                        </validate>
                      </md-field>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <md-field>
                        <validate tag="div">
                          <label >Numero de documento</label>
                          <md-input type="text" maxlength="11" name="id_usuario" id="id_usuario" v-model="formData.id_usuario" required/>
                        </validate>
                      </md-field>
                    </div>

                    <div class="col-lg-3">                    
                      <validate tag="div">
                        <md-datepicker v-model="formData.fecha_nacimiento" required>
                          <label>Fecha Nacimiento</label>
                        </md-datepicker>
                      </validate>               
                    </div>

                    <div class="col-lg-3">
                      <md-field>
                        <validate tag="div">
                          <label >Sexo</label>
                          <md-select name="sexo" id="sexo" v-model="formData.sexo">
                            <md-option></md-option>
                            <md-option value="M">M</md-option>
                            <md-option value="F">F</md-option>
                          </md-select>
                        </validate>
                      </md-field>
                    </div>  
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                    <md-field>
                      <validate tag="div">
                        <label >Correo electronico</label>
                        <md-input autocomplete="new-email" type="email" maxlength="50" name="correo" id="correo" v-model="formData.correo" required/>
                      </validate>
                    </md-field>
                    </div> 
                    <div class="col-lg-6">
                    <md-field>
                      <validate tag="div">
                        <label >Contraseña</label>
                        <md-input autocomplete="new-password" type="password" maxlength="8" name="clave" id="clave" v-model="formData.clave" required/>
                      </validate>
                    </md-field>
                    </div> 
                  </div>                   
                </div>
              </div>
            </md-card-content>
          </md-card>
          <div class="row d-flex justify-content-end mt-3 ">
            <md-button class="md-raised md-primary" @click="siguiente('primero', 'segundo')">Siguiente</md-button>
          </div>          
        </md-step>
        <md-step id="segundo" md-label="Telefono" :md-done.sync="segundo">
          <md-card class="md-layout-item md-size-100 md-small-size-100 mt-3">
            <md-card-content>
              <div class="">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-6">
                      <md-field>
                        <validate tag="div">
                          <label>Telefono</label>
                          <md-input  maxlength="13" name="telefono" id="telefono" v-model="formData.telefonos[0].telefono" required/>      
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-6">
                      <md-field>
                        <validate tag="div">
                          <label >Descripcion</label>
                          <md-input maxlength="50" name="descTel" id="descTel" v-model="formData.telefonos[0].descripcion" required/>
                        </validate>
                      </md-field>
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
          <div class="row mt-3">
            <div class="col-lg-6 d-flex justify-content-start">
                <md-button class="md-raised md-primary" @click="siguiente('segundo', 'primero')">Anterior</md-button> 
            </div>
            <div class="col-lg-6 d-flex justify-content-end">
               <md-button class="md-raised md-primary" @click="siguiente('segundo', 'tercero')">Siguiente</md-button>
            </div>
          </div>      
        </md-step>
        <md-step id="tercero" md-label="Direccion" :md-done.sync="tercero" class="fondo">
          <md-card class="md-layout-item md-size-100 md-small-size-100 mt-3 fondo">
            <md-card-content>
              <div class="">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-5">
                      <md-field>
                        <validate tag="div">
                          <label>Calle</label>
                          <md-input  maxlength="13" name="calle" id="calle" v-model="formData.direccion.calle" required/>      
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-3">
                      <md-field>
                        <validate tag="div">
                          <label >Numero</label>
                          <md-input maxlength="5" name="numero" id="numero" v-model="formData.direccion.numero" required/>
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-2">
                      <md-field>
                        <validate tag="div">
                          <label >Piso</label>
                          <md-input maxlength="3" name="piso" id="piso" v-model="formData.direccion.piso" required/>
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-2">
                      <md-field>
                        <validate tag="div">
                          <label >Depto.</label>
                          <md-input maxlength="3" name="departamento" id="departamento" v-model="formData.direccion.departamento" required/>
                        </validate>
                      </md-field>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-2">
                      <md-field>
                        <validate tag="div">
                          <label>Codigo Postal</label>
                          <md-input  maxlength="8" name="cp" id="cp" v-model="formData.direccion.cp" required/>      
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-5">
                      <md-field>
                        <validate tag="div">
                          <label >Localidad</label>
                          <md-input maxlength="50" name="localidad" id="localidad" v-model="formData.direccion.localidad" required/>
                        </validate>
                      </md-field>
                    </div>
                    <div class="col-lg-5">
                      <md-field>
                        <validate tag="div">
                          <label >Provincia</label>
                          <md-input maxlength="50" name="provincia" id="provincia" v-model="formData.direccion.provincia" required/>
                        </validate>
                      </md-field>
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>  
          <div class="row mt-3">
            <div class="col-lg-6 d-flex justify-content-start">
                <md-button class="md-raised md-primary" @click="siguiente('tercero', 'segundo')">Anterior</md-button> 
            </div>
            <div class="col-lg-6 d-flex justify-content-end">
              <md-button class="md-raised md-primary" type="submit" :disabled="formState.$invalid">Registrarse</md-button>  
              <div v-if="cargando" class="loading-overlay d-flex justify-content-center">
                <md-progress-spinner
                  class="colorSpinner"
                  md-mode="indeterminate"
                  :md-diameter="20"
                  :md-stroke="2"
                ></md-progress-spinner>
              </div>
            </div>
          </div>     
        </md-step>
      </md-steppers>
    </vue-form>
     <md-dialog-alert :md-active.sync="hayMensaje" :md-content="mensaje" md-confirm-text="Ok" />


  </div>
</template>

<script lang="js">
  import url from '../urls.js'  

  export default  {
    name: 'src-components-registro',
    props: [],
    mounted () {

    },
    data () {
      return {
        activo: 'primero',
        primero: false,
        segundo: false,
        tercero: false,
        formData: this.getDatosIniciales(),
        formState: {},
        hayMensaje: false,
        mensaje: '',
        cargando: false
      }
    },
    methods: {
      siguiente (id, index) {
        this[id] = true
        if (index) {
          this.activo = index
        }
      },

      // incializa datos del objeto de creacion de elemento
      getDatosIniciales(){
        return {
          id_usuario: '',
          nombre: '',
          apellido: '',
          correo: '',
          clave: '',
          administrador: 'N',
          fecha_nacimiento: '',
          sexo: '',
          direccion: {
              id_direccion: '1',
              calle: '',
              numero: '',
              piso: '',
              departamento: '',
              cp: '',
              localidad: '',
              provincia: ''
            },          
          telefonos: [
            {
              telefono: '',
              descripcion: ''
            }
          ]      
        }
      },
      registroDeUsuario(){      
        this.cargando = true  
        this.axios.post(url.url + url.urlUsuarios + '/agregar', this.formData)
          .then( res => { 
            if(res.data.estado == 200){              
              this.hayMensaje = true
              this.mensaje = "Bienvenido a Nova Gaming"
              this.$router.push({path: '/login'})
            }else{
              this.hayMensaje = true
              this.mensaje = ' ya registrado' || 'No se pudo realizar la operación'
            }                                  
        })
        .catch(error => {
          console.log('ERROR GET HTTP', error)
        })
        this.cargando = false
      },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .fondo {
    background-image: url("../../public/img/fondo4.jpg") !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-attachment: fixed !important;
  }
</style>
