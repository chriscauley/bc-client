import { cloneDeep } from 'lodash'

const rotate = (geo) => {
  geo = cloneDeep(geo)
  if (geo.width && geo.height) {
    const { width, height } = geo
    geo.width = height
    geo.height = width
  }
  if (geo.center) {
    geo.center.reverse()
  }
  if (geo.points) {
    geo.points.forEach((p) => p.reverse())
  }
  return geo
}

const flipHorizontal = (geometry, W, _H) => {
  const _flip = (p) => [W - p[0], p[1]]
  if (geometry.center) {
    geometry.center = _flip(geometry.center)
  }
  if (geometry.points) {
    geometry.points = geometry.points.map(_flip)
  }
}

export const prepGeometry = ({ location, rooms }) => {
  const geometry = rotate(location.geometry)
  const W = geometry.width
  const H = geometry.height
  geometry.width -= 2
  const nh = (v) => `${(100 * v) / H}%`
  const nw = (v) => `${(100 * v) / W}%`
  return {
    location: {
      ...location,
      geometry,
      style: { paddingTop: nw(H) },
    },
    rooms: rooms.map((room) => {
      const geometry = rotate(room.geometry)
      flipHorizontal(geometry, W, H)
      const class_name = `room-map -room-${room.title.replace(/ /g, '').toLowerCase()}`
      const xs = geometry.map((p) => p[0])
      const ys = geometry.map((p) => p[1])
      const [x0, x1] = [Math.min(...xs), Math.max(...xs)]

      // y-axis is inverted because it's html
      const [y0, y1] = [Math.min(...ys), Math.max(...ys)]

      return {
        ...room,
        style: {
          left: nw(x0),
          right: nw(W - x1),
          top: nh(y0),
          bottom: nh(H - y1),
        },
        geometry,
        class_name,
      }
    }),
  }
}
