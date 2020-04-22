/* book_of_wall.js */

var yinc;
var yinu;
var yangc;
var yangu;

var hexagram;

var group;

var loaded = 0;

function init() {
	group = new Pizzicato.Group();
	yinc = new Pizzicato.Sound({
		source: 'file',
		options: { path: './audio/yinc.webm', loop: true }
	}, function() {loaded_file('yinc')});
	
	yinu = new Pizzicato.Sound({
		source: 'file',
		options: { path: './audio/yinu.webm', loop: true }
	}, function() {loaded_file('yinu')});
	
	yangc = new Pizzicato.Sound({
		source: 'file',
		options: { path: './audio/yangc.webm', loop: true }
	}, function() {loaded_file('yangc')});
	
    yangu = new Pizzicato.Sound({
		source: 'file',
		options: { path: './audio/yangu.webm', loop: true }
	}, function() {loaded_file('yangu')});
	
}

function loaded_file(filename) {
	console.log(filename + ' loaded');
	loaded += 1;
	
	if (loaded == 4) {
		document.getElementById("content").innerHTML = "<button onclick=\"book()\">&middot;</button>";
		book();
	}
}

function update_content() {
	rev_hex = hexagram.slice().reverse();
	
	hex_container = document.getElementById("hexagram-container");
	hex_container.innerHTML="";
	var i;
	for (i = 0; i < 6; i++) {
		linediv = build_line(rev_hex[i]);
		hex_container.appendChild(linediv);
	}
}

function build_line(linetype) {
	lines = {6: ["barc","midbarw"],
		     7: ["bar", "midbar"],
		     8: ["bar", "midbarw"],
		     9: ["barc", "midbarc"]}
    
    lineclasses = lines[linetype]
    
    linediv = document.createElement('div');
    linediv.className = "line";
    
    bardiv = document.createElement('div');
    bardiv.className = lineclasses[0];
    bardiv2 = document.createElement('div');
    bardiv2.className = lineclasses[0];
    
    midbardiv = document.createElement('div');
    midbardiv.className = lineclasses[1];
    
    linediv.appendChild(bardiv);
    linediv.appendChild(midbardiv);
    linediv.appendChild(bardiv2);
    
    return linediv;
}

function book() {
	group.stop();
    hexagram = generate_hexagram();
	update_content();
	play_sound();
}

function generate_hexagram() {
	var i;
	var lines = [];
	for (i = 0; i < 6; i++) {
		lines.push(generate_line());
    }
	return lines;
}

function generate_line() {
	return cointoss() + cointoss() + cointoss();
}

function cointoss() {
	return Math.floor(Math.random() * 2) + 2;
}

function play_sound() {
	lines = {6: yinc, 7: yangu, 8: yinu, 9: yangc};
	
	l1 = lines[hexagram[0]].clone();
	l1lp = new Pizzicato.Effects.LowPassFilter();
	l1lp.frequency = 200;
	l1.addEffect(l1lp);
	
	l2 = lines[hexagram[1]].clone();
	l2hp = new Pizzicato.Effects.HighPassFilter();
	l2hp.frequency = 200;
	l2lp = new Pizzicato.Effects.LowPassFilter();
	l2lp.frequency = 600;
	l2.addEffect(l2hp);
	l2.addEffect(l2lp);
	
	l3 = lines[hexagram[2]].clone();
	l3hp = new Pizzicato.Effects.HighPassFilter();
	l3hp.frequency = 600;
	l3lp = new Pizzicato.Effects.LowPassFilter();
	l3lp.frequency = 2000;
	l3.addEffect(l3hp);
	l3.addEffect(l3lp);
	
	l4 = lines[hexagram[3]].clone();
	l4hp = new Pizzicato.Effects.HighPassFilter();
	l4hp.frequency = 2000;
	l4lp = new Pizzicato.Effects.LowPassFilter();
	l4lp.frequency = 4500;
	l4.addEffect(l4hp);
	l4.addEffect(l4lp);
	
	l5 = lines[hexagram[4]].clone();
	l5hp = new Pizzicato.Effects.HighPassFilter();
	l5hp.frequency = 4500;
	l5lp = new Pizzicato.Effects.LowPassFilter();
	l5lp.frequency = 8000;
	l5.addEffect(l5hp);
	l5.addEffect(l5lp);
	
	l6 = lines[hexagram[5]].clone();
	l6hp = new Pizzicato.Effects.HighPassFilter();
	l6hp.frequency = 8000;
	l6.addEffect(l6hp);
	
	group = new Pizzicato.Group([l1,l2,l3,l4,l5,l6]);
	group.play();
}
