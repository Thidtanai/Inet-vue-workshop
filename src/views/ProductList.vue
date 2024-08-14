<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <p>ProductList</p>
    <div class="grid grid-cols-4 gap-4">
      <ProductComponent
        v-for="(item, index) in productApiList"
        :key="index"
        :product_name="item.product_name"
        :product_price="item.product_price"
        :product_img="item.product_img"
        @showModal="openModal"
      />
    </div>
    <AddToCartModal
      v-if="modalVisible"
      :visible="modalVisible"
      :product_name="selectedProduct.product_name"
      :product_price="selectedProduct.product_price"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ProductComponent from "../components/ProductComponent.vue";
import AddToCartModal from "../components/AddToCartModal.vue";
import { getToken } from "../services/authorize";

export default {
  name: "ProductList",
  components: {
    ProductComponent,
    AddToCartModal,
  },
  created() {
    if (getToken() != undefined) {
      this.getProduct();
    }
  },
  data() {
    return {
      productApiList: [],
      modalVisible: false,
      selectedProduct: {
        product_name: "",
        product_price: "",
      },
    };
  },
  methods: {
    getProduct() {
      this.axios
        .get("http://localhost:3000/api/v1/products/", {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => {
          console.log(response.data);
          this.productApiList = response.data.data;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message
            ? error.response.data.message
            : "Get data fail";
          alert(errorMessage);
        });
    },
    openModal(product) {
      this.selectedProduct = product;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
  },
};
</script>

<style>
</style>