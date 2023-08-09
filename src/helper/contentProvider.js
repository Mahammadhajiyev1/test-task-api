const { readFileSync } = require("fs");

const contentProvider = () => {
  const filePath = process.env.FILE_PATH || "./dump.txt";

  console.log(filePath);

  const content = readFileSync(filePath, {
    encoding: "utf8",
  });

  return content;
};

module.exports = contentProvider;
