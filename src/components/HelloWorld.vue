<template>
  <v-content>
    <router-link to="/qr">Перейти к камере</router-link>
    <!--  форма поиска  -->
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search_item.fname"
              label="Имя"
              :rules="[v => !!v || 'Имя должно быть заполнено']"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="search_item.sname"
              label="Фамилия"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="search_item.tname"
              label="Отчество"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="search()">
          Поиск
        </v-btn>
      </v-container>
    </v-form>
    <!-- таблица -->
    <v-container v-if="main_list.length > 0">
      <v-simple-table
        :height="500"
        :fixed-header=true
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <p>{{ editedItem.sname + " " + editedItem.fname + " " + editedItem.tname}}</p>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-card>
                        <img v-bind:src="'data:image/jpeg;base64,'+editedItem.qrcode">
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center">Фамилия</th>
            <th class="text-center">Имя</th>
            <th class="text-center">Отчество</th>
            <th class="text-center">Дата рождения</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="person in main_list"
              @click="$router.push({ name: 'person', params: { id : person.id } })"
              :key="person.id">

            <td>{{ person.sname }}</td>
            <td>{{ person.fname }}</td>
            <td>{{ person.tname }}</td>
            <td>{{ person.dateOfBirth }}</td>
            <td><v-icon x-large class="blue--text text--lighten-2" @click="editItem(person)">aspect_ratio</v-icon></td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-content>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            valid: true,
            person : {},
            search_item:{
                fname:'',
                sname:'',
                tname:''
            },
            searchRules: [
                v => !!v || 'Не может быть пустым',
                v => v.length <= 2 || 'Введите больше символов',
            ],
            headers: [
                { text: 'Фамилия', value: 'sname' },
                { text: 'Имя',align: 'left',sortable: false,value: 'fname'},
                { text: 'Отчество', value: 'tname' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            main_list: [],
            editedItem: {}
        }),

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
        },

        methods: {
            search () {
              this.main_list = [];
              fetch('http://localhost:8080/JEE7_REST/api/person/search',{
                  method:"POST",
                  mode: "cors",
                  headers: {"Content-Type":"application/json"},
                  body:JSON.stringify({"fname":this.search_item.fname})
              })
              .then(function(res) {
                  if (res.status >= 400 || res.status == 500) {
                      res.text().then(res => alert(res));
                      throw new Error("Bad response from server");
                  }
                  return res.json();
              })
              .then(res => res.forEach((el) => {
                  this.main_list.push(el);
              }))
              .catch(function (error) {
                  console.log('Request failed', error);
              });
            },
            editItem (item) {
                fetch('http://localhost:8080/JEE7_REST/api/person/'+item.id,{method:"GET"}).then(res => res.json())
                    .then(res => {
                      this.editedItem = res;
                      this.dialog = true;
                    });
                // this.editedIndex = this.desserts.indexOf(item)
                // this.editedItem = Object.assign({}, item)
            },
            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.editedItem);
                }, 300)
            },
        },
    }
</script>
