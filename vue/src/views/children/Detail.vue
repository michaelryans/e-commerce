<template>
    <div class="mt-4" id="detail-card">
        <b-container fluid style="text-align:left;">
            <router-link to="/items"><a> <i class="fas fa-angle-double-left"></i> Hide</a></router-link>
        </b-container>
    
    <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3" >
      <b-card-text>
          <h4>Item Detail</h4>
        (Some quick example text to build on the card and make up the bulk of the card's content.)
        <!-- {{data.description}} -->

        <!-- <button @click="test">test button</button> -->
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
    props: ['data'],
    name: 'Detail',
    methods: {
        test() {
            console.log(this.data.description)
        }
    }
}
</script>

<style>
#detail-card {
    margin: 20px
}
</style>

