<template>
    <div class="cart">
        <div>
            <h4> My Cart </h4>
        </div>
        <div class="row" v-for="item in cart" :key="item._id">
            <div class="cart-card">
                <div class="cart-marker">

                </div>
                <div class="cart-image">
                    <img v-bind:src="item.product.imageUrl" alt="">
                </div>
                <div class="cart-text">
                    <div class="cart-width">
                        Item: {{item.product.name}}
                    </div>


                    <div class="cart-width" id="cart-footer">
                        <div style="width:60px;">
                            Qty:{{item.quantity}}
                        </div>
                        <b-button variant="outline-primary" size="sm" id="small-button">Delete</b-button>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- <h4> You need to be logged in to use this feature </h4> -->
        <button class="btn btn-primary" id="button-checkout">Checkout</button>
        
    </div>
</template>
<script>
const serverUrl = 'http://localhost:3000/'
export default {
    props: ['cart'],
    name:"Cart",
    data() {
        return {
        }
    },
    methods: {
        
    }
}
</script>
<style>
.cart {
    padding:4px;
    padding-top: 15px;
}

#button-checkout {
    margin: 10px;
}

#card-footer {
    display:flex;
    justify-content:space-between;
}

#small-button {
    height: 25px;
    padding:0px 4px;
    font-size: 13px;
}

.cart-width {
    width: 100%;
}
.cart-card {
    margin:5px;
    padding: 5px;
    border: 1px solid #494949;
    width: 100%;
    height: 80px;
    display:flex;
}

.cart-image {
    /* border: 1px solid #494949; */
    height: 100%;
    width: 70px;
    margin-right: 5px;
    overflow:hidden;
}

.cart-image img {
    height:100%;
}

.cart-text {
    /* border: 1px solid #494949; */
    flex-grow:1;
    font-size:12px;
    text-align: left;
    padding: 5px;
    padding-top: 2px;
}

.cart-marker {
    /* border: 1px solid #494949; */
    background-color:lightgrey;
    height: 100%;
    width: 5px;
    margin-right: 5px;
}
</style>
