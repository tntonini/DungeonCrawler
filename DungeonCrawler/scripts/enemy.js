function Harambe(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "NPC";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("Harambe");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;

    this.messages = {
            "data" : [
            "Feel free to take this key.  It may help you.",
            "Otherwise, welcome to Gorilla Goods!",
            "You look like a mighty warrior.",
            "We haven't officially opened yet...",
            "Please come by when we're open!",
            "I was a big name up in Cincinnati.",
            "Sadly, fate forced me here.",
            "I do find solace in this line of work."
            ]
    };




    this.timer = 1000;


    this.onCollide = function(scene, collider) {
        return true;
    }

    this.Start = function(scene) {
        this.components.messageHandler = new MessageHandler(this);
        this.components.boxCollider = new BoxCollider(64, 64, this);
        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

        for(var i = 0; i < this.messages.data.length; i++) {
            this.components.messageHandler.Push(this.messages.data[i]);
        }


    }

    this.Update = function(scene) {
       this.transform.Translate(this.velocity.x, this.velocity.y, scene);


       this.timer -= Scene.deltaTime;

       if(this.timer <= 0) {
        this.components.messageHandler.Pop();
        this.timer = 10000;
       }


    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, 0, 0, 64, 64, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 64, 64);
    }


}




function NPC(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "NPC";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("characters");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;

    this.messages = {
            "data" : [ "I'm an NPC!" ]
    };


    this.onCollide = function(scene, collider) {
        return true;
    }

    this.onInteract = function() {

        this.components.messageHandler.Pop();



    }

    this.Start = function(scene) {
        this.components.messageHandler = new MessageHandler(this);
        this.components.boxCollider = new BoxCollider(16, 16, this);
        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

        for(var m in this.messages.data) {
            this.components.messageHandler.Push(m);
        }


    }

    this.Update = function(scene) {
       this.transform.Translate(this.velocity.x, this.velocity.y, scene);

    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, 0, 64, 16, 16, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 16, 16);
    }


}
function Skull(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Skull";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("Skull");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;
    this.frame=0;

    this.health = 200;
    this.doDamage = function(value) {
        this.health -= value;
    }


    this.onCollide = function(scene, collider) {


        if(collider.parent.type == "SwordSlash") {

            this.velocity.x += collider.parent.velocity.x*4;
            this.velocity.y += collider.parent.velocity.y*4;
        }


        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(30, 30, this);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        if(this.health <= 0) {
            this.delete = true;
        }

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);

        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x += scene.deltaTime * 0.01;

        } else {
            this.velocity.x += -scene.deltaTime * 0.01;

        }

        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y += scene.deltaTime * 0.01;

        } else {
            this.velocity.y += -scene.deltaTime * 0.01;
        }
        this.frame+=scene.deltaTime*0.01;
        this.frame=this.frame%4;
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, Math.floor(this.frame)*30, 0, 30, 30, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 30, 30);
    }


}
function Bird(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Bird";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("Bird");
    this.flipX = false;

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;
    this.frame=0;
        this.health = 500;
    this.doDamage = function(value) {
        this.health -= value;
    }

    this.onCollide = function(scene, collider) {

        if(collider.parent.type == "SwordSlash") {

            this.velocity.x += collider.parent.velocity.x*4;
            this.velocity.y += collider.parent.velocity.y*4;
        }



        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(30, 80, this);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        if(this.health <= 0) {
            this.delete = true;


            //Randomly drop coins
            var c = Math.floor(getRandomArbitrary(128, 256));

            for(var i = 0; i < c; i++) {

                var o = new Coin(this.transform.position.x, this.transform.position.y);
                o.velocity.x = getRandomArbitrary(-4, 4);
                o.velocity.y = getRandomArbitrary(-4, 4);



                Scene.addObject(o);
            }
        }

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);

        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x += scene.deltaTime * 0.01;
            this.flipX = false;

        } else {
            this.velocity.x += -scene.deltaTime * 0.01;
            this.flipX = true;

        }

        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y += scene.deltaTime * 0.01;

        } else {
            this.velocity.y += -scene.deltaTime * 0.01;
        }
        this.frame+=scene.deltaTime*0.01;
        this.frame=this.frame%4;
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, Math.floor(this.frame)*60 + (this.flipX ? 240 : 0), 0, 60, 80, Math.floor(this.transform.position.x - 32),Math.floor(this.transform.position.y - 60), 60, 80);
    }


}
function Wizerd(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Wizerd";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("Wizerd");
    this.flipX = false;

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;
    this.frame=0;
        this.health = 50;
    this.doDamage = function(value) {
        this.health -= value;
    }

    this.onCollide = function(scene, collider) {

        if(collider.parent.type == "SwordSlash") {

            this.velocity.x += collider.parent.velocity.x*4;
            this.velocity.y += collider.parent.velocity.y*4;
        }



        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(32, 32, this);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        if(this.health <= 0) {
            this.delete = true;
        }

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);

        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x += scene.deltaTime * 0.01;
            this.flipX = false;

        } else {
            this.velocity.x += -scene.deltaTime * 0.01;
            this.flipX = true;

        }

        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y += scene.deltaTime * 0.01;

        } else {
            this.velocity.y += -scene.deltaTime * 0.01;
        }
        this.frame+=scene.deltaTime*0.01;
        this.frame=this.frame%2;
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, Math.floor(this.frame)*32 + (this.flipX ? 64 : 0), 0, 32, 32, Math.floor(this.transform.position.x - 16),Math.floor(this.transform.position.y - 16), 32, 32);
    }


}
function Slime(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Slime";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("characters");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;

    this.health = 100;
    this.doDamage = function(value) {
        this.health -= value;
    }

    this.onCollide = function(scene, collider) {

        if(collider.parent.type == "SwordSlash") {

            this.velocity.x += collider.parent.velocity.x*4;
            this.velocity.y += collider.parent.velocity.y*4;
        }


        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(16, 16, this);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        if(this.health <= 0) {
            this.delete = true;

            //Randomly drop coins
            var c = Math.floor(getRandomArbitrary(1, 16));

            for(var i = 0; i < c; i++) {

                var o = new Coin(this.transform.position.x, this.transform.position.y);
                o.velocity.x = getRandomArbitrary(-2, 2);
                o.velocity.y = getRandomArbitrary(-2, 2);



                Scene.addObject(o);
            }
        }

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);


        this.velocity.x *= 0.8;
        this.velocity.y *= 0.8;

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x += scene.deltaTime * 0.01;

        } else {
            this.velocity.x += -scene.deltaTime * 0.01;

        }

        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y += scene.deltaTime * 0.01;

        } else {
            this.velocity.y += -scene.deltaTime * 0.01;
        }
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, 0, 64, 16, 16, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 16, 16);
    }


}
