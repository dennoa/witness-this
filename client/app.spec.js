'use strict';

function commonBeforeEach($httpBackend) {
  $httpBackend.expectGET('/auth/google/discoveryDocument').respond(200, {
    "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth"
  });
}

function commonAfterEach($httpBackend) {
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
}
