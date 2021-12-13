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

let r = 100;
let x = 20;
let y = 20;


let trans = 255;

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

    img = loadImage('images/flower.png');
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

        // Create an ellipse for each hand

        fill(213, 0, 143);
        const rightWrist = pose.rightWrist;
        ellipse(rightWrist.x, rightWrist.y, 20, 20);

        fill(213, 0, 143);
        const leftWrist = pose.leftWrist;
        ellipse(leftWrist.x, leftWrist.y, 20, 20);

        fill(213, 0, 143);
        const rightAnkle = pose.rightAnkle;
        ellipse(rightAnkle.x, rightAnkle.y, 20, 20);

        fill(213, 0, 143);
        const leftAnkle = pose.leftAnkle;
        ellipse(leftAnkle.x, leftAnkle.y, 20, 20);



        // code from: https://p5js.org/examples/image-transparency.html
        tint(255, trans);
        //end of code

        //adding first flower to sketch
        image(img, 100, 350, r, r);


        //adding second flower to sketch, I did two flowers because I constantly have to fight with posenet
        image(img, 400, 350, r, r);


        //had to set the transparency back to full so it only makes the flower transparent
        tint(255, 255);


        //if wrists hit the flower, make it grow
        if (leftWrist.y >= 350 && leftWrist.x >= 400) {
            r = 200;
        } else {
            r = 100;
        }

        if (rightWrist.y >= 350 && rightWrist.x <= 400) {
            r = 200;
        } else {
            r = 100;
        }

        //if ankles hit left flower, make it dissapear 
        if (leftAnkle.y >= 350 && leftAnkle.x <= 100) {
            trans = 0;
        } else {
            trans = 255;
        }
        if (rightAnkle.y >= 350 && rightAnkle.x <= 100) {
            trans = 0;
        } else {
            trans = 255;
        }


    }
}
