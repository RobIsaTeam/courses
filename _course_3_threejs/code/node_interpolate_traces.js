const fs = require('fs')

const interpolate = (old_x, old_y, new_x) => {
  let i = 0
  return new_x.map((x) => {
    // jump forward to next point we want to record
    while (i < old_x.length && x > old_x[i]) { i += 1 }
    if (x < old_x[i]) {
      if (i === 0) {
        // before the start - extrapolating
        return old_y[i]
      } else {
        // between two points - interpolating
        const a = (x - old_x[i-1]) / (old_x[i] - old_x[i-1])
        return old_y[i-1] + a * (old_y[i] - old_y[i-1])
      }
    } else {
      // past the end - extrapolating
      return old_y[i]
    }
  })
}

const generateRange = (x0, x1, dx) => {
  let x = x0
  let i = 0
  const range = []
  while (x <= x1) {
    range.push(i)
    x += dx
    i += 1
  }
  return range.map((val) => x0 + (dx * val))
}

const interpolateTraceFile = (filename, newFilename, x0, x1, dx) => {
  const origData = JSON.parse(fs.readFileSync(filename))[0]
  const newX = generateRange(x0, x1, dx)
  const newY = interpolate(origData.x, origData.y, newX)
  const newData = {
    x: newX,
    y: newY,
  }
  fs.writeFileSync(newFilename, JSON.stringify(newData, null, 2))
}

interpolateTraceFile('data/FEF-orig.json', 'data/FEF.json', -0.2, 1.25, 0.01)
interpolateTraceFile('data/IT-orig.json',  'data/IT.json',  -0.2, 1.25, 0.01)
interpolateTraceFile('data/LIP-orig.json', 'data/LIP.json', -0.2, 1.25, 0.01)
interpolateTraceFile('data/MT-orig.json',  'data/MT.json',  -0.2, 1.25, 0.01)
interpolateTraceFile('data/PFC-orig.json', 'data/PFC.json', -0.2, 1.25, 0.01)
interpolateTraceFile('data/V4-orig.json',  'data/V4.json',  -0.2, 1.25, 0.01)
