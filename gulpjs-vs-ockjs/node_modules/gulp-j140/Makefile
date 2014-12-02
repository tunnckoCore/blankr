REPORTER = spec
NM = node_modules

clean:
	rm -rf coverage

install:
	npm install

lint:
	$(MAKE) install
	$(NM)/jshint/bin/jshint ./lib/*.js ./test/*.js

test:
	$(MAKE) lint
	$(NM)/mocha/bin/mocha \
		--reporter $(REPORTER)

cov:
	$(MAKE) lint
	$(NM)/.bin/istanbul cover \
	$(NM)/mocha/bin/_mocha -- --reporter $(REPORTER)

coveralls:
	$(MAKE) test
	$(NM)/.bin/istanbul cover \
	$(NM)/mocha/bin/_mocha --report lcovonly -- --reporter $(REPORTER) && \
		cat ./coverage/lcov.info | $(NM)/coveralls/bin/coveralls.js || true

.PHONY: test