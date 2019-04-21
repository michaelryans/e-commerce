<template>
    <div id="navbar">
        <b-nav>
        <img src="http://ryanchristiani.com/wp-content/uploads/2015/06/js-logo.png" alt="">
          <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
          <b-nav-item><router-link to="/items">Show Items</router-link></b-nav-item>
          <b-nav-item v-show="isLogin"><router-link to="/add-product" >Be a Seller</router-link></b-nav-item>
          <!-- <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
          <b-nav-item><router-link to="/register">Register</router-link></b-nav-item> -->
          <!-- <Login/> -->
          
          
        </b-nav>
        <div class="buttons">
            <b-button v-b-modal.register v-show="!isLogin">Register</b-button>
            <b-button v-b-modal.login v-show="!isLogin">Login</b-button>

            <slot/>
        </div>
      </div>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
    props: ['isLogin'],
    name:"Navbar",
    component: {
        Login
    }
}
</script>
<style scoped>
#navbar {
    display:flex;
    justify-content: space-between;
}

.nav-item{
    display:flex;
    align-items: center;
}

img {
    max-height:40px;
    margin: 5px;
}

.buttons {
    display:flex;
    align-items: center;
}

button {
    margin-left: 5px;
}
</style>

