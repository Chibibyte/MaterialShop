<template>
  <v-app-bar app class="accent">
    <v-container app class="d-flex justify-space-around">
      <NavButton
        :disabled="$store.state.checkout.checkoutStates.summary"
        to="/"
        :icon="$constants.BUTTONICONS.CANCEL"
        name="Cancel"
      />

      <NavButton
        :disabled="!$store.state.checkout.checkoutStates.authentication"
        to="/checkout/address"
        :icon="$constants.BUTTONICONS.AUTHENTICATION"
        name="Delivery address"
      />
      <NavButton
        :disabled="!$store.state.checkout.checkoutStates.deliveryAddress"
        to="/checkout/bankaccount"
        :icon="$constants.BUTTONICONS.ADDRESS"
        name="Bank Account"
      />
      <NavButton
        :disabled="!$store.state.checkout.checkoutStates.bankaccount"
        to="/checkout/shipping"
        :icon="$constants.BUTTONICONS.BANKACCOUNT"
        name="Shipping"
      />
      <NavButton
        :disabled="!$store.state.checkout.checkoutStates.shipping"
        to="/checkout/payment"
        :icon="$constants.BUTTONICONS.SHIPPING"
        name="Payment"
      />
      <NavButton
        :disabled="!$store.state.checkout.checkoutStates.payment"
        to="/checkout/summary"
        :icon="$constants.BUTTONICONS.PAYMENT"
        name="Summary"
      />
    </v-container>
  </v-app-bar>
</template>

<script>
import NavButton from "@/components/NavButton.vue";
export default {
  name: "CheckoutNavbar",
  components: {
    NavButton,
  },
  methods: {
    cancelEnabled() {
      // let cancelEn = Object.values(
      //   this.$store.state.checkout.checkoutStates
      // ).reduce((acc, cur) => acc || cur);
      // return cancelEn;
      return true;
    },
  },
};
</script>