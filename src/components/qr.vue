<template>
  <div>
    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-stream @decode="onDecode" @init="onInit">
      <!-- <div v-show="cameraForzen" class="validation-layer">
        <div class="validation-notice" v-if="validating">
          Long validation in progress...
        </div>

        <div class="validation-result" v-if="!validating">
          <div v-if="isValid" class="valid">
            Valid ticket
          </div>

          <div v-else class="invalid">
            Not a valid ticket
          </div>
        </div>
      </div> -->
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isValid: false,
      validating: false,
      camera: {},
      result: null,
      loading: false,
      firstLoad: true
    }
  },
  computed: {
    cameraForzen () {
      return this.camera === false || (this.loading && !this.firstLoad)
    }
  },
  methods: {
    async onDecode (content) {
      //: { "path": "/orders/", "method": "GET", "title": "titlo", "path_param": 1 }
      this.result = JSON.parse(content);
      // console.log(JSON.parse(content));
      this.$router.push({ name: this.result.path, params: { id : this.result.id } });
      this.stopCamera();
      this.validating = true;
      this.isValid = await this.validate(content);
      this.validating = false;
      window.setTimeout(() => {
        this.startCamera()
      }, 2000)
    },
    stopCamera () {
      this.camera = false
    },
    startCamera () {
      // use default settings
      this.camera = null
    },
    validate (content) {
        return true;
    },
    async onInit (promise) {
      this.loading = true;
      try {
        await promise
      } catch (error) {
        // eslint-disable-next-line
        console.error(error)
      } finally {
        this.firstLoad = true;
        this.loading = true;
      }
    }
  }
}
</script>

<style scoped>
.valid {
  color: green;
}
.invalid {
  color: red;
}
</style>
