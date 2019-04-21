<template>

  <!-- <div class="cardview">
    <div class="cardview-image">
      <img src="https://www.thelittlepine.com/wp-content/uploads/2016/06/Mantra-Examples-Square-Color-Extra-Small-07.png" alt="">
    </div>
    <div class="cardview-text">
      asdf;lkajsdf;lkajsdfaslldksajf;lkasjdlfk a;lskdjflkajs flkajsd f;lkjasd dlskfjsl ksdjflkasjd jskdfljsdk jfjsdlfkjsdl sdkjfakjsd skjfdlsdjf  slkdfjlksdj 
    </div>
    <div class="cardview-footer">
      <button> test </button>
    </div>
  </div> -->


    <div class="cardview">
        <b-container fluid>
          <div class="cardview-image">
            <img v-bind:src="data.imageUrl" alt="">
          </div>
          <div class="cardview-text">
            <div class="card-width title-text">
               <u>{{data.name}}</u>
            </div>

            <div class="card-width price-stock-text" >
              Price: {{data.price}}, stock: {{data.stock}}
            </div>
            <div class="card-width seller-text" >
               <i>By: {{data.seller}}</i>
            </div>

            {{data.description}}
          </div>
          <div class="cardview-footer" >
            <input type="number" name="num" id="input-num" min="1" v-model="quantity" :disabled="!isLogin">
            <b-button variant="outline-primary" size="sm" id="cart-button" @click="emitToCart" :disabled="!isLogin"><i class="fas fa-plus"></i></b-button>


            <router-link to="/items/detail" v-bind:data="data">
              <b-button variant="outline-primary" size="sm" id="info-button" @click="emitDetail" :disabled="!isLogin"><i class="fas fa-info-circle"></i> Info</b-button>
            </router-link>
          </div>
        </b-container>
    </div>
</template>
<script>
export default {
  props: ['data'],
  name: 'Cardview',
  created() {
    if(localStorage.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  data() {
    return {
      quantity:1,
    }
  },
  methods: {
    emitDetail() {
      this.$emit('emit-detail', this.data)
    },
    emitToCart() {
      if (this.quantity > this.data.stock) {
        this.$swal("Oh no!", "Quantity exceeds available stock", "error")
      } else {
        let add_to_cart = {
          product: this.data._id,
          quantity: this.quantity,
        }
        // console.log(add_to_cart)
        this.$emit('emit-to-cart', add_to_cart)

      }

    }
  }
}
</script>

<style>
#input-num {
  width: 80px;
  margin-right: 3px;
}

.cardview {
  height: 300px;
  width: 190px;
  max-width: 190px;
  max-height: 300px;
  border: 1px solid rgba(255, 0, 0, 0.5);
  margin: 5px;
  margin-left: 15px;
  margin-bottom: 15px;
  display:flex;
  text-align:left;
}
.cardview-image {
   width: 188px;
   height: 188px;
   overflow:hidden;
   /* display:flex;
   align-items:center; */
}

.cardview img {
    height: 188px;
    /* max-width: 150px; */
    overflow:hidden;
    display:block;
}

.card-width {
  width:188px;
}


.title-text {
  font-size: 20px;
}

.price-stock-text {
  font-size: 13px;
}

.seller-text {
  font-size: 10px;
}

.cardview-text {
  width: 100%;
  overflow: hidden;
  max-height: 80px;
  flex-grow:1;
  height: 75px;
  padding: 5px 8px;
}

.cardview-footer {
  width: 100%;
  height: 30px;
  display:flex;
  justify-content: flex-end;
}

div.container-fluid {
  padding: 0px;
}

.btn-outline-primary {
  margin-right: 5px;
}
</style>
