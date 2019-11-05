<template>
  <v-content>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap justify-center>
        <v-flex xs4>
          <!--   уведомлялка       -->
          <v-alert :value="alert_notice.on" :type="alert_notice.type">
            {{alert_notice.message}}
          </v-alert>
          <!--    запрос пароля      -->
          <v-dialog
            v-model="dialog"
            max-width="290"
          >
            <v-card>
              <v-card-title class="justify-center">
                <span>confirm password</span>
              </v-card-title>
              <v-text-field
                v-model="usr.password_conf"
                type="password"
                solo
                label="password">
              </v-text-field>
              <v-card-actions class="justify-center">
                <v-btn @click="register">ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs2>
          <v-form v-model="valid">
            <v-text-field
              v-model="usr.login"
              label="login"
              :rules="[v => !!v || 'login должен быть заполнен']"
              required
            ></v-text-field>
            <v-text-field
              v-on:keyup.enter="handleSubmit(usr)"
              v-model="usr.password"
              type="password"
              label="password"
              :rules="[v => !!v || 'password должен быть заполнен']"
              required
            ></v-text-field>
            <v-btn :disabled="!valid" @click="handleSubmit(usr)">singin</v-btn>
            <v-btn v-if="alert_notice.type_error == 'not_exists'" @click="dialog = true">register</v-btn>
            <v-btn v-if="alert_notice.type_error == 'incorrect_password'" @click="alarma">reset password</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    export default {
        data: ()=>({
          valid: true,
          dialog: true,
          alert_notice: {
              message: null,
              on: false,
              type: "error",
              type_error: null
          },
          usr: {
              exists: true,
              login : '',
              password : '',
              password_conf: ''
          },
        }),
        methods : {
            handleSubmit(object) {
                console.log(JSON.stringify(object));
                fetch('http://localhost:8080/JEE7_REST/api/user/login', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(object)
                })
                    .then(res => {
                        if (res.status == 200) {
                            res.json().then(res => {
                                localStorage.setItem('jwt', res.token);
                                localStorage.setItem('login', this.usr.login);
                                this.$store.commit('SET_LOGIN', this.usr.login);
                            })
                                // TODO отправить на страницу пользователя
                                .then(res => this.$router.push({name: 'order'}))
                        }
                        if (res.status == 401) {
                            res.json().then(res => {
                                this.alarma(res.message);
                                this.alert_notice.type_error = res.type;
                                // TODO отправить на страницу регистрации / сброса пароля
                            });
                        }
                        if (res.status == 500) {
                            console.log(res);
                            this.alarma("server error");
                        }
                    })
            },
            alarma(str) {
                this.alert_notice.on = true;
                this.alert_notice.message = str;
                setTimeout(() => {
                    this.alert_notice.on = false;
                }, 2000)
            },
            register() {
                if (this.usr.password !== this.usr.password_conf) {
                    this.alarma("password mismatch");
                }
                else {
                    let object = {
                        login: this.usr.login,
                        password: this.usr.password
                    };
                    console.log(object);
                    fetch('http://localhost:8080/JEE7_REST/api/user/register', {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(object)
                    })
                        .then(res => {
                            if (res.status == 200) {
                                res.text().then(res => {
                                    console.log(res)
                                })
                            }
                            if (res.status == 400) {
                                res.text().then(res => this.alarma(res))
                            }
                            else {
                                // console.log(res)
                                res.text().then(res => console.log('!!!' + res))
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
