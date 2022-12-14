<template>
  <v-card>
    <slot name="tabs" />
    <v-card-title>
      <span class="data-table__header">{{ title }}</span>
      <v-spacer />

      <div style="width: 400px; margin-right: 20px">
        <v-text-field
          v-model="search"
          solo
          label="Search anything..."
          dense
          hide-details
        />
      </div>
      <slot name="primary-action" />
      <v-btn
        v-if="allowAdd"
        color="primary"
        elevation="2"
        @click="$emit('add-new')"
      >
        <v-icon class="v-btn__pre-icon" small>mdi-plus</v-icon>&nbsp; Add New
      </v-btn>

      <v-btn color="primary" elevation="2" class="ml-2" @click="loadData">
        <v-icon class="v-btn__pre-icon" small>mdi-refresh</v-icon>&nbsp; Refresh
      </v-btn>

      <v-btn v-if="allowFilters" icon style="margin-left: 10px">
        <v-icon @click="$emit('filter')">mdi-filter</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :items="items"
      :headers="headersValue"
      :search="search"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td
            v-for="(elem, key) of headers"
            :key="key"
            :class="`text-${elem.align === 'right' ? 'end' : 'start'}`"
          >
            <slot :name="elem.value" :item="item">{{ item[elem.value] }}</slot>
          </td>

          <td
            v-if="viewHandler || editHandler || deleteHandler"
            class="text-end"
          >
            <slot name="extra-actions" :item="item" />

            <v-btn
              v-if="viewHandler"
              @click="viewHandler(item)"
              color="primary"
              class="mr-2"
              small
            >
              View
            </v-btn>
            <v-btn
              v-if="editHandler"
              @click="editHandler(item)"
              color="green"
              class="mr-2"
              small
              dark
            >
              Edit
            </v-btn>
            <v-btn
              v-if="deleteHandler"
              @click="onDelete(item)"
              color="red"
              small
              dark
            >
              Delete
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <error-dialog v-model="error" :error="errorValue" />
  </v-card>
</template>

<script>
import ErrorDialog from "./ErrorDialog"

export default {
  name: "DataTable",
  components: { ErrorDialog },
  props: {
    allowAdd: {
      type: Boolean,
      default: true,
    },

    allowFilters: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: null,
    },

    loader: {
      type: Function,
      required: true,
    },

    headers: {
      type: Array,
      required: true,
    },

    editHandler: {
      type: Function,
      default: null,
    },

    viewHandler: {
      type: Function,
      default: null,
    },

    deleteHandler: {
      type: Function,
      default: null,
    },
  },

  emits: ["add-new"],

  mounted() {
    this.headersValue = [...this.headers]
    if (this.editHandler || this.deleteHandler || this.viewHandler) {
      this.headersValue.push({
        text: "Actions",
        align: "right",
        search: false,
        sortable: false,
      })
    }

    this.loadData()
  },

  data: () => ({
    search: "",
    items: [],
    error: false,
    loading: false,
    errorValue: {},
    headersValue: [],
  }),

  methods: {
    async loadData() {
      this.loading = true
      try {
        this.items = await this.loader()
        this.loading = false
      } catch (e) {
        this.loading = false
        this.errorValue = {
          title: "Error while loading data",
          description: e?.response?.data?.error ?? "Some Error occurred",
        }
        this.error = true
      }
    },

    async onDelete(item) {
      if (confirm("This Item will be delete")) {
        try {
          this.loading = true
          await this.deleteHandler(item)
          this.loading = false
          this.items.splice(this.items.indexOf(item), 1)
        } catch (e) {
          window.console.log(e)
        }
      }
    },

    // performAction(callback) {
    //   return callback({
    //     changeLoadingStatus: (status) => (this.loading = status)
    //   });
    // }
  },
}
</script>

<style lang="sass" scoped>
.data-table

  &__header
    font-size: 25px
    font-family: google-sans, sans-serif
</style>
