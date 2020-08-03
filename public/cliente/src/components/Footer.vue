<template>
  <!-- <div>
    <div class="footer text-white mt-3 text-center">
      
      <h6 class="mt-3">SITIO WEB REALIZADO POR LOS ALUMNOS DE ORT:</h6>
      <h6>
        <md-icon class="fa fa-home"></md-icon>
         SANTIAGO CASTRO, MAXIMILIANO DI FLUMERI, EZEQUIEL LABORANTI Y TOMAS MELENDEZ
        <md-icon class="fa fa-home"></md-icon>
      </h6>
    </div>
  </div> -->
  <!-- Footer -->
<footer class="page-footer font-small mdb-color pt-4 footer">
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <!-- Footer Links -->
  <div class="container text-center text-md-left">

    <!-- Footer links -->
    <div class="row text-center text-md-left mt-3 pb-3">

      <!-- Grid column -->
      <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h6 class="text-uppercase mb-4 font-weight-bold">Estudiantes</h6>
        <p>Castro Santiago</p>
        <p>Di Flumeri Maximiliano</p>
        <p>Laboranti Ezequiel</p>
        <p>Melendez Tomas</p>
      </div>
      <!-- Grid column -->

      <hr class="w-100 clearfix d-md-none">

      <!-- Grid column -->
      <hr class="w-100 clearfix d-md-none">

      <!-- Grid column -->
      <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
        <h6 class="text-uppercase mb-4 font-weight-bold">Contacto</h6>
        <p>
          <i class="fa fa-home mr-3"></i> Luján, Buenos Aires, Argentina</p>
        <p>
          <i class="fa fa-envelope mr-3"></i> info@nova.com</p>
        <p>
          <i class="fa fa-phone mr-3"></i> 2323535562</p>
      </div>
      <!-- Grid column -->

    </div>
    <!-- Footer links -->

    <hr>

    <!-- Grid row -->
    <div class="row d-flex align-items-center">
      <!-- Grid column -->
      <div class="col-md-7 col-lg-8">
        <!--Copyright-->
        <!-- <p class="text-center text-md-left">© 2020 Copyright:
          <a href="https://www.ort.edu.ar/">
            <strong>Instituto ORT</strong>
          </a>
        </p> -->

        <!--Copyright-->
        <p class="text-center text-md-left">Desarrollado por:
          <a href="#">
            <strong>NovaTeam</strong>
          </a>
        </p>

      </div>
      <!-- Grid column -->
      <div class="col-md-5 col-lg-4 ml-lg-0">
        <!-- Social buttons -->
        <div class="text-center text-md-right">
          <ul class="list-unstyled list-inline">
            <li class="list-inline-item">
              <md-button class="md-fab md-mini md-primary" >
                <a class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-facebook-f text-white"></i>
                </a>                  
              </md-button>
              
            </li>
            <!-- <li class="list-inline-item">
              <md-button class="md-fab md-mini bgTwit" >
                <a class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-twitter text-white"></i>
                </a>               
              </md-button>
            </li> -->
            <li class="list-inline-item">
              <md-button class="md-fab md-mini bgInsta" >
                <a href="https://www.instagram.com/reparacionesjp/?hl=es-la" target="_blank" class="btn-floating btn-sm rgba-white-slight mx-1">
                  <i class="fa fa-instagram text-white"></i>
                </a>              
              </md-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script lang="js">

  export default  {
    name: 'src-components-footer',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .footer {
    width: 100%;
    height: 0%;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: 20px !important;
    color: white;
  }

  .bgTwit{
   background-color: #00acee !important;
  }

  .bgInsta{
    background-color: #C13584;
  }
</style>
