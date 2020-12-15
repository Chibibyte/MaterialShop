<template>
  <ContentBase
    :validate="validate"
    :dense="dense"
    :value="value"
    :disabled="disabled"
    :readonly="readonly"
    :contentMeta="contentMeta"
    @input="v => $emit('input', v)"
  />
</template>

<script>
import ContentBase from "@/components/ContentBase.vue";
let cb = ContentBase.methods.createMe(
  ["itemsCost", "Items"],
  ["shippingCost", "Shipping"],
  ["totalCost", "Total"]
);
cb.components = {
  ContentBase
};
cb.name = "SummaryCost";
export default cb;
</script>