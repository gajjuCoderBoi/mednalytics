
var uploadBtn = document.getElementById("upload-button");
var realBtn = document.getElementById("real-file");
var output;
var file;

function Upload() {
    var realBtn = document.getElementById("real-file");
    realBtn.click();
    return false;
}

function Reset(){
    document.getElementById("diagnose-form").reset();
    document.getElementById("upload-button").disabled = false;
}


function Changed(event) {
    let realBtn = document.getElementById("real-file");
    let text = document.getElementById("custom-text");
    let checkButton = document.getElementById("check-disease");
    let uploadBtn = document.getElementById("upload-button");
    let resetBtn = document.getElementById("reset-button");
    let diagnoseImage = document.getElementById("diagnose-image")
    if(realBtn.value){
        uploadBtn.disabled = true;
        text.innerHTML = realBtn.value;
        checkButton.hidden = false;
        resetBtn.hidden = false;
        // diagnoseImage.hidden=false;
        diagnoseImage.style.display='block';
    }
    file = event.target.files[0];
    output = document.getElementById('myImg');
    output.src = URL.createObjectURL(event.target.files[0]);
    text.innerHTML = realBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
}

function checkDisease(event) {
    event.preventDefault()
    let req = new XMLHttpRequest();
    let formData = new FormData();
    let textOver = document.getElementById("textOver");
    let diseaseState = document.getElementById("disease-state");
    let disease = document.getElementById("disease").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let ins_ID = document.getElementById("insuranceID").value;
    let city = document.getElementById("city").value;
    let dob = document.getElementById("dob").value;
    let date = document.getElementById("date").value;
    let progressBarDiseaseStatus = document.getElementById("progress-bar-disease-status");

    formData.append("photo", file);
    req.open("POST", 'http://localhost:5000/prediction?model='+disease+'&fname='+fname+'&lname='+lname+'&ins_ID='+ins_ID+'&city='+city+'&dob='+dob+'&date='+date);
    req.onreadystatechange = function () {

        let pred = JSON.parse(this.response).Prediction.toString();


        if (pred === "1") {
            progressBarSimulation(progressBarDiseaseStatus);
            diseaseState.innerText = "Infected";
            diseaseState.className = 'btn btn-lg btn-danger';
        }
        if (pred === "0") {
            progressBarSimulation(progressBarDiseaseStatus);

            diseaseState.innerText = "Not Infected";
            diseaseState.className = 'btn btn-lg btn-success';
        }
    };
    req.send(formData);
    function progressBarSimulation(progressBarDiseaseStatus){
        var i = 0;
        function move() {
            if (i == 0) {
                i = 1
                var elem = progressBarDiseaseStatus;
                var width = 0;
                var id = setInterval(frame, 200);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        i = 0;
                        diseaseState.hidden = false;
                    } else {
                        width+=5;
                        elem.style.width = width + "%";
                    }
                }
            }
        }
        move();
    }

}

