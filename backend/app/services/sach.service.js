const fs = require('fs')
const path = require('path')
const Sach = require('../models/Sach')
const NhaXuatBan = require('../models/NhaXuatBan')
const ApiError = require('../api-error')

const getAllSach = async () => {
  const sachs = await Sach.find().populate('MANXB')
  // if (!sachs || sachs.length === 0) {
  //   throw new ApiError(404, 'Không tìm thấy sách nào')
  // }
  return sachs
}

const getSachById = async id => {
  const sach = await Sach.findById(id).populate('MANXB')
  if (!sach) {
    throw new ApiError(404, 'Không tìm thấy sách')
  }
  return sach
}

const createSach = async data => {
  if (!data || !data.TENSACH) {
    throw new ApiError(400, 'Dữ liệu không hợp lệ')
  }

  if (!data.MASACH) {

    const lastSach = await Sach.findOne()
      .sort({ MASACH: -1 })
      .collation({ locale: 'en', numericOrdering: true })

    let newMASACH = 'MS001'
    if (lastSach && lastSach.MASACH) {
      let lastNumber = parseInt(lastSach.MASACH.replace('MS', ''), 10)
      newMASACH = `MS${String(lastNumber + 1).padStart(3, '0')}`
    }

    data.MASACH = newMASACH
  }

  if (data.MANXB) {
    const publisher = await NhaXuatBan.findById(data.MANXB)
    if (!publisher) {
      throw new ApiError(400, 'Nhà xuất bản không tồn tại!')
    }
  }

  try {
    const newSach = new Sach(data)
    return await newSach.save()
  } catch (error) {
    console.error('Lỗi khi tạo sách:', error)

    if (data.HINHANH) {
      try {
        await fs.promises.unlink(data.HINHANH)
      } catch (err) {
        console.error('Lỗi khi xóa ảnh:', err)
      }
    }

    if (error.code === 11000) {
      throw new ApiError(400, 'Mã sách đã tồn tại!')
    }

    throw new ApiError(400, 'Dữ liệu sách không hợp lệ!')
  }
}

const updateSach = async (id, data) => {
  const sach = await Sach.findById(id)
  if (!sach) {
    throw new ApiError(404, 'Không tìm thấy sách để cập nhật')
  }

  if (data.HINHANH && sach.HINHANH) {
    const oldImagePath = path.join(__dirname, '..', sach.HINHANH)
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath)
    }
  }

  const updatedSach = await Sach.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })

  return { message: 'Cập nhật sách thành công', updatedSach }
}

const deleteSach = async id => {
  const sach = await Sach.findById(id)
  if (!sach) {
    throw new ApiError(404, 'Không tìm thấy sách để xóa')
  }

  if (sach.HINHANH) {
    
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      sach.HINHANH.replace(/^\/+/, '')
    )

    try {
      await fs.promises.access(imagePath, fs.constants.F_OK)
      await fs.promises.unlink(imagePath)
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(
          `Ảnh không tồn tại (Có thể đã bị xóa từ trước hoặc đường dẫn sai)`
        )
      } else {
        console.error(`Lỗi khi xóa ảnh:`, err)
      }
    }
  } else {
    console.log('Sách không có ảnh')
  }

  await Sach.findByIdAndDelete(id)
  return { message: 'Xóa sách thành công', deletedSach: sach }
}

module.exports = {
  getAllSach,
  getSachById,
  createSach,
  updateSach,
  deleteSach
}
