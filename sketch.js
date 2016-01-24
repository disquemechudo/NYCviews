var buildings = [];
var voice = [];
var data;
var time;
var description;
var button;
var record_button;
var mic, recorder;
var state = 0;
var x = 0;
var voice;
var contribute;
var new_text;
 
function preload() {
  data = loadJSON("nyc-buildings.json");
}
 
function setup() {
  createCanvas(800, 500);
  noLoop();
  noStroke();
  textSize(20);


  mic = new p5.AudioIn();
  mic.start();
  
  // create a sound recorder
  recorder = new p5.SoundRecorder();
  
  // connect the mic to the recorder
  recorder.setInput(mic);
  
  // this sound file will be used to
  // playback & save the recording
  voice = new p5.SoundFile();

//select the year
  time = createSelect();
  time.option("Year");
  time.size(80, 20);
  time.position(1045,200);
  time.option(2013);
  time.option(2001);
  time.option(1972);
  time.option(1931);
  time.option(1930.5);
  time.option(1930);
  time.option(1913);
  time.option(1909);
  time.option(1908);
  time.option(1899);
  time.option(1894);
  time.option(1890);
  time.option(1854);
  time.option(1853);
  time.option(1846);
  time.style("font-family", "Arial, Helvetica, sans-serif");
  time.style("font-size", "18px");

  
  description = createP("What was the tallest building in NYC for each of the following years?");
  description.position(850,100);
  description.style("font-family", "Arial, Helvetica, sans-serif");
  description.style("font-size","22px");
  
  //create submit button
  button = createButton("Submit");
  button.position(1025, 250);
  button.size(120,40);
  button.style("border","none");
  button.style("background-color","#78B4C8");
  button.style("color","#FFFFFF");
  button.style("font-family", "Arial, Helvetica, sans-serif");
  button.style("font-size", "16px");
   button.mousePressed(selection);
   
  contribute = createP("");
  contribute.position(900,350);
  contribute.style("font-family", "Arial, Helvetica, sans-serif");
  contribute.style("font-size","18px");
   
  //create record button
  record_button = createButton("Record");
  record_button.hide();
  record_button.position(1035,420);
  record_button.size(100,50);
  record_button.style("border","none");
  record_button.style("background-color","#000000");
  record_button.style("color","#FFFFFF");
  record_button.style("font-family", "Arial, Helvetica, sans-serif");
  record_button.style("font-size", "16px");
  record_button.mousePressed(record);
   
}
 
function draw() {
  background(120, 180, 200);
    noStroke();
  fill(0, 10);
  rect(0, 0, width, height);
}

//data changes figure's height depending which year is selected
function selection(){

state = 0;

if(state === 0) {
    record_button.html("Record");
    record_button.style("background-color","#000000");
  }

for (var i = 0; i < data.length; i++) {
  if (time.selected() == data[i].year){
  x = data[i].tall;
  y = data[i].name;
  z = data[i].location;

  contribute.html("What do you think of the " + y + "?");
  record_button.show();
  

background(120, 180, 200);
  fill(155);
  rect(340, 500, 100, x/4*-1);
  fill(255);
  text(y, 60, 300);
  text(z, 60, 330);
  
        }
      }
}

function record(){


if(state === 0 && mic.enabled) {
  
    // record to our p5.SoundFile
    recorder.record(voice);
    
    record_button.html("Stop");
    record_button.style("background-color","#FF0000");
    
    state++;
  }
  else if (state === 1) {

    // stop recorder and
    // send result to soundFile
    recorder.stop(); 
    
    record_button.html("Save");
    record_button.style("background-color","#00CC00");
    state++;
  }
  
  else if (state === 2) {
    x = x + 1;
    save(voice,'yourVoice'+x+'.wav');
    
    record_button.html("Play");
    record_button.style("background-color","#0066CC");
    state++;
  } 
  else if (state === 3) {
    voice.play();
    
    record_button.html("Play");
    record_button.style("background-color","#0066CC");
  }
  
//my attempt to randomize recorded audio
  // else if (state === 4) {
  
  // x = y;
  // y = random;
  // new_audio = createAudio('yourVoice'+y+'.wav');
  // new_audio.play();
  
  // record_button.html("Play random");
  // record_button.style("background-color","#0066CC");
//}

}
