<template>
  <div id="app">
    <header style="text-align:center">
      <img v-bind:src="'http://localhost:3000/images/logo.png'" style="width:100%"/>
    </header>
    <router-view server="http://localhost:3000" v-bind:images="images"/>
    <footer class="footer">
      <div class="verybottom">
        <div class="container">
          <div class="row">
            <div class="bottom">
              
              <p class="bottom-left">
                2020 copyright &copy; All rights reserved
              </p>
            
              <p class="bottom-right">
                  &nbsp; Developed By Igbinedion University, Okada
              </p>
              
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
    data: function () {
    return {
      api: {
        upload: "http://localhost:3000/upload",
        retrieve: "http://localhost:3000/retrieve",
        remove: "http://localhost:3000/remove"
      },
      images: []
    }
  },
  methods: {
    beforeMount: function () {
    fetch(this.api.retrieve).then(response => {
      return response.json()
    }).then(images => {
      this.images = images
    })
  }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bottom {
   margin: 0px auto;padding-top: 30px;width: 100%;
}

.bottom-left {
  width:45%; text-align:left;float:left;
}

.bottom-right {
   width:45%; text-align:right;float:left;
}

@media screen and (max-width:640px) {
  .bottom-left {
  width:100%;
  display:block;
  text-align: center;
}

.bottom-right {
    width:100%;
    display:block;
    text-align: center;
}
}
</style>
