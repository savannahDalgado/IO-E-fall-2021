// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

let r = 20;
let x = 200;
let y = 300;

let xspeed = 3;
let yspeed = 2;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    console.log(JSON.stringify(poses))
}

function draw() {
    image(video, 0, 0, width, height);
    strokeWeight(2);

    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);

        // code didnt work too well although it works logistically, was supposed to be a ping pong game where you use your nose to hit the ball around and it bounces off of the walls

        fill(r, 0, 143);
        const nose = pose.nose;
        ellipse(nose.x, nose.y, 20, 20);

        x += xspeed;
        y += yspeed;

        ellipse(x, y, r * 2, r * 2);

        if (x > width - r || x < r) {
            xspeed = -xspeed;
        }

        if (x == (nose.x - r) || x == nose.x) {
            xspeed = -xspeed;
        }
        if (y > height - r || y < r) {
            yspeed = -yspeed;
        }

        if (y == (nose.y - r) || y == nose.y) {
            yspeed = -yspeed;
        }



    }
}
