<template>
  <v-card>
    <v-container class="white pb-0">
      <v-form
        :disabled="disabled"
        ref="form"
        :readonly="readonly"
        @input="() => validate(formValidate())"
        class="white"
      >
        <SelectOrCreateContent
          :dense="dense"
          v-for="field in contentMeta"
          :key="field.name+field.label"
          v-model="content[field.name]"
          :label="field.label"
        />
      </v-form>
      <slot />
    </v-container>
  </v-card>
</template>

<script>
import SelectOrCreateContent from "@/components/SelectOrCreateContent.vue";
function createContentField(name, label) {
  return { name, label };
}
export default {
  name: "ContentBase",
  components: {
    SelectOrCreateContent
  },
  props: {
    contentMeta: Array, // createContentField
    validate: {
      type: Function,
      default() {}
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: { ...this.$props.value }
    };
  },
  methods: {
    formValidate() {
      return this.$refs.form ? this.$refs.form.validate() : false;
    },
    createMe(...namesAndLables) {
      let contentMeta = [];
      namesAndLables.forEach(nl =>
        contentMeta.push(createContentField(nl[0], nl[1]))
      );
      return {
        props: {
          value: Object,
          validate: {
            type: Function,
            default() {}
          },
          disabled: {
            type: Boolean,
            default: false
          },
          dense: {
            type: Boolean,
            default: false
          },
          readonly: {
            type: Boolean,
            default: false
          }
        },
        data() {
          return {
            contentMeta
          };
        }
      };
    }
  },
  watch: {
    value: {
      handler() {
        Object.keys(this.$props.value).forEach(key => {
          this.content[key] = this.$props.value[key];
        });
      },
      immediate: true,
      deep: true
    },
    content: {
      handler() {
        this.$emit("input", this.content);
      },
      deep: true
    }
  }
};
</script>