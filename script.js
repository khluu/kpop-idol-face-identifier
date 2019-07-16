var app = angular.module('app', []);

app.factory('recognizeService', function($http) {
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
});

app.controller('mainCtrl', function($scope, recognizeService) {
    $scope.isLoading = false;

    $scope.$watch('imageLink', function(oldValue, newValue) {
        $scope.faces = [];
        $scope.faceDisplay = [];
    });

    //WHen users click the button
    $scope.recognize = function() {
        if ($scope.isLoading)
            return;

        $scope.isLoading = true;
        //Call the recognize() function
        recognizeService.recognize($scope.imageLink).then(result => {
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
        });
    }

    //Testing images
               $scope.testImages = ["https://cosmicum.info/img/4ce2c1c510ba09a87f227b36188db12e.jpg", "https://2.bp.blogspot.com/-1D0MQygTOlo/WPihz3-YsRI/AAAAAAABqbo/Bf8JrDLiHGk2K0qMNNG_gSykICXuwr_fwCK4B/s320/snsd%2Bcasio%2B%25281%2529.jpg", "https://i.pinimg.com/originals/ac/79/76/ac79761fb057470520b5aa3d43317c82.png", "https://i.ytimg.com/vi/ejmUXB2kcjQ/maxresdefault.jpg"];


    //Idol list
    $scope.idols = [
                    "Taeyeon SNSD",
                    "Sunny SNSD",
                    "Tiffany SNSD",
                    "Hyoyeon SNSD",
                    "Yuri SNSD",
                    "Sooyoung SNSD",
                    "Yoona SNSD",
                    "Seohyun SNSD",
                    
                    "Irene Red Velvet",
                    "Seulgi Red Velvet",
                    "Wendy Red Velvet",
                    "Joy Red Velvet",
                    "Yeri Red Velvet",
                    
                    "Jisoo Blackpink",
                    "Jennie Blackpink",
                    "Rose Blackpink",
                    "Lisa Blackpink",
                    
                    "Jin BTS",
                    "Suga BTS",
                    "J-Hope BTS",
                    "RM BTS",
                    "Jimin BTS",
                    "V BTS",
                    "Jungkook BTS",
                    
                    "Jaejoong JYJ",
                    "Yoochun JYJ",
                    "Junsu JYJ",
                    "Yunho DBSK",
                    "Changmin DBSK",
                    
                    "T.O.P Big Bang",
                    "Taeyang Big Bang",
                    "G-Dragon Big Bang",
                    "Daesung Big Bang",
                    
                    "IU",
                    "Ailee",
                    
                    "Bom 2NE1",
                    "Dara 2NE1",
                    "CL 2NE1",
                    "Minzy 2NE1",
                    
                    "Nayeon TWICE",
                    "Jeongyeon TWICE",
                    "Momo TWICE",
                    "Sana TWICE",
                    "Jihyo TWICE",
                    "Mina TWICE",
                    "Dahyun TWICE",
                    "Chaeyoung TWICE",
                    "Tzuyu TWICE",
                    
                    "Xiumin EXO",
                    "Suho EXO",
                    "Lay EXO",
                    "Baekhyun EXO",
                    "Chen EXO",
                    "Chanyeol EXO",
                    "D.O. EXO",
                    "Kai EXO",
                    "Sehun EXO",
                    "Luhan EXO",
                    "Kris EXO",
                    "Tao EXO",
                    
                    "Onew SHINee",
                    "Key SHINee",
                    "Minho SHINee",
                    "Taemin SHINee",
                    
                    "Yubin Wonder Girls",
                    "Yeeun Wonder Girls",
                    "Sunye Wonder Girls",
                    "Sunmi Wonder Girls",
                    "Hyuna Wonder Girls",
                    "Sohee Wonder Girls",
                    "Hyerim Wonder Girls",
                    
                    "Mark GOT7",
                    "JB GOT7",
                    "Jackson GOT7",
                    "Jinyoung GOT7",
                    "Youngjae GOT7",
                    "BamBam GOT7",
                    "Yugyeom GOT7"
    ];
});
