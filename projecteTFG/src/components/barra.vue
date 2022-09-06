<template>
    
  <div>
    <b-navbar toggeable="lg" class="navbar-horizontal" type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <!-- primera parte de la barra -->
    
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/crear" class="nav-link">Crear</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/llista" class="nav-link">Llista</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- segunda parte de la barra -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :href="github"><b-icon icon="github" variant="white"></b-icon></b-nav-item>
        <b-nav-item :href="paypal"><b-icon icon="heart-fill" variant="white"></b-icon></b-nav-item>
      </b-navbar-nav>
    </b-navbar> 

  </div>

</template>

<script>
export default {
    name: 'barra',
    data() {
        return {
            github: this.$store.state.github,
            paypal: this.$store.state.paypal
        }
    }
}
</script>