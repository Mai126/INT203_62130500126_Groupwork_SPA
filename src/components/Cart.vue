<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      {{ cart.name }}
    </div>
    <div>
      <img
        :src="require(`../assets/products/${cart.photo}`)"
        class="w-72 h-72"
      />
    </div>
    <div>
      ฿ {{ cart.price }}
    </div>
    <button class="rebtn" @click="removeFromCart(cart)">REMOVE FROM CART</button>
  </div>
</template>

<script>
export default {
  props: ["cart"],
  data(){
      return{
          url: "http://localhost:5000/carts"
      }
  },
  methods: {
      async removeFromCart(item){
          try{
              await fetch(`${this.url}/${item.id}`,{
                  method: 'DELETE',
              })
            location.reload()
          }catch(error){
              console.log(`Could not remove item! ${error}`)
          }
      }
  },
};
</script>