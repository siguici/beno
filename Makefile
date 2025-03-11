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

test: dist
	bun run test

publish: test
	bunx pkg-pr-new publish

release: test
	bun release
