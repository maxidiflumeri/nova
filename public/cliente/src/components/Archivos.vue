<template>

  <form @submit.prevent="enviarArchivo" enctype="multipart/form-data">
    <div class="container mt-5 text-white">
      <div class="row justify-content-center">
        <label for="file" class="label m-3">Subir Imagen</label>
        <input
          class="text-white m-3"
          ref="archivo"
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
        archivo: ''
      }
    },
    methods: {
      archivoSeleccionado(){
        this.archivo = this.$refs.archivo.files[0]
        console.log(this.archivo)
      },

      async enviarArchivo(){
        const formData = new FormData()
        formData.append('archivo', this.archivo)

        try {
          const res = await this.axios.post(url.url + url.urlArchivos + '/agregar', formData)
          console.log(res.data.archivo)
        } catch (error) {
          console.log(error)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-upload {

  }
</style>
