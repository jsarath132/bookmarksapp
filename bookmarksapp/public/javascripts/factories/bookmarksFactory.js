
var bookmarksFactory = function($http) {
	return {
		getbookmarks: function() {
			return $http.get('/bookmarks',[]);
		},
		addbookmark: function(bookmark) {
			return $http.post('/bookmarks',bookmark, []);
		},
		editbookmark: function(bookmark) {
			return $http.put('/bookmarks/'+(bookmark.children[0]._id), bookmark, []);
		},
		deletebookmark: function(bookmarkId) {
			return $http.delete('/bookmarks/'+(bookmarkId), bookmarkId, []);
		},
		searchbookmarks: function(query) {
			return $http.get('/bookmarks/search/'+query);
		},
		getbookmark: function(bookmarkId) {
			return $http.get('/bookmarks/'+bookmarkId,[]);
		}
	};
};