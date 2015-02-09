'use strict';

/* Controllers */

var phonebookControllers = angular.module('phonebookControllers', []);

phonebookControllers.controller('PersonsListCtrl', ['$scope', '$http', 'filterFilter',
  function($scope, $http, filterFilter) {

    //number of persons to view in a single page
    $scope.numOfPersons = 10;
    $scope.startPageIndex = 0;
    $scope.numOfPages = 0;
    $scope.currentPageNum = 0;

  	//define persons array
  	$scope.persons = {}; // all persons
    $scope.matchedPersons = {}; // match persons based on search words
    $scope.viewPersons = {}; // one page view Persons

  	//get all persons
    $http.get('api/persons').success(function(data) {
      $scope.persons = data;
      $scope.matchedPersons = $scope.persons;
      $scope.viewPersons = $scope.matchedPersons.slice($scope.startPageIndex, $scope.numOfPersons);
      $scope.numOfPages = Math.ceil($scope.matchedPersons.length / $scope.numOfPersons);
    });

    $scope.search = function () {
      $scope.currentPageNum = 0;
      $scope.startPageIndex = $scope.currentPageNum * $scope.numOfPersons;
      $scope.matchedPersons = filterFilter($scope.persons, $scope.query);
      $scope.viewPersons = $scope.matchedPersons.slice($scope.startPageIndex, $scope.numOfPersons + $scope.startPageIndex);
      $scope.numOfPages = Math.ceil($scope.matchedPersons.length / $scope.numOfPersons);
    };

    $scope.paginate = function(pageNum) {
      $scope.currentPageNum = pageNum;
      $scope.startPageIndex = $scope.currentPageNum * $scope.numOfPersons;
      $scope.viewPersons = $scope.matchedPersons.slice($scope.startPageIndex, $scope.numOfPersons + $scope.startPageIndex);
      $scope.numOfPages = Math.ceil($scope.matchedPersons.length / $scope.numOfPersons);
    }

    //delete person
    $scope.deletePerson = function(person) {
    	$http.delete('api/persons/' + person._id ).success(function(data) {
        alert("Deleted successfully")
      	var index = -1;		
				var personsArr = $scope.persons;
				for( var i = 0; i < personsArr.length; i++ ) {
					if( personsArr[i]._id === person._id ) {
						index = i;
						break;
					}
				}
				
        $scope.persons.splice( index, 1 );
        $scope.matchedPersons = $scope.persons;
        $scope.startPageIndex = $scope.currentPageNum * $scope.numOfPersons;

        //if the last element in page removed
        if ( $scope.startPageIndex == $scope.matchedPersons.length){
          $scope.currentPageNum -= 1;
          $scope.startPageIndex = $scope.currentPageNum  * $scope.numOfPersons;
        }

        $scope.viewPersons = $scope.matchedPersons.slice($scope.startPageIndex, $scope.numOfPersons + $scope.startPageIndex);
        $scope.numOfPages = Math.ceil($scope.matchedPersons.length / $scope.numOfPersons);
    	});
    }

    //update person 
    $scope.updatePerson = function(person) {

    	var data = {
    		name : person.name,
    		phoneNumber : person.phoneNumber
    	};
    	
    	var responsePromise = $http.put("/api/persons/" + person._id, data, {});
    	
      responsePromise.success(function(dataFromServer, status, headers, config) {
	      console.log("STATUS ---> ", status)
	    });

      responsePromise.error(function(data, status, headers, config) {
        console.log("STATUS ---> ", status)
        console.log(JSON.stringify(data))
        if (data.name && data.name == "ValidationError") {
          if (data.errors.phoneNumber) {
            alert(data.errors.phoneNumber.message)
          }
        }
      });
    	
    }

    $scope.updateView = function() {
      $scope.currentPageNum = 0;
      $scope.startPageIndex = $scope.currentPageNum * $scope.numOfPersons;
      $scope.viewPersons = $scope.matchedPersons.slice($scope.startPageIndex, $scope.numOfPersons + $scope.startPageIndex);
      $scope.numOfPages = Math.ceil($scope.matchedPersons.length / $scope.numOfPersons);
    }
  }
]);

phonebookControllers.controller('PersonAddCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.person = {};

    $scope.submit = function(person, form) {
    	$scope.person = angular.copy(person);
    	if ($scope.person.name && $scope.person.phoneNumber ) {

	      var data = {
	      	name : $scope.person.name,
	        phoneNumber  : $scope.person.phoneNumber
	      };    
      	var responsePromise = $http.post("/api/persons", data, {});

	      responsePromise.success(function(dataFromServer, status, headers, config) {
	      	alert("Added successfully")
	        $scope.person.name = '';
	    		$scope.person.phoneNumber = '';
	    		form.$setPristine();
	      });
	      responsePromise.error(function(data, status, headers, config) {
          console.log(JSON.stringify(data))
	      	if (data.name && data.name == "ValidationError") {
	      		if (data.errors.phoneNumber) {
	      			alert(data.errors.phoneNumber.message)
	      		}
	      	}
	      });
      }
      
    }
  }
]);