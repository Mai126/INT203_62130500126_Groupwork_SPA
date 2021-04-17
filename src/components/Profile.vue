<template>
  <h1 class="h1 mt-5">MY PROFILE</h1>
  <div class="mt-5">
    <div class="py-2">
      <span class="font-semibold">Firstname: </span>{{ info.firstname }}
    </div>
    <div class="py-2">
      <span class="font-semibold">Lastname: </span>{{ info.lastname }}
    </div>
    <div class="py-2">
      <span class="font-semibold">Username: </span>{{ info.username }}
    </div>
    <div class="py-2">
      <span class="font-semibold">Address: </span>{{ info.address }}
    </div>
  </div>
  <div class="flex justify-center items-center mt-6">
    <form @submit.prevent="submitForm">
      <div class="flex flex-wrap max-w-2xl">
        <div class="p-2">
          <label for="firstname">Firstname:</label>
        </div>
        <div class="p-2">
          <input v-model="firstname" type="text" id="firstname" class="input" />
          <p v-if="invalidFirstname" class="text-red-500">Firstname required!</p>
        </div>
        <div class="p-2">
          <label for="lastname">Lastname:</label>
        </div>
        <div class="p-2">
          <input v-model="lastname" type="text" id="lastname" class="input" />
          <p v-if="invalidLastname" class="text-red-500">Lastname required!</p>
        </div>
        <div class="p-2">
          <label for="username">Username:</label>
        </div>
        <div class="p-2">
          <input v-model="username" type="text" id="username" class="input" />
          <p v-if="invalidUsername" class="text-red-500">Username required!</p>
        </div>
        <div class="p-2">
          <label for="address">Address:</label>
        </div>
        <div class="p-2">
          <textarea
            rows="3"
            cols="25"
            v-model="address"
            type="text"
            id="address"
            class="input"
          />
          <p v-if="invaildAddress" class="text-red-500">Address required!</p>
        </div>
      </div>
      <button v-show="edit" class="subbtn">Submit</button>
    </form>
  </div>
  <button v-show="!edit" @click="showEdit(info)" class="subbtn">
    Edit Profile
  </button>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      url: "http://localhost:5000/informations",
      edit: false,
      firstname: "",
      lastname: "",
      username: "",
      address: "",
      editId: "",
      invalidFirstname: false,
      invalidLastname: false,
      invalidUsername: false,
      invaildAddress: false,
    };
  },
  methods: {
    showEdit(info) {
      this.edit = true;
      this.editId = info.id;
      this.firstname = info.firstname;
      this.lastname = info.lastname;
      this.username = info.username;
      this.address = info.address;
    },
    submitForm() {
      this.invalidFirstname = this.firstname === "" ? true : false;
      this.invalidLastname = this.lastname === "" ? true : false;
      this.invalidUsername = this.username === "" ? true : false;
      this.invaildAddress = this.address === "" ? true : false;

      if (
        !this.invalidFirstname &&
        !this.invalidLastname &&
        !this.invalidUsername &&
        !this.invaildAddress
      ) {
        this.editProfile({
          id: this.editId,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          address: this.address,
        });
      }
    },
    async editProfile(newInfo) {
      try {
        await fetch(`${this.url}/${newInfo.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstname: newInfo.firstname,
            lastname: newInfo.lastname,
            username: newInfo.username,
            address: newInfo.address,
          }),
        });
        this.edit = false
        location.reload()
      } catch (error) {
        console.log(`Could not edit new info! ${error}`);
      }
    },
    async mounted() {
      const res = await fetch(this.url);
      const data = await res.json();
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.username = data.username;
      this.address = data.address;
    },
  },
};
</script>
