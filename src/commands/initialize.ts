import { text } from "@clack/prompts";
import { getPackageJson } from "../utility/config.js";
import { prompt } from "../utility/prompt.js";

export async function initialize() {
  const projectName = await prompt(text, {
    message: "Please enter the name of your project:",
    placeholder: (await getPackageJson()).name,
    defaultValue: (await getPackageJson()).name
  });

  console.log(projectName);
}
