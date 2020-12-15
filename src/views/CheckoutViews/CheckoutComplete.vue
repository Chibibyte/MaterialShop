<template>
  <CheckoutBase
    :buttonFunction="() => $store.commit('checkout/clearCheckoutStates')"
    :next_disabled="false"
    title="Thank you!"
    subtitle="You order will be processed immediately."
    next_name="Shopping"
    next_target="/"
    :next_icon="$constants.BUTTONICONS.SHOPPING"
    :icon="$constants.BUTTONICONS.CHECKOUT_COMPLETE"
  ></CheckoutBase>
</template>

<script>
import CheckoutBase from "@/views/CheckoutViews/CheckoutBase.vue";

export default {
  name: "CheckoutComplete",
  components: {
    CheckoutBase,
  },
};
</script>