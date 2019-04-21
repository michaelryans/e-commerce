<template>
  <div>
    <!-- <b-button v-b-modal.modal-1>Login</b-button> -->

    <!-- Modal Component -->
    <b-modal id="login" title="Login"  centered ref="modal-login">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          type="email"
          required
          placeholder="Enter email"
          v-model="login.email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          required
          placeholder="Enter password"
          v-model="login.password"
          @keyup.enter="submitLogin"
        ></b-form-input>
      </b-form-group>

      Or Login with Google:
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->

        <!-- <input size="sm" class="mr-sm-2" placeholder="Enter email" v-model="login.email"
            @keyup.enter="submitLogin"></b-form-input>
        <input size="sm" class="mr-sm-2" placeholder="Enter password" type="password"
            v-model="login.password" @keyup.enter="submitLogin"></b-form-input> -->
        <div slot="modal-footer">
            <b-button class="my-2 my-sm-0" @click="submitLogin">Login</b-button>
        </div>
    </b-modal>
  </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
       submitLogin() {
         let obj_login = {
           email:this.login.email,
           password: this.login.password,
         }

         this.$emit('submit-login', obj_login)
       }
    },
    data() {
      return {
        login: {
          email:"",
          password: "",
        }
      }
    }
}
</script>

<style>
    #modal-1___BV_modal_content_ {
       max-width: 300px;
       margin: auto;
    }

    .my-2.my-sm-0 {
      
    }
</style>

