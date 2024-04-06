<template>
  <v-dialog v-model="dialog" :width="widthDialog" persistent>
    <v-card elevation="15">
      <v-card-title>
        <div class="card-form-title">
          <v-icon v-if="icon != ''" class="card-form-title-icon">
            {{ icon }}
          </v-icon>
          <span class="card-form-title-text">{{ title }}</span>
        </div>
      </v-card-title>
      <v-card-subtitle v-if="subtitle != ''">{{ subtitle }}</v-card-subtitle>
      <hr class="title-header-line" />
      <v-card-text class="pt-4 main-card">
        <!-- Edit Here -->
        <v-form ref="form" v-model="valid">
          <slot name="form"> </slot>
        </v-form>
        <!-- Edit Here -->
      </v-card-text>
      <v-card-actions>
        <!-- Edit Here -->
        <slot name="actions" :valid="valid"> </slot>
        <!-- Edit Here -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'untitled'
    },
    subtitle: {
      type: String,
      default: 'กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้งาน'
    },
    icon: {
      type: String,
      default: 'mdi-cog'
    },
    widthDialog: {
      type: String,
      default: '500'
    }
  },
  data: () => ({
    valid: false
  }),
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    validate () {
      // console.log('this.$refs.form.validate()', this.$refs.form.validate())
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="css" scoped>
.title-header-line {
  color: var(--v-primary-base);
}
>>> .card-form-title {
  /* margin: 1em; */
  width: 100%;
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
}

.card-form-title-text {
  font-size: 24px;
  font-weight: 300;
  color: var(--v-primary-base);
  margin-bottom: 5px;
  padding-bottom: 0px;
  text-transform: capitalize !important;
  /* padding-top: 7px !important; */
}

.card-form-title-icon {
  font-size: 20px;
  padding-right: 3px;
  margin-top: -3px;
  color: var(--v-primary-base);
}

.v-card .v-card__subtitle {
  /* padding-left: 50px !important; */
  font-weight: 200;
  text-transform: capitalize !important;
  padding-bottom: 7px !important;
}

/* >>> .v-list-item .v-list-item__title {
  text-transform: capitalize !important;
}

.v-input {
  text-transform: capitalize !important;
} */

.v-card__actions {
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}

.main-card{
  /* background: red; */
  max-height: calc(80vh - 68px - 37px - 16px);
  overflow-y: scroll;
  -ms-overflow-style: thin; /* IE and Edge */
  scrollbar-width: thin; /* Firefox */
}
</style>
