var inquirer = require('inquirer');
import { selectTemplate, projectDesc } from "./constance";

export function execInquirer():any {
  return new Promise<{name: string}>((reslove, reject) => {
    inquirer
      .prompt([
        {
          type: "checkbox",
          message: "选择是否生成模板:",
          name: "name",
          choices: selectTemplate,
          filter(val: string[]) {
            return selectTemplate.indexOf(val[0]);
          },
        },
      ])
      .then((res: {name: string}) => {
        reslove(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

export function execProjectWrite() {
  return new Promise<{description: string, author: string}>((reslove, reject) => {
    inquirer
      .prompt(projectDesc)
      .then((res:{description: string, author: string}) => {
        reslove(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

// exports = execInquirer
