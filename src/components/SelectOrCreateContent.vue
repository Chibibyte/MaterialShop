<template>
  <v-text-field
    :dense="dense"
    :class="dense?'':'container'"
    required
    :rules="[rules.required]"
    :label="label"
    v-model="innerValue"
    ref="textfield"
  ></v-text-field>
</template>

<script>
export default {
  name: "SelectOrCreateContent",
  props: {
    label: String,
    value: String,
    dense: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerValue: this.$props.value,
      rules: {
        required: v => !!v || "Field is required"
      }
    };
  },
  watch: {
    value() {
      this.innerValue = this.value;
    },
    innerValue() {
      this.$emit("input", this.innerValue);
    }
  }
};
</script>