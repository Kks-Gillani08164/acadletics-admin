<template>
  <div>
    <div v-if="!isEdit">
      <div
        class="dropzone dropzone-2"
        :class="{ 'red-border': image.length === 1 }"
        @dragover.prevent
        @drop.prevent="uploadFiles($event)"
      >
        <div
          v-if="image.length !== 0 && image.length !== 1"
          class="selected-image"
        >
          <img :src="image.path" alt="" />
          <div class="mx-auto">
            <v-icon @click="removeImage" class="my-3" color="red" large>
              mdi-delete
            </v-icon>
          </div>
        </div>
        <input
          v-if="image.length === 0 || image.length === 1"
          @click="image = ' '"
          type="file"
          @change="uploadFiles($event)"
          accept="image/*"
        />
      </div>
      <p v-if="image.length === 1" class="dropzone-error">Image is required</p>
    </div>
    <!-- For Update Image -->
    <div v-if="isEdit">
      <div
        class="dropzone dropzone-2"
        :class="{ 'red-border': image.length === 1 }"
        @dragover.prevent
        @drop.prevent="uploadFiles($event)"
      >
        <div
          v-if="(image.length !== 0 && image.length !== 1) || updatedImage"
          class="selected-image"
        >
          <img
            :src="
              picture.name
                ? `http://localhost:3000/uploads/${picture.name}`
                : ''
            "
            alt=""
          />
          <div class="mx-auto">
            <v-icon @click="removeImage" class="my-3" color="red" large>
              mdi-delete
            </v-icon>
          </div>
        </div>
        <input
          v-if="(image.length === 0 || image.length === 1) && !updatedImage"
          type="file"
          @change="uploadFiles($event)"
          accept="image/*"
        />
      </div>
      <p
        v-if="(image.length === 0 || image.length === 1) && !updatedImage"
        class="dropzone-error"
      >
        Image is required
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaPicker",
  props: {
    picture: {
      type: Object,
      required: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      image: "",
      updatedImage: true,
    }
  },

  methods: {
    uploadFiles(e) {
      let image = ""
      if (e.dataTransfer) {
        image = e.dataTransfer.files[0]
      } else {
        image = e.target.files[0]
      }
      if (image) {
        this.image = {
          name: image.name,
          path: URL.createObjectURL(image),
        }
        this.$emit("image-uploaded", image)
      }
    },

    removeImage() {
      this.image = " "
      this.updatedImage = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dropzone {
  height: 190px;
  width: 190px;
  border: 2px dashed rgb(197, 197, 197);
  position: relative;
}

.dropzone.red-border {
  border: 2px dashed red;
}

.selected-image {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 5px;
  position: relative;
}

.selected-image img {
  width: 100%;
}

.span-2 {
  grid-column: 1/-1;
}

.dropzone input {
  height: 100%;
  width: 100%;
  position: relative;
  text-align: center;
}

.dropzone input::before {
  content: "+ Select/Drop Image";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(243, 243, 243);
  text-align: center;
  padding-top: 5rem;
}

.dropzone-error {
  margin-top: 5px;
  color: red;
}
</style>
