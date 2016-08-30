'use strict'

// var config = require('./../../config/default')
// var _ = require('lodash')
var gm = require('gm')
var storageHelper = require('storage-lib')

exports.read = function (sourceFile, done) {
  gm(sourceFile)
  .size(function (err, size) {
    if (err) {
      //
    }
    done(size.width, size.height)
  })
}

exports.thumbnail = function (sourceFile, flag, width, height, destinationFile, done) {
  var gmFile = gm(sourceFile)

  var completionBlock = function (err) {
    if (err) {
      //
    }
    done()
  }

  // aspect_ratio_fit
  if (flag === 'aspect_ratio_fit') {
    gmFile.resize(width, height)
      .gravity('Center')
      .background('transparent')
      .extent(width, height)
      .write(destinationFile, completionBlock)
    return
  }

  // aspect_ratio_fill
  gmFile.size(function (err, size) {
    if (err) {
      //
    }
    var chosenRatio = 1
    var wRatio = width / size.width
    var hRatio = height / size.height
    if (wRatio > hRatio) {
      chosenRatio = wRatio
    } else {
      chosenRatio = hRatio
    }
    var imageWithRightRatioSize = {
      width: chosenRatio * size.width,
      height: chosenRatio * size.height
    }

    // always center
    var xoffset = (imageWithRightRatioSize.width - width) / 2
    var yoffset = (imageWithRightRatioSize.height - height) / 2
    gmFile
      .resize(width, height, '^')
      .crop(width, height, xoffset, yoffset)
      .write(destinationFile, completionBlock)
  })
}

exports.resize = function (sourceFile, flag, width, height, destinationFile, done) {
  var gmFile = gm(sourceFile)

  switch (flag) {
    case 'at_least':
      gmFile.resize(width, height, '^') // aspect ratio fill. at least width x height
      break
    case 'up_to':
    default:
      gmFile.resize(width, height) // aspect ratio fit. at most width x height
  }
  gmFile.write(destinationFile, function (err) {
    if (err) {
      //
    }
    done()
  })
}

exports.crop = function (sourceFile, width, height, x, y, destinationFile, done) {
  gm(sourceFile)
    .crop(width, height, x, y)
    .write(destinationFile, function (err) {
      if (err) {
        //
      }
      done()
    })
}

exports.makeGif = function (images, gifFile, interval, done) {
  var gmFile = gm().setFormat('gif')
  for (let img of images) {
    gmFile.delay(interval).in(img)
  }

  gmFile.write(gifFile, function (err) {
    if (err) {
      //
    }
    done()
  })
}

exports.splitGif = function (gifFile, imagePattern, done) {
  var gmFile = gm().command('convert').in(gifFile).in('+adjoin')
  gmFile.write(imagePattern, function (err) {
    if (err) {
      //
    }
    done()
  })
  // gm convert animation.gif +adjoin frame%02d.gif
}

exports.store = function (file, destination, config, done) {
  var storageInstance = storageHelper(config)
  storageInstance.toS3(file, destination, function (err, url) {
    var meta = {
      region: config.s3Options.region,
      bucket: config.uploads.s3Bucket,
      remote: destination,
      url: url,
      millitimestamp: Date.now()
    }
    if (err) {
      //
    }
    done(err, meta)
  })
}

exports.remove = function (file, config, done) {
  var storageInstance = storageHelper(config)
  storageInstance.removeFile(file, done)
}
