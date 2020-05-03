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
  box-sizing: border-box;
}

p{
  margin: 15px 0;
}

input{
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #1e88e5;
  border-radius: 4px;
  padding: 10px;
  outline: none;
}

input.search{
  max-width: 350px;
  margin-left: 15px;
}

select{
  box-sizing: border-box;
  border: 1px solid #1e88e5;
  border-radius: 4px;
  padding: 10px;
  outline: none;
  min-width: 400px;
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

.modal-form{
  background: #fff;
  color: #000;
  padding: 15px;
}

.modal-form .buttons{
  margin: 10px 0;
}

.modal{
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: #00000099;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content{
  width: 65%;
  min-height: 100px;
  background: #fff;
  padding: 0 15px 15px 15px;
}

.modal-content .buttons{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

ul.sub-works{
  background: #eee;
  padding: 20px;
}

ul.sub-works li{
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  list-style: none;
  margin-bottom: 10px;
}

ul.sub-works li:last-child{
  margin-bottom: 0;
}

.hide{
  display: none !important;
}



</style>
