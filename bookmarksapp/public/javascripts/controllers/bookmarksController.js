var bookmarksController = function($scope, bookmarksFactory, $state, $stateParams){
	var getBookmark = function() {
		bookmarksFactory.getbookmark($stateParams.bookmarkId).then(function(result) {
			$scope.bookmark = result.data;
		});
	};
	$scope.submitbookmark = function() {
		if($state.$current.name !== 'editbookmark') {
			bookmarksFactory.addbookmark($scope.bookmark).then(function(result) {
				if(result.data) {
					$state.go('home');
				}
			});
		} else {
			bookmarksFactory.editbookmark($scope.bookmark).then(function(result) {
				if(result.data) {
					$state.go('home');
				}
			});
		}
	};
	$scope.cancelsave = function() {
		$state.go('home');
	};
	if($state.$current.name === 'editbookmark')
		getBookmark();
};