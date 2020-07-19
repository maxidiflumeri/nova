<template>
  <div class="container mt-5" style="width: 35%">
    <div class="d-flex justify-content-center">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- -- metodo enviar validacion de login -->
        <md-card class="md-layout-item md-elevation-12 fondo">
          <md-card-header>
            <div>
              <img
                src="../assets/logo.png"
                alt="logo"
                width="30%"
                class="mx-auto d-block md-title mb-3"
              />
            </div>
            <div class="md-body-1 d-flex justify-content-center">
              <h6 class="colorLetra">
                <strong>Para que comprar mañana lo que puedes comprar hoy.</strong>
              </h6>
            </div>
          </md-card-header>

          <md-card-content>
            <validate tag="div">
              <md-field>
                <label for="usuario">Email</label>
                <md-input
                  type="email"
                  name="email"
                  id="email"
                  v-model="formData.usuario"
                  @click="limpiarMensaje"
                  required
                />
              </md-field>
              <field-messages name="email" show="$dirty">
                <div slot="required" class="alert alert-danger my-1 d-flex justify-content-center">Campo correo electrónico requerido</div>
                <div slot="email" class="alert alert-danger my-1 d-flex justify-content-center">Correo electrónico no válido</div>
              </field-messages>
            </validate>



            <validate tag="div">
              <md-field>
                <label for="password">Password</label>
                <md-input
                  type="password"
                  name="password"
                  id="password"
                  v-model="formData.password"
                  @click="limpiarMensaje"
                  required
                />
              </md-field>
            </validate>

            <!-- --mensaje de error si las credenciales no coinciden -->
            <div v-if="error" class="alert alert-danger my-1 d-flex justify-content-center">Usuario o clave incorrecta</div>
          </md-card-content>

          <div class="loading-overlay d-flex justify-content-center" v-if="cargando">
            <md-progress-spinner
              class="colorSpinner"
              md-mode="indeterminate"
              :md-diameter="30"
              :md-stroke="5"
            ></md-progress-spinner>
          </div>


          <div class="d-flex justify-content-center">
            <md-button type="submit" class="md-raised colorBoton" :disabled="formState.$invalid">Ingresar</md-button>
          </div>

          <md-card-actions class="d-flex justify-content-center">
            ¿Aún no tenés cuenta?
            <router-link to="/Registro">
              <md-button class="btn btn-lg btn-outline-info">Registrarme</md-button>
            </router-link>
          </md-card-actions>
        </md-card>
      </vue-form>
    </div>
  </div>
</template>

<script lang="js">

  import url from '../urls.js'

  export default  {
    name: 'src-components-login',
    props: [],
    mounted () {

    },
    data () {
      return {
        formState: {},
        formData: this.getDatosIniciales(),
        error: false,
        cargando: false
      }
    },
    methods: {
      getDatosIniciales(){
        return {
          usuario: '',
          password: ''
        }
      },
      limpiarMensaje(){
        this.error = false
      },

      enviar() {
        this.cargando = true
        this.axios.post(url.url + url.urlLogin, this.formData, {
          'content-type' : 'application/json'
        })
        .then( res => {
          this.cargando = false
          if (res.data.estado == 400){
            this.error = true
          }
          else{
            localStorage.setItem('token', JSON.stringify(res.data.token))
            localStorage.setItem('asdfghj', JSON.stringify(res.data.id_usuario))
            if(res.data.perfil == 'S'){
              localStorage.setItem('perfil', JSON.stringify(res.data.perfil))
            }
            this.$store.dispatch('login', {'token': localStorage.getItem('token'), 'perfil': localStorage.getItem('perfil')})
            this.$router.push({path: '/productos'})
          }
        })
          
        .catch(error => {
          console.log('ERROR POST', error)
        })
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.colorBoton {
  background: #1d1b38 !important;
  color: white !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition: background-color 5000s ease-in-out 0s;
}

.fondo {
  background-image: url("../../public/img/fondo4.jpg") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-attachment: fixed !important;
}
</style>
