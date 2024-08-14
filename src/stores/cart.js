import { defineStore } from "pinia";
import { ref, onBeforeMount, computed } from "vue";
import { useProductStore } from "./product";

export const useCartStore = defineStore("useCartStore", () => {
  const cart = ref([]);

  const add_cart = (id, price, name, quantity = 1) => {
    const existingProduct = cart.value.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const data = {
        id,
        name,
        price,
        quantity,
      };
      cart.value.push(data);
      saveToLocalStorage();
      alert("เพิ่มสินค้าสำเร็จ");
    }

    console.log(cart.value);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("Cart", JSON.stringify(cart.value));
  };

  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem("Cart");
    if (savedCart) {
      cart.value = JSON.parse(savedCart);
    }
  };

  const cart_preview = computed(() => {
    const product_store = useProductStore();

    return cart.value.map((prd, i) => {
      const findIndexProduct = product_store.products.findIndex(
        (e) => e.id == prd.id
      );

      return {
        product: product_store.products[findIndexProduct],
        quantity: cart.value[i].quantity,
        total_product: cart.value[i].price * cart.value[i].quantity,
        price: cart.value[i].price,
        name: cart.value[i].name,
        id: cart.value[i].id,
      };
    });
  });

  // Load cart data when the store is initialized
  onBeforeMount(() => {
    loadFromLocalStorage();
  });

  return {
    cart_preview,
    cart,
    add_cart,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
});
