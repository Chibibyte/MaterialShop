<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card hover :elevation="hover ? 16 : 4" ripple class="pa-0 ma-0">
        <v-row :class="'ma-0' + (flexRow ? '' : ' flex-column')">
          <v-col class="pa-0">
            <v-container class="blue d-flex flex-column ma-0 pa-0">
              <v-icon right class="secondary ma-0 white--text" size="96px"
                >mdi-{{ item.title }}</v-icon
              >
            </v-container>
          </v-col>
          <v-col class="pa-0">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle>{{ item.price }}€</v-card-subtitle>
            <v-row justify="space-around">
              <v-col :cols="hideButtons ? 10 : 4">
                <v-select
                  ref="vselect"
                  :disabled="disabled"
                  :readonly="readonly"
                  v-model="amount"
                  dense
                  :items="amountArr"
                  label="Amount"
                  @change="() => updateItem({ id: item.id, amount })"
                ></v-select>
              </v-col>
              <v-col v-if="!clearingCart && !hideButtons" cols="6">
                <v-btn @click="addItem({ id: item.id, amount })">
                  <v-icon left>mdi-cart-arrow-down</v-icon>
                  <span>Add</span>
                </v-btn>
              </v-col>
              <v-col v-else-if="!hideButtons" cols="6">
                <v-btn @click="deleteItem(item.id)">
                  <v-icon left>mdi-cart-arrow-down</v-icon>
                  <span>Remove</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
/**
 * Business Logic
 *    -represents a single item in the ItemListView
 *    -display:
 *      -material item
 *      -material item name
 *      -price
 *      -amount
 *      -add button OR
 *      -delete button
 *
 *    -the user can change the amount in the amount selection
 *    -clicking on the add button sends a call to the addItem function in the noncheckout module of the vuex store
 *    -clicking on the delete button sends a call to the deleteItem function in the noncheckout module of the vuex store
 *
 * Inputs:
 * Outputs:
 */
export default {
  name: "ItemListViewItem",
  props: {
    updateOnChange: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default() {
        return {
          title: "DEFAULT TITLE",
          price: "-1",
          id: "0",
        };
      },
    },
    flexRow: {
      type: Boolean,
      default: false,
    },
    initAmount: {
      type: Number,
      default: 1,
    },
    clearingCart: {
      type: Boolean,
      default: false,
    },
    hideButtons: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      amountArr: Array.from(Array(30).keys()).map((v) => v + 1),
      amount: 0,
    };
  },
  methods: {
    addItem(item) {
      this.$store.commit("noncheckout/addItem", item);
    },
    deleteItem(itemId) {
      this.$store.commit("noncheckout/deleteItem", itemId);
    },
    updateItem(item) {
      this.$store.commit("noncheckout/updateItem", item);
    },
  },
  beforeMount() {
    this.amount = this.initAmount;
  },
};
</script>