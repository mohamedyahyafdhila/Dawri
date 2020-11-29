exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.proUserBoard = (req, res) => {
  res.status(200).send("proUser Content.");
};

