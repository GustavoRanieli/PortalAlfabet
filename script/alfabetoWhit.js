
window.onload = function() {
	let myCanvas = document.getElementById("myCanvas");
	let ctx = myCanvas.getContext("2d");
	let letra = document.querySelectorAll('#letra');
	let container = document.querySelector('#Container')
	let target
    
    // Fill Window Width and Height
    myCanvas.width = 920	
	myCanvas.height = 700
	
	// Set Background Color
    let img = new Image();
	let neutralBackground = new Image();
	let borracha = document.querySelector('#borracha')

    img.onload = function() {
		ctx.drawImage(neutralBackground, myCanvas.width - 1180, myCanvas.height - 880);
        ctx.drawImage(img, myCanvas.width - 900, myCanvas.height - 550);
		ctx.createPattern(ctx, 'no-repeat');	
    }; 

	letra.forEach(element => {
		let radomColor = Math.floor(Math.random()*0x1000000).toString(16);
		element.style.color = `#${radomColor}`;

			element.addEventListener('click', (e) => {
				neutralBackground.src = '/assets/img/telabranca.PNG';
				let letraAtual = e.target.attributes[1].nodeValue;
				let audio = new Audio(`/assets/audio/${letraAtual}.m4a`);
				img.src = `/assets/img/Alfabeto/${letraAtual}.PNG`;
				audio.play();

				target = e.target
			})
			
});
	borracha.addEventListener('click', (e) => {
		e.preventDefault()
		target.click()
	})



    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,myCanvas.width, myCanvas.height);
	
    // Mouse Event Handlers
	if(myCanvas){
		let isDown = false;
		let canvasX, canvasY;
		ctx.lineWidth = 45;
		
		$(myCanvas)
		.mousedown(function(e){
			isDown = true;
			ctx.beginPath();
			canvasX = e.pageX - myCanvas.offsetLeft;
			canvasY = e.pageY - myCanvas.offsetTop;
			ctx.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				ctx.lineTo(canvasX, canvasY);
				ctx.strokeStyle = "#000";
				ctx.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			ctx.closePath();
		});
	};
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(evt) {
			ctx.beginPath();
			ctx.moveTo(
				evt.touches[0].pageX,
				evt.touches[0].pageY
			);
			this.started = true;
		},
		move: function(evt) {
			if (this.started) {
				ctx.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				ctx.strokeStyle = "#000";
				ctx.lineWidth = 5;
				ctx.stroke();
			}

		},
		end: function(evt) {
			this.started = false;
		}
	};
	
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);
};

