const Object = require("../models/Object.model");

module.exports.objectController = {
  getObject: async (req, res) => {
    try {
      const allObjects = await Object.aggregate([
        {
          $lookup: {
            from: "reports",
            as: "reports",
            let: { object: "$_id" },
            pipeline: [{ $match: { $expr: { $eq: ["$object", "$$object"] } } }],
          },
        },
        {
          $lookup: {
            from: "reports",
            as: "lastReport",
            let: { object: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$object", "$$object"] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 1 },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            objectName: 1,
            pathToImage: 1,
            objectAddress: 1,
            objectDescription: 1,
            reports: 1,
            lastReport: 1,
          },
        },
        { $unwind: { path: "$lastReport", preserveNullAndEmptyArrays: true } },
      ]);
      res.json(allObjects);
    } catch (e) {
      res.json(e);
    }
  },

  postObject: async (req, res) => {
    const { objectName,
      objectAddress,
      objectDescription,
      pathToImage } = req.body;

    if (objectName.length < 0) {
      return res.json({
        error: "Слишком короткое название объекта",
      });
    }

    try {
      const newObject = await Object.create({
        objectName,
        objectAddress,
        objectDescription,
        pathToImage,
      });

      res.json(newObject);
    } catch (e) {
      res.json(e);
    }
  },
  deleteObject: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteObject = await Object.findByIdAndDelete({ _id: id });

      if (deleteObject) {
        res.json("Объект удален");

      } else {
        res.json('не удалось удалить')
      }
    } catch (e) {
      res.json(e);
    }
  },
};
