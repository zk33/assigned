
OAuth.initialize(OAUTH_ID);

angular.module('App', [])
  .controller('MainController',['$scope', function($scope){
    var api,orgCount;
    var getIssues = function(api,url){
      api.get(url)
       .done(function(res){
         $scope.$apply(function(){ $scope.issues = $scope.issues.concat(res); });
         orgCount--;
         if(orgCount<=0){
           $scope.$apply(function(){ $scope.loggingin = false; $scope.loggedin = true; });
         }
       })
       .fail(function(err){
         $scope.$apply(function(){ $scope.error += ' ' + err; });
       });
    };

    $scope.issues = [];
    $scope.repos = [];
    $scope.error = "";
    $scope.loggingin = false;
    $scope.loggedin = false;
    $scope.auth = function(){
      $scope.loggingin = true;
      OAuth.popup('github')
        .done(function(result){
          api = result;
          api.get('/user/orgs')
          .done(function(res){
            $scope.$apply(function(){ $scope.repos = res; });
            getIssues(api,'/user/issues?filter=assigned');
            orgCount = res.length + 1;
            for(var i=0,len=res.length;i<len;i++){
              getIssues(api,'/orgs/' + res[i].login + '/issues?filter=assigned');
            }
          })
        })
        .fail(function(result){
          $scope.error='Auth error';
        });
    };
  }]);




