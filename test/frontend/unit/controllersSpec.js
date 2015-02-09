describe("controller: PersonsListCtrl", function(){

	beforeEach(function(){
		module("phonebookControllers")
	});

	describe("Get Persons Data", function(){
		var scope, ctrl, $httpBackend;
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){   		
		
			$httpBackend = _$httpBackend_;
      		$httpBackend.expectGET('api/persons').
          		respond([
          			{name: 'ahmedgaber', phoneNumber: '123456'},
          		 	{name: 'mohamed', phoneNumber: '010101'},
          		 	{name: 'zizo', phoneNumber: '21212'},
          		 	{name: 'mido', phoneNumber: '283929'}
          		]);
      		scope = $rootScope.$new();
      		ctrl = $controller('PersonsListCtrl', {$scope: scope});
		}));

		it('should get "persons" model with 2 persons fetched from xhr', function() {
      		expect(scope.persons).toEqual([]);
      		$httpBackend.flush();

     		expect(scope.persons).
     			toEqual([
          			{name: 'ahmedgaber', phoneNumber: '123456'},
          		 	{name: 'mohamed', phoneNumber: '010101'},
          		 	{name: 'zizo', phoneNumber: '21212'},
          		 	{name: 'mido', phoneNumber: '283929'}
          		]);
    	});

    	it('should matchedPersons equal persons', function() {
      		$httpBackend.flush();
      		expect(scope.matchedPersons).toEqual(scope.persons);
    	});

    	it('should viewPersons equal half matchedPersons', function() {
      		scope.numOfPersons = 2;
      		$httpBackend.flush();
      		expect(scope.viewPersons).
      			toEqual([
          			{name: 'ahmedgaber', phoneNumber: '123456'},
          		 	{name: 'mohamed', phoneNumber: '010101'}
          		]);
    	});

    	it('should numOfPages equal 2', function() {
      		scope.numOfPersons = 2;
      		$httpBackend.flush();
      		expect(scope.numOfPages).toEqual(2);
    	});

	});

	describe("Add Person", function(){
		var $httpBackend;
		
		beforeEach(inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
		}));

		it('should save person successfully', function(){
			var data = {
				name : "ahmedgaber",
				phoneNumber : "111111111"
			};

      		$httpBackend.expectPOST('api/persons', data).respond(200, '');
		})

		it('should not save person with invalid data', function(){
			var data = {
				name : "ahmedgaber"
			};

      		$httpBackend.expectPOST('api/persons', data).respond(400, '');
		})
	});
});