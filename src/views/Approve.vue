<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
      <h2
        class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Pending Approvals
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div v-if="pendingApprovals.length" class="space-y-6">
        <div
          v-for="(approval, index) in pendingApprovals"
          :key="index"
          class="border rounded-lg p-4 shadow-sm"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ approval.username }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ approval.email }} | Role: {{ approval.role }}
              </p>
            </div>
            <div class="flex space-x-4">
              <button
                @click="approve(approval._id)"
                class="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-500"
              >
                Approve
              </button>
              <button
                @click="reject(approval._id)"
                class="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
              >
                Reject
              </button>
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Name: {{ approval.user_info.firstname }}
            {{ approval.user_info.lastname }}<br />
            Gender: {{ approval.user_info.gender }}
          </div>
        </div>
      </div>

      <div v-else class="text-center text-sm text-gray-500">
        No pending approvals.
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getToken } from "../services/authorize";
export default {
  name: "Approve",
  data() {
    return {
      pendingApprovals: [],
    };
  },
  created() {
    this.fetchPendingApprovals();
  },
  methods: {
    async fetchPendingApprovals() {
      try {
        const { data } = await this.axios.get(
          "http://localhost:3000/api/v1/users/unapprove"
        );
        this.pendingApprovals = data.data;
      } catch (error) {
        console.error("Failed to fetch pending approvals:", error);
      }
    },
    async approve(id) {
      try {
        const token = getToken();
        await this.axios.put(
          `http://localhost:3000/api/v1/approve/${id}`,
          {
            is_approve: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.pendingApprovals = this.pendingApprovals.filter(
          (approval) => approval._id !== id
        );
        alert("User approved successfully.");
      } catch (error) {
        alert("Failed to approve user.");
      }
    },
    async reject(id) {
      try {
        const token = getToken();
        await this.axios.delete(`http://localhost:3000/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pendingApprovals = this.pendingApprovals.filter(
          (approval) => approval._id !== id
        );
        alert("User rejected successfully.");
      } catch (error) {
        alert("Failed to reject user.");
      }
    },
  },
};
</script>
  
  <style>
/* Add any custom styles here */
</style>
  