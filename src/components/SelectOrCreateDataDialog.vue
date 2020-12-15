<template>
  <!-- v-model="dialog" -->
  <v-dialog :value="value" ref="dialog" @input="e => updateValue(e)" width="unset">
    <h1 class="white pa-3 orange">{{title}}</h1>
    <slot :validate="validate"></slot>
    <v-container>
      <v-btn @click="cancel">
        <span>Cancel</span>
      </v-btn>
      <v-btn @click="confirm" :disabled="!valid">
        <span>Confim</span>
      </v-btn>
    </v-container>
  </v-dialog>
</template>


<script>
/**
 * Business Logic
 *    -dialog for a specific CRUD-Operation on state data
 *
 * Inputs:
 *    -title: dialog title
 *    -value: v-model value for deciding to show/hide the dialog
 *    -cancelFunction: function on cancel: dialog closes automatically
 *    -confirmFunction: function on confirm: dialog closes automatically
 * Outputs:
 */
export default {
  name: "SelectOrCreateDataDialog",
  props: {
    title: {
      type: String,
      default: "TITLE"
    },
    cancelFunction: Function,
    confirmFunction: Function,
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel() {
      if (this.cancelFunction) this.cancelFunction();
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("input", false);
    },
    validate(value) {
      this.valid = value;
    },
    confirm() {
      if (!this.valid) return;
      if (this.confirmFunction) this.confirmFunction();
      this.closeDialog();
    },
    updateValue(e) {
      this.$emit("input", e);
    }
  },
  data() {
    return {
      valid: true
    };
  }
};
</script>