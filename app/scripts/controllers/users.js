'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UsersCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]

    $scope.initUser = function(userToUpdate) {
      $scope.idUserUpdate = userToUpdate.id;
      $scope.nomUserUpdate = userToUpdate.name;
      $scope.prenomUserUpdate = userToUpdate.surname;
      $scope.emailUserUpdate = userToUpdate.email;
      $scope.sitewebUserUpdate = userToUpdate.website;
    };

    $scope.updateUser = function() {
      var userData = {
        "id": $scope.idUserUpdate,
        "name": $scope.nomUserUpdate,
        "surname": $scope.prenomUserUpdate,
        "email": $scope.emailUserUpdate,
        "website": $scope.sitewebUserUpdate
      };
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userData.id, userData)
        .success(function (data, status) {
          //alert("Modification de " + roleData.name);
        })
        .error(function(data, status) {
          //alert("erreur de la modification de " + idToUpdate + " " + roleData.name);
        });
    };

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;
      });

    if($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.currentUser = data.data;
          }
        });
    };

    $scope.delete = function(userId) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId)
        .success(function(data) {})
        .error(function(data) {});
    };

    $scope.add = function() {
      var userData = {
        "name": $scope.nomUser.toString().toUpperCase(),
        "surname": $scope.prenomUser,
        "email": $scope.emailUser,
        "website": $scope.sitewebUser
      };
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', userData)
        .success(function(data) {
          alert("ajout avec succès !")
          window.close();
        })
        .error(function(data) {
          alert("erreur de l'ajout !")
        });
    };

    $scope.reloadPage = function() { window.location.reload(); }

    $scope.getProjectsforUser = function(userId) {
      shttp.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId + '/Projects')
        .success(function(data) {
          $scope.projectsForUser = data.data;
        });
    }

  }]);
