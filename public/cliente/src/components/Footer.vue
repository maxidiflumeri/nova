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
      
      <!-- Contacto -->
      <div class="col mx-auto mt-3">
        <h6 class="text-uppercase mb-4 font-weight-bold">Contacto</h6>
        <a href="https://goo.gl/maps/QeDrsvzqMYdeUgL1A" target="_blank">
          <i class="fa fa-home mr-3"></i> Gral. Paz 1393, Luján, Buenos Aires, Argentina
        </a>
        <br>
        <br>
        <a href = "mailto: novagaming.it20@gmail.com">
          <i class="fa fa-envelope mr-3"></i> novagaming.it20@gmail.com
        </a>
        <br>
        <br>
        <p>
          <i class="fa fa-phone mr-3"></i> +54 9 2323 625096
        </p>
      </div>

      <!-- Social -->
      <div class="col ml-lg-0">
        <!-- Social buttons -->
        <div class="text-center mt-5">
          <ul class="list-unstyled list-inline">
            <li class="list-inline-item">
              <md-button class="md-fab md-mini md-primary" >
                <a class="btn-floating btn-sm rgba-white-slight mx-1" href="https://www.facebook.com/SolutionsServiceJp/" target="_blank">
                  <i class="fa fa-facebook-f text-white"></i>
                </a>                  
              </md-button>
              
            </li>
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
    <!-- Footer links -->

    <hr>

    <!-- Grid row -->
    <div class="row">
      <p class="text-center text-md-left">Desarrollado por:
        <a href="#">
          <strong>MCDSoft Soluciones</strong>
        </a>
      </p>
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
a{
    color: white !important;
  }
  a:hover{
    text-decoration: none;
    color: white;
  }
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
