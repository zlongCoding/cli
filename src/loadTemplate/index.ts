import * as fs from "fs";
import { execInquirer, execProjectWrite } from "./inquirerScript";
import { downloadTemplate } from "./getTemplate";
import { url } from "./constance";
let newProjectName: string = "";
import program from "commander";

import chalk from "chalk";

async function selectOptions() {
  const data = await execInquirer();
  const descData = await execProjectWrite();
  downloadTemplate(url[data.name], newProjectName, descData);
}
function initFile() {
  if (!fs.existsSync(newProjectName)) {
    selectOptions();
  } else {
    console.log(chalk.red("项目已存在"));
  }
}
program
  .version("1.0.0", "-v, --version")
  .command("init <name>")
  .action((name: string) => {
    newProjectName = name;
    initFile();
  });

program.parse(process.argv);
