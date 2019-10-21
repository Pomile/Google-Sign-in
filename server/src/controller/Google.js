class Google {
  static async signIn(req, res) {
    return res.status(200).json({ user: req.user });
  }
}

export default Google;
