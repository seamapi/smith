import { join } from 'node:path'

import test from 'ava'

import { getHandlebarsPartials } from '@seamapi/smith'

test('getHandlebarsPartials: returns partials in diretory', async (t) => {
  const partials = await getHandlebarsPartials(
    join('test', 'fixtures', 'handlebars', 'partials'),
  )
  t.deepEqual(partials, { foo: '{{body}}', bar: '{{title}}' })
})
