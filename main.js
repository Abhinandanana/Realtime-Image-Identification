function setup(){
    canvas= createCanvas(280,280);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    classifier= ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
    console.log('Model Loaded!');
}

function draw(){
    image(video, 0, 0, 280, 280);
    classifier.classify(video, gotResult);
}

var previous_result= '';

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{ 
        if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
            console.log(results);
            previous_result= results[0].label;
            var synth= window.speechSynthesis;
            speak= 'Object Recognized is-' + results[0].label;
            var Utter= new SpeechSynthesisUtterance(speak);
            synth.speak(Utter);

            document.getElementById('object_name').innerHTML= 'Object- ' + results[0].label;
            document.getElementById('accuracy_name').innerHTML= 'Accuracy- ' + results[0].confidence.toFixed(2);
        }
    }
}