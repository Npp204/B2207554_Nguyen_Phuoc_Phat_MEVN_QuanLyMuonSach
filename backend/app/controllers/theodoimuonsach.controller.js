const theoDoiService = require('../services/theodoimuonsach.service');
const ApiError = require('../api-error');

exports.getAllRecords = async (req, res, next) => {
  try {
    const records = await theoDoiService.getAllRecords();
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};

exports.getRecordById = async (req, res, next) => {
  try {
    const record = await theoDoiService.getRecordById(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    const newRecord = await theoDoiService.createRecord(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const updatedRecord = await theoDoiService.updateStatus(req.params.id, req.body);
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const deletedRecord = await theoDoiService.deleteRecord(req.params.id);
    res.status(200).json({ message: "Đã xóa lịch sử mượn thành công", deletedRecord });
  } catch (error) {
    next(error);
  }
};
