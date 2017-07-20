const fs = require('fs')

const normalise = (y) => {
  const minY = Math.min(...y)
  const maxY = Math.max(...y)
  return y.map((val) => (val - minY) / (maxY - minY))
}

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
  const newY = normalise(interpolate(origData.x, origData.y, newX))
  const newData = {
    x: newX,
    y: newY,
  }
  fs.writeFileSync(newFilename, JSON.stringify(newData, null, 2))
  return newY
}

const fefSignal = interpolateTraceFile('data/FEF-orig.json', 'data/FEF.json', -0.2, 1.25, 0.01)
const  itSignal = interpolateTraceFile('data/IT-orig.json',  'data/IT.json',  -0.2, 1.25, 0.01)
const lipSignal = interpolateTraceFile('data/LIP-orig.json', 'data/LIP.json', -0.2, 1.25, 0.01)
const  mtSignal = interpolateTraceFile('data/MT-orig.json',  'data/MT.json',  -0.2, 1.25, 0.01)
const pfcSignal = interpolateTraceFile('data/PFC-orig.json', 'data/PFC.json', -0.2, 1.25, 0.01)
const  v4Signal = interpolateTraceFile('data/V4-orig.json',  'data/V4.json',  -0.2, 1.25, 0.01)

const electrodeData = JSON.parse(fs.readFileSync('data/electrode_data_template.json'))
electrodeData[0].power = fefSignal
electrodeData[1].power = pfcSignal
electrodeData[2].power = lipSignal
electrodeData[3].power = itSignal
electrodeData[4].power = v4Signal
electrodeData[5].power = mtSignal
fs.writeFileSync('data/electrode_data.json', JSON.stringify(electrodeData, null, 2))
