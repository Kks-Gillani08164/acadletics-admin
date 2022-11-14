<template>
  <v-container>
    <simple-form :onSubmit="submit" @done="$router.back()">
      <v-card-title class="mx-auto mb-7 text-h4 span-2">{{
        "Create New Sponsor"
      }}</v-card-title>
      <div class="span-2 image-picker mb-7">
        <image-picker @image-uploaded="getFile" />
      </div>

      <v-text-field
        v-model="sponsor.name"
        :rules="[required('Sponsor Name must be provided')]"
        label="Sponsor Name"
        name="name"
        outlined
        class="span-2"
      ></v-text-field>
      <v-text-field
        v-model="sponsor.link"
        :rules="[required('Link is required')]"
        label="Link"
        name="link"
        outlined
        class="span-2"
      ></v-text-field>
    </simple-form>
  </v-container>
</template>
<script>
import SimpleForm from "@/components/Form.vue"
import { SponsorsService } from "@/services/sponsors-service"
import { required } from "@/utils/validators"
import ImagePicker from "@/components/ImagePicker.vue"
export default {
  name: "MagazineForm",
  components: { SimpleForm, ImagePicker },

  data: () => ({
    loading: false,
    service: new SponsorsService(),
    errors: [],
    sponsor: {
      name: "",
      link: "",
      logo: "",
    },
  }),

  methods: {
    required,
    async getFile(file) {
      let data = ""
      if (file) {
        data = await this.service.saveFile(file)
        this.sponsor.logo = data
      }
    },

    async submit(context) {
      try {
        context.changeLoadingMessage("Creating A New Sponsor")
        await this.service.create(this.sponsor)
        return true
      } catch (e) {
        console.log(e)
        context.reportError({
          title: "Error occurred while creating Sponsor",
          description: e.toString(),
        })
        return false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.span-2 {
  grid-column: 1/-1;
}
.image-picker {
  margin: 0 auto;
}
</style>
