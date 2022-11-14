<template>
  <v-container>
    <simple-form :onSubmit="submit" @done="$router.back()">
      <v-card-title class="mx-auto mb-7 text-h4 span-2">{{
        isEdit ? "Update Magazine" : "Add New Magazine"
      }}</v-card-title>
      <div class="span-2 image-picker">
        <image-picker
          @image-uploaded="getFile"
          :picture="magazineData.image || {}"
          :isEdit="isEdit"
        />
      </div>
      <v-file-input
        truncate-length="15"
        label="PDF"
        accept="application/pdf"
        class="mt-5 mb-3"
        :rules="[required('An file must be provided')]"
        @change="getFile"
      ></v-file-input>
      <a
        v-if="isEdit"
        :href="`http://localhost:3000/uploads/${magazineData.file.name}`"
        class="align-self-center mt-4"
        target="_blank"
        >Preview PDF</a
      >
      <v-text-field
        v-model="magazineData.name"
        :rules="[required('Name must be provided')]"
        label="Name"
        name="name"
        outlined
        class="span-2"
      ></v-text-field>
      <v-text-field
        v-model="magazineData.type"
        :rules="[required('Type is required')]"
        label="Type"
        name="type"
        outlined
        class="span-2"
      ></v-text-field>
      <v-textarea
        v-model="magazineData.description"
        :rules="[required('Description is required')]"
        outlined
        name="description"
        label="Description"
        class="span-2"
      ></v-textarea>
    </simple-form>
  </v-container>
</template>
<script>
import SimpleForm from "@/components/Form.vue"
import { MagazinesService } from "@/services/magazines-service"
import { required, email } from "@/utils/validators"
import ImagePicker from "@/components/ImagePicker.vue"
export default {
  name: "MagazineForm",
  components: { SimpleForm, ImagePicker },

  data: () => ({
    isEdit: false,
    loading: false,
    service: new MagazinesService(),
    showAvatar: false,
    errors: [],
    magazineData: {
      name: "",
      description: "",
      image: "",
      type: "",
      file: "",
    },
    originalData: "",
  }),

  mounted() {
    this.loadMagazine()
  },

  methods: {
    required,
    email,
    async getFile(file) {
      let data = ""
      if (file) {
        if (file.type.startsWith("image")) {
          data = await this.service.saveFile(file)
          this.magazineData.image = data
        } else {
          data = await this.service.saveFile(file)
          this.magazineData.file = data
        }
      }
    },
    async loadMagazine() {
      if (!this.$route.query.id) return
      this.isEdit = true
      this.loading = true
      this.magazineData = await this.service.fetchOne(this.$route.query.id)
      this.originalData = await this.service.fetchOne(this.$route.query.id)
      this.showAvatar = true
      this.loading = false
    },

    async submit(context) {
      if (this.isEdit) {
        context.changeLoadingMessage("Updating Magazine")
        try {
          if (this.magazineData.image.name !== this.originalData.image.name) {
            await this.service.deleteFile(this.originalData.image.name)
          }
          if (this.magazineData.file.name !== this.originalData.file.name) {
            await this.service.deleteFile(this.originalData.file.name)
          }
          await this.service.update(this.magazineData)
          return true
        } catch (e) {
          context.reportError({
            title: "Error occurred while updating Magazine",
            description: e.toString(),
          })
          return false
        }
      } else {
        try {
          context.changeLoadingMessage("Creating A New Magazine")
          await this.service.create(this.magazineData)
          return true
        } catch (e) {
          console.log(e)
          context.reportError({
            title: "Error occurred while creating Magazine",
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
.image-picker {
  margin: 0 auto;
}
</style>
