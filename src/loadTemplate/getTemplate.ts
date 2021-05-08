import * as fs from 'fs'
import download from "download-git-repo";
const handlebars = require("handlebars")
import ora from "ora";
import chalk from "chalk";

export function downloadTemplate(url: string, name: string, answers:{description: string, author: string}) {
  const spinner = ora("正在下载模板...");
  spinner.start();
  download(`direct:${url}`, name, { clone: true }, (err: any) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(err));
    } else {
      spinner.succeed();
      const fileName = `${name}/package.json`;
      const meta = {
        name,
        description: answers.description,
        author: answers.author,
      };
      if (fs.existsSync(fileName)) {
        const content = fs.readFileSync(fileName).toString();
        const result = handlebars.compile(content)(meta);
        fs.writeFileSync(fileName, result);
      }
      console.log(chalk.green("项目初始化完成"));
    }
  });
}
