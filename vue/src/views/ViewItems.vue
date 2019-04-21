<template>
  <b-row>
    <b-col cols="3" class="left-navigation" v-show="isLogin">
      <Cart v-bind:cart="catalog.cart"/>
    </b-col>
     <b-col class="main-space">
       
      <div class="row">
        <router-view v-bind:data="inDisplay"/>
      </div>

      <div class="row" style="margin-left: 9px;"> 
        <u><h1>Available items</h1></u>
      </div>

      <div class="row">
        <Cardview v-for="x in catalog.all" :key="x._id" v-bind:data="x" @emit-detail="displayData" @emit-to-cart="addToCart"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Cardview from "@/components/Cardview.vue";
import Cart from '@/components/Cart.vue';

const serverUrl = 'http://localhost:3000/'

export default {
  name: "ViewItems",
  components: {
    Cardview,
    Cart,
  },
  created() {
    this.getAllProduct()
    this.getCartItem()

    if(localStorage.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  data() {
    return {
      catalog: {
        all:[],
        cart:[],
      },
      inDisplay: {},
    }
  },
  methods: {
    getAllProduct() {
      this.axios
       .get(serverUrl + 'products')
       .then(({data}) => {
         this.catalog.all = data;
        //  this.$swal('success retrieving data')
       })
    },
    displayData(obj) {
      console.log(obj)
      this.inDisplay = obj
    },
    addToCart(obj) {
      // console.log(obj)
      // console.log('---addtocart')
      this.axios
       .post(serverUrl + 'cart', obj, {headers:{token:localStorage.token}})
       .then(({data}) => {
         this.catalog.cart.push(data)
         
         this.$swal('success adding data to cart')
       })
       .catch(err => {
         console.log(err)
       })
    },
    getCartItem() {
      this.axios
        .get(serverUrl + 'cart', {headers:{token:localStorage.token}})
        .then(({data}) => {
          console.log('get data- cart----')
         console.log(data)
            this.catalog.cart = data
        })
        .catch(err => {
            console.log(err)
        })
    }
  }
};
</script>
<style scoped>
.row {
  display: flex;
  justify-content: flex-start;
}

.main-space {
    padding:20px;
}

</style>

