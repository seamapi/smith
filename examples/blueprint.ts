import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import layouts from '@metalsmith/layouts'
import * as types from '@seamapi/types/connect'
import type { Builder, Command, Describe, Handler } from 'landlubber'
import Metalsmith from 'metalsmith'
import { mkdirp } from 'mkdirp'

import {
  blueprint,
  getHandlebarsPartials,
  handlebarsHelpers,
} from '@seamapi/smith'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Options {}

export const command: Command = 'blueprint'

export const describe: Describe = 'Generate content from blueprint'

export const builder: Builder = {
  root: {
    type: 'string',
    default: 'test/fixtures/handlebars/partials',
    describe: 'TODO',
  },
}

export const handler: Handler<Options> = async ({ logger }) => {
  const rootDir = dirname(fileURLToPath(import.meta.url))

  await mkdirp('tmp')
  await writeFile(join('tmp', 'README.md'), Buffer.from(''))

  const partials = await getHandlebarsPartials('examples/layouts/partials')

  logger.info('Generating from blueprint')

  Metalsmith(rootDir)
    .source('../tmp')
    .destination('../tmp/dist')
    .clean(true)
    .use(blueprint({ types }))
    .use(
      layouts({
        default: 'default.hbs',
        engineOptions: {
          noEscape: true,
          helpers: handlebarsHelpers,
          partials,
        },
      }),
    )
    .use((files: Metalsmith.Files, metalsmith: Metalsmith): void => {
      files['metadata.json'] = {
        contents: Buffer.from(JSON.stringify(metalsmith.metadata())),
        layout: 'default.hbs',
      }
    })
    .build((err) => {
      if (err != null) throw err
    })
}
