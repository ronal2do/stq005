treemoApp.controller('ProfileCtrl', function($scope, ngFB, $http) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        })

    $http.get("http://localhost:8000/users", {

      })
      .success(function(checkin) {
        $scope.checkins = checkin
      })
      .error(function(checkin) {
        alert("ERROR");
      });

});