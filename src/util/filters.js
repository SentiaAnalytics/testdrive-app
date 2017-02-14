const tmpCtx = document.createElement('canvas').getContext('2d')

const createImageData = (w,h) =>
  tmpCtx.createImageData(w,h)

export const applyFilter = (filter:Function) => (canvas:any) => {
  const ctx = canvas.getContext('2d')
  const pixels = ctx.getImageData(0, 0, canvas.width,canvas.height);
  ctx.putImageData(filter(pixels), 0, 0)
  return canvas
}

export const threshold = (threshold:number) => (pixels:any) => {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};
export const threshold2 = (threshold:number) => (pixels:any) => {
  var d = pixels.data;
  console.log('brightness', d.reduce((a, b) => a + b, 0))
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (r >= threshold || g >= threshold || b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

export const convolute = (opaque: bool) => (weights:number[]) => (pixels:any) => {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
}

const createSharpen = x => [
  0,    -1*x,  0,
  -1*x, 5*x,   -1*x,
  0,    -1*x,  0
]

export const sharpen = x => convolute(false)(createSharpen(x))

const BLUR = [
  1/9, 1/9, 1/9,
  1/9, 1/9, 1/9,
  1/9, 1/9, 1/9
]

export const blur = convolute(false)(BLUR)
