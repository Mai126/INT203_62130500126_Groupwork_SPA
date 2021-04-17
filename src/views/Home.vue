<template>
  <div class="home">
    <div class="item-container pt-10">
      <div v-for="item in stocks" :key="item.id">
        <item-card class="relative">
          <p>{{ item.name }}</p>
          <img
            :src="require(`../assets/products/${item.photo}`)"
            class="w-72 h-72"
          />
          <p class="absolute right-14 top-14">฿ {{ item.price }}</p>
        </item-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      stocks: [],
      url: "http://localhost:5000/stocks",
    };
  },
  methods: {
    async getStocks() {
      try {
        const res = await fetch(this.url);
        const data = res.json();
        console.log(data.name);
        return data;
      } catch (error) {
        console.log(`Could not get stocks! ${error}`);
      }
    },
  },
  async created() {
    this.stocks = await this.getStocks();
  },
};
</script>
<style scoped>
.home {
  height: 100%;
  width: auto;
}
</style>