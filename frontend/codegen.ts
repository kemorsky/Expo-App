import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["app/**/*.{ts,tsx}", "api/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
  generates: {
      "./__generated__/": {
      preset: "client",
      presetConfig: {
          gqlTagName: "gql",
          },
    },
  },
  ignoreNoDocuments: true,
};

export default config;