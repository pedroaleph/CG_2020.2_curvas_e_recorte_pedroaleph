let canvas, menu, curva;
const MAX = 10;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(100, 100);

  menu = createSelect();
  menu.position(30, 30);
  menu.option('Bézier');
  menu.option('Casteljau');
}

let tam = 10, P, 
    P0 = [5, 20], P1 = [10, 10], 
    P2 = [25, 10], P3 = [30, 20],
    mouse, mode = false;

function curva_bezier() {
  noLoop();
  let x, y, t, _t;
  for (t = 0 ; t <= 1; t+= 0.001){
    _t = 1 - t;
    x = pow(_t, 3) * P0[0] + 3 * t * pow(_t, 2) * P1[0] + 
      3 * pow(t, 2) * _t * P2[0] + pow(t, 3) * P3[0];
    
    y = pow(_t, 3) * P0[1] + 3 * t * pow(_t, 2) * P1[1] + 
      3 * pow(t, 2) * _t * P2[1] + pow(t, 3) * P3[1];
    
    fill('red');
    noStroke();
    rect(x * tam, y * tam, 1 , 1);
  }
  redraw();
}

function ponto_medio(a, b){
  //print(a, b);
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function curva_casteljau(){
  noLoop();
  casteljau(P0, P1, P2, P3, 0);
  redraw();
}

function casteljau(P0, P1, P2, P3, u){
  if(u <= MAX){
    let M01 = ponto_medio(P0, P1);
    let M12 = ponto_medio(P1, P2);
    let M23 = ponto_medio(P2, P3);
    
    let M012 = ponto_medio(M01, M12);
    let M123 = ponto_medio(M12, M23);
    
    let M0123 = ponto_medio(M012, M123);
    
    
    casteljau(P0, M01, M012, M0123, u + 1);
    casteljau(M0123, M123, M23, P3, u + 1);
    
    fill('red');
    noStroke();
    rect(M0123[0] * tam, M0123[1] * tam, 1 , 1);
  }
}

function draw() {
  background(255);
  
  curva = menu.value();
  mouse = [round(mouseX/tam), round(mouseY/tam)];
  
  fill(0);
  stroke(51);
  
  text('P0', P0[0] * tam, P0[1] * tam);
  text('P1', P1[0] * tam, P1[1] * tam);
  text('P2', P2[0] * tam, P2[1] * tam);
  text('P3', P3[0] * tam, P3[1] * tam);
  
  circle(P0[0] * tam, P0[1] * tam, tam / 2);
  circle(P1[0] * tam, P1[1] * tam, tam / 2);
  circle(P2[0] * tam, P2[1] * tam, tam / 2);
  circle(P3[0] * tam, P3[1] * tam, tam / 2);
  
  line(P0[0] * tam, P0[1] * tam, P1[0] * tam, P1[1] * tam);
  line(P1[0] * tam, P1[1] * tam, P2[0] * tam, P2[1] * tam);
  line(P2[0] * tam, P2[1] * tam, P3[0] * tam, P3[1] * tam);
  
  if(mode === true){
    if(P === 0){
      P0[0] = mouse[0];
      P0[1] = mouse[1];
    }
    if(P === 1){
      P1[0] = mouse[0];
      P1[1] = mouse[1];
    }
    if(P === 2){
      P2[0] = mouse[0];
      P2[1] = mouse[1];
    }
    if(P === 3){
      P3[0] = mouse[0];
      P3[1] = mouse[1];
    }
  }
  
  
  if(mouseIsPressed){
    if((P0[0] === mouse[0]) && (P0[1] === mouse[1])){
      mode = true;
      P = 0;
    }
    else if((P1[0] === mouse[0]) && (P1[1] === mouse[1])){
      mode = true;
      P = 1;
    }
    else if((P2[0] === mouse[0]) && (P2[1] === mouse[1])){
      mode = true;
      P = 2;
    }
    else if((P3[0] === mouse[0]) && (P3[1] === mouse[1])){
      mode = true;
      P = 3;
    }
    else{
      if (curva === 'Bézier')
        curva_bezier();
      if (curva === 'Casteljau')
        curva_casteljau();
    }
  }
  else{
    mode = false;
  }
  
  text('P0 = (' + P0 + ')  ' + 
       ' P1 = (' + P1 + ')  ' + 
       ' P2 = (' + P2 + ')  ' + 
       ' P3 = (' + P3 + ')',
       3, 397);
}

function mouseClicked(){
    loop();
}