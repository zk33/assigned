
OAuth.initialize(OAUTH_ID);

angular.module('App', [])
  .controller('MainController',['$scope', function($scope){
    var api;
    var getIssues = function(api,url){
      api.get(url)
       .done(function(res){
         $scope.$apply(function(){ $scope.issues = $scope.issues.concat(res); });
       })
       .fail(function(err){
         $scope.$apply(function(){ $scope.error += ' ' + err; });
       });
    };

    $scope.issues = [];
    $scope.repos = [];
    $scope.error = "";
    $scope.auth = function(){
      OAuth.popup('github')
        .done(function(result){
          api = result;
          api.get('/user/orgs')
          .done(function(res){
            $scope.$apply(function(){ $scope.repos = res; });
            getIssues(api,'/user/issues?filter=assigned');
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




