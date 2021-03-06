import Node from './Node.js';

const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;

let soundPlayed = false;

export default class Bullet extends Node {

    constructor(bulletId, matrix, type, target, scene){
        super(matrix);
        this.matrix = matrix;
        this.id = bulletId;
        //console.log("Bullet initialised");
        this.updateTransform();
        this.scale = [0.1,0.1,0.1];
        this.updateMatrix();
        
        
        this.scene = scene;
        if(this.scene){
            if(type==1){
                this.mesh = this.scene.nodes[21].mesh;
                this.bulletDamage = 1;
            }
            else if(type==0){
                this.mesh = this.scene.nodes[20].mesh;
                this.bulletDamage = 3;
            }
        }
        
        //this.targetId=target;
        //this.target = this.scene.enemies[target];

        this.target = target;

        this.bulletSpeed = 500;

        this.alive = true;
    }

    
    update(dt){
        
        
        this.followEnemy(dt);
        this.colided();

        /*
        const forward = vec3.set(vec3.create(), -Math.sin(this.rotation[1]), 0, -Math.cos(this.rotation[1]));
        
        const velocity = [0, 0, 0];
        let acc = vec3.create();
        vec3.add(acc, acc, forward);
        
        vec3.scaleAndAdd(velocity, velocity, acc, dt*this.bulletSpeed);

        vec3.scaleAndAdd(this.translation, this.translation, velocity, dt)
        this.updateMatrix();
        */
    }
    colided(){
        const distance = vec3.distance(this.translation, this.target.translation);
        const targetId = this.scene.enemies.indexOf(this.target);
        if(this.target.alive && targetId != -1){
            if(distance<0.8){
                this.scene.bullets[this.id] = false;
                this.scene.enemies[targetId].health -= this.bulletDamage;
            }
        }
        else{
            this.scene.bullets[this.id] = false;
        }

    }
    



    followEnemy(dt){
        let direction = vec3.create();
        //console.log(this.translation,this.target);
        vec3.sub(direction, this.translation, this.target.translation);
        vec3.normalize(direction, direction);
        direction[0] = -direction[0];
        direction[1] = 0;
        direction[2] = -direction[2];
        const velocity = [0, 0, 0];
        let acc = vec3.create();
        vec3.add(acc, acc, direction);
            
        vec3.scaleAndAdd(velocity, velocity, acc, dt*this.bulletSpeed);
            
        vec3.scaleAndAdd(this.translation, this.translation, velocity, dt);

        this.updateMatrix();
    }
}