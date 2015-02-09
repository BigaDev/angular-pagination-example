angular.module('phonebookFilters', []).filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
})
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});