<template>
  <div
    class="mx-auto mt-11 w-72 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    @click="showModal"
  >
    <img
      class="h-48 w-full object-cover object-center"
      :src="product_img"
      alt="Product Image"
    />
    <div class="p-4">
      <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">
        {{ product_name }}
      </h2>
      <p class="mb-2 text-base dark:text-gray-300 text-gray-700">
        {{ product_description }}
      </p>
      <div class="flex items-center justify-between">
        <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
          {{ product_price }} บาท
        </p>
        <p class="text-base font-medium text-gray-500 dark:text-gray-300">
          เหลือ {{ product_left }} ชิ้น
        </p>
        <!-- <p class="ml-auto text-base font-medium text-green-500">20% off</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductComponent",
  props: {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_img: {
      type: String,
      default:
        "https://st5.depositphotos.com/9851828/63467/v/450/depositphotos_634674306-stock-illustration-png-files-transparent-vector-background.jpg",
    },
    product_left: {
      type: Number,
      default: 0,
    },
    product_description: {
      type: String,
      default: "Product description",
    },
  },
  methods: {
    showModal() {
      this.$emit("showModal", {
        product_name: this.product_name,
        product_price: this.product_price,
      });
    },
  },
};
</script>

<style>
</style>