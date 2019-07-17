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
                                                   //toastr.info("Đang up ảnh");
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
                                                   //toastr.info("Đang up ảnh");
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
/*
app.factory('recognizeService', ['$http', function($http) {uploadImageImgur(imgBase64) {
                                 //toastr.info("Đang up ảnh");
                                 const url = 'https://api.imgur.com/3/image';
                                 var base = imgBase64.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '').replace('data:image/gif;base64,', '');
                                 
                                 return $http({
                                              method: 'POST',
                                              url,
                                              headers: {
                                              'Authorization': 'Client-ID 56e948d072dfed8'
                                              },
                                              data: {
                                              image: base
                                              }
                                              });
                                 }}])
 */
/*
app.factory('recognizeService', [
                                 '$q',
                                 '$http',
                                 'toastr',
                                 ($q, $http, toastr) => ({
                                                         uploadImage(imgBase64) {
                                                         toastr.info("Đang up ảnh");
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
                                                         toastr.info("Đang up ảnh");
                                                         const url = 'https://api.imgur.com/3/image';
                                                         var base = imgBase64.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '').replace('data:image/gif;base64,', '');
                                                         
                                                         return $http({
                                                                      method: 'POST',
                                                                      url,
                                                                      headers: {
                                                                      'Authorization': 'Client-ID 56e948d072dfed8'
                                                                      },
                                                                      data: {
                                                                      image: base
                                                                      }
                                                                      });
                                                         },
                                                         getImageSize(imgLink) {
                                                         return $q((resolve, reject) => {
                                                                   const img = new Image(); // Create new img element
                                                                   img.addEventListener("load", () => {
                                                                                        resolve({width: img.width, height: img.height});
                                                                                        }, false);
                                                                   img.src = imgLink; // Set source path
                                                                   });
                                                         },
                                                         
                                                         checkAdultContent(imgLink) {
                                                         const key = 'k7dgy05qyfs8uwjvjrjdobt9x17c3yu0gteqyd0qqkomeu3di60kxsrkutl9yge0s2ixiil766r';
                                                         const url = 'https://jav-recognize.azurewebsites.net/api/CheckAdult';
                                                         
                                                         return $http({
                                                                      method: 'POST',
                                                                      url,
                                                                      headers: {
                                                                      'x-functions-key': key
                                                                      },
                                                                      data: {
                                                                      url: imgLink
                                                                      }
                                                                      });
                                                         },
                                                         
                                                         recognizeImage(imgLink) {
                                                         toastr.info("Đang nhận diện, có thể hơi lâu, vui lòng chờ");
                                                         const key = 'k7dgy05qyfs8uwjvjrjdobt9x17c3yu0gteqyd0qqkomeu3di60kxsrkutl9yge0s2ixiil766r';
                                                         const url = 'https://jav-recognize.azurewebsites.net/api/IdolRecognize';
                                                         
                                                         return $http({
                                                                      method: 'POST',
                                                                      url,
                                                                      headers: {
                                                                      'x-functions-key': key
                                                                      },
                                                                      data: {
                                                                      url: imgLink
                                                                      }
                                                                      }).then((result) => {
                                                                              return this.getImageSize(imgLink).then(size => {
                                                                                                                     toastr.success('Xong rồi ahihi :">"');
                                                                                                                     const originalWidth = size.width;
                                                                                                                     const currentWidth = document.querySelector('#source-image').clientWidth;
                                                                                                                     const ratio = currentWidth / originalWidth;
                                                                                                                     const faces = result.data.map(r => {
                                                                                                                                                   const face = r.face.faceRectangle;
                                                                                                                                                   const faceStyle = {
                                                                                                                                                   width: `${face.width * ratio}px`,
                                                                                                                                                   height: `${face.height * ratio}px`,
                                                                                                                                                   left: `${face.left * ratio}px`,
                                                                                                                                                   top: `${face.top * ratio}px`
                                                                                                                                                   };
                                                                                                                                                   
                                                                                                                                                   let fontSize = (face.width * ratio / 6);
                                                                                                                                                   let minFontSize = 15;
                                                                                                                                                   fontSize = Math.max(fontSize, minFontSize);
                                                                                                                                                   
                                                                                                                                                   let candidate = {
                                                                                                                                                   name: 'Unknown',
                                                                                                                                                   nameStyle: {
                                                                                                                                                   width: faceStyle.width,
                                                                                                                                                   'font-size': `${fontSize}px`,
                                                                                                                                                   'line-height': `${fontSize - 2}px`,
                                                                                                                                                   bottom: `-${fontSize}px`
                                                                                                                                                   }
                                                                                                                                                   };
                                                                                                                                                   if (r.candidates.length > 0) {
                                                                                                                                                   const firstCandidate = r.candidates[0].idol;
                                                                                                                                                   candidate.name = firstCandidate.name;
                                                                                                                                                   candidate.link = firstCandidate.link;
                                                                                                                                                   candidate.thumbnail = firstCandidate.thumbnail;
                                                                                                                                                   };
                                                                                                                                                   return {face: faceStyle, candidate};
                                                                                                                                                   });
                                                                                                                     
                                                                                                                     return faces;
                                                                                                                     });
                                                                              }, (error) => {
                                                                              toastr.error('Có lỗi xuất hiện');
                                                                              
                                                                              if (error.status == 403) {
                                                                              toastr.error('Server hiện đang quá tải, vui lòng thử lại sau 30s.');
                                                                              }
                                                                              
                                                                              var errorInfo = error.data.error;
                                                                              if (errorInfo.code == 'InvalidURL') {
                                                                              toastr.error('Link ảnh bị lỗi. Vui lòng dùng link khác.');
                                                                              }
                                                                              return $q.reject(error);
                                                                              });
                                                         }
                                                         })
                                 ]);

*/
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
