   //initial 

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor("#919191");
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );
    
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    scene.add( directionalLight );
    directionalLight.position.set(100,50,100);

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
//mechanics and logic
var reset = (cub) => {
    who = 0;
    for (const element of cub) {
        element.playerClicked = 0;
        element.material.color.set(0xFFFFFF);
        element.rotation.set(0, 0, 0);
        element.tl = new TimelineMax();
        element.tl.to(element.rotation, 3, {y: Math.PI*1, ease: Expo.easeOut, z: Math.PI*.5, ease: Expo.easeOut})
        
      }
}

var who = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//model and stuff
var createCube = (cubeiD) => {
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshPhongMaterial( {color: 0xFFFFFF} );
const cube = new THREE.Mesh(geometry, material);
cube.positioniD = cubeiD;
cube.playerClicked = 0;
return cube;
}
const cube1 = createCube(1);
cube1.position.set(-30, 60, 0);
const cube2 = createCube(2);
cube2.position.set(0, 60, 0);
const cube3 = createCube(3);
cube3.position.set(30, 60, 0);
const cube4 = createCube(4);
cube4.position.set(-30, 30, 0);
const cube5 = createCube(5);
cube5.position.set(0, 30, 0);
const cube6 = createCube(6);
cube6.position.set(30, 30, 0);
const cube7 = createCube(7);
cube7.position.set(-30, 0, 0);
const cube8 = createCube(8);
cube8.position.set(0, 0, 0);
const cube9 = createCube(9);
cube9.position.set(30, 0, 0);
scene.add(cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9);
camera.position.z = 100;
camera.position.y = 20;

// list of cubes for resetting and score stats and resetting
var cubes = [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9];
var blue_score = 0;
var red_score = 0;

var resetStat = () =>{
    blue_score = 0;
    red_score = 0;
    reset(cubes);
}

//onClick 
function onMouseClick(event){
event.preventDefault();
mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
raycaster.setFromCamera(mouse, camera);

var intersects = raycaster.intersectObjects(scene.children, true);


for(var i = 0; i < intersects.length; i++){
    // if already clicked 
    if(intersects[i].object.playerClicked == 2 || intersects[i].object.playerClicked == 1){
        alert("You can't make this move");
        }
        else {
this.tl = new TimelineMax();
this.tl.from(intersects[i].object.scale, .5, {x: 1.5, ease: Expo.easeOut,y : 1.5, ease:Expo.easeOut, z: 1.5, ease: Expo.easeOut})
this.tl.to(intersects[i].object.scale, .5, {x: 1, ease: Expo.easeOut,y : 1, ease:Expo.easeOut, z: 1, ease: Expo.easeOut})

//if red turn
if(who % 2 == true){
intersects[i].object.playerClicked = 2;
intersects[i].object.material.color.set(0xFF0000);
}
//if blue turn
if(who % 2 == false){
intersects[i].object.playerClicked = 1;
intersects[i].object.material.color.set(0x00FFFF);
}
//next turn 
who += 1;
}
}
}

var render = function() {
requestAnimationFrame(render);
renderer.render(scene, camera);
//stat display
document.getElementById("blue").innerHTML = blue_score;
document.getElementById("red").innerHTML = red_score;

// if BLUE WON
if(cube1.playerClicked == 1 && cube2.playerClicked == 1 && cube3.playerClicked == 1 ||
    cube4.playerClicked == 1 && cube5.playerClicked == 1 && cube6.playerClicked == 1 ||
    cube7.playerClicked == 1 && cube8.playerClicked == 1 && cube9.playerClicked == 1 ||
    cube1.playerClicked == 1 && cube4.playerClicked == 1 && cube7.playerClicked == 1 ||
    cube2.playerClicked == 1 && cube5.playerClicked == 1 && cube8.playerClicked == 1 ||
    cube3.playerClicked == 1 && cube6.playerClicked == 1 && cube9.playerClicked == 1 ||
    cube1.playerClicked == 1 && cube5.playerClicked == 1 && cube9.playerClicked == 1 ||
    cube3.playerClicked == 1 && cube5.playerClicked == 1 && cube7.playerClicked == 1 )
    {
blue_score +=1;
reset(cubes);
}
// if RED WON
else if(cube1.playerClicked == 2 && cube2.playerClicked == 2 && cube3.playerClicked == 2 ||
    cube4.playerClicked == 2 && cube5.playerClicked == 2 && cube6.playerClicked == 2 ||
    cube7.playerClicked == 2 && cube8.playerClicked == 2 && cube9.playerClicked == 2 ||
    cube1.playerClicked == 2 && cube4.playerClicked == 2 && cube7.playerClicked == 2 ||
    cube2.playerClicked == 2 && cube5.playerClicked == 2 && cube8.playerClicked == 2 ||
    cube3.playerClicked == 2 && cube6.playerClicked == 2 && cube9.playerClicked == 2 ||
    cube1.playerClicked == 2 && cube5.playerClicked == 2 && cube9.playerClicked == 2 ||
    cube3.playerClicked == 2 && cube5.playerClicked == 2 && cube7.playerClicked == 2 )
    {
red_score +=1;
reset(cubes);
}
//DRAW
else if(cube1.playerClicked != 0 && cube2.playerClicked != 0 && cube3.playerClicked != 0 &&
    cube4.playerClicked != 0 && cube5.playerClicked != 0 && cube6.playerClicked != 0 &&
    cube7.playerClicked != 0 && cube8.playerClicked != 0 && cube9.playerClicked != 0 ){
reset(cubes);
}
}
window.addEventListener('click', onMouseClick);
window.addEventListener('resize', onResize, false);

render();

//Created by Mateusz Wysocki 2020