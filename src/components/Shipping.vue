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
  ["name", "Delivery Service"],
  ["price", "Price"]
);
cb.components = {
  ContentBase
};
cb.name = "Shipping";
export default cb;
</script>