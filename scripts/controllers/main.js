'use strict';

/**
 * @ngdoc function
 * @name coldweather2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the coldweather2App
 */

var phonecatApp = angular.module('phonecatApp', ['ngSanitize']);



phonecatApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';


 $scope.Visible = true;
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.Visible = $scope.Visible ? true : false;
            };

$scope.showCon=function(con){
        $scope.clickOn=con;
    };


}]);



phonecatApp.controller('weatherCtrl', function ($scope, $http) {
  $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22bath%2C%20uk%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys').success(function(data) {
$scope.days = data.query.results.channel.item.forecast;

  });

});


phonecatApp.controller('weatherupdateCtrl', function ($scope, $http, $sce) {
    $http.get('http://www.bathnes.gov.uk/coldweather.json').success(function(data) {

        $scope.updates = data.nodes;

        $scope.getHtml = function(html){
               return $sce.trustAsHtml(html);
           };
    });
});


phonecatApp.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});


phonecatApp.controller('TwitterUpdatesCtrl', function ($scope, $http) {
  $http.get('http://www.bathnes.gov.uk/tweets-raw.json').success(function(data) {
$scope.tweets = data.nodes;


  });

});


phonecatApp.controller('carparkController', function ($scope, $http) {
  $http.get('https://data.bathhacked.org/resource/u3w2-9yme.json').success(function(data) {
    $scope.spaces = data;
    console.log($scope.spaces);
});


$scope.orderProp = 'age';


});


phonecatApp.controller('/gritbinsCtrl', function($scope, $http) {
    $http.get("https://data.bathhacked.org/resource/p3ch-yw3f.json").success(function(data) {
        $scope.gritbins = data;
    });
});

phonecatApp.controller('schoolsCtrl', function ($scope, $http) {

  $http.get('http://www.bathnes.gov.uk/school.json').success(function(data) {

    $scope.schools = data;

    console.log(data);

      var closed = 0;
      var pOpen = 0;
      var open = 0;
      var i = 0;



for( i = 0; i < data.length; i++) {

 if(data[i].node.Status === "Closed"){

closed ++;}


else if(data[i].node.Status === "Partially Open"){
pOpen++;
}
else{
open++;
}

}


 $scope.closed = closed;

 $scope.open = open;

 $scope.pOpen = pOpen;










$scope.map = {

center: [40.7, -74] };

  });

});
