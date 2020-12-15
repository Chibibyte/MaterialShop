<template>
  <CheckoutBase
    :next_disabled="!checkoutStates.deliveryAddress"
    title="Delivery Address"
    subtitle="Select a delivery address or add a new one"
    next_target="bankaccount"
    :next_icon="$constants.BUTTONICONS.BANKACCOUNT"
    :icon="$constants.BUTTONICONS.ADDRESS"
  >
    <SelectOrCreate
      :contentArrName="'addresses'"
      chState="deliveryAddress"
      :dataToKeyFunction="dataToKey"
      :emptyDataFunction="emptyData"
      :dataDialogText="{
        addText: 'Add Address',
        removeText: 'Remove Address',
        updateText: 'Update Address',
      }"
    >
      <template #main="slotProps">
        <Address disabled v-model="slotProps.data"></Address>
      </template>

      <template v-for="sName in slotNames" #[sName]="slotProps">
        <Address
          :validate="slotProps.validate"
          :key="'address-' + sName"
          :disabled="slotProps.disabled"
          :value="slotProps.data"
          @input="slotProps.callback"
        ></Address>
      </template>
    </SelectOrCreate>
  </CheckoutBase>
</template>

<script>
/**
 * Business Logic
 *    -display possible Delivery Address to choose from
 *    -when user clicks on address
 *        -it gets selected as the active delivery address
 *        -checkoutStates.address gets set
 *
 * Inputs:
 *      -$store.state.checkout.checkoutStates
 * Outputs:
 */
import CheckoutBase from "@/views/CheckoutViews/CheckoutBase.vue";
import Address from "@/components/Address.vue";
import SelectOrCreate from "@/components/SelectOrCreate.vue";
export default {
  name: "CheckoutAddress",
  components: {
    Address,
    CheckoutBase,
    SelectOrCreate,
  },
  data() {
    return {
      checkoutStates: this.$store.state.checkout.checkoutStates,
      slotNames: ["add", "remove", "update"],
    };
  },
  computed: {
    console: () => console,
  },
  methods: {
    emptyData() {
      return {
        street: "",
        house: "",
        zipcode: "",
        city: "",
      };
    },
    dataToKey(addr) {
      return addr.street + addr.house + addr.zipcode + addr.city;
    },
  },
};
</script>