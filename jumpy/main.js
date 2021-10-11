title = "JUMPY!";

description = `
  [TAP] JUMP

    [HOLD] 
  CHARGE JUMP
`;

characters = [
`
 rr  
rllr 
rrrr
rrrr
rrrr
r  r 
  `,
];

options = {
  theme: 'dark',
  seed: 17.2,
  isPlayingBgm: true

};

let jumpHold = 0;
let jumpHeight = 0;
let jumpHeightHalf = 0;
let slideDown = 0;
let midJump = false;

const JUMP = {
  JUMPHEIGHT: 50,
  JUMPHEIGHTHALF: 25,
  JUMPHOLDHEIGHT: 70,
  JUMPHOLDHEIGHTHALF: 35,
};
let p;
let pRelativeToRec = 0;
let currentRec = 0;
p = {
  upSpeed: 0,
  sideSpeed: 0,
  downSpeed: 0,
  xpos: 50,
  ypos: 88
};

const PLATFORM = {
  height: 2
};

let recentPlatform = 70;
let rec2;
let rec1;
let jumpAllowed = false;
let spawnRec
spawnRec = {
  ypos: 90
}

rec1 = {
  speed: .5,
  width: 30,
  gap: rnd(15,25),
  xpos: rnd(0, 70),
  ypos: 70
};

rec2 = {
  speed: -.5,
  width: 30,
  gap: rnd(15,25),
  xpos: rnd(0, 70),
  ypos: 50
};

function update() {
  if (!ticks) {
  }
  score = currentRec;
  if (jumpHeight > 0) {
    jumpAllowed = false;
  } else {
    jumpAllowed = true;
  }
  color("light_red")
  rect(0, spawnRec.ypos, 100, 10)
  color("light_blue")
  rect (rec1.xpos, rec1.ypos, rec1.width, PLATFORM.height)
  color("light_purple")
  rect (rec2.xpos, rec2.ypos, rec2.width, PLATFORM.height)
  color("black")
  char("a", p.xpos, p.ypos);

  if (char("a", p.xpos, p.ypos).isColliding.rect.light_red) {
    p.downSpeed = 0;
    midJump = false;
  } else if (char("a", p.xpos, p.ypos).isColliding.rect.light_blue) {
      if (p.ypos < rec1.ypos && (p.xpos > rec1.xpos - rec1.width && p.xpos < rec1.xpos + rec1.width)) {
        midJump = false;
        p.sideSpeed = rec1.speed;
        p.xpos += p.sideSpeed;
        p.downSpeed = 0;
        p.upSpeed = 0;
        jumpHeight = 0;
        if (currentRec % 2 == 0) {
          if (currentRec != 0) {
            slideDown = 15;
            rec2.ypos = rec1.ypos - 15;
          }
          currentRec++;
          updateDifficulty();
          play("powerUp");
        }
        if (currentRec == 1) {
          spawnRec.ypos = 150;
        }
        pRelativeToRec = p.xpos - rec1.xpos;
      } else {
        p.upSpeed = 0;
        p.downSpeed = 1;
      } 
  } else if (char("a", p.xpos, p.ypos).isColliding.rect.light_purple) {
      if (p.ypos < rec2.ypos && (p.xpos > rec2.xpos - rec2.width && p.xpos < rec2.xpos + rec2.width)) {
        midJump = false;
        p.sideSpeed = rec2.speed;
        p.xpos += p.sideSpeed;
        p.downSpeed = 0;
        p.upSpeed = 0;
        jumpHeight = 0;
        if (currentRec % 2 == 1) {
          slideDown = 15;
          rec1.ypos = rec2.ypos - 15;
          currentRec++;
          updateDifficulty();
          play("powerUp");
        }
        pRelativeToRec = p.xpos - rec2.xpos;
      } else {
        p.upSpeed = 0;
        p.downSpeed = 1;
      } 
  } else {
    jumpAllowed = false;
  }
  if (slideDown > 0) {
    rec1.ypos += 1;
    rec2.ypos += 1;
    p.ypos += 1;
    slideDown--;
  }
  if (p.xpos > 100 || p.xpos < 0) {
    jumpAllowed = false;
  }
  p.ypos += p.downSpeed;
  rec1.xpos += rec1.speed;
  rec2.xpos += rec2.speed;

  if (rec2.xpos < -1 * rec2.width ) {
    rec2.xpos = 100;
    if (currentRec % 2 == 0 && currentRec != 0 && midJump == false) {
      p.xpos = rec2.xpos + pRelativeToRec;
    }
  }
  if (rec1.xpos > 100) {
    rec1.xpos = -1 * rec1.width;
    if (currentRec % 2 == 1 && midJump == false) {
      p.xpos = rec1.xpos + pRelativeToRec;
    }
  }
  if (input.isPressed && jumpAllowed == true) {
    jumpHold++;
  }
  if (input.isJustReleased && jumpAllowed == true) {
    play("jump");
    midJump = true;
    jumpAllowed = false;
    p.upSpeed = 1;
    p.sideSpeed = 0;
    if (jumpHold >= 40) {
      jumpHeight = JUMP.JUMPHOLDHEIGHT;
      jumpHeightHalf = JUMP.JUMPHOLDHEIGHTHALF;
    } else {
      jumpHeight = JUMP.JUMPHEIGHT;
      jumpHeightHalf = JUMP.JUMPHEIGHTHALF;
    }
    jumpHold = 0;
  }
  if (jumpHeight > jumpHeightHalf) {
    p.sideSpeed = 0;
    p.ypos -= p.upSpeed;
    jumpHeight--;
  } else if (jumpHeight > 0) {
    p.sideSpeed = 0;
    p.upSpeed = 0;
    p.downSpeed = 1;
    jumpHeight--;
  }
  if (p.ypos == 100) {
    end();
    jumpHold = 0;
    jumpHeight = 0;
    jumpHeightHalf = 0;
    slideDown = 0;
    midJump = false;
    pRelativeToRec = 0;
    currentRec = 0;
    p = {
      upSpeed: 0,
      sideSpeed: 0,
      downSpeed: 0,
      xpos: 50,
      ypos: 88
    };

    recentPlatform = 70;
    jumpAllowed = false;
    spawnRec = {
      ypos: 90
    }

  rec1 = {
    speed: .5,
    width: 30,
    gap: rnd(15,25),
    xpos: rnd(0, 70),
    ypos: 70
  };

  rec2 = {
    speed: -.5,
    width: 30,
    gap: rnd(15,25),
    xpos: rnd(0, 70),
    ypos: 50
  };
  }
}

function updateDifficulty() {
  if (currentRec == 10) {
    rec1.width = 20;
    rec2.width = 20;
    rec1.speed = .65;
    rec2.speed = -.65;
    p.xpos = rec2.xpos + 5;
  } else if (currentRec == 20) {
    rec1.width = 15;
    rec2.width = 15;
    rec1.speed = .75;
    rec2.speed = -.75;
    p.xpos = rec2.xpos + 5;
  } else if (currentRec == 30) {
    rec1.speed = .9;
  }
}
