<template>
  <NavButton
    routerPush
    :disabled="this.$store.state.noncheckout.cart.length === 0"
    to="/checkout"
    icon="mdi-cash-register"
    name="Checkout"
    :runBefore="
      () =>
        this.$store.commit('checkout/setOrder', [
          ...this.$store.state.noncheckout.cart,
        ])
    "
  />
</template>

<script>
import NavButton from "@/components/NavButton.vue";
export default {
  name: "Navbar",
  components: {
    NavButton,
  },
};
</script>