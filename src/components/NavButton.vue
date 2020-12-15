<template>
  <v-btn v-if="routerPush" @click="routerNav" :disabled="disabled">
    <v-icon :left="showText">{{ icon }}</v-icon>
    <span v-if="showText">{{ name }}</span>
  </v-btn>
  <router-link v-else :to="to" v-slot="{ href, route, navigate }">
    <v-btn
      :disabled="disabled"
      :href="href"
      @click="(e) => (navigate ? navigate(e) : console.log('no navigate:', e))"
    >
      <v-icon :left="showText">{{ icon }}</v-icon>
      <span v-if="showText">{{ name }}</span>
    </v-btn>
  </router-link>
</template>

<script>
/**
 * Business Logic
 *    -button for navigation within this single page application
 *    -needs router
 *    -for navigation without reload
 *    -can run other function before routing
 *
 * Inputs:
 *    -to: routing target
 *    -icon: material icon name
 *    -name: button name
 *    -disabled: toggle button
 *    -routerPush: if set, routing with router.push; else router-link
 *    -runBefore: function that runs before routing
 * Outputs:
 *    -routerPush
 *    -disabled
 *    -icon
 *    -name
 */
export default {
  name: "NavButton",
  computed: {
    showText() {
      return !this.$vuetify.breakpoint.xs;
    },
  },
  props: {
    to: {
      type: String,
      default: "/",
    },
    icon: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    routerPush: {
      type: Boolean,
      default: false,
    },
    runBefore: Function,
  },
  methods: {
    routerNav() {
      if (this.runBefore) this.runBefore();
      this.$router.push(this.to);
    },
  },
};
</script>