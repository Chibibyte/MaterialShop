<template>
  <div>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>


<script>
/**
 * Business Logic
 * -display Navbar
 * -contain router-view for NonCheckoutViews
 *
 * Inputs: none
 * Outputs: none
 */
import Navbar from "@/components/Navbar.vue";
export default {
  name: "NonCheckoutView",
  components: {
    Navbar
  }
};
</script>