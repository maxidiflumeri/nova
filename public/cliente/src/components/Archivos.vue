<template>

  <form @submit.prevent="enviarArchivo" enctype="multipart/form-data">
    <div class="container mt-5 text-white">
      <div v-if="mensaje"
        :class="`message ${error ? 'is-danger' : 'is-success'}`"
      >
        <div class="nessage-body">{{mensaje}}</div>
      </div>
      <div class="row justify-content-center">
        <label for="file" class="label m-3">Subir Imagen</label>
        <input
          class="text-white m-3"
          ref="archivo"
          name="archivo"
          type="file"
          @change="archivoSeleccionado"
        >
      </div>
      <div class="row justify-content-center">
        <button class="btn btn-info m-3">Enviar</button>
      </div>
    </div>
  </form>

</template>

<script lang="js">
  import url from '../urls.js'

  export default  {
    name: 'src-components-upload',
    props: [],
    mounted () {

    },
    data () {
      return {
        archivo: '',
        mensaje: "",
        error: false
      }
    },
    methods: {
      archivoSeleccionado(){
        this.archivo = this.$refs.archivo.files[0]
        this.error = false
        this.mensaje = ""
      },

      async enviarArchivo(){
        const formData = new FormData()
        formData.append('archivo', this.archivo)

        try {
          const res = await this.axios.post(url.url + url.urlArchivos + '/agregar', formData)
          this.error = false
          this.mensaje = ""
          console.log("archivo: " + formData.archivo)
          console.log(res.data)
        } catch (error) {
          this.error = true
          this.mensaje = "algo salio mal"
          console.log(error)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
</style>
