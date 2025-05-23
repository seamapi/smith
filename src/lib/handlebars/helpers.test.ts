import test from 'ava'

import { add, eq, or, toCapitalCase } from './helpers.js'

test('eq: compares arguments', (t) => {
  t.true(eq(1, 1))
  t.false(eq(1, 2))
})

test('or: compares arguments', (t) => {
  t.true(or(true, false))
  t.true(or(true, true))
  t.false(or(false, false))
})

test('add: adds arguments', (t) => {
  t.is(add(1, 2), 3)
})

test('toCapitalCase: capitalizes argument', (t) => {
  t.is(toCapitalCase('foo_bar'), 'Foo Bar')
})
