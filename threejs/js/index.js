var frameId;
var Matrix = {
    container: '',
    camera: null,
    scene: null,
    particles: [],
    SEPARATION: 120,
    AMOUNTX: 15,
    AMOUNTY: 15,
    renderer: null,
    count: 0,
    mouseX: 0, 
    mouseY: 0,
    _init: function() {

        this.container = document.querySelector('.container');
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;
        this.scene = new THREE.Scene();

        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial({

            color: 0xffffff,
            program: function ( context ) {

                context.beginPath();
                context.arc( 0, 0, 1, 0, PI2, true );
                context.fill();
            }

        });

        var i = 0;

        for (var ix = 0; ix < this.AMOUNTX; ix ++) {

            for (var iy = 0; iy < this.AMOUNTY; iy ++) {

                particle = this.particles[ i ++ ] = new THREE.Particle(material);
                particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2);
                particle.position.z = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2);
                this.scene.add(particle);
            }
        }

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        //document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        //window.addEventListener( 'resize', onWindowResize, false );
    },
    onDocumentMouseMove: function(event){
        Matrix.mouseX = event.clientX - window.innerWidth / 2;
        Matrix.mouseY = event.clientY - window.innerHeight / 2;
    },
    move: function() {
        var _this = this;
        _this.camera.position.x += (_this.mouseX - _this.camera.position.x) * .05;
        _this.camera.position.y += (-_this.mouseY - _this.camera.position.y) * .05;
        _this.camera.lookAt(_this.scene.position);

        var i = 0;

        for ( var ix = 0; ix < _this.AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < _this.AMOUNTY; iy ++ ) {

                particle = _this.particles[ i++ ];
                particle.position.x = ix * _this.SEPARATION - ((_this.AMOUNTX * _this.SEPARATION) / 2);
                particle.position.z = iy * _this.SEPARATION - ((_this.AMOUNTY * _this.SEPARATION) / 2);
                particle.position.y = (Math.sin((ix + _this.count) * 0.3) * 50) + (Math.sin((iy + _this.count) * 0.5) * 50);
                particle.scale.x = particle.scale.y = (Math.sin((ix + _this.count) * 0.3) + 1) * 2 + (Math.sin((iy + _this.count) * 0.5) + 1) * 2;
            }
        }

        _this.renderer.render(_this.scene, _this.camera);
        _this.count += 0.1;
    },
    change: function(type) {
        switch(type){
            case 'rectange' : this.showRectange(); break;
            case 'wave' : move(); break;
        }
    },
    showRectange: function() {
        var _this = this;
        window.cancelAnimationFrame(frameId);
        _this.camera.position.x = 0;
        _this.camera.position.y = 0;
        _this.camera.lookAt(_this.scene.position);
        var i = 0;

        for ( var ix = 0; ix < _this.AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < _this.AMOUNTY; iy ++ ) {

                particle = _this.particles[ i++ ];
                particle.position.z = 0;
                particle.scale.x = particle.scale.y = 10;
                particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2);                
                particle.position.y = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2);
            }
        }
        _this.renderer.render(_this.scene, _this.camera);
    }
}

function move() {
	
    Matrix.move();
    frameId = requestAnimationFrame(move);
}

Matrix._init();
move();

