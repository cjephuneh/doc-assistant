const { cloneRepo, readFilesRecursively } = require('./helpers');
const { analyzeFiles } = require('./generateDocs');
const path = require('path');
const fs = require('fs');

const repoUrl = 'https://github.com/user/repository.git'; // Replace with actual repo URL
const localPath = path.join(__dirname, 'repo');

const generateDocumentation = async () => {
  try {
    console.log('Cloning repository...');
    await cloneRepo(repoUrl, localPath);

    console.log('Reading files...');
    const files = readFilesRecursively(localPath);

    console.log('Generating documentation...');
    const docContent = await analyzeFiles(files);

    fs.writeFileSync(path.join(__dirname, 'DOCUMENTATION.md'), docContent);
    console.log('Documentation generated successfully!');
  } catch (error) {
    console.error('Error generating documentation:', error);
  }
};

generateDocumentation();
