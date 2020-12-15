<template>
  <v-container>
    <v-row>
      <v-col cols="1" class="d-flex justify-center align-center">
        <v-icon href="icon" style="font-size: 8rem">{{ icon }}</v-icon>
      </v-col>
      <v-col>
        <v-container>
          <h1 href="title">{{ title }}</h1>
          <h2 href="subtitle">{{ subtitle }}</h2>
          <NavButton
            :routerPush="buttonFunction ? true : false"
            :runBefore="buttonFunction"
            :class="invisible ? 'd-none' : ''"
            :disabled="next_disabled"
            v-if="next_name"
            :to="next_target"
            :icon="next_icon"
            :name="next_name"
          />
        </v-container>
      </v-col>
    </v-row>
    <slot />
  </v-container>
</template>

<script>
/**
 * Business Logic
 * -display icon, title and subtitle for current CheckoutView
 * -provides NavButton with props
 *
 * Inputs:
 *    -invisible
 *    -next_disabled
 *    -title
 *    -subtitle
 *    -icon
 *    -next_target
 *    -next_icon
 *    -next_name
 * Outputs:
 *    -v-icon:href:icon
 *    -v-h1:href:title
 *    -v-h2:href:subtitle
 */
import NavButton from "@/components/NavButton.vue";
export default {
  name: "CheckoutBase",
  props: {
    buttonFunction: {
      type: Function,
      default: undefined,
    },
    invisible: {
      type: Boolean,
      default: false,
    },
    next_disabled: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "CheckoutBase TITLE",
    },
    subtitle: {
      type: String,
      default: "CheckoutBase SUBTITLE",
    },
    icon: {
      type: String,
      default: "mdi-cart",
    },
    next_target: {
      type: String,
      default: "authenticate",
    },
    next_icon: {
      type: String,
      default: "mdi-cart",
    },
    next_name: {
      type: String,
      default: "next",
    },
  },
  components: {
    NavButton,
  },
};
</script>