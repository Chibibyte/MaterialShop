<template>
  <div>
    <CheckoutNavbar />
    <v-main>
      <router-view />
      <!-- LEAVE MODAL -->
      <v-dialog v-model="leaving" max-width="290">
        <v-card>
          <v-card-title class="headline">Leave checkout?</v-card-title>
          <v-card-text>Your checkout data will be lost.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="leaving = false"
              >Cancel</v-btn
            >
            <v-btn color="green darken-1" text @click="leave">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>
<script>
/**
 * Business Logic
 * -display CheckoutNavbar
 * -contain router-view for CheckoutViews
 *
 * Inputs:
 *    -$store.state.checkout.leaving
 * Outputs:
 *    -leaving
 */
import CheckoutNavbar from "@/components/CheckoutNavbar.vue";
export default {
  name: "CheckoutView",
  data() {
    return {};
  },
  components: {
    CheckoutNavbar,
  },
  computed: {
    leaving: {
      get() {
        return this.$store.state.checkout.leaving;
      },
      set(value) {
        this.$store.commit("checkout/setLeaving", value);
      },
    },
  },
  methods: {
    leave() {
      this.$store.commit("checkout/clearCheckoutContent");
      this.$store.commit("checkout/clearCheckoutStates");
      this.$router.push("/");
      this.leaving = false;
    },
  },
  beforeMount() {
    if (this.$store.state.noncheckout.cart.length === 0) {
      this.$router.push("/");
    }
  },
};
</script>