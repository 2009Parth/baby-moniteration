alarm = "";
status = "";
objects = [];

function preload()
{
    alarm = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw()
{
    image(video, 0, 0, 500, 500);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++)
        {
            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Status : Object Detected";
                document.getElementById("baby_status").innerHTML = "Baby found";
                alarm.stop();
                fill("red");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y); 
                noFill();
                stroke("red");
                rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
            }
            else
            {
                document.getElementById("baby_status").innerHTML = "Baby not found";
                alarm.play();
            }
         }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}