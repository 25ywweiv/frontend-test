<template>
  <div class="layout-all">
    <div class="text-title">Age: {{ value[0] }} - {{ value[1] }}</div>
    <v-range-slider style="width: 300px" min="0" max="100" v-model="value" @change="filterAge()"></v-range-slider>
    <div class="grid-container">
      <div v-for="(item, index) in paginatedItems" :key="index" class="card-item">
        <div class="profile-custom">
          <v-img class="rounded-image" :src="item.picture.large"></v-img>
        </div>
        <div class="text-title text-center">{{ item.name.title }}. {{ item.name.first }} {{ item.name.last }}</div>
        <div class="text-detail text-center">{{ item.email }}</div>
        <div class="text-detail text-center">Tel: {{ item.phone }}</div>
        <div class="text-detail text-center">Birthday: {{ $moment(item.dob.date).format('DD-MM-YYYY') }}</div>
        <div class="text-detail text-center">Age: {{ item.dob.age }} Gender: {{ item.gender }}</div>
        <div class="text-detail text-center">Country: {{ item.nat }}</div>
        <div class="text-center">
          <v-btn text @click=";(dialog = true), openDialog(index)">See More</v-btn>
        </div>
        <div class="icon">
          <button class="mr-2" @click="twitter()"><img src="../../public/img/icons/Icon-Twitter.png" /></button>
          <button class="mr-2" @click="tiktok()"><img src="../../public/img/icons/Icon-Tiktok.png" /></button>
          <button class="mr-2" @click="linkedin()"><img src="../../public/img/icons/Icon-Linkedin.png" /></button>
          <button class="mr-2" @click="email()"><img src="../../public/img/icons/Icon-Email.png" /></button>
        </div>
      </div>
    </div>
    <div class="text-center mb-12">
      <v-pagination v-model="currentPage" :length="totalPages" @input="onPageChanged"></v-pagination>
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <div class="profile-custom pt-5">
          <v-img class="rounded-image" :src="formData.picture.large"></v-img>
        </div>
        <div class="text-title text-center">{{ formData.name.title }}. {{ formData.name.first }} {{ formData.name.last }}</div>
        <div class="text-detail text-center">{{ formData.email }}</div>
        <div class="text-detail text-center">{{ formData.phone }}</div>
        <div class="text-detail text-center">Birthday: {{ $moment(formData.dob.date).format('DD-MM-YYYY') }}</div>
        <div class="text-detail text-center">Age: {{ formData.dob.age }} Gender: {{ formData.gender }}</div>
        <div class="d-flex justify-center">
          <div class="location text-detail">
            Location: {{ formData.location.street.number }} {{ formData.location.street.name }} Road, {{ formData.location.city }} District,
            {{ formData.location.state }}, {{ formData.location.country }}, {{ formData.location.postcode }}
          </div>
        </div>
        <div class="text-detail text-center">Country: {{ formData.nat }}</div>
        <div class="icon">
          <button class="mr-2" @click="twitter()"><img src="../../public/img/icons/Icon-Twitter.png" /></button>
          <button class="mr-2" @click="tiktok()"><img src="../../public/img/icons/Icon-Tiktok.png" /></button>
          <button class="mr-2" @click="linkedin()"><img src="../../public/img/icons/Icon-Linkedin.png" /></button>
          <button class="mr-2" @click="email()"><img src="../../public/img/icons/Icon-Email.png" /></button>
        </div>
        <div></div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      value: [0, 100],
      currentPage: 1,
      itemsPerPage: 8,
      dataUser: [], // data all
      dataUserAge: [], //when filter age
      formData: {
        gender: '',
        name: {
          title: '',
          first: '',
          last: '',
        },
        location: {
          street: {
            number: '',
            name: '',
          },
          city: '',
          state: '',
          country: '',
          postcode: '',
          coordinates: {
            latitude: '',
            longitude: '',
          },
          timezone: {
            offset: '',
            description: '',
          },
        },
        email: '',
        login: {
          uuid: '',
          username: '',
          password: '',
          salt: '',
          md5: '',
          sha1: '',
          sha256: '',
        },
        dob: {
          date: '',
          age: '',
        },
        registered: {
          date: '',
          age: '',
        },
        phone: '',
        cell: '',
        id: {
          name: '',
          value: '',
        },
        picture: {
          large: '',
          medium: '',
          thumbnail: '',
        },
        nat: '',
      },

      page: 1,
    }
  },
  created() {
    this.init()
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.dataUserAge.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.dataUserAge.length / this.itemsPerPage)
    },
  },
  methods: {
    init() {
      this.getRandomUser()
    },
    async getRandomUser() {
      for (let i = 0; i < 16; i++) {
        const res = await this.getUser()
        this.dataUser.push(res.results[0])
        this.dataUserAge.push(res.results[0])
      }
    },
    async filterAge() {
      const age = this.dataUser.filter((e) => e.dob.age >= this.value[0]).filter((e) => e.dob.age <= this.value[1])
      this.dataUserAge = age
    },
    openDialog(index) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      const results = this.dataUserAge.slice(startIndex, endIndex)
      this.formData = Object.assign({}, results[index])
    },
    onPageChanged(page) {
      this.currentPage = page
    },
    twitter() {
      window.open('https://twitter.com')
    },
    tiktok() {
      window.open('https://www.tiktok.com')
    },
    linkedin() {
      window.open('https://www.linkedin.com/')
    },
    email() {
      window.open('https://mail.google.com')
    },
  },
}
</script>
<style scoped>
.layout-all {
  margin-top: 100px;
  margin-left: 100px;
  margin-right: 100px;
}
.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card-item {
  width: 24%;
  border: 3px solid #f6f6f6;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  margin-bottom: 40px;
}
.profile-custom {
  width: 200px;
  max-height: auto;
  display: block;
  margin: 0 auto;
}

.text-title {
  font-family: 'Kanit', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
}
.text-detail {
  font-family: 'Kanit', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
.rounded-image {
  border-radius: 5px;
}
.icon {
  display: flex;
  justify-content: center;
}
.location {
  text-align: center !important;
  width: 250px;
}
@media only screen and (max-width: 1700px) {
  .card-item {
    width: 32%;
  }
}
@media only screen and (max-width: 1200px) {
  .card-item {
    width: 48%;
  }
  .layout-all {
    margin-left: 70px;
    margin-right: 70px;
  }
}
@media only screen and (max-width: 900px) {
  .card-item {
    width: 100%;
  }
  .layout-all {
    margin-left: 50px;
    margin-right: 50px;
  }
}
@media only screen and (max-width: 600px) {
  .layout-all {
    margin-left: 20px;
    margin-right: 20px;
  }
}
@media only screen and (max-width: 375px) {
  .profile-custom {
    width: 100%;
  }
}
</style>
