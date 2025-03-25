const NhanVien = require('../models/NhanVien')
const DocGia = require('../models/DocGia')
const ApiError = require('../api-error')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const salt = bcrypt.genSaltSync(10)

const isValidPhoneNumber = sdt => {
  const regex = /^(09|03|05|07|08)[0-9]{8}$/
  return regex.test(sdt)
}

const loginNhanVien = async (sdt, password) => {
  if (!sdt || !password) {
    throw new ApiError(400, 'Số điện thoại và mật khẩu là bắt buộc')
  }

  if (!isValidPhoneNumber(sdt)) {
    throw new ApiError(400, 'Số điện thoại không hợp lệ')
  }

  const nhanVien = await NhanVien.findOne({ SODIENTHOAI: sdt })

  const isMatch = bcrypt.compareSync(password, nhanVien.PASSWORD)
  if (!isMatch) {
    throw new ApiError(401, 'Số điện thoại hoặc mật khẩu không chính xác')
  }

  const token = jwt.sign(
    { id: nhanVien._id, role: 'nhanvien' },
    config.jwt.secret,
    { expiresIn: '2h' }
  )

  return { role: 'nhanvien', user: nhanVien, token }
}

const loginDocGia = async (sdt, password) => {
  if (!sdt || !password) {
    throw new ApiError(400, 'Số điện thoại và mật khẩu là bắt buộc')
  }

  if (!isValidPhoneNumber(sdt)) {
    throw new ApiError(400, 'Số điện thoại không hợp lệ')
  }

  const docGia = await DocGia.findOne({ SODIENTHOAI: sdt })

  const isMatch = bcrypt.compareSync(password, docGia.PASSWORD)
  if (!isMatch) {
    throw new ApiError(401, 'Số điện thoại hoặc mật khẩu không chính xác')
  }

  try {
    const token = jwt.sign(
      { id: docGia._id, role: 'docgia' },
      config.jwt.secret,
      { expiresIn: '2h' }
    )

    return { role: 'docgia', user: docGia, token }
  } catch (error) {
    console.error('Lỗi khi tạo token:', error)
    throw new ApiError(500, 'Lỗi khi tạo token')
  }
}

const registerDocGia = async (sdt, password, confirmPassword) => {
  if (!sdt || !password || !confirmPassword) {
    throw new ApiError(
      400,
      'Số điện thoại, mật khẩu và xác nhận mật khẩu là bắt buộc'
    )
  }

  if (!isValidPhoneNumber(sdt)) {
    throw new ApiError(400, 'Số điện thoại không hợp lệ')
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, 'Mật khẩu xác nhận không khớp')
  }

  const existingDocGia = await DocGia.findOne({ SODIENTHOAI: sdt })

  if (existingDocGia) {
    throw new ApiError(400, 'Số điện thoại đã được đăng ký')
  }

  const lastDocGia = await DocGia.findOne()
    .sort({ MADOCGIA: -1 })
    .collation({ locale: 'en', numericOrdering: true })


  let newMADOCGIA = 'DG001'

  if (lastDocGia && lastDocGia.MADOCGIA) {
    let lastNumber = parseInt(lastDocGia.MADOCGIA.replace('DG', ''), 10)
    newMADOCGIA = `DG${String(lastNumber + 1).padStart(3, '0')}` // DG001, DG002, ...
  }

  const maDocGia = newMADOCGIA

  const hashedPassword = bcrypt.hashSync(password, salt)

  const newDocGia = new DocGia({
    MADOCGIA: maDocGia,
    TEN: 'Chưa cập nhật',
    SODIENTHOAI: sdt,
    PASSWORD: hashedPassword
  })

  await newDocGia.save()

  return {
    message: 'Đăng ký thành công',
    user: {
      MADOCGIA: newDocGia.MADOCGIA,
      TEN: newDocGia.TEN,
      SODIENTHOAI: newDocGia.SODIENTHOAI
    },
  };
};

const registerNhanVien = async (HOTENNV, SODIENTHOAI, PASSWORD, CHUCVU) => {
  if (!SODIENTHOAI || !PASSWORD) {
    throw new ApiError(400, 'Số điện thoại và mật khẩu là bắt buộc')
  }

  if (!isValidPhoneNumber(SODIENTHOAI)) {
    throw new ApiError(400, 'Số điện thoại không hợp lệ')
  }

  const existingNhanVien = await NhanVien.findOne({ SODIENTHOAI: SODIENTHOAI })

  if (existingNhanVien) {
    throw new ApiError(400, 'Số điện thoại đã được đăng ký')
  }

  const hashedPassword = bcrypt.hashSync(PASSWORD, salt)

  const lastNhanVien = await NhanVien.findOne()
    .sort({ MANV: -1 })
    .collation({ locale: 'en', numericOrdering: true })


  let newMaNhanVien = 'NV001'

  if (lastNhanVien && lastNhanVien.MANV) {
    let lastNumber = parseInt(lastNhanVien.MANV.replace('NV', ''), 10)
    newMaNhanVien = `NV${String(lastNumber + 1).padStart(3, '0')}` // NV001, NV002, ...
  }

  const maNhanVien = newMaNhanVien

  const newNhanVien = new NhanVien({
    MANV: maNhanVien,
    HOTENNV: HOTENNV,
    SODIENTHOAI: SODIENTHOAI,
    PASSWORD: hashedPassword,
    CHUCVU: CHUCVU
  })

  await newNhanVien.save()

  return {
    message: 'Đăng ký thành công',
    user: {
      MANV: newNhanVien.MANV,
      HOTENNV: newNhanVien.HOTENNV,
      SODIENTHOAI: newNhanVien.SODIENTHOAI,
      CHUCVU: newNhanVien.CHUCVU
    }
  }
}

module.exports = {
  loginNhanVien,
  loginDocGia,
  registerDocGia,
  registerNhanVien
}
