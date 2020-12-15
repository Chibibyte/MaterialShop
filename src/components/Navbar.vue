<template>
  <v-container class="pa-0 ma-0">
    <v-app-bar app class="pa-0 ma-0" color="primaryDarkened" dark>
      <v-container class="d-flex justify-space-between pa-0 ma-0">
        <NavButton
          routerPush
          to="/"
          icon="mdi-shopping-search"
          name="Shopping"
        />
        <NavButton
          routerPush
          to="/cart"
          icon="mdi-cart"
          :name="'Cart (' + amount + ')'"
        />
        <CheckoutButton />
        <v-btn fab small @click="infoPopup">
          <v-icon small>mdi-help</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- INFO MODAL -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Material Shop</v-card-title>
        <v-card-text class="orange--text"
          >!Disclaimer! This is not a real shop!</v-card-text
        >
        <v-card-text>
          Welcome to the Material Shop
          <br />Pretend to buy the latest Material Design Icons <br />(or get
          them for free at
          <br />
          <a href="https://materialdesignicons.com"
            >https://materialdesignicons.com</a
          >)
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import NavButton from "@/components/NavButton.vue";
import CheckoutButton from "@/components/CheckoutButton.vue";
export default {
  name: "Navbar",
  components: {
    NavButton,
    CheckoutButton,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    amount() {
      return this.$store.getters["noncheckout/amount"];
    },
  },
  methods: {
    infoPopup() {
      this.dialog = true;
    },
  },
};
</script>