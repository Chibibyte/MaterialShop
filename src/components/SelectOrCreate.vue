<template>
  <div>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <v-btn v-if="updateContent" @click="() => openAddData()">
          <span>Create new</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-radio-group v-model="activeRadio">
          <v-hover v-for="data in dataArr" :key="dataToKeyFunction(data)">
            <template v-slot="{ hover }">
              <v-card hover :elevation="hover ? 24 : 6" class="mb-10">
                <v-row>
                  <v-col cols="9">
                    <slot name="main" :data="data">SLOTFALLBACK</slot>
                    <v-container
                      class="d-flex justify-space-around"
                      v-if="updateContent"
                    >
                      <v-btn @click="() => openUpdateData(data)">
                        <v-icon>mdi-pencil-outline</v-icon>
                      </v-btn>
                      <v-btn @click="() => openRemoveData(data)">
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </v-container>
                  </v-col>
                  <v-divider vertical inset></v-divider>

                  <v-col
                    @click="() => selectRadio(data)"
                    class="d-flex justify-center align-items-center pa-0"
                  >
                    <v-radio
                      label="Select"
                      :ref="() => getRadioRef(data)"
                      :value="getContentRef(data)"
                      @change="selectData(data)"
                    ></v-radio>
                  </v-col>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-radio-group>
      </v-col>
    </v-row>

    <!-- DIALOG -->
    <template v-if="updateContent">
      <SelectOrCreateDialog
        v-for="(dialog, name) in dialogs"
        :key="name"
        v-model="dialogs[name]"
        :title="dataDialogText[name + 'Text']"
        :confirmFunction="
          () => {
            if (name === 'add') addData(dataDialogData);
            else if (name === 'remove') removeData(dataDialogData);
            else if (name === 'update')
              updateData(dataDialogOldData, dataDialogData);
          }
        "
      >
        <template #default="slotProps">
          <slot
            :validate="slotProps.validate"
            :name="name"
            :data="dataDialogData"
            :callback="copyObj"
            :disabled="name === 'remove' ? true : false"
            >{{ name.toUpperCase() }}DIALOG FALLBACK</slot
          >
        </template>
      </SelectOrCreateDialog>
    </template>
  </div>
</template>

<script>
/**
 * Business Logic
 *    -component for multiple different CRUD-Operations on state data
 *
 * Inputs:
 *    -updateContent: determines wheather CRUD-Operations can be performed on this content by showing/hiding elements
 *    -contentArrName:  name of the data source array in the vuex store
 *    -dataToKeyFunction: function that returns a key generates with the current items data
 *    -chState: name of the state in the vuex store for the current data set
 *    -emptyDataFunction: function that returns an object of the current data type with keys but empty values (e.g. {var1: "", var2: -1},
 *                        depends on what you want an empty object of your data to look like instead of just undefined)
 *    -dataDialogText: Object containing the different texts for the different crud dialogs (e.g. 'Delete Account', 'Add Address')
 * Outputs:
 *    -dataDialogText
 *    -crudData (contentMethodType, content)
 */
function propMissing(propName) {
  let text = propName + "MISSING";
  // console.error(text);
  return text;
}
import SelectOrCreateDialog from "@/components/SelectOrCreateDataDialog.vue";
export default {
  name: "SelectOrCreate",
  computed: {
    console: () => console,
  },
  components: {
    SelectOrCreateDialog,
  },
  props: {
    verboseMissingProps: {
      type: Boolean,
      default: false,
    },
    updateContent: {
      type: Boolean,
      default: true,
    },
    contentArrName: {
      type: String,
      default: "NO DATA ARRAY",
    },
    dataToKeyFunction: {
      type: Function,
      default: (data) =>
        Object.values(data).reduce((acc, cur) => acc + cur.toString()),
    },
    chState: {
      type: String,
      default: () => propMissing("chState"),
    },

    emptyDataFunction: {
      type: Function,
      default: () => propMissing("emptyDataFunction"),
    },
    dataDialogText: {
      type: Object,
      default() {
        return {
          addText: "add",
          removeText: "remove",
          updateText: "update",
        };
      },
    },
  },
  data() {
    return {
      dataArr: this.$store.state.checkout[this.contentArrName],
      checkoutStates: this.$store.state.checkout.checkoutStates,
      activeRadio: "",
      // data dialog
      dataDialogData: this.emptyDataFunction(),

      // toggle dialog
      dialogs: {
        add: false,
        remove: false,
        update: false,
      },

      dataDialogOldData: this.emptyDataFunction(),

      dialogTypes: ["add", "update", "delete"],
    };
  },
  watch: {
    dataDialogData: {
      handler() {
        this.$emit("input", this.dataDialogData);
      },
      deep: true,
    },
  },
  methods: {
    getContentRef(data) {
      return this.contentArrName + "-ref-" + this.dataToKeyFunction(data);
    },
    getRadioRef(data) {
      return this.contentArrName + "-radioref-" + this.dataToKeyFunction(data);
    },
    copyObj(objSource, altTarget) {
      Object.keys(objSource).forEach((key) => {
        if (altTarget) altTarget[key] = objSource[key];
        else this.dataDialogData[key] = objSource[key];
      });
    },
    selectRadio(data) {
      let radioValue =
        this.contentArrName + "-ref-" + this.dataToKeyFunction(data);
      this.activeRadio = radioValue;
      this.selectData(data);
    },
    selectData(data) {
      this.$store.commit("checkout/selectContent", {
        contentName: this.chState,
        content: data,
      });
      this.$store.commit("checkout/setCheckoutState", {
        chState: this.chState,
        value: true,
      });
    },

    openUpdateData(data) {
      this.copyObj(data);
      this.copyObj(data, this.dataDialogOldData);
      this.dialogs["update"] = true;
    },
    openAddData() {
      this.copyObj(this.emptyDataFunction());
      this.dialogs["add"] = true;
    },

    openRemoveData(data) {
      this.copyObj(data);
      this.copyObj(data, this.dataDialogOldData);
      this.dialogs["remove"] = true;
    },
    crudData(contentMethodType, content) {
      if (this.contentArrName == "NO DATA ARRAY") return;
      this.$store.commit(`checkout/${contentMethodType}Content`, {
        contentArrName: this.contentArrName,
        content,
      });
      this[contentMethodType + "Dialog"] = false;
    },
    addData(content) {
      this.crudData("add", content);
    },
    removeData(content) {
      this.crudData("remove", content);
    },
    updateData(oldData, data) {
      let content = [oldData, data];
      this.crudData("update", content);
    },
  },
  mounted() {
    if (this.$store.state.checkout[this.chState])
      this.selectRadio(this.$store.state.checkout[this.chState]);
  },
};
</script>