const canvasSketch = require('canvas-sketch');

const settings = {
  name: "truchet",           // Sketch name
  dimensions: [ 120 , 120 ], // Artwork dimensions
  units: 'cm',               // Units of measurement
}

const line = '#000000';        // Line color
const background = '#FFFFFF';  // Background color
const penThickness = .1;       // Thickness of plotting machine pen in cm

const sketch = ({ width, height, units }) => {
  let n = 5;
  let size = width / n;
  
  // Add line coordinates to this array over time
  const lines = [];
  return ({ context, width, height }) => {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    // Fill with white    
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    for (let x = 0; x < n+1; x++){
      for (let y = 0; y < n+1; y++){
          const deg = 90 * Math.floor(Math.random() * 4); // select from 0, 90, 180, or 270 degrees of rotation           
          context.save();     // save original context so we can restore to it            
          context.translate(-size + ((x + .5) * size), -size + ((y + .5) * size));
          context.rotate(deg * Math.PI / 180)
          setStroke(context);
          context.stroke();
          lines.push(drawIntersection(context, size));
          context.restore();
      }    
  }
  };
};

canvasSketch(sketch, settings);

function setStroke(context, color = "") {
  color ? context.strokeStyle = color : context.strokeStyle = line;
  context.lineWidth = penThickness;
  context.lineJoin = 'round';
  context.lineCap = 'round';
}

function drawIntersection(context, size) {// size = the size of an individual tile    
  // draw a 45 degree angle line from one corner to the other, and draw another line from the mirroring corner to the center
  
  // Line 1 starts from the top right and goes to the bottom left
  pointA = [size/2, size/2];
  pointB = [-size/2, -size/2];

  // Line 2 starts at the top left and goes to the center
  pointC = [-size/2, size/2];
  pointD = [0, 0];
  
  path1 = [pointA, pointB];
  path2 = [pointC, pointD];
  
  context.beginPath();
  context.moveTo(pointA[0], pointA[1]);
  context.lineTo(pointB[0], pointB[1]);
  context.stroke();
  
  context.moveTo(pointC[0], pointC[1]);
  context.lineTo(pointD[0], pointD[1]);
  setStroke(context);
  context.stroke();
  
  return [path1, path2];
}