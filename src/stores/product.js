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

  const search_products = computed(() => {
    if (input.value.length < 3) return products.value;

    return products.value.filter((prd) => {
      if (
        prd.title.toLowerCase().includes(input.value.toLowerCase()) == false
      ) {
        return false;
      } else {
        return prd.title.toLowerCase().includes(input.value.toLowerCase());
      }
    });
  });

  return {
    products,
    fetch_products,
    list_products,
    load_products,
    input,
    search_products,
  };
});
