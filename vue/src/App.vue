<template>
  <div id="app">
    <!-- navbar -->
    <b-container>
      <Navbar v-bind:isLogin="isLogin">
        <Login @submit-login="submitLogin"/>
        <Register @submit-register="submitRegister"/> 
        <a @click="signOut" href='#' id="sign-out" v-show="isLogin">Sign Out</a> 
      </Navbar>
    </b-container>
    
    <!-- header -->
    <!-- <b-container>
      <Header/>
    </b-container> -->

    <!-- main -->
    
    <b-container>
          <router-view/>
    </b-container>

    <!-- footer -->
    <b-container>
        <Footer/>
    </b-container>
  </div>
</template>

<script>
// import Vue from "vue";
// import BootstrapVue from "bootstrap-vue";

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

// Vue.use(BootstrapVue);

import Login from '@/components/Login.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Register from '@/components/Register.vue'

// import axios from 'axios';
const serverUrl = 'http://localhost:3000/'

export default {
 components: {
   Login,
   Footer,
   Header,
   Navbar,
   Register,
 },
 created() {
   if(localStorage.token) {
     this.isLogin = true;
   }
 },
 data() {
   return {
     isLogin:false,
   }
 },
 methods: {
   submitRegister(obj) {
    //  console.log(this.axios.post)
    //  console.log("-------------")
    //  console.log(obj)
     this.axios
      .post(serverUrl+'users/register',obj)
      .then(({data})=> {
        this.$swal('successfully register')
      })
      .catch(err => {
        console.log(err)
      })
   },
   submitLogin(obj) {
     console.log('masuk login')
     this.axios
      .post(serverUrl+'users/login', obj)
      .then(({data}) => {
        localStorage.token = data.token
        this.$swal('successfully login')
        location.reload()
        // Login.$refs['modal-login'].hide()

      })
      .catch(err => {
        console.log(err)
      })
   },
   signOut() {
     this.isLogin = false;
     localStorage.clear()
     location.reload()
   }
 }
};
</script>

<style>

#app {
  font-family:"Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  min-width: 800px;
  border: 1px solid rgba(255, 0, 0, 0.5);
  justify-content: center;
  background-color: lightcyan;
}

.left-navigation {
  min-width: 100px;
  border: 1px solid rgba(255, 0, 0, 0.5);
}

#main-space {
  border: 1px solid rgba(255, 0, 0, 0.5);
}
</style>