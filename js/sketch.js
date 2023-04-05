var song;
var amp;
var button;
var score = [];
var amphistory = [];

/** styles */
var backgroundColor = 0;
var contentColor = 255;
var myFont;

function preload() {
  myFont = loadFont("Share_Tech_Mono/ShareTechMono-Regular.ttf");
  song = loadSound("sounds/song.wav");
}

function setup() {
  // create an interface to change frequency, waveform, etc.
  let myCanvas = createCanvas(windowWidth * 0.99, windowHeight * 0.9);
  myCanvas.id("my-canvas");
  angleMode(DEGREES);
  slider = createSlider(0, 100, 100);
  button = createButton("play/pause");
  button.mousePressed(toggleSong);

  song.play();
  amp = new p5.Amplitude();
  score.push(new Canvas(20));

  textFont(myFont);
  textSize(15);
  textAlign(CENTER, CENTER);
}

https: function draw() {
  song.setVolume(slider.value() / 100);
  background(backgroundColor);
  drawScore();
}

function drawScore() {
  for (let i = 0; i < score.length; i++) {
    score[i].drawSelf();
  }
}

//www.youtube.com/watch?v=h_aTgOl9J5I&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=10&ab_channel=TheCodingTrain
function visualizeAmplitude() {
  amphistory.push(amp.getLevel());
  stroke(contentColor);
  noFill();

  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < 360; i++) {
    r = map(amphistory[i], 0, 1, 100, 0);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  if (amphistory.length > 360) {
    amphistory.splice(0, 1);
  }
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
