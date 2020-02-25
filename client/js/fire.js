var title = document.getElementById('title');
var rect = title.getBoundingClientRect();

var canvas = document.getElementById('fire');
var ctx = canvas.getContext("2d");

var pathNumber = 10;
var redPath;
var segmentSpeeds = [];

var width = rect.right - rect.left;
var height = (rect.bottom - rect.top) * 2.2;

window.onload = function() {
  canvas.width = width;
  canvas.height = height;

  paper.setup(canvas);

  redPath = new paper.Path();
  redPath.fillColor = '#d43f3f';

  paper.view.draw();

  startFire()
}

function startFire() {
  // red!
  redPath.add(10, height)

  for (var i = 1; i < pathNumber; i++) {
    redPath.add((width/pathNumber) * i, height - (5 + Math.random() * 10));
    segmentSpeeds[i] = Math.random() * 90
  }

  redPath.add(width, height)

  redPath.smooth({ type: 'continuous' });

  setInterval(frame, 40)
}

function frame() {
  // red!
  for (var i = 1; i < pathNumber; i++) {
    redPath.segments[i].point.y += Math.sin(segmentSpeeds[i])/5

    segmentSpeeds[i] += Math.random()/10
  }
}

function onResize(event) {
  var title = document.getElementById('title');
  var rect = title.getBoundingClientRect();

  width = rect.right - rect.left;
  height = (rect.bottom - rect.top) * 2;

  canvas.width = width;
  canvas.height = height;

	startFire();
}
