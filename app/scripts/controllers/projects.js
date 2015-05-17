'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('ProjectsCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
      });

    if($routeParams.projectId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
        .success(function(data) {
          if (data.status == "success") {
            $scope.currentProject = data.data;
          }
        });
    }

    $scope.delete = function(projectId) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId)
        .success(function (data, status) {
          //alert("ici");
        });
    };

    $scope.initProject = function(projectToUpdate) {
      $scope.idProject = projectToUpdate.id;
      $scope.titreProject = projectToUpdate.title;
      $scope.descProject = projectToUpdate.description;
      $scope.anneeProject = projectToUpdate.annee;
    };

    $scope.updateProject = function() {
      var projectData = {
        "id": $scope.idProject,
        "title": $scope.titreProject,
        "description": $scope.descProject,
        "year": $scope.anneeProject
      };
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectData.id, projectData)
        .success(function (data, status) {
          //alert("Modification de " + roleData.name);
        })
        .error(function(data, status) {
          //alert("erreur de la modification de " + idToUpdate + " " + roleData.name);
        });
    };

    $scope.add = function() {
      var projectData = {
        "title": $scope.titre,
        "description": $scope.desc,
        "year": parseInt($scope.annee)
      };

      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', projectData)
        .success(function (data, status) {
          window.close();
          alert("ajout avec success !");
        });
    };

    $scope.reloadPage = function(){ window.location.reload();};

  }])
