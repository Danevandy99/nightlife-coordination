'use strict';

(function() {

  class MainController {

    constructor($http, $location, Auth, $cookies, $cookieStore) {
      this.$cookieStore = $cookieStore;
      this.$cookies = $cookies;
      this.attendence = [];
      this.loading = false;
      this.$http = $http;
      this.awesomeThings = [];
      this.list = [];
      this.$location = $location;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
      });

    }

    seeWhosGoingThere(id, i) {
      var string2 = "https://nightlife-coordination-danevandy99.c9users.io/api/users/seewhosgoing?bar=" + id;
      this.$http.get(string2).then(response2 => {
        this.list[i].attendence = response2.data;
      });
    }

    search() {
      if (document.getElementById('search-box').value != "") {
        var string = "https://nightlife-coordination-danevandy99.c9users.io/api/bars?loc=" + document.getElementById('search-box').value;
        this.loading = true;
        this.$http.get(string).then(response => {
          for (var i = 0; i < response.data.businesses.length; i++) {
            var rating = parseFloat(response.data.businesses[i].rating);
            var rating_array = [];
            if (parseFloat(rating) % 1 === 0) {
              for (var j = 0; j < rating; j++) {
                var object = {};
                object.class = 'fa fa-star';
                rating_array.push(object);
              }
              while (rating_array.length < 5) {
                var object_empty = {};
                object_empty.class = 'fa fa-star-o';
                rating_array.push(object_empty);
              }
            }
            else {
              for (var j = 0; j < Math.floor(rating); j++) {
                var object = {};
                object.class = 'fa fa-star';
                rating_array.push(object);
              }
              var object = {};
              object.class = 'fa fa-star-half-o';
              rating_array.push(object);
              while (rating_array.length < 5) {
                var object_empty = {};
                object_empty.class = 'fa fa-star-o';
                rating_array.push(object_empty);
              }
            }
            response.data.businesses[i].rating_class = rating_array;
            this.seeWhosGoingThere(response.data.businesses[i].id, i);
          }
          this.loading = false;
          this.list = response.data.businesses;
        });
      }
    }

    loggedInClick(event) {
      var string = "https://nightlife-coordination-danevandy99.c9users.io/api/users/me/post-bar?bar=" + event.target.id;
      this.$http.get(string).then(response => {
        var string2 = "https://nightlife-coordination-danevandy99.c9users.io/api/users/seewhosgoing?bar=" + event.target.id;
        this.$http.get(string2).then(response2 => {
          var number = event.target.classList[1];
          this.list[number].attendence = response2.data;
        });
      });
    }

    notLoggedInClick() {
      this.$cookieStore.put("search", document.getElementById('search-box').value);
      window.location.href += '/signup';
    }

    getLastSearch() {
      if (this.$cookieStore.get('search') != '' && this.$cookieStore.get('search') != undefined) {
        document.getElementById('search-box').value = this.$cookieStore.get("search");
      }
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      alert(5);
    }


  }

  angular.module('workspaceApp')
    .controller('MainController', MainController);

})();
