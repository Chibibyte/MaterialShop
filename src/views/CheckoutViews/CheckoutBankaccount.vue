<template>
  <CheckoutBase
    :next_disabled="!checkoutStates.bankaccount"
    title="Bankaccount"
    subtitle="Select a bankaccount or add a new one"
    next_target="shipping"
    :next_icon="$constants.BUTTONICONS.SHIPPING"
    :icon="$constants.BUTTONICONS.BANKACCOUNT"
  >
    <SelectOrCreate
      :contentArrName="'bankaccounts'"
      chState="bankaccount"
      :dataToKeyFunction="dataToKey"
      :emptyDataFunction="emptyData"
      :dataDialogText="{addText:'Add Bank Account', removeText:'Remove Bank Account', updateText:'Update Bank Account'}"
    >
      <template #main="slotProps">
        <Bankaccount disabled v-model="slotProps.data"></Bankaccount>
      </template>

      <template v-for="sName in slotNames" #[sName]="slotProps">
        <Bankaccount
          :validate="slotProps.validate"
          :key="'bankaccount-'+sName"
          :disabled="slotProps.disabled"
          :value="slotProps.data"
          @input="slotProps.callback"
        ></Bankaccount>
      </template>
    </SelectOrCreate>
  </CheckoutBase>
</template>

<script>
/**
 * Business Logic
 *    -display possible Bankaccount to choose from
 *    -when user clicks on account
 *        -it gets selected as the active bankaccount
 *        -checkoutStates.bankaccount gets set
 *
 * Inputs:
 *      -$store.state.checkout.checkoutStates
 * Outputs:
 */
import CheckoutBase from "@/views/CheckoutViews/CheckoutBase.vue";
import Bankaccount from "@/components/Bankaccount.vue";
import SelectOrCreate from "@/components/SelectOrCreate.vue";
export default {
  name: "CheckoutBankaccount",
  components: {
    Bankaccount,
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
        bank: "",
        accountNr: ""
      };
    },
    dataToKey(bankAcc) {
      return bankAcc.bank + bankAcc.accountNr;
    }
  }
};
</script>