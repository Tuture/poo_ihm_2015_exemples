'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('RolesCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.deleteRole = function(roleId) {
        $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + roleId)
          .success(function (data, status) {
            //alert("ici");
          });
      };

      $scope.updateRole = function() {
        var roleData = {
          "id": $scope.idUpdate,
          "name": $scope.nameUpdate,
          "UserdId": $scope.UserIdUpdate,
          "ProjectId": $scope.ProjectIdUpdate
        };
        $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + roleData.id, roleData)
          .success(function (data, status) {
            //alert("Modification de " + roleData.name);
          })
          .error(function(data, status) {
            //alert("erreur de la modification de " + idToUpdate + " " + roleData.name);
          });
      };

      $scope.initRole = function(roleToUpdate) {
          $scope.idUpdate = roleToUpdate.id;
          $scope.nameUpdate = roleToUpdate.name;
          $scope.UserIdUpdate = roleToUpdate.UserdId;
          $scope.ProjectIdUpdate = roleToUpdate.ProjectId;
      };

      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles')
        .success(function(data) {
          $scope.roles = data.data;
        });

      $scope.addRole = function() {
        var roleData = {
          "name": $scope.name,
          "UserId": $scope.userId,
          "ProjectId": $scope.projectId
        };
        $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', roleData)
          .success(function (data, status) {
            $modalInstance.dismiss('cancel');
            //alert("ajout avec success !");
          });
        window.close();
      };

      $('#addModal').on('hidden.bs.modal', function () {
        window.location.reload(true);
      })
      $('#updateModal').on('hidden.bs.modal', function () {
        window.location.reload(true);
      })

      $scope.reloadPage = function(){ window.location.reload();};

}])
