<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" style="background-color:#191919">
      <b-navbar-brand>Beta</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item><router-link to="/crear">Crear</router-link></b-nav-item>
          <b-nav-item><router-link to="/llista">Bliblioteca</router-link></b-nav-item>
          <b-nav-item><router-link to="/resolt">Resolts</router-link></b-nav-item>
          <b-nav-item><router-link to="/quests">Qûestionaris</router-link></b-nav-item>
          <b-nav-item><router-link to="/stats">Estadístiques</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand>Benvingut</b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  margin-bottom: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
