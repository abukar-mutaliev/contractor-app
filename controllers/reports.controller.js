const Report = require("../models/Report.model");

module.exports.reportControllers = {
  getReportsObject: async (req, res) => {
    const { id } = req.params
    try {
      const report = await Report.find({ object: id });
      res.json(report);
    } catch (e) {
      res.json(e);
    }
  },

  postReport: async (req, res) => {
    const { contractorName, report, status } = req.body;
    const { id } = req.params;

    if (report.length < 5) {
      return res.json({
        error:
          "Слишком короткий отчет. Количество символов не должно быть меньше 5",
      });
    }

    try {
      const reports = await Report.create({
        contractorName,
        report,
        status,
        object: id,
      });

      res.json(reports);
    } catch (e) {
      res.json(e);
    }
  },
  patchReport: async (req, res) => {
    try {
      const { id } = req.params;
      const { report, status } = req.body;
      const patchReport = await Report.findByIdAndUpdate(id, {
        report,
        status,
      }, { new: true });
      console.log(patchReport)
      res.json(patchReport);
    } catch (e) {
      res.json(e);
    }
  },
};
