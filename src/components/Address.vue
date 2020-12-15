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
/**
 * Business Logic
 *    -fill a ContentBase object with Address data
 *
 * Inputs:
 * Outputs:
 */
import ContentBase from "@/components/ContentBase.vue";
let cb = ContentBase.methods.createMe(
  ["street", "Street"],
  ["house", "House"],
  ["zipcode", "Zipcode"],
  ["city", "City"]
);
cb.components = {
  ContentBase
};
cb.name = "Address";
export default cb;
</script>