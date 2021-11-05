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

let audio;

let r = 255;
let g = 0;
let b = 255;

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

    audio = createAudio('assets/assets_sounds_clay.mp3');
    audioTwo = createAudio('assets/assets_sounds_prism-2.mp3');
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

    fill(r, g, b);
    rect(15, 20, 600, 200);
    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);

        // play audio with right wrist and left wrist, each wrist plays a different audio

        fill(213, 0, 143);
        const rightWrist = pose.rightWrist;
        ellipse(rightWrist.x, rightWrist.y, 20, 20);

        fill(213, 0, 143);
        const leftWrist = pose.leftWrist;
        ellipse(leftWrist.x, leftWrist.y, 20, 20);

        if (rightWrist.y < 200) {
            audio.play();
            r = 0;
            g = 255;
            b = 0;

        } else if (leftWrist.y < 200) {
            audioTwo.play();
            r = 0;
            g = 0;
            b = 255;
        } else {
            audio.stop();
            audioTwo.stop();
            r = 255;
            g = 0;
            b = 255;
        }





    }
}
