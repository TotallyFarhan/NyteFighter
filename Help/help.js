const playerCanvas = document.getElementById('playercanvas');
const ctx1 = playerCanvas.getContext('2d');

const enemyCanvas =  document.getElementById('enemycanvas');
const ctx2 = enemyCanvas.getContext('2d');

enemyCanvas.width = window.innerWidth;
enemyCanvas.height = 200;

//player
ctx1.fillStyle = 'red';
ctx1.fillRect(0, 0, 100, 100);

//enemy
ctx2.beginPath();
ctx2.arc(270, 100, 50, 0, Math.PI * 2, false);
ctx2.fillStyle = 'green';
ctx2.fill();
ctx2.closePath();
//tank enemy
ctx2.beginPath();
ctx2.arc(520, 100, 100, 0, Math.PI * 2, false);
ctx2.fillStyle = 'pink';
ctx2.fill();
ctx2.closePath();
//speed enemy
ctx2.beginPath();
ctx2.arc(770, 100, 25, 0, Math.PI * 2, false);
ctx2.fillStyle = 'yellow';
ctx2.fill();
ctx2.closePath();