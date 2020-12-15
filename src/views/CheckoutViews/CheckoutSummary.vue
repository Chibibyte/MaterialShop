<template>
  <CheckoutBase
    :next_disabled="!checkoutStates.summary"
    title="Summary"
    subtitle="Please verify that your order is correct"
    next_target="complete"
    :next_icon="$constants.BUTTONICONS.CHECKOUT_COMPLETE"
    :icon="$constants.BUTTONICONS.SUMMARY"
    invisible
  >
    <v-row>
      <v-col>
        <h1>Order</h1>
        <ItemListViewItem
          v-for="item in checkout.order"
          :key="item.id"
          :item="{ title: materialNames[item.id], price: '2.99' }"
          :initAmount="item.amount"
          hideButtons
          flexRow
          class="mb-5"
          readonly
        />
        <h1>DeliveryAddress</h1>
        <Address
          class="mb-5"
          readonly
          dense
          :value="checkout.deliveryAddress"
        />
        <h1>Bankaccount</h1>
        <Bankaccount
          class="mb-5"
          readonly
          dense
          :value="checkout.bankaccount"
        />
        <h1>Shipping</h1>
        <Shipping class="mb-5" readonly dense :value="checkout.shipping" />
        <h1>Payment</h1>
        <Payment class="mb-5" readonly dense :value="checkout.payment" />
      </v-col>
      <v-col>
        <h1>Price</h1>
        <SummaryCost
          class="mb-5"
          readonly
          dense
          :value="{
            itemsCost: itemsCost + '€',
            shippingCost: shippingCost + '€',
            totalCost: totalCost + '€',
          }"
        />
        <NavButton
          routerPush
          :runBefore="completeOrder"
          to="complete"
          :icon="$constants.BUTTONICONS.CHECKOUT_COMPLETE"
          name="Order now"
        />
      </v-col>
    </v-row>
  </CheckoutBase>
</template>

<script>
import CheckoutBase from "@/views/CheckoutViews/CheckoutBase.vue";
import Address from "@/components/Address.vue";
import Shipping from "@/components/Shipping.vue";
import Payment from "@/components/Payment.vue";
import Bankaccount from "@/components/Bankaccount.vue";
import ItemListViewItem from "@/components/ItemListViewItem.vue";
import SummaryCost from "@/components/SummaryCost.vue";
import NavButton from "@/components/NavButton.vue";
export default {
  name: "CheckoutSummary",
  components: {
    CheckoutBase,
    Address,
    Shipping,
    Payment,
    Bankaccount,
    ItemListViewItem,
    SummaryCost,
    NavButton,
  },
  data() {
    return {
      checkoutStates: this.$store.state.checkout.checkoutStates,
      checkout: this.$store.state.checkout,
      noncheckout: this.$store.state.noncheckout,
      materialNames: this.$store.state.noncheckout.materialNames,
      shippingCost: this.$store.state.checkout.shipping.price,
      itemsCost:
        Math.round(
          this.$store.state.checkout.order.reduce((acc, cur) => {
            return acc + cur.amount * 2.99;
          }, 0) * 100
        ) / 100,
    };
  },
  methods: {
    completeOrder() {
      this.$store.commit("checkout/clearCheckoutStates");
      this.$store.commit("checkout/clearCheckoutContent");
      this.$store.commit("noncheckout/clearCart");
      this.$store.commit("checkout/setCheckoutState", {
        chState: "summary",
        value: true,
      });
    },
  },
  computed: {
    console: () => console,
    totalCost() {
      return (
        Math.round((Number(this.itemsCost) + Number(this.shippingCost)) * 100) /
        100
      );
    },
  },
};
</script>