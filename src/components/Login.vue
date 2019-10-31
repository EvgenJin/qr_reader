<template>
  <div>
    <h1>{{message}}</h1>
    <h4>Login</h4>
    <form>
      <label for="email" >E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="usr.login" required autofocus>
      </div>
      <div>
        <label for="password" >Password</label>
        <div>
          <input id="password" type="password" v-model="usr.password" required>
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit(usr)">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
    export default {
        data: ()=>({
          message: "test",
          usr: {
              login : "",
              password : ""
          }
        }),
        methods : {
            handleSubmit(object) {
                fetch('http://localhost:8080/JEE7_REST/api/user/login', {
                    method: "POST",
                    // mode: "cors",
                    headers: {"Content-Type":"application/json"},
                    body:JSON.stringify(object)
                })
                .then(function(res) {
                  if (res.status == 200) {
                      res.json().then(res => localStorage.setItem('jwt',res.token))
                      this.router.push({ name: 'order'})
                  }
                  if (res.status == 401) {
                      res.text().then(res => alert(res));
                      throw new Error("Bad response from server");
                  }
                    if (res.status > 401 || res.status == 500) {
                        res.text().then(res => alert(res));
                        throw new Error("Bad response from server");
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
