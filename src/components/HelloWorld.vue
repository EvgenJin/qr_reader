<template>
   <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          }
        ]
    }
  },
  methods: {
    getAllPerson(){
      let promise = fetch('http://10.0.1.13:8001/JEE7_REST/api/person/all',{method: "GET"}).then((res) => res.json())
      .then(res =>
        res.forEach(el => {
          let desert = {}
          desert.name = el.fname
          desert.calories = el.sname
          desert.fat = el.tname
          this.desserts.push(desert)
        })
      )
    }
  },
  mounted() {
    this.getAllPerson();
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
