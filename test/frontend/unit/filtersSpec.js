'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('phonebookFilters'));


  describe('slice', function() {

    it('should slice array values',
        inject(function(sliceFilter) {
       		var a = ["foo", "bar", "baz", "bot"];
       		var b = ["foo", "bar"];
        	expect(sliceFilter(a, 0, 2)).toEqual(b);
    }));
  });

  describe('range', function() {
    it('should return array ',
        inject(function(rangeFilter) {
       		var a = 10;
        	expect(rangeFilter(a)).toBe(a);
    }));
  });

});
