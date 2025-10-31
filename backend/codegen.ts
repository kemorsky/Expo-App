
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema.graphql",
  // documents: ["src/**/*/.{ts, tsx, graphql}"],
  generates: {
    "src/graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
         allowParentTypeOverride: true
       },
    }
  }
};

export default config;
