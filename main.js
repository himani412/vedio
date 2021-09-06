video="";
status="";
objects="";

function preload(){
    video= createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
   image(video,0,0,480,380);
   if(status != ""){
       objectDetector.detect(video, gotresult);
       for(i = 0; i < objects.length ; i++){
           document.getElementById("status").innerHTML= "Status : Objects Detected";
           document.getElementById("numberofobjects").innerHTML="Number of Objects Detected are :  "+objects.length;
           fill("#FF0000");
           percent= floor(objects[i].confidence*100);
           text(objects[i].label+ " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
           nofill();
           stroke("#FF0000");
           rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);

       }
   }
}
function gotresult(error,results){
    if(error){
        console.log(error);

    }
  
        console.log(results);
objects= results;
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects ";
}
function modelLoaded(){
    console.log("ModelLoaded !");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}