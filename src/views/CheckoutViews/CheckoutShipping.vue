<template>
  <CheckoutBase
    :next_disabled="!checkoutStates.shipping"
    title="Shipping Service"
    subtitle="Choose a shipping service"
    next_target="payment"
    :next_icon="$constants.BUTTONICONS.PAYMENT"
    :icon="$constants.BUTTONICONS.SHIPPING"
  >
    <SelectOrCreate
      :updateContent="false"
      :contentArrName="'deliveryServices'"
      chState="shipping"
      :dataToKeyFunction="dataToKey"
      :emptyDataFunction="emptyData"
      :dataDialogText="{addText:'Add Delivery Service', removeText:'Remove Delivery Service', updateText:'Update Delivery Service'}"
    >
      <template #main="slotProps">
        <Shipping disabled v-model="slotProps.data"></Shipping>
      </template>

      <template v-for="sName in slotNames" #[sName]="slotProps">
        <Shipping
          :validate="slotProps.validate"
          :key="'shipping-'+sName"
          :disabled="slotProps.disabled"
          :value="slotProps.data"
          @input="slotProps.callback"
        ></Shipping>
      </template>
    </SelectOrCreate>
  </CheckoutBase>
</template>

<script>
/**
 * Business Logic
 *    -display possible Delivery Service to choose from
 *    -when user clicks on service
 *        -it gets selected as the active delivery service
 *        -checkoutStates.shipping gets set
 *
 * Inputs:
 *      -$store.state.checkout.checkoutStates
 * Outputs:
 */
import CheckoutBase from "@/views/CheckoutViews/CheckoutBase.vue";
import Shipping from "@/components/Shipping.vue";
import SelectOrCreate from "@/components/SelectOrCreate.vue";
export default {
  name: "CheckoutShipping",
  components: {
    Shipping,
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
        name: "",
        price: ""
      };
    },
    dataToKey(shipping) {
      return shipping.name + shipping.price;
    }
  }
};
</script>