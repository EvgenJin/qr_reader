<template>
  <v-content>
  <v-card class="mx-auto" outlined>
    <v-card-title>Заказ {{order.id}}</v-card-title>
    <v-list-item>
      <v-list-item-content>
        <v-col cols="12" lg = "3" sm="12">
          <v-text-field v-model="order.title" label="заголовок" outlined readonly></v-text-field>
          <v-text-field v-model="order.amount" label="цена" outlined readonly></v-text-field>
          <v-text-field v-model="order.datein" label="дата" outlined readonly></v-text-field>
          <v-text-field v-model="order.description" label="описание" outlined readonly></v-text-field>
        </v-col>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  <v-card class="mx-auto" outlined>
    <v-card-title>Содержание</v-card-title>
    <v-simple-table :fixed-header=true>
      <tr>
        <th class="text-center">id</th>
        <th class="text-center">Заголовок</th>
        <th class="text-center">Тип</th>
        <th class="text-center">Категория</th>
        <th class="text-center">Описание</th>
        <th class="text-center">Цена</th>
      </tr>
      <tbody>
      <tr v-for="cont in order.orders_content" :key="cont.id">
        <td>{{cont.id}}</td>
        <td>{{cont.title}}</td>
        <td>{{cont.type}}</td>
        <td>{{cont.category}}</td>
        <td>{{cont.description}}</td>
        <td>{{cont.price}}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
  </v-content>
</template>

<script>
    export default {
        name: "order",
        data: () => ({
            order: {
                orders_content: []
            },
        }),

        mounted () {
            this.initialize();
        },
        methods: {
            initialize() {
                // this.$route.params.id = 1;
                if (typeof(this.$route.params.id) !== 'undefined') {
                   let id = this.$route.params.id;
                    fetch('http://localhost:8080/JEE7_REST/api/orders/' + id, {method: "GET"}).then(res => res.json())
                        .then(res => {
                            this.order = res;
                            console.log(res);
                        })

                }
            }
        }
    }
</script>

<style scoped>

</style>
