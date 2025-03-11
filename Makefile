.PHONY: install check fix

install: node_modules bun.lock

node_modules: package.json
	bun i --frozen-lockfile

bun.lock: package.json
	bun update

check: install
	bun check

fix: install
	bun fix

.PHONY: npm jsr build dist

deno.lock: package.json deno.json
	deno install --allow-scripts

npm: check
	bun run build

jsr: deno.lock
	deno task build

build: npm jsr

dist: build
	deno task fix
	deno task check

.PHONY: test

IS_CI ?= $(CI)

TEST_CMD = test

PACKAGE_MANAGERS = npm bun deno
FOUND_PM = $(shell which $(firstword $(filter-out $(wildcard /usr/bin/false),$(foreach pm,$(PACKAGE_MANAGERS),$(shell which $(pm) || echo false)))) 2>/dev/null)

test: npm
ifeq ($(IS_CI),true)
	npm run $(TEST_CMD)
else
	@for pm in $(PACKAGE_MANAGERS); do \
		if command -v $$pm >/dev/null 2>&1; then \
			echo "Running tests with $$pm..."; \
			$$pm run $(TEST_CMD); \
		fi; \
	done; \
	echo "No package manager found!" && exit 1
endif

.PHONY: publish release

publish: dist test
	bunx pkg-pr-new publish

release: dist test
	bun release
