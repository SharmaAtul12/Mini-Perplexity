import getResponses from "./helper.js";

async function init(query) {
  const response = await getResponses(query);
  process.stdout.write("Final Response ---------------------------------------------- : " + response);
}

init('What is Array in JavaScript ?')