const TheoDoiMuonSach = require('../models/TheoDoiMuonSach')
const Sach = require('../models/Sach')
const ApiError = require('../api-error')

const dangKyMuonSach = async (docGiaId, sachList, ngayMuon) => {
  if (!Array.isArray(sachList) || sachList.length === 0) {
    throw new ApiError(400, 'Danh sách sách mượn không hợp lệ')
  }

  for (const item of sachList) {
    const sach = await Sach.findById(item.sachId)
    if (!sach) {
      throw new ApiError(404, `Không tìm thấy sách với ID: ${item.sachId}`)
    }
    if (sach.SOQUYEN < item.soLuong) {
      throw new ApiError(
        400,
        `Sách "${sach.TENSACH}" chỉ còn ${sach.SOQUYEN} quyển, không đủ số lượng yêu cầu`
      )
    }
  }

  const muonSachList = await Promise.all(
    sachList.map(async item => {
      return await new TheoDoiMuonSach({
        MADOCGIA: docGiaId,
        MASACH: item.sachId,
        SOQUYEN: item.soLuong,
        NGAYMUON: ngayMuon,
        TRANGTHAI: 'Chờ duyệt'
      }).save()
    })
  )

  return {
    message: 'Đăng ký mượn sách thành công, vui lòng chờ duyệt',
    muonSachList
  }
}

const duyetMuonSach = async id => {
  const muonSach = await TheoDoiMuonSach.findById(id)
  if (!muonSach) {
    throw new ApiError(404, 'Không tìm thấy yêu cầu mượn sách')
  }
  if (muonSach.TRANGTHAI !== 'Chờ duyệt') {
    throw new ApiError(400, 'Yêu cầu này không thể duyệt')
  }

  const sach = await Sach.findById(muonSach.MASACH)
  if (!sach) {
    throw new ApiError(404, 'Không tìm thấy sách')
  }
  if (sach.SOQUYEN < muonSach.SOQUYEN) {
    throw new ApiError(400, `Sách "${sach.TENSACH}" không đủ số lượng để duyệt`)
  }

  sach.SOQUYEN -= muonSach.SOQUYEN
  await sach.save()

  muonSach.NGAYMUON = new Date()
  muonSach.TRANGTHAI = 'Đang mượn'
  await muonSach.save()

  return { message: 'Đã duyệt yêu cầu mượn sách', muonSach }
}

const xacNhanTraSach = async id => {
  const muonSach = await TheoDoiMuonSach.findById(id)
  if (!muonSach) {
    throw new ApiError(404, 'Không tìm thấy yêu cầu mượn sách')
  }
  if (muonSach.TRANGTHAI !== 'Đang mượn') {
    throw new ApiError(400, 'Không thể xác nhận trả sách')
  }

  const sach = await Sach.findById(muonSach.MASACH)
  if (sach) {
    sach.SOQUYEN += muonSach.SOQUYEN
    await sach.save()
  }

  muonSach.TRANGTHAI = 'Đã trả'
  muonSach.NGAYTRA = new Date()
  await muonSach.save()
  await muonSach.save()

  return { message: 'Xác nhận trả sách thành công', muonSach }
}

module.exports = {
  dangKyMuonSach,
  duyetMuonSach,
  xacNhanTraSach
}
