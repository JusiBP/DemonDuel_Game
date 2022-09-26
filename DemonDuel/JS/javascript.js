class Demon {
    constructor (name, health, attack, shield, ammo, img100, img60, img30) {
      this.name = name;
      this.health = health;
      this.attack = attack;
      this.shield = shield;
      this.ammo = ammo;
      this.img100 = img100;
      this.img60 = img60;
      this.img30 = img30;
      this.state = ""
    }
  
    pintar() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    choca() {
      if (!((x_coche > (this.x + this.width)) || ((x_coche + 60) < this.x) || (y_coche > (this.y + this.height)) || ((y_coche + 110) < this.y))){
        clearInterval(interval);
      }
    }
  }