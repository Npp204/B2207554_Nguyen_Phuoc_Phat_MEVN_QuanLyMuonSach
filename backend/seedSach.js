const mongoose = require('mongoose')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const { faker } = require('@faker-js/faker')

const Sach = require('./app/models/Sach')
const NhaXuatBan = require('./app/models/NhaXuatBan')

mongoose.connect('mongodb://localhost:27017/quanlymuonsach')

const uploadDir = path.join(__dirname, 'uploads/sach')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const dest = fs.createWriteStream(filename)
    return new Promise((resolve, reject) => {
      response.body.pipe(dest)
      response.body.on('error', reject)
      dest.on('finish', resolve)
    })
  } catch (error) {
    console.error('Lỗi tải ảnh:', error)
    return null
  }
}

async function seedNhaXuatBan() {
  const nxbList = [
    { MANXB: 'NXB001', TENNXB: 'NXB Kim Đồng', DIACHI: 'Hà Nội' },
    { MANXB: 'NXB002', TENNXB: 'NXB Trẻ', DIACHI: 'TP. Hồ Chí Minh' },
    { MANXB: 'NXB003', TENNXB: 'NXB Giáo Dục Việt Nam', DIACHI: 'Đà Nẵng' },
    { MANXB: 'NXB004', TENNXB: 'NXB Hà Nội', DIACHI: 'Hà Nội' },
    { MANXB: 'NXB005', TENNXB: 'NXB Đại học Cần Thơ', DIACHI: 'Cần Thơ' },
    { MANXB: 'NXB006', TENNXB: 'NXB Lao Động', DIACHI: 'Hà Nội' },
    { MANXB: 'NXB007', TENNXB: 'NXB Hội Nhà văn', DIACHI: 'Hà Nội' }
  ]

  await NhaXuatBan.deleteMany({})
  const insertedNXB = await NhaXuatBan.insertMany(nxbList)
  console.log('Đã thêm Nhà Xuất Bản vào MongoDB!')
  return insertedNXB
}

async function fetchBooks(nxbMap) {
  try {
    const response = await fetch(
      'https://openlibrary.org/search.json?q=programming&limit=50'
    )
    const data = await response.json()

    const books = []
    const count = await Sach.countDocuments()
    let counter = count + 1

    for (let book of data.docs) {
      if (!book.cover_i) {
        console.log(`Không có ảnh: ${book.title}`)
        continue 
      }
      const MASACH = `MS${counter.toString().padStart(3, '0')}`
      counter++
      const TENSACH = book.title
      const DONGIA = faker.number.int({ min: 10, max: 500 }) * 1000
      const SOQUYEN = faker.number.int({ min: 1, max: 10 })
      const NAMXUATBAN =
        book.first_publish_year || faker.number.int({ min: 1950, max: 2024 })
      const NGUONGOC_TACGIA = book.author_name
        ? book.author_name[0]
        : 'Không rõ'

      const randomNXB = nxbMap[Math.floor(Math.random() * nxbMap.length)]
      const MANXB = randomNXB._id

      let HINHANH = ''
      if (book.cover_i) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        const coverFilename = path.join(uploadDir, `${book.cover_i}.jpg`)
        await downloadImage(coverUrl, coverFilename)
        HINHANH = `/uploads/sach/${book.cover_i}.jpg`
      }

      books.push({
        MASACH,
        TENSACH,
        DONGIA,
        SOQUYEN,
        NAMXUATBAN,
        NGUONGOC_TACGIA,
        MANXB,
        HINHANH
      })
    }

    await Sach.insertMany(books)
    console.log('Đã tải ảnh và thêm 48 sách vào MongoDB!')
  } catch (error) {
    console.error('Lỗi lấy sách:', error)
  } finally {
    mongoose.connection.close()
  }
}

async function seedDatabase() {
  const insertedNXB = await seedNhaXuatBan()
  await Sach.deleteMany({})
  console.log('Đã xóa toàn bộ sách cũ trong MongoDB!')
  await fetchBooks(insertedNXB)
}

seedDatabase()
