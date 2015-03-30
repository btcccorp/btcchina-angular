describe('Auth module test', function() {
    var user = {username: 'tsq', password: 'kkk'};
    beforeEach(module('btcchina'));
    var Auth_LoginService;
    var $scope, MainCtrl;
    beforeEach(inject(function(_Auth_LoginService_, _$controller_, _$rootScope_, _$httpBackend_) {
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $httpBackend.when('POST', 'http://dev.btcchina.com/api.php/account/authenticate')
          .respond({JsonWebToken: 'token'});
        MainCtrl = _$controller_('MainCtrl', {$scope: $scope});
        $httpBackend.flush();
        Auth_LoginService = _Auth_LoginService_;
    }));
    it('MainCtrl', function() {
        expect($scope.data).toEqual({JsonWebToken: 'token'});
    });
    it('Auth_LoginService', function() {
        var obj = Auth_LoginService.login(user);
        expect(obj.success).not.toBe(null);
        expect(obj.success).not.toBe(null);
    });
});

describe('PasswordController', function () {
    beforeEach(module('btcchina'));
    var $controller;
    // we can use `inject` to access $controller, the service that is responsible for instantiating controllers
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));
    describe('$scope.grade', function() {
        var $scope, controller;
        beforeEach(function () {
            $scope = {};
            controller = $controller('PasswordController', {$scope: $scope});
        });
        it('sets the strength to strong if the password len is >8 chars', function() {
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });
        it('set the strength to weak if the password length <3 chars', function() {
            $scope.password = 'a';
            $scope.grade();
            expect($scope.strength).toEqual('weak');
        });
    });

});
describe('length filter', function() {
    beforeEach(module('btcchina'));
    var $filter;
    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));
    it('returns 0 when given null', function() {
        var length = $filter('length');
        expect(length(null)).toEqual(0);
    });
    it('returns the correct value when given a string of chars', function() {
        var length = $filter('length');
        expect(length('abc')).toEqual(3);
    });
});

describe('Unit testing great quotes', function() {
    var $compile, $rootScope;
    beforeEach(module('btcchina'));
    // store reference to $rootScope and $compile so they are available to all
    // tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    it('Replaces the ele with the appropritate content', function() {
        // Compile a piece of HTMl containing the directive
        var element = $compile('<a-great-eye></a-great-eye>')($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('lidless, wreathed in flame, 2 times');
    });
});