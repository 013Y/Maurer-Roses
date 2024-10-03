// Maurer Rose parameters
let roseParams = [
  {n: 7, d: 71},   // 1) n=7, d=71
  {n: 5, d: 71},   // 2) n=5, d=71
  {n: 4, d: 79},   // 3) n=4, d=79
  {n: 7, d: 79},   // 4) n=7, d=79
  {n: 6, d: 79},   // 5) n=6, d=79
  {n: 7, d: 79},   // 6) n=7, d=79
  {n: 9, d: 71},   // 7) n=9, d=71
  {n: 11, d: 71},  // 8) n=11, d=71
  {n: 16, d: 71},  // 9) n=16, d=71
  {n: 66, d: 171}  // 10) n=66, d=171
];

let totalPoints = 360; // Total points to draw
let maxRadius; // Maximum radius for all roses
let currentRadius = 0; // Current radius
let growing = true; // To track if rose is growing or shrinking
let rotating = false; // To track if rotation is happening for a rose
let angle = 0; // Angle for rotation
let currentRoseIndex = 0; // Track the current rose being drawn
let randomN, randomD; // For random n and d values in the 11th rose

function setup() {
  createCanvas(windowWidth, windowHeight); // Set canvas size to full screen
  background(0); // Black background
  stroke(255); // White lines for Maurer Roses
  strokeWeight(2); // Line thickness
  noFill(); // No fill for shapes
  
  maxRadius = min(windowWidth, windowHeight) * 0.4; // Max radius is 40% of the smallest screen dimension
  randomN = floor(random(3, 20)); // Random n for the first random rose
  randomD = floor(random(50, 180)); // Random d for the first random rose
}

function draw() {
  background(0); // Clear the background with black each frame
  translate(width / 2, height / 2); // Move origin to center of canvas
  
  // Determine parameters for the current rose
  let n, d;
  if (currentRoseIndex < roseParams.length) {
    // Use predefined values for the first 10 roses
    n = roseParams[currentRoseIndex].n;
    d = roseParams[currentRoseIndex].d;
  } else {
    // Use random values for the 11th rose
    n = randomN;
    d = randomD;
  }

  // Rotate canvas if rotating for the current rose
  if (rotating) {
    angle += PI / 180; // Increment rotation angle
    rotate(angle);
    
    if (angle >= TWO_PI) { // After 1 full rotation (360 degrees)
      angle = 0; // Reset the angle
      rotating = false; // Stop rotation
      growing = false; // Start shrinking the current rose
    }
  }

  // Control the growing and shrinking of the current rose
  if (growing) {
    currentRadius += 2; // Increment radius during growth
    if (currentRadius >= maxRadius) {
      currentRadius = maxRadius; // Cap the radius
      rotating = true; // Start rotation when fully grown
    }
  } else {
    currentRadius -= 2; // Decrement radius during shrinking
    if (currentRadius <= 0) {
      currentRadius = 0; // Reset radius
      angle = 0; // Reset rotation angle
      currentRoseIndex++; // Move to the next rose

      // After the 11th (random) rose, reset to the 1st rose
      if (currentRoseIndex > roseParams.length) {
        currentRoseIndex = 0; // Reset to the first rose for endless loop
      }

      // Generate new random n and d for the next random rose
      if (currentRoseIndex == roseParams.length) {
        randomN = floor(random(3, 20)); // Random n between 3 and 20
        randomD = floor(random(50, 180)); // Random d between 50 and 180
      }

      growing = true; // Start growing the next rose
    }
  }
  
  // Draw the current Maurer Rose
  drawMaurerRose(n, d, currentRadius, totalPoints);
}

// Function to draw a Maurer Rose
function drawMaurerRose(n, d, radius, totalPoints) {
  beginShape();
  for (let i = 0; i <= totalPoints; i++) {
    let k = i * d * PI / 180; // Angle in radians
    let r = radius * sin(n * k); // Radius
    let x = r * cos(k); // X coordinate
    let y = r * sin(k); // Y coordinate
    vertex(x, y); // Draw vertex at (x, y)
  }
  endShape(CLOSE); // Connect the last point to the first
}

// Resize canvas dynamically on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maxRadius = min(windowWidth, windowHeight) * 0.4; // Adjust max radius dynamically
}
