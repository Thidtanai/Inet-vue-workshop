<template>
    <div
      v-if="visible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-bold mb-4">Add to Cart</h2>
        <p>{{ product_name }}</p>
        <p class="font-bold">{{ product_price }}</p>
  
        <!-- Add count input -->
        <div class="mt-4">
          <label for="count" class="block text-sm font-medium text-gray-700">Quantity</label>
          <input 
            type="number" 
            id="count" 
            v-model.number="count" 
            min="1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
  
        <div class="flex justify-end mt-4">
          <button @click="closeModal" class="bg-gray-200 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button
            @click="addToCart"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddToCartModal",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      product_name: {
        type: String,
        required: true,
      },
      product_price: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        count: 1, // Default quantity
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      addToCart() {
        // Logic to add the product to the cart with quantity
        alert(`${this.count} x ${this.product_name} has been added to the cart!`);
        this.closeModal();
      },
    },
  };
  </script>
  