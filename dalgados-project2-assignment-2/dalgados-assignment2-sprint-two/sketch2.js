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

let r = 255;
let x = 20;
let y = 20;

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

    img = loadImage('images/mustache.png');
    imgeye = loadImage('images/eye.png');
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

    //places mustache and eyes over user

    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);
        const nose = pose.nose;

        image(img, nose.x - 50, nose.y, 100, 50);
        image(imgeye, pose.rightEye.x - 20, pose.rightEye.y - 30, 100, 50);

        fill(213, 0, 143);
        const rightWrist = pose.rightWrist;
        ellipse(rightWrist.x, rightWrist.y, 20, 20);

        fill(213, 0, 143);
        const leftWrist = pose.leftWrist;
        ellipse(leftWrist.x, leftWrist.y, 20, 20);

    }
}
