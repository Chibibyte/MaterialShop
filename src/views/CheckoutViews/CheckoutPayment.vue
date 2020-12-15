<template>
  <CheckoutBase
    :next_disabled="!checkoutStates.payment"
    title="Payment"
    subtitle="Choose a payment method"
    next_target="summary"
    :next_icon="$constants.BUTTONICONS.SUMMARY"
    :icon="$constants.BUTTONICONS.PAYMENT"
  >
    <SelectOrCreate
      :updateContent="false"
      :contentArrName="'paymentServices'"
      chState="payment"
      :dataToKeyFunction="dataToKey"
      :emptyDataFunction="emptyData"
      :dataDialogText="{addText:'Add Payment Service', removeText:'Remove Payment Service', updateText:'Update Payment Service'}"
    >
      <template #main="slotProps">
        <Payment disabled v-model="slotProps.data"></Payment>
      </template>

      <template v-for="sName in slotNames" #[sName]="slotProps">
        <Payment
          :validate="slotProps.validate"
          :key="'payment-'+sName"
          :disabled="slotProps.disabled"
          :value="slotProps.data"
          @input="slotProps.callback"
        ></Payment>
      </template>
    </SelectOrCreate>
  </CheckoutBase>
</template>

<script>
/**
 * Business Logic
 *    -display possible payment Service to choose from
 *    -when user clicks on service
 *        -it gets selected as the active payment service
 *        -checkoutStates.payment gets set
 *
 * Inputs:
 *      -$store.state.checkout.checkoutStates
 * Outputs:
 */
import CheckoutBase from "@/views/CheckoutViews/CheckoutBase.vue";
import Payment from "@/components/Payment.vue";
import SelectOrCreate from "@/components/SelectOrCreate.vue";
export default {
  name: "CheckoutPayment",
  components: {
    Payment,
    CheckoutBase,
    SelectOrCreate
  },
  data() {
    return {
      checkoutStates: this.$store.state.checkout.checkoutStates,
      slotNames: ["add", "remove", "update"]
    };
  },
  methods: {
    emptyData() {
      return {
        name: ""
      };
    },
    dataToKey(payment) {
      return payment.name;
    }
  }
};
</script>