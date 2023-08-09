const contentProvider = require("./contentProvider");

const parser = () => {
  const data = contentProvider();
  if (!data.length) return null;

  const root = {};
  const stack = [];
  const lines = data.split("\n");

  let prevIndentations = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    const isNextLineKey = nextLine?.includes("=") ? false : true;
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;
    const [key, value] = trimmedLine.split("=").map((item) => item.trim());

    const indendation = line.length - trimmedLine.length;

    let stackItem = stack[stack.length - 1];

    if (indendation < prevIndentations) {
      const popLevel = Math.abs((indendation - prevIndentations) / 2);

      for (let j = 0; j < popLevel; j++) {
        stackItem = stack.pop();
      }

      stackItem = stack[stack.length - 1];
    }

    prevIndentations = indendation;

    if (indendation === 0) {
      root[key] = isNextLineKey ? [] : {};
      stack.push(root[key]);
      continue;
    }

    if (key && value) {
      if (!stackItem) {
        root[key] = value;
      } else {
        stackItem[key] = value;
      }
      continue;
    }

    if (key && !value) {
      if (Array.isArray(stackItem)) {
        const arrayItem = {};

        if (nextLine.includes("=") ? true : false) {
          stackItem.push(arrayItem);
        }

        stack.push(arrayItem);
      } else {
        if (nextLine.includes("=") ? true : false) {
          stackItem[key] = {};

          stack.push(stackItem[key]);
        } else {
          stackItem[key] = [];

          stack.push(stackItem[key]);
        }
      }
    }
  }

  return root;
};

module.exports = parser;
