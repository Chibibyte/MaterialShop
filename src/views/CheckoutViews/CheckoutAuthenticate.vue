<template>
  <v-container class="d-flex green justify-center">
    <v-form class="white pa-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field ref="emailInput" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field
        ref="passwordInput"
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">next</v-btn>
    </v-form>
  </v-container>
</template>


<script>
/**
 * Business Logic
 *    -display authentication form (like login form)
 *    -when user clicks on next
 *        -run validate()
 *
 *
 * Inputs: none
 * Outputs:
 *    -emailRules
 *    -passwordRules
 */
export default {
  name: "CheckoutAuthenticate",
  data: () => ({
    valid: true,
    email: "ro@bo.cop",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      v => v === "ro@bo.cop" || 'E-mail must be "ro@bo.cop"'
    ],
    password: "1234",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v === "1234") || "Password must be 1234"
    ]
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store.commit("checkout/setCheckoutState", {
          chState: "authentication",
          value: true
        });
        this.$router.push("address");
      }
    }
  }
};
</script>