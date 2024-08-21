<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <p>Manage Product</p>
    <a-button type="primary" @click="openAddModal">Add Product</a-button>
    <div class="grid grid-cols-4 gap-4 mt-4">
      <div v-for="(item, index) in list" :key="index">
        <a-card hoverable style="width: 300px">
          <template #cover>
            <img
              alt="example"
              class="h-48 w-full object-cover object-center"
              :src="
                item.product_img ||
                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              "
            />
          </template>
          <template #actions>
            <edit-outlined key="edit" @click="editProduct(item)" />
            <a-popconfirm
              title="Are you sure to delete this product?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteProduct(item._id)"
            >
              <delete-outlined key="delete" />
            </a-popconfirm>
          </template>
          <a-card-meta
            :title="item.product_name"
            :description="item.product_description"
          >
          </a-card-meta>
          <div class="flex items-center justify-between">
            <p class="mr-2 text-base">{{ item.product_price }} บาท</p>
            <p class="text-base">{{ item.product_stock }} ชิ้น</p>
          </div>
        </a-card>
      </div>
    </div>
    <div>
      <a-modal
        v-model:open="visible"
        :title="modalTitle"
        ok-text="Save"
        cancel-text="Cancel"
        @ok="onOk"
      >
        <a-form
          ref="formRef"
          :model="formState"
          layout="vertical"
          name="form_in_modal"
        >
          <a-form-item
            name="product_name"
            label="Product Name"
            :rules="[
              {
                required: true,
                message: 'Please input the product name!',
              },
            ]"
          >
            <a-input v-model:value="formState.product_name" />
          </a-form-item>
          <a-form-item name="product_description" label="Description">
            <a-textarea v-model:value="formState.product_description" />
          </a-form-item>
          <a-form-item name="product_img" label="Image">
            <a-input v-model:value="formState.product_img" />
          </a-form-item>
          <a-form-item
            name="product_price"
            label="Price"
            :rules="[
              {
                required: true,
                message: 'Please input the product price!',
              },
            ]"
          >
            <a-input-number v-model:value="formState.product_price" min="0" />
          </a-form-item>
          <a-form-item
            name="product_stock"
            label="Stock"
            :rules="[
              {
                required: true,
                message: 'Please input the product stock!',
              },
            ]"
          >
            <a-input-number v-model:value="formState.product_stock" min="0" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useProductStore } from "../stores/product";
import { getToken } from "../services/authorize";
import { onMounted, computed, reactive, ref, toRaw } from "vue";

export default {
  name: "ProductManage",
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    const productStore = useProductStore();
    const list = computed(() => productStore.list_products);

    const fetchProducts = async () => {
      if (getToken()) {
        try {
          await productStore.fetch_products();
        } catch (error) {
          console.log("Error fetching products:", error);
        }
      }
    };

    onMounted(() => {
      fetchProducts();
    });

    const formRef = ref();
    const visible = ref(false);
    const formState = reactive({
      product_id: "",
      product_name: "",
      product_description: "",
      product_price: 0,
      product_stock: 0,
      product_img: "",
    });
    const modalTitle = ref("Edit Product");

    const editProduct = (product) => {
      modalTitle.value = "Edit Product";
      formState.product_id = product._id;
      formState.product_name = product.product_name;
      formState.product_description = product.product_description;
      formState.product_img = product.product_img;
      formState.product_price = product.product_price;
      formState.product_stock = product.product_stock;
      visible.value = true;
    };

    const openAddModal = () => {
      modalTitle.value = "Add Product";
      formState.product_id = "";
      formState.product_name = "";
      formState.product_description = "";
      formState.product_img = "";
      formState.product_price = 0;
      formState.product_stock = 0;
      visible.value = true;
    };

    const deleteProduct = async (productId) => {
      try {
        await productStore.delete_product(productId);
        fetchProducts();
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    };

    const onOk = () => {
      formRef.value
        .validateFields()
        .then(async (values) => {
          const updatedProduct = toRaw(formState);
          if (updatedProduct.product_id) {
            await productStore.update_product(updatedProduct); // Update product
          } else {
            await productStore.add_product(updatedProduct); // Add new product
          }
          visible.value = false;
          formRef.value.resetFields();
          fetchProducts();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };

    return {
      list,
      formRef,
      visible,
      formState,
      modalTitle,
      onOk,
      editProduct,
      openAddModal,
      deleteProduct,
    };
  },
};
</script>

<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
