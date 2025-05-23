import type { Builder, Command, Describe, Handler } from 'landlubber'

import { getHandlebarsPartials } from '@seamapi/smith'

interface Options {
  root: string
}

export const command: Command = 'todo root'

export const describe: Describe = 'TODO'

export const builder: Builder = {
  root: {
    type: 'string',
    default: 'test/fixtures/handlebars/partials',
    describe: 'TODO',
  },
}

export const handler: Handler<Options> = async ({ root, logger }) => {
  logger.info({ data: getHandlebarsPartials(root) }, 'TODO')
}
