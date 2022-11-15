import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import tsPlugin from "rollup-plugin-typescript2";

const packageJson = require("./package.json");

export default [
  {
    input: "src/LineWrappingInput.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "default",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      tsPlugin({
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
];
