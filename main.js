prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_NOaWu7fK/model.json", modelLoaded);

function modelLoaded(){
    console.log("model is loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speachdata1 = "First prediction is" + prediction1;
    speachdata2 = "Second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speechdata1 + speechdata2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;

        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(prediction1 == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }

        if(prediction2 == "Happy"){
            document.getElementById("update_emoji_2").innerHTML = "&#128512;";
        }

        if(prediction1 == "Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if(prediction2 == "Angry"){
            document.getElementById("update_emoji_2").innerHTML = "&#128545;";
        }

        if(prediction1 == "Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if(prediction2 == "Sad"){
            document.getElementById("update_emoji_2").innerHTML = "&#128532;";
        }
    }
}