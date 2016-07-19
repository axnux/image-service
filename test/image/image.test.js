'use strict'

var fs = require('fs')
var image = require('./../../src/image/image')
// var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect
// chai.use(require('sinon-chai'))

describe('Image service', function () {
  var file = './test/fixtures/dummy.png'

  describe('resize image', function () {
    var path = './test/fixtures/output/dummy-resized.png'

    beforeEach(function (done) {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }
      done()
    })

    it('should be up to 50x50', function (done) {
      // resize img up to 50 x 50
      image.resize(file, 'up_to', 50, 50, path, function () {
        expect(fs.existsSync(path)).to.be.true
        image.read(path, function (width, height) {
          expect(width).to.be.equal(50)
          expect(height).to.be.equal(45)
          done()
        })
      })
    })

    it('should be at least 50x50', function (done) {
      // resize img at least 50 x 50
      image.resize(file, 'at_least', 50, 50, path, function () {
        expect(fs.existsSync(path)).to.be.true
        image.read(path, function (width, height) {
          expect(width).to.be.equal(56)
          expect(height).to.be.equal(50)
          done()
        })
      })
    })
  })

  describe('crop image', function () {
    var path = './test/fixtures/output/dummy-cropped.png'

    beforeEach(function (done) {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }
      done()
    })

    it('should be 10x12', function (done) {
      // crop image of width, height at coordinate x, y
      image.crop(file, 10, 12, 2, 3, path, function () {
        expect(fs.existsSync(path)).to.be.true
        image.read(path, function (width, height) {
          expect(width).to.be.equal(10)
          expect(height).to.be.equal(12)
          done()
        })
      })
    })
  })

  describe('create thumbnail', function () {
    var path = './test/fixtures/output/dummy-thumbnail.png'

    beforeEach(function (done) {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }
      done()
    })

    it('should be able to create thumbnail with aspect ratio fill', function (done) {
      // make thumbnail of size 50 x 50 while maintaining the aspect ratio
      image.thumbnail(file, 'aspect_ratio_fill', 50, 50, path, function () {
        expect(fs.existsSync(path)).to.be.true
        image.read(path, function (width, height) {
          expect(width).to.be.equal(50)
          expect(height).to.be.equal(50)
          done()
        })
      })
    })

    it('should be able to create thumbnail with aspect ratio fit', function (done) {
      // make thumbnail of size 50 x 50 while maintaining the aspect ratio
      // padding with transparent pixel
      image.thumbnail(file, 'aspect_ratio_fit', 50, 50, path, function () {
        expect(fs.existsSync(path)).to.be.true
        image.read(path, function (width, height) {
          expect(width).to.be.equal(50)
          expect(height).to.be.equal(50)
          done()
        })
      })
    })
  })

  describe('create gif', function () {
    var gifFile = './test/fixtures/output/dummy.gif'

    beforeEach(function (done) {
      if (fs.existsSync(gifFile)) {
        fs.unlinkSync(gifFile)
      }
      done()
    })

    it('should be able to create from multiple images', function (done) {
      var images = ['./test/fixtures/dummy.png', './test/fixtures/dummy2.png', './test/fixtures/dummy3.png']
      // every 100 ms
      image.makeGif(images, gifFile, 100, function () {
        expect(fs.existsSync(gifFile)).to.be.true
        done()
      })
    })
  })

  describe('extract frames', function () {
    //
    beforeEach(function (done) {
      var gifFileToBeDeleted1 = './test/fixtures/output/dummy_01.png'
      var gifFileToBeDeleted2 = './test/fixtures/output/dummy_02.png'
      var gifFileToBeDeleted3 = './test/fixtures/output/dummy_03.png'
      if (fs.existsSync(gifFileToBeDeleted1)) {
        fs.unlinkSync(gifFileToBeDeleted1)
      }
      if (fs.existsSync(gifFileToBeDeleted2)) {
        fs.unlinkSync(gifFileToBeDeleted2)
      }
      if (fs.existsSync(gifFileToBeDeleted3)) {
        fs.unlinkSync(gifFileToBeDeleted3)
      }
      done()
    })

    it('should be able to create images from a gif', function (done) {
      var gifFile = './test/fixtures/dummy.gif'
      var imagePattern = './test/fixtures/output/dummy_%02d.png'
      image.splitGif(gifFile, imagePattern, function () {
        done()
      })
    })
  })
  // it('should be able to combine four images into a mosaic tile')
})
