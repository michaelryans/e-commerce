<template>
  <b-row >
    <b-col cols="4" class="left-navigation" id="add-product">
      <h3>Add Your Product Here</h3>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Item Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          required
          placeholder="Enter item name"
          v-model="form.name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
        <b-form-input
          type="number"
          id="input-2"
          min="0"
          required
          placeholder="Input Your Stock"
          v-model="form.stock"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
        <b-form-input
          type="number"
          id="input-3"
          min="0"
          required
          placeholder="Input Your Price (IDR)"
          v-model="form.price"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Description:" label-for="textarea">
        <b-form-textarea
            id="textarea"
            v-model="form.description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
    ></b-form-textarea>
      </b-form-group>

        <b-form-group id="input-group-5" label="Upload Picture" label-for="input-file">
        <b-form-file
        v-model="form.file"
        id="input-file"
        :state="Boolean(form.file)"
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ form.file ? form.file.name : '' }}</div>
        </b-form-group>

        <div slot="modal-footer">
            <b-button class="my-2 my-sm-0" @click="submitForm">Upload</b-button>
        </div>
    </b-form>
    </b-col>
     <b-col class="main-space">
      <div class="row">
        <ol>
          <h2>List of Seller Products:</h2>
          <li v-for="data in view.data" :key="data._id">{{data.name}}</li>
        </ol>
      </div>
    </b-col>
  </b-row>
</template>

<script>
const serverUrl = 'http://localhost:3000/'
export default {
  name: "AddProduct",
  created() {
    this.getSellerProduct()
    if(localStorage.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  data() {
      return {
          form: {
              file: null,
              description:"",
              name: "",
              price: "",
              stock: "",
          },
          view: {
            data: [],
          }
      }
  },
  methods: {
      submitForm() {
        let formData = new FormData();
        formData.append('name', this.form.name)
        formData.append('description', this.form.description)
        formData.append('stock',this.form.stock)
        formData.append('price', this.form.price)
        formData.append('file', this.form.file)

        this.axios
         .post(serverUrl+ 'products', formData, {headers: {token:localStorage.token}})
         .then(({data}) => {
           console.log(data)
           this.view.data.push(data)
           this.$swal("Upload success!", "Your product is registered!", "success")
         })
         .catch(err => {
           console.log(err)
         })
      },
      getSellerProduct() {
        this.axios
         .get(serverUrl+ 'products/seller', {headers: {token:localStorage.token}})
         .then(({data}) => {
           console.log(data)
           this.view.data = data
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
  text-align: left;
}

.main-space {
    padding:20px;
}


#add-product {
    padding: 10px 30px;
    text-align:left;
}
</style>

