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


    // right hand changes colour of nose left hand changes size


    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);

        // Create a pink ellipse for the nose
        fill(r, 0, 143);
        const nose = pose.nose;
        ellipse(nose.x, nose.y, x, y);

        fill(213, 0, 143);
        const rightWrist = pose.rightWrist;
        ellipse(rightWrist.x, rightWrist.y, 20, 20);

        fill(213, 0, 143);
        const leftWrist = pose.leftWrist;
        ellipse(leftWrist.x, leftWrist.y, 20, 20);

        // if left wrist is at certain hieghts, adjust size accordingly

        if (leftWrist.y < 200) {
            x = 20;
            y = 20;

        } else if (leftWrist > 200 && leftWrist < 300) {
            x = 40;
            y = 40;
        } else if (leftWrist > 300) {
            x = 60;
            y = 60;
        } else {
            x = 5;
            y = 5;
        }

        // if right wrist is less than 300 change colour
        if (rightWrist.y < 300) {

            r = 0;
        } else {
            r = 213;
        }

    }
}
