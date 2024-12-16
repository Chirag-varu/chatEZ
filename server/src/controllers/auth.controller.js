export const signup = (req, res) => {
    const { name, email, password } = req.body;
  try {
    
  } catch (err) {}
};

export const login = (req, res) => {
  res.send("log-in route");
};

export const logout = (req, res) => {
  res.send("log-out route");
};
