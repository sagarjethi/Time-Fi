const assert = require('assert')
const wasm = require('..')

// TODO: Create env that mocks XRPL and pass these in as external functions.

// For now just check to see if these exist.
assert(wasm.runGuard, true)
assert(wasm.traceString, true)

console.log(
  'TODO: Work out the best way to test these functions. Feel free to submit a PR. 😉'
)
