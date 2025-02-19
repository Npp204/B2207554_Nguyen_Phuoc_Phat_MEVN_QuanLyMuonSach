const docGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");

exports.getAllDocGia = async (req, res, next) => {
  try {
    const docGias = await docGiaService.getAllDocGia();
    res.status(200).json(docGias);
  } catch (error) {
    next(error);
  }
};

exports.getDocGiaById = async (req, res, next) => {
  try {
    const docGia = await docGiaService.getDocGiaById(req.params.id);
    res.status(200).json(docGia);
  } catch (error) {
    next(error);
  }
};

exports.createDocGia = async (req, res, next) => {
  try {
    const newDocGia = await docGiaService.createDocGia(req.body);
    res.status(201).json(newDocGia);
  } catch (error) {
    next(error);
  }
};

exports.updateDocGia = async (req, res, next) => {
  try {
    const updatedDocGia = await docGiaService.updateDocGia(req.params.id, req.body);
    res.status(200).json(updatedDocGia);
  } catch (error) {
    next(error);
  }
};

exports.deleteDocGia = async (req, res, next) => {
  try {
    await docGiaService.deleteDocGia(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
