<template>
  <v-container>
    <simple-form :onSubmit="submit" @done="$router.back()">
      <v-card-title class="mx-auto mb-7 text-h4 span-2">{{
        isEdit ? "Update School" : "Add New School"
      }}</v-card-title>
      <v-text-field
        v-model="school.name"
        :rules="[required('Name must be provided')]"
        label="Name"
        name="name"
        outlined
        class="span-2"
      ></v-text-field>
      <v-text-field
        v-model="school.website"
        :rules="[required('Website is required')]"
        label="Website"
        name="website"
        outlined
        class="span-2"
      ></v-text-field>
    </simple-form>
    <loading-dialog v-model="loading" message="Fetching Notification Data" />
  </v-container>
</template>
<script>
import LoadingDialog from "../../components/LoadingDialog"
import SimpleForm from "@/components/Form.vue"
import { SchoolsService } from "@/services/schools-service"
import { required } from "@/utils/validators"
export default {
  name: "SchoolForm",
  components: { SimpleForm, LoadingDialog },

  data: () => ({
    isEdit: false,
    loading: false,
    service: new SchoolsService(),
    school: {
      name: "",
      website: "",
    },
  }),

  mounted() {
    this.loadSchool()
  },

  methods: {
    required,
    async loadSchool() {
      if (!this.$route.query.id) return
      this.isEdit = true
      this.loading = true
      this.school = await this.service.fetchOne(this.$route.query.id)
      this.loading = false
    },

    async submit(context) {
      if (this.isEdit) {
        context.changeLoadingMessage("Updating School")
        try {
          await this.service.update(this.school)
          return true
        } catch (e) {
          context.reportError({
            title: "Error occurred while updating School",
            description: e.toString(),
          })
          return false
        }
      } else {
        try {
          context.changeLoadingMessage("Creating A New School")
          await this.service.create(this.school)
          return true
        } catch (e) {
          console.log(e)
          context.reportError({
            title: "Error occurred while creating School",
            description: e.toString(),
          })
          return false
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.span-2 {
  grid-column: 1/-1;
}
</style>
