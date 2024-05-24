require('dotenv').config();
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const { OpenAIApi, Configuration } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const cloneRepo = async (repoUrl, localPath) => {
  const git = simpleGit();
  await git.clone(repoUrl, localPath);
};

const readFilesRecursively = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      readFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
};

const generateDocumentation = async (fileContent) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate detailed documentation for the following code:\n\n${fileContent}\n\nThe documentation should include an overview, setup instructions, usage examples, and any important notes.`,
    max_tokens: 1000,
  });

  return response.data.choices[0].text.trim();
};

module.exports = {
  cloneRepo,
  readFilesRecursively,
  generateDocumentation,
};
