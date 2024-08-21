<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="submitForm">
          <!-- Username -->
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                v-model="registerForm.username"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="registerForm.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                v-model="registerForm.password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <!-- Confirm Password -->
          <div>
            <label
              for="confirm-password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirm Password</label
            >
            <div class="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autocomplete="new-password"
                required
                v-model="registerForm.confirmPassword"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <!-- First Name -->
          <div>
            <label
              for="firstname"
              class="block text-sm font-medium leading-6 text-gray-900"
              >First Name</label
            >
            <div class="mt-2">
              <input
                id="firstname"
                name="firstname"
                type="text"
                autocomplete="given-name"
                required
                v-model="registerForm.user_info.firstname"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <!-- Last Name -->
          <div>
            <label
              for="lastname"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Last Name</label
            >
            <div class="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                autocomplete="family-name"
                required
                v-model="registerForm.user_info.lastname"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          <!-- Gender -->
          <div>
            <label
              for="gender"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Gender</label
            >
            <div class="mt-2">
              <select
                id="gender"
                name="gender"
                required
                v-model="registerForm.user_info.gender"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <a
            href="/login"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >Sign in</a
          >
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Register",
    data() {
      return {
        registerForm: {
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          role: "user", // Default role
          user_info: {
            firstname: "",
            lastname: "",
            gender: "male", // Default gender
          },
        },
      };
    },
    methods: {
      submitForm() {
        this.register();
      },
      async register() {
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        try {
          const { data } = await this.axios.post(
            "http://localhost:3000/api/v1/register",
            this.registerForm
          );
          alert("Registration Complete");
          this.$router.push({ path: "/login" });
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
          alert(errorMessage);
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  