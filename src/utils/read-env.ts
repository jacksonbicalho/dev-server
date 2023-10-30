const ReadEnv = () => {
  // this is to load env vars for this config
  return require("dotenv").config({
    // it puts the content to the "process.env" var. System vars are taking precedence
    path: ".env",
  });
};

export default ReadEnv;
