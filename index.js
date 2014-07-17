angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
            url: "/home",
            templateUrl: "templates/home.html"
          })
    .state('about', {
            url: "/about"
            , templateUrl: "templates/about.html"
          })
    .state('list', {
            url: "/list"
            , templateUrl: "templates/list.html"
            , controller: 'ListCtrl'
          })
    .state('view', {
            url: "/view/:pid"
            , templateUrl: "templates/view.html"
            , controller: 'ViewCtrl'
          })
    ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
})

.directive('obVscroll', function ($timeout) {
  return {
    replace: false,
    restrict: 'A',
    link: function (scope, element, attr) {
      var __wrapper = element[0],
          __$el = $(__wrapper),
          __$elChildCount = __$el.children().size();
      
      if(__$elChildCount > 1) {
        console.log('obVscroll, moveEl');
        var __child = $(document.createElement('div'));
        //__wrapper.prepend(__child);
        
        __$el.children().each(function () {
          $(this).detach().appendTo(__child);
        });
        __$el.prepend(__child);
      }
      
      var myScroll = new IScroll(__wrapper);
      $timeout(function() {myScroll.refresh();}, 0)
      
      //console.log('directive', __$el.height());
    }
  };
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
.controller('ListCtrl', function($scope) {
  $scope.items = [
    { 'label': 'labelA', 'link': 'aaa' },
    { 'label': 'labelB', 'link': 'bbb' }
  ];
})
.controller('ViewCtrl', function($scope, $stateParams, $timeout, $ionicSlideBoxDelegate) {
  var _slideBoxHandler = $ionicSlideBoxDelegate.$getByHandle('ViewCtrlNS');
  $scope.NAMESPACE = 'ViewCtrlNS';
  
  $scope.pid = $stateParams.pid;
  
  $scope.onSlideChanged = function(slideIndex) {
    // console.log(slideIndex);
  }
  $scope.sbCurrentIndex = function() { return _slideBoxHandler.currentIndex(); };
  $scope.sbGoPrev = function() { _slideBoxHandler.previous(); };
  $scope.sbGoNext = function() { _slideBoxHandler.next(); };
})
;
