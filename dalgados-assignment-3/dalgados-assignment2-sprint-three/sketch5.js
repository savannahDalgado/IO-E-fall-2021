// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */
var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

/* For this sprint, I wanted to combine drawing with the users nose with the same vocal instructions my first sprint had. Merging the libraries took a little to understand what I needed since I needed to transfer the vocal library over, and beyond that I needed to figure out how to hide the video feed so that the user could actually draw with their nose. */

let video;
let poseNet;
let poses = [];

let r = 0;
let g = 0;
let b = 255;
let h = 255;

let size = 5;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    //    video.size(width, height);

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
    //myRec.onResult = parseResult; // now in the constructor
    myRec.start(); // start engine

    // instructions:
    textSize(20);
    textAlign(LEFT);
    text("SELECT SIZE: SMALL, MEDIUM, LARGE", 20, 20);
    text("SELECT COLOUR: red, blue, green", 20, 45);
    text("then draw: up, down, left, right, clear, stop", 20, 70);
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    //    console.log(JSON.stringify(poses))
}

function draw() {
    //    image(video, 0, 0, width, height, );
    strokeWeight(2);

    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);


        noStroke();
        fill(r, g, b, h);
        const nose = pose.nose;
        ellipse(nose.x, nose.y, size, size);


    }
}

function parseResult() {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();

    if (mostrecentword.indexOf("small") !== -1) {
        size = 5;
    } else if (mostrecentword.indexOf("medium") !== -1) {
        size = 14;
    } else if (mostrecentword.indexOf("large") !== -1) {
        size = 20;
    } else if (mostrecentword.indexOf("red") !== -1) {
        r = 255;
        b = 0;
        g = 0;
    } else if (mostrecentword.indexOf("blue") !== -1) {
        r = 0;
        b = 255;
        g = 0;
    } else if (mostrecentword.indexOf("green") !== -1) {
        r = 0;
        b = 0;
        g = 255;
    } else if (mostrecentword.indexOf("stop") !== -1) {
        h = 0;
    } else if (mostrecentword.indexOf("start") !== -1) {
        h = 255;
    }


    console.log(mostrecentword);
}
