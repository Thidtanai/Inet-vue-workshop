<template>
  <div>
    <h1>ตะกร้าสินค้า</h1>

    <table class="table">
      <thead>
        <tr>
          <th>สินค้า</th>
          <th>ราคา</th>
          <th>จำนวน</th>
          <th>รวม</th>
          <th>ลบสินค้า</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cartItem, index) in carts" :key="index">
          <td>
            {{ cartItem.name }}
          </td>
          <td>{{ cartItem.price }} บาท</td>
          <td>
            <button
              @click="decreaseQuantity(cartItem.id)"
              class="btn btn-sm btn-secondary"
            >
              -
            </button>
            <span class="mx-2">{{ cartItem.quantity }}</span>
            <button
              @click="increaseQuantity(cartItem.id)"
              class="btn btn-sm btn-secondary"
            >
              +
            </button>
          </td>
          <td>{{ cartItem.quantity * cartItem.price }} บาท</td>
          <td>
            <button @click="removeItem(cartItem.id)" class="btn btn-danger">
              ลบ
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Order Button -->
    <div class="mt-4 text-right">
      <button
        @click="createOrder"
        class="btn btn-primary"
        :disabled="!carts.length"
      >
        สั่งซื้อสินค้า
      </button>
    </div>
  </div>
</template>
  
  <script>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import axios from "axios";
import { getToken } from "../services/authorize";

export default {
  name: "MyCart",
  setup() {
    const cart_store = useCartStore();

    const carts = computed(() => cart_store.cart_preview);

    const increaseQuantity = (id) => {
      const item = cart_store.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += 1; // Increase the quantity by 1
        cart_store.saveToLocalStorage(); // Save the updated cart to local storage
      }
    };

    const decreaseQuantity = (id) => {
      const item = cart_store.cart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        cart_store.saveToLocalStorage();
      }
    };

    const removeItem = (id) => {
      cart_store.cart = cart_store.cart.filter((item) => item.id !== id);
      cart_store.saveToLocalStorage();
    };

    const createOrder = async () => {
      try {
        for (let cartItem of cart_store.cart) {
          const response = await axios.post(
            `http://localhost:3000/api/v1/products/${cartItem.id}/orders`,
            {
              order_qty: cartItem.quantity,
            },
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          );

          if (response.data.success) {
            console.log(
              `Order for product ${cartItem.name} added successfully.`
            );
          } else {
            console.error(`Failed to add order for product ${cartItem.name}.`);
          }
        }
        alert("สั่งซื้อสินค้าเรียบร้อยแล้ว");
        cart_store.cart = []; // Clear the cart after order
        cart_store.saveToLocalStorage();
      } catch (error) {
        console.error("Error creating order:", error);
        alert("การสั่งซื้อสินค้าล้มเหลว โปรดลองอีกครั้ง");
      }
    };

    return {
      carts,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      createOrder,
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.img-thumbnail {
  border-radius: 4px;
}

.mt-4 {
  margin-top: 1rem;
}

.text-right {
  text-align: right;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.btn-primary:disabled {
  background-color: #b5b5b5;
  cursor: not-allowed;
}
</style>
  