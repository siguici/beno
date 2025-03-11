.PHONY: install check fix build

install: node_modules bun.lock deno.lock

node_modules: package.json
	bun i --frozen-lockfile
	deno install --allow-scripts

bun.lock: package.json
	bun update

deno.lock: package.json deno.json
	deno install --allow-scripts

check: install
	bun check

fix: install
	bun fix

build: check
	bun run build

.PHONY: jsr npm dist publish release

jsr: build

npm: jsr
	deno task build

dist: jsr npm
	deno task fix
	deno task check

.PHONY: test

IS_CI ?= $(CI)

TEST_CMD = test

PACKAGE_MANAGERS = npm bun deno
FOUND_PM = $(shell which $(firstword $(filter-out $(wildcard /usr/bin/false),$(foreach pm,$(PACKAGE_MANAGERS),$(shell which $(pm) || echo false)))) 2>/dev/null)

test: dist
ifeq ($(IS_CI),true)
	bun run $(TEST_CMD)
else
	@for pm in $(PACKAGE_MANAGERS); do \
		if command -v $$pm >/dev/null 2>&1; then \
			echo "Running tests with $$pm..."; \
			$$pm run $(TEST_CMD); \
		fi; \
	done; \
	echo "No package manager found!" && exit 1
endif

publish: test
	bunx pkg-pr-new publish

release: test
	bun release
