const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const FILE_PATH = "./data.json";
const makeCommit = (val) => {
  if (val === 0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 64);
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = {
    date: DATE,
  };
  console.log("Date: ", data);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --val));
  });
};

makeCommit(600);
