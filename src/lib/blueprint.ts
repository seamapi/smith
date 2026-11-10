import {
  type BlueprintOptions,
  createBlueprint,
  TypesModuleSchema,
} from '@seamapi/blueprint'
import type Metalsmith from 'metalsmith'

export const blueprint =
  ({
    types,
    formatCode,
    skipCodeFormat = false,
    omitUndocumented = false,
    omitEndOfLife = false,
  }: {
    types: unknown
    formatCode?: BlueprintOptions['formatCode']
    skipCodeFormat?: boolean
    omitUndocumented?: boolean
    omitEndOfLife?: boolean
  }) =>
    async (_files: Metalsmith.Files, metalsmith: Metalsmith): Promise<void> => {
      const metadata = metalsmith.metadata()

      const codeSampleDefinitions =
        'codeSampleDefinitions' in metadata ? metadata.codeSampleDefinitions : []

      const resourceSampleDefinitions =
        'resourceSampleDefinitions' in metadata
          ? metadata.resourceSampleDefinitions
          : []

      const typesModule = TypesModuleSchema.parse({
        ...(typeof types === 'object' ? types : {}),
        codeSampleDefinitions,
        resourceSampleDefinitions,
      })

      const blueprint = await createBlueprint(typesModule, {
        omitUndocumented,
        omitEndOfLife,
        ...(skipCodeFormat || formatCode == null ? {} : { formatCode }),
      })
      Object.assign(metadata, { blueprint })
    }
