<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'


export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

p{
  margin: 15px 0;
}

input{
  width: 100%;
  border: 1px solid #1e88e5;
  border-radius: 4px;
  padding: 10px;
  outline: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}

button{
  border: none;
  border-radius: 4px;
  margin: 0 5px;
  color: #fff;
  cursor: pointer;
  transition: .1s;
  padding: 10px;
}

button:hover{
  opacity: .5;
}

button.primary{
  background: #1E88E5;
}

button.edit{
  background: #FF9800;
}

button.delete{
  background: #DD2C00;
}

</style>
