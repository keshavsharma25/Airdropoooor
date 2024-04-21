import * as fs from "fs";
import prettier from "prettier";

const abiNames: string[] = ["Account", "Maintainer", "Airdropoooor"];
const targetDir = "../../nextjs/contracts";

export const main = async () => {
  const initialState: Record<string, any> = {};
  abiNames.forEach(abiName => {
    const targetFile = `../artifacts/contracts/${abiName}.sol/${abiName}.json`;
    const fileContent = fs.readFileSync(targetFile, "utf8");
    const parsedContent = JSON.parse(fileContent);
    initialState[parsedContent["contractName"]] = { name: parsedContent.contractName, abi: parsedContent.abi };
  });
  try {
    fs.accessSync(`${targetDir}/externalAbi.ts`);
    console.log("already exist updating...");
  } catch (err) {
    fs.writeFileSync(`${targetDir}/externalAbi.ts`, "");
  }

  let content = "export const externalAbi = ";
  content += JSON.stringify(initialState);
  content += " as const;";

  fs.writeFileSync(
    `${targetDir}/externalAbi.ts`,
    prettier.format(content, {
      parser: "typescript",
    }),
    "utf8",
  );
};

main();
