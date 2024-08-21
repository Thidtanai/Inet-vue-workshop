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
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1rem;
  margin-top: 1.5rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.table th {
  background-color: #007bff;
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.table td {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
  font-size: 0.95rem;
}

.table tr {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.table tr:last-child td {
  border-bottom: none;
}

.mt-4 {
  margin-top: 2rem;
}

.text-right {
  text-align: right;
}

.btn {
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 91, 187, 0.4);
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
}

.btn-danger:hover {
  background-color: #c82333;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.table img {
  max-width: 100px;
  border-radius: 8px;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
