import User from "../models/User.js";

export const updatePreferences = async (req, res) => {
  try {
    const { favoriteDriver, favoriteTeam } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (favoriteDriver !== undefined) {
      user.favoriteDriver = favoriteDriver;
    }

    if (favoriteTeam !== undefined) {
      user.favoriteTeam = favoriteTeam;
    }

    await user.save();

    res.json({
      favoriteDriver: user.favoriteDriver,
      favoriteTeam: user.favoriteTeam,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update preferences" });
  }
};

export const getPreferences = async (req, res) => {
  res.json({
    favoriteDriver: req.user.favoriteDriver,
    favoriteTeam: req.user.favoriteTeam,
  });
};
