<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <p>ProductList</p>
    <div class="grid grid-cols-4 gap-4">
      <ProductComponent
        v-for="(item, index) in list"
        :key="index"
        :product_name="item.product_name"
        :product_price="item.product_price"
        :product_img="item.product_img"
        :product_id="item._id"
        :product_left="item.product_stock"
        :product_description="item.product_description"
        @showModal="openModal"
      />
    </div>
    <AddToCartModal
      v-if="modalVisible"
      :visible="modalVisible"
      :product_name="selectedProduct.product_name"
      :product_price="selectedProduct.product_price"
      :product_id="selectedProduct._id"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import ProductComponent from "../components/ProductComponent.vue";
import AddToCartModal from "../components/AddToCartModal.vue";
import { getToken } from "../services/authorize";

export default {
  name: "ProductList",
  components: {
    ProductComponent,
    AddToCartModal,
  },
  setup() {
    const productStore = useProductStore();
    const list = computed(() => productStore.list_products);
    const modalVisible = ref(false);
    const selectedProduct = ref({
      product_name: "",
      product_price: "",
      product_img: "", // Added to match the ProductComponent
      _id: "",
    });

    const fetchProducts = async () => {
      if (getToken()) {
        try {
          await productStore.fetch_products();
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    const openModal = (product) => {
      selectedProduct.value = product;
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      list,
      modalVisible,
      selectedProduct,
      openModal,
      closeModal,
    };
  },
};
</script>

<style>
</style>