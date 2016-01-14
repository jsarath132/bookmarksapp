var bookmarksListController = function($scope, $state, bookmarksFactory){
	$scope.searchbookmarks1 = true;
	$scope.bookmarksList = [];
	$scope.getAllBookmarks = function() {
		$scope.dataLoadingCompleted = false;
		bookmarksFactory.getbookmarks().then(function(results){
			$scope.bookmarksList = results.data;
		}).finally(function() {
			$scope.dataLoadingCompleted = true;
		});
	};
	$scope.searchBookmarks = function() {
		$scope.dataLoadingCompleted = false;
		bookmarksFactory.searchbookmarks($scope.searchText).then(function(results) {
			$scope.bookmarksList = results.data;
		}).finally(function() {
			$scope.dataLoadingCompleted = true;
		});
	};
	$scope.deleteBookmark = function(bookmarkId) {
		bookmarksFactory.deletebookmark(bookmarkId).then(function(results) {
			if(typeof results.data[0].status !== 'undefined' )
				$state.go($state.current, {}, {reload: true});//$state.go('home');
		});
	};
	$scope.getAllBookmarks();
	$scope.toggle = function($index) {
		var element = $("#folder"+$index).next('ul');
		setTimeout(function() {
			if(element.hasClass("hide")) {
				element.removeClass("hide");
				element.prev().addClass('toggled');
				
			} else {
				element.addClass("hide");
				element.prev().removeClass('toggled');
			}
		},5);
		
	};
};