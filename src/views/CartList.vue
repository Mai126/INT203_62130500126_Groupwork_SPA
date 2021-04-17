<template>
  <div class="max-w-sm m-16 item-container">
    <item-card v-for="cart in carts" :key="cart.id">
      <cart  :cart="cart" />
    </item-card>
  </div>
</template>

<script>
import Cart from "../components/Cart.vue";

export default {
  name: "CartList",
  components: {
    Cart,
  },
  data() {
    return {
      url: "http://localhost:5000/carts",
      carts: [],
      cartEmpty: false,
    };
  },
  methods: {
    async getCart() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get cart! ${error}`);
      }
    },
  },
  async created() {
    this.carts = await this.getCart();
  },
};
</script>