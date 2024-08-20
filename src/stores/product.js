import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { getToken } from "../services/authorize";

export const useProductStore = defineStore("useProductStore", () => {
  const products = ref([]);

  const input = ref("");

  const list_products = computed(() => products.value);

  const load_products = computed(() => products.value.length > 0);

  const fetch_products = async () => {
    await axios
      .get("http://localhost:3000/api/v1/products/", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        products.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const add_product = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products/",
        newProduct,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      products.value.push(response.data.data);
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  const update_product = async (updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/products/${updatedProduct.product_id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      // Update the local state
      const index = products.value.findIndex(
        (product) => product._id === updatedProduct._id
      );
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  const delete_product = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${productId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      // Remove the product from the local state
      products.value = products.value.filter(
        (product) => product._id !== productId
      );
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const search_products = computed(() => {
    if (input.value.length < 3) return products.value;

    return products.value.filter((prd) => {
      return prd.product_name.toLowerCase().includes(input.value.toLowerCase());
    });
  });

  return {
    products,
    fetch_products,
    update_product,
    delete_product,
    list_products,
    load_products,
    input,
    search_products,
    add_product,
  };
});
