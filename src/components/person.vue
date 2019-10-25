<template>
  <v-content>
    <template>
    <v-card class="mx-auto" outlined>
      <v-card-title>Клиент</v-card-title>
      <v-list-item>
        <v-list-item-content>
          <v-col cols="12" sm="6">
            <v-text-field v-model="person.fname" label="Имя" outlined readonly></v-text-field>
            <v-text-field v-model="person.sname" label="Фамилия" outlined readonly></v-text-field>
            <v-text-field v-model="person.tname" label="Отчество" outlined readonly></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="person.dateOfBirth" label="Дата рождения" outlined readonly></v-text-field>
            <v-text-field v-model="person.addres" label="Адрес" outlined readonly></v-text-field>
            <v-text-field v-model="person.sex" label="Пол" outlined readonly></v-text-field>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card class="mx-auto" outlined>
    <v-card-title>Заказы</v-card-title>
    <v-simple-table :fixed-header=true>
        <tr>
          <th class="text-center">id</th>
          <th class="text-center">Заголовок</th>
          <th class="text-center">Описание</th>
          <th class="text-center">Цена</th>
          <th class="text-center">Коммент</th>
          <th class="text-center">Дата</th>
        </tr>
        <tbody>
        <tr v-for="order in person.orders_list"
            @click="$router.push({ name: 'order', params: { id : order.id } })"
            :key="order.id">
          <td>{{order.id}}</td>
          <td>{{order.title}}</td>
          <td>{{order.description}}</td>
          <td>{{order.amount}}</td>
          <td>{{order.comment}}</td>
          <td>{{order.datein}}</td>
        </tr>
        </tbody>
    </v-simple-table>
    </v-card>
    </template>
  </v-content>
</template>

<script>
    export default {
        name: "person",
        data: () => ({
            person: {
                id : null,
                fname: null,
                sname: null,
                tname : null,
                addres: null,
                dateOfBirth: null,
                sex:null,
                orders_list: []

            },
        }),
        beforeMount() {
            // console.log(this.$route.params);
        },
        created () {

        },
        mounted () {
            this.initialize();
        },
        methods: {
            initialize() {
                this.$route.params.id = 1;
                if (typeof(this.$route.params.id) !== 'undefined') {
                    let id = this.$route.params.id;
                    fetch('http://localhost:8080/JEE7_REST/api/person/' + id, {method: "GET"}).then(res => res.json())
                        .then(res => {
                            this.person = res;
                        })
                }
            },
        }
    }
</script>

<style scoped>

</style>
