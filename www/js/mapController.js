treemoApp.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;

        }

        $scope.loading = $ionicLoading.show({
          content: 'Recebendo localizacao atual...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.myLatlng = $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $ionicLoading.hide();
        }, function(error) {
          alert('Não conseguimos receber a localização: ' + error.message);
        });
      };

      $scope.centerOnMe();

        var mapOptions = {
          center: $scope.myLatlng,
          zoom: 14,
          animation: google.maps.Animation.BOUNCE,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"),mapOptions);
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });



        var locations = [
                ['Foco simples', -22.214563, -49.975369, 1],
                ['Na esquina', -22.2146788, -49.9477618, 2],
                ['dentro da casa, negaram acesso', -22.214563, -49.947869, 3],
                ['pneu no telhado', -22.2146894, -49.9477618, 4],
                ['Outra informação', -22.214563, -49.978869, 5],
                ['Loren dolen ipsum sit amet', -22.2145784, -49.9477618, 2],
                ['Senac Marilia outro ponto', -22.214563, -49.943469, 6],
                ['dentro da casa, negaram acesso. mais texto mais e mais', -23.6010049, -46.6796506, 7],
                ['dentro da casa, negaram acesso. mais texto mais e mais', -23.6059849, -46.6797806, 8]
 
            ];

        var infowindow = new google.maps.InfoWindow;

        var marker, i;

        for (i = 0; i < locations.length; i++) {
             marker = new google.maps.Marker({
             position: new google.maps.LatLng(
              locations[i][1], 
              locations[i][2], 
              locations[i][3]
              ),
             map: map

              //colocar markardor personalizado
        });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
                console.log(locations[i]);

              }
            })(marker, i));
        }

        $scope.map = map;
      }
      ionic.Platform.ready(initialize);

    });