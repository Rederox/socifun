
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://gd-website-api.gamedistribution.com/graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "generated.tsx": {
      
      plugins: ["typescript",
      "typescript-operations",
      "typescript-react-apollo"]
    }
  }
};

export default config;
