'use strict';

describe('toUrl', function() {

  describe('when running behind a reverse-proxy', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'https://my-reverse-proxy.com.au/context/myStuff/#/home';
        }
      });
    }));

    it('should convert a given path to a path that includes the full context', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/context/myStuff/api/myservice');
    }));
  });

  describe('when hitting the reverse-proxy directly', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'http://my-server:8080/myStuff/#/home';
        }
      });
    }));

    it('should convert a given path to a path that includes the myStuff app context', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/myStuff/api/myservice');
    }));
  });

  describe('when in a local or other direct environment', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'http://localhost:8080/#/home';
        }
      });
    }));

    it('should leave the given path as is', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/api/myservice');
    }));
  });

  describe('when a local url has no hash', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'http://localhost:8080/';
        }
      });
    }));

    it('should leave the given path as is', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/api/myservice');
    }));
  });

  describe('when a local url has no path after the hash', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'http://localhost:8080/#';
        }
      });
    }));

    it('should leave the given path as is', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/api/myservice');
    }));
  });

  describe('when a local url has only the root after the hash', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'http://localhost:8080/#/';
        }
      });
    }));

    it('should leave the given path as is', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/api/myservice');
    }));
  });

  describe('when any other environment url has no hash', function() {
    beforeEach(module('myStuff', function($provide) {
      $provide.value('$location', {
        absUrl: function() {
          return 'https://my-reverse-proxy.com.au/context/myStuff/';
        }
      });
    }));

    it('should assume everything from the host name to the final slash is the context', inject(function(toUrl) {
      expect(toUrl('/api/myservice')).toEqual('/context/myStuff/api/myservice');
    }));
  });
});
