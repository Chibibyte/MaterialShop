<template>
  <v-container v-if="this.$store.state.noncheckout.cart.length > 0">
    <v-row>
      <v-col>
        <v-row v-for="item in cart" :key="item.id">
          <ItemListViewItem
            :item="items[item.id]"
            :initAmount="item.amount"
            clearingCart
            updateOnChange
          />
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-card class="white d-flex justify-center align-items-center">
          <div>
            <v-card-title
              >Sum ({{ this.$store.getters["noncheckout/amount"] }} Artikel):
              {{ this.$store.getters["noncheckout/price"] }}€</v-card-title
            >
            <v-card-actions>
              <CheckoutButton />
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <div class="text-center text-h1">Your cart is empty</div>
  </v-container>
</template>

<script>
import CheckoutButton from "@/components/CheckoutButton.vue";
import ItemListViewItem from "@/components/ItemListViewItem.vue";
export default {
  name: "CartView",
  components: {
    ItemListViewItem,
    CheckoutButton,
  },
  computed: {
    items() {
      return this.$store.getters["noncheckout/items"];
    },
    cart() {
      return this.$store.state.noncheckout.cart;
    },
  },
};
</script>