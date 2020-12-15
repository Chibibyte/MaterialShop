<template>
  <div>
    <v-container fluid class="pa-0 ma-0">
      <v-row justify="space-around" align="center" class="primary ma-0 pa-0">
        <v-col class="ma-0 pa-2" cols="4">
          <v-text-field
            dense
            href="searchbar"
            outlined
            class="ma-0 pa-0 white"
            placeholder="Name includes..."
            label="Name includes"
            v-model="searchValue"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="ma-0 pa-0" cols="2">
          <v-select
            dense
            href="sortSelect"
            item-text="value"
            item-value="dir"
            :items="sortBy"
            hide-details
            class="ma-0 pa-0 white"
            outlined
            label="Sort by"
            v-model="sortValue"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="white">
      <v-container class="d-flex">
        <v-pagination
          class="flex-grow-1 flex-shrink-0"
          v-model="page"
          @input="onChangePage"
          :length="maxPages"
          total-visible="10"
        ></v-pagination>
        <v-select
          v-model="maxItems"
          :items="maxItemsArr"
          class="flex-shrink-1 flex-grow-0"
          label="items"
          dense
          hide-details
          outlined
        ></v-select>
      </v-container>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <ItemListViewItem :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/**
 * Business Logic TODO:
 *
 * Inputs:
 *    -v-text-field:href:searchbar
 *    -v-select:href:sortSelect
 *    -$store.state.noncheckout.materialNames
 *    -$store.getters["noncheckout/items"]
 * Outputs:
 *    -v-text-field:href:searchbar
 *    -v-select:href:sortSelect
 */
import ItemListViewItem from "@/components/ItemListViewItem.vue";
export default {
  name: "ItemListView",
  components: {
    ItemListViewItem,
  },
  computed: {
    maxPages() {
      return Math.ceil(this.searchItems.length / this.maxItems);
    },
    searchItems() {
      let itemCpy = [...this.$store.getters["noncheckout/items"]];
      // search filter
      if (this.searchValue) {
        itemCpy = itemCpy.filter((item) =>
          item.title.includes(this.searchValue)
        );
      }
      return itemCpy;
    },
  },
  data() {
    return {
      page: 1,
      maxItemsArr: [20, 50, 100],
      maxItems: 0,
      items: [],
      sortValue: "Name ascending",
      sortBy: ["Name ascending", "Name descending"],
      searchValue: "",
    };
  },
  methods: {
    /**
     * Calculates the items to display based on the page @pageCount
     * "is user is on page @pageCount display @this.items"
     *
     * @param {Number} pageCount    Page to calculate items for
     */
    onChangePage(pageCount) {
      if (pageCount <= 0) return;
      let start = (pageCount - 1) * this.maxItems;
      let itemCpy = this.searchItems;
      // sort order
      if (this.sortValue === "Name descending") itemCpy.reverse();
      let items = itemCpy.slice(start, start + this.maxItems);
      this.items = items;
    },
  },
  watch: {
    maxItems() {
      this.onChangePage(this.page);
    },
    sortValue() {
      this.onChangePage(this.page);
    },
    searchValue() {
      this.page = 1;
      this.onChangePage(this.page);
    },
  },
  beforeMount() {
    this.maxItems = this.maxItemsArr[0];
    this.onChangePage(1);
  },
};
</script>
