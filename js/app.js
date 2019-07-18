//var app = angular.module('app', []);
const app = angular.module('app', []);

app.directive("fileread", [() => ({
                                  scope: {
                                  fileread: "="
                                  },
                                  
                                  link(scope, element, attributes) {
                                  element.bind("change", changeEvent => {
                                               const reader = new FileReader();
                                               reader.onload = loadEvent => {
                                               scope.$apply(() => {
                                                            scope.fileread = loadEvent.target.result;
                                                            });
                                               }
                                               reader.readAsDataURL(changeEvent.target.files[0]);
                                               });
                                  }
                                  })]);


app.factory('recognizeServic', ['$q','$http', function($http) {
    return {
            
        recognize: function(imgLink) {
            var url = 'https://kpopidoll.azurewebsites.net';
            return $http({
                method: 'POST',
                url,
                data: {
                    url: imgLink
                }
            });
        }
    }
}]);

app.factory('recognizeService',['$http',($http) => ({
                                                   uploadImage(imgBase64) {
                                                   const url = 'https://api.cloudinary.com/v1_1/hoangcloud/image/upload';
                                                   
                                                   return $http({
                                                                method: 'POST',
                                                                url,
                                                                data: {
                                                                upload_preset: 'jav-idols',
                                                                file: imgBase64
                                                                }
                                                                });
                                                   },
                                                   
                                                   uploadImageImgur(imgBase64) {
                                                   const url = 'https://api.imgur.com/3/image';
                                                   var base = imgBase64.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '').replace('data:image/gif;base64,', '');
                                                   
                                                   return $http({
                                                                method: 'POST',
                                                                url,
                                                                headers: {
                                                                'Authorization': 'Client-ID bf854378b29ef78'
                                                                },
                                                                data: {
                                                                image: base
                                                                }
                                                                });
                                                   },
                                                   recognizeImage(imgLink){
                                                   const url = 'https://kpopidoll.azurewebsites.net';
                                                   
                                                   return $http({
                                                    method: 'POST',
                                                    url,
                                                    data: {
                                                    url: imgLink
                                                    }
                                                    });
                                                   }
                                                  
                                    }
                               
                               ) ])

app.controller('mainCtrl', function($scope, recognizeService) {
    $scope.isLoading = false;

    $scope.$watch('imageLink', function(oldValue, newValue) {
        $scope.faces = [];
        $scope.faceDisplay = [];
    });

    $scope.input = {
               source: 'link',
               imageLink: ""
    };
               
               $scope.$watch('input.source', (newVal, oldVal) => {
                             $scope.input.imageLink = "";
                             });
               
               $scope.$watch('input.imageLink', (newVal, oldVal) => {
                             $scope.faces = [];
                             });
    //WHen users click the button
    $scope.recognize = function() {
        if ($scope.isLoading)
            return;

        $scope.isLoading = true;
        //Call the recognize() function
               if($scope.input.source == 'link') {
               recognizeService.recognizeImage($scope.input.imageLink).then(displayResult);
               }
               else{
               recognizeService.uploadImageImgur($scope.input.imageLink).then(result => {
                                                                              //let url = result.data.url;
                                                                              let url = result.data.data.link;
                                                                              $scope.input.imageLink = url;
                                                                              return url;
                                                                              }).then(recognizeService.recognizeImage.bind(recognizeService)).then(displayResult);
               }
    }
    
    function displayResult(result){
               $scope.faces = result.data;
               
               //Display the box to capture face position
               $scope.faceDisplay = result.data.map(rs => {
                                                    return {
                                                    style: {
                                                    top: rs.face.top + 'px',
                                                    left: rs.face.left + 'px',
                                                    width: rs.face.width + 'px',
                                                    height: rs.face.height + 'px'
                                                    },
                                                    name: rs.idol.name
                                                    }
                                                    });
               $scope.isLoading = false;
               }
    //Testing images
               $scope.testImages = [
        
                                   "https://0.soompi.io/wp-content/uploads/2017/07/26083627/girls-generation-yoona.jpg",
                                    "https://0.soompi.io/wp-content/uploads/2017/08/02080838/girls-generation-sunny-6.jpg",
                                   "https://0.soompi.io/wp-content/uploads/2017/08/01080459/girls-generation-taeyeon-6.jpg",
                                    "https://0.soompi.io/wp-content/uploads/2017/07/27081116/girls-generation-tiffany-6.jpg"];


    
});
