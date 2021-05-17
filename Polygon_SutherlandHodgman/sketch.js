// based on https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
let c, menu, f;
var mode = false;
function setup() {
  c = createCanvas(400, 400);
  c.position(100,100);
  menu = createSelect();
  menu.position(50, 50);
  menu.option('nope');
  menu.option('polynomial A');
  menu.option('polynomial B');
  menu.option('polynomial C');
  menu.option('polynomial D');
  menu.changed(mySelectEvent);
  
}
function fig1(O){
  let v;
  fill('rgba(0,255,0, 0.25)');
  beginShape();
  v = [50, 50]; vertex(v[0], v[1]); O.push(v);
  v = [50, 150]; vertex(v[0], v[1]); O.push(v);
  v = [100, 150]; vertex(v[0], v[1]); O.push(v);
  v = [100, 100]; vertex(v[0], v[1]); O.push(v);
  v = [200, 100]; vertex(v[0], v[1]); O.push(v);
  v = [200, 150]; vertex(v[0], v[1]); O.push(v);
  v = [250, 150]; vertex(v[0], v[1]); O.push(v);
  v = [250, 50]; vertex(v[0], v[1]); O.push(v);
  endShape(CLOSE);
}
function fig2(O){
  let v;
  fill('rgba(0,255,0, 0.25)');
  beginShape();
  v = [100, 50]; vertex(v[0], v[1]); O.push(v);
  v = [100, 200]; vertex(v[0], v[1]); O.push(v);
  v = [300, 200]; vertex(v[0], v[1]); O.push(v);
  endShape(CLOSE);
}
function fig3(O){
  let v;
  fill('rgba(0,255,0, 0.25)');
  beginShape();
  v = [100, 185]; vertex(v[0], v[1]); O.push(v);
  v = [100, 215]; vertex(v[0], v[1]); O.push(v);
  v = [70, 215]; vertex(v[0], v[1]); O.push(v);
  v = [70, 315]; vertex(v[0], v[1]); O.push(v);
  v = [100, 315]; vertex(v[0], v[1]); O.push(v);
  v = [100, 340]; vertex(v[0], v[1]); O.push(v);
  v = [200, 340]; vertex(v[0], v[1]); O.push(v);
  v = [200, 315]; vertex(v[0], v[1]); O.push(v);
  v = [230, 315]; vertex(v[0], v[1]); O.push(v);
  v = [230, 215]; vertex(v[0], v[1]); O.push(v);
  v = [200, 215]; vertex(v[0], v[1]); O.push(v);
  v = [200, 185]; vertex(v[0], v[1]); O.push(v);
  endShape(CLOSE);
}
function fig4(O){
  let v;
  fill('rgba(0,255,0, 0.25)');
  beginShape();
  v = [90, 60]; vertex(v[0], v[1]); O.push(v);
  v = [0, 120]; vertex(v[0], v[1]); O.push(v);
  v = [25, 230]; vertex(v[0], v[1]); O.push(v);
  v = [145, 230]; vertex(v[0], v[1]); O.push(v);
  v = [180, 120]; vertex(v[0], v[1]); O.push(v);
  endShape(CLOSE);
}
function clipPolygon(R){
  let v;
  noFill();
  beginShape();
  v = [45, 105]; vertex(v[0], v[1]); R.push(v);
  v = [45, 255]; vertex(v[0], v[1]); R.push(v);
  v = [255, 255]; vertex(v[0], v[1]); R.push(v);
  v = [255, 105]; vertex(v[0], v[1]); R.push(v);
  endShape(CLOSE);
}
function newfig(O){
  fill('rgba(0,255,0, 0.25)');
  beginShape();
  for(var i = 0; i < O.length; i++){
    vertex(O[i][0],O[i][1]);
  }
  endShape(CLOSE);
}
function findEdge(R,e, edge){
  let p = [];
  p.push(R[e]);
  if (e == edge -1)
    p.push(R[e - (edge - 1)]);
  else p.push(R[e + 1]);
  return p;
}
function intersection(P, S, E){
  let p = [];
  var x1 = P[0], x2 = S[0], x3 = E[0][0], x4 = E[1][0];
  var y1 = P[1], y2 = S[1], y3 = E[0][1], y4 = E[1][1];
  p.push(((x1 * y2 - y1 * x2) * (x3 - x4)
        - (x1 - x2) * (x3 * y4 - y3 * x4))
         / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)));
  p.push(((x1 * y2 - y1 * x2) * (y3 - y4)
        - (y1 - y2) * (x3 * y4 - y3 * x4))
         / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)));
  return p;
}
function inside( S, E){
  var x = S[0], x1 = E[0][0], x2 = E[1][0];
  var y = S[1], y1 = E[0][1], y2 = E[1][1];
  var p = (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1);
  return p;
}
  let output = [];//array do figura
  let R = [];//array da figura de recorte
  let input = [];
  let S, P, I = [];//current, previous and intersection point
  let E = [];
  var edge = 4;
  var n = 0;
function draw() {
  background(255);
  textSize(15);
  fill(0);
  text('Algoritmo de Recorte - Suhterland Hodgman', 1, 12);
  textSize(12);
  text('(selecine um polinomio e clique nesta imagem)', 1, 25);
  if(mode == true){
    if(n > 0 && n % 2 == 1){
      output = [];

    if (f == 'polynomial A')
      fig1(output);
    if (f == 'polynomial B')
      fig2(output);
    if (f == 'polynomial C')
      fig3(output);
      if (f == 'polynomial D')
        fig4(output);
    }
    else if (n > 0 && n % 2 == 0){
      newfig(output);
    }
  clipPolygon(R);
  }
}
function mousePressed() {
  for(var e = 0; e < edge; e++){
    input = output;
    output = [];
    E = findEdge(R, e, edge);
    for(var i = 0; i < input.length; i++){
      S = input[i];
      P = input[(i + input.length - 1) % input.length];
      I = intersection(P, S, E);
      if(inside(S, E) < 0 ){
        if(inside(P, E) >= 0)
          output.push(I);
        output.push(S);
      }
      else if (inside(P, E) < 0)
        output.push(I);
    }
  }
  n++;
  //redraw();
}
function mySelectEvent() {
  f = menu.value();
  mode = true;
  n++;
}