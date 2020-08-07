<template >
  <section class="src-components-nav-bar">
    <md-toolbar class="fondo pl-5" md-elevation="4">
      <img
        src="../assets/logo.png"
        alt="logo"
        width="5%"
        @click="irInicio()"
        style="cursor: pointer"
      />
      <router-link to="/Productos">
        <md-button class="colorLetrasNav ml-3">Productos</md-button>
      </router-link>
        <!-- -- V-IF Validacion usuario administrador -->
      <md-menu
        v-if="this.$store.state.perfil"
        :mdCloseOnClick="click"
        md-size="medium"
        md-align-trigger
      >
        <md-button class="colorLetrasNav ml-3" md-menu-trigger>Administracion</md-button>
        <md-menu-content>
          <router-link to="/Estados">
            <a class="text-white" href="#">
              <md-menu-item>Estados</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Tipos">
            <a class="text-white" href="#">
              <md-menu-item>Tipos de producto</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Marcas">
            <a class="text-white" href="#">
              <md-menu-item>Marcas</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Usuarios">
            <a class="text-white" href="#">
              <md-menu-item>Usuarios</md-menu-item>
            </a>
          </router-link>
          <router-link to="/ProductosAdmin">
            <a class="text-white" href="#">
              <md-menu-item>Productos</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Pedidos">
            <a class="text-white" href="#">
              <md-menu-item>Pedidos</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Archivos">
            <a class="text-white" href="#">
              <md-menu-item>Subir Archivos</md-menu-item>
            </a>
          </router-link>
          <router-link to="/Banners">
            <a class="text-white" href="#">
              <md-menu-item>Banners</md-menu-item>
            </a>
          </router-link>
        </md-menu-content>
      </md-menu>
      <h3 class="md-title" style="flex: 1"></h3>
      <md-autocomplete
        class="search"
        v-model="productoSeleccionado"
        :md-options="productos"
        md-layout="box"
        style="width: 30%"
      >
        <label class="buscar">Buscar producto...</label>
      </md-autocomplete>
      <router-link v-if="!this.$store.state.token" to="/Login">
        <md-button class="colorLetrasNav ml-3">Ingresá</md-button>
      </router-link>

      <md-menu v-else :mdCloseOnClick="click" md-size="medium" md-align-trigger>
        <md-button class="colorLetrasNav ml-3" md-menu-trigger>Mi Cuenta</md-button>
        <md-menu-content>
          <router-link to="/miPerfil">
            <a class="text-white" href="#">
              <md-menu-item>Mi Perfil</md-menu-item>
            </a>
          </router-link>
          <router-link to="/misPedidos">
            <a class="text-white" href="#">
              <md-menu-item>Mis Pedidos</md-menu-item>
            </a>
          </router-link>
          <router-link to="/">
            <a class="text-white" href="#">
              <md-menu-item @click="logout">Salir</md-menu-item>
            </a>
          </router-link>
        </md-menu-content>
      </md-menu>
      <md-button>
        <router-link to="/MiCarrito">
          <md-badge :md-content="cantProductos" md-dense>
            <md-icon class="colorLetrasNav">add_shopping_cart</md-icon>
          </md-badge>
        </router-link>
      </md-button>
    </md-toolbar>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-nav-bar',
    props: [],
    mounted () {
      if(localStorage.getItem('carrito')){
        this.$store.dispatch('actualizarCarrito', JSON.parse(localStorage.getItem('carrito')))
        this.$store.dispatch('contarProductos')
      }
    },
    data () {
      return {
        productoSeleccionado: null,
        productos: [],
        click: true
      }
    },
    methods: {
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('perfil')
        this.$store.dispatch('logout')
      },

      irInicio(){
          this.$router.push({path: '/inicio'}).catch(error => {error})       
      }
    },
    computed: {
      cantProductos(){
        return this.$store.state.cantProductos
      }
    }
}


</script>

<style scoped lang="css">
.src-components-nav-bar {
}

.fondo {
  /* background: #1d1b38 !important; */
  background-image: url("../../public/img/fondo4.jpg") !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-attachment: fixed !important;
}

.colorLetrasNav {
  color: white !important;
}

.fondoItem {
  background: #222831 !important;
  background-color: #222831 !important;
  color: #222831 !important;
}

.search{
  background-color: #1d1b38 !important;
}

</style>
