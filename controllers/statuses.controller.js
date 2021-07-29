const Status = require("../models/Status.model");

module.exports.statusControllers = {
  getStatus: async (req, res) => {
    try {
      const status = await Status.find();
      res.json(status);
    } catch (e) {
      res.json(e);
    }
  },
  postStatus: async (req, res) => {
    try {
      const { status, color } = req.body;
      const statuses = new Status({
        status,
        color,
      });
      if (status.length < 0) {
        return res.json({
          error:
            "Слишком короткое название статуса",
        });
      }
      await statuses.save();
      res.json("Статус добавлен");
    } catch (e) {
      res.json(e);
    }
  },
};
