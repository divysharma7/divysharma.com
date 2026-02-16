<template>
  <div style="display: none"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  catImage: {
    type: String,
    default: '/oneko.gif'
  },
  containerId: {
    type: String,
    default: null
  }
});

let nekoEl = null;
let animationFrameId = null;
let mousePosX = 0;
let mousePosY = 0;
let isReducedMotion = false;
let containerEl = null;

// Configuration
const nekoSpeed = 10;
const spriteSets = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

// State
let nekoPosX = 32;
let nekoPosY = 32;
let frameCount = 0;
let idleTime = 0;
let idleAnimation = null;
let idleAnimationFrame = 0;
let lastFrameTimestamp = null;

function setSprite(name, frame) {
  const sprite = spriteSets[name][frame % spriteSets[name].length];
  if (nekoEl) {
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }
}

function resetIdleAnimation() {
  idleAnimation = null;
  idleAnimationFrame = 0;
}

function idle() {
  idleTime += 1;

  // every ~ 20 seconds
  if (
    idleTime > 10 &&
    Math.floor(Math.random() * 200) == 0 &&
    idleAnimation == null
  ) {
    let avalibleIdleAnimations = ['sleeping', 'scratchSelf'];
    if (nekoPosX < 32) avalibleIdleAnimations.push('scratchWallW');
    if (nekoPosY < 32) avalibleIdleAnimations.push('scratchWallN');
    if (nekoPosX > (containerEl ? containerEl.clientWidth : window.innerWidth) - 32) avalibleIdleAnimations.push('scratchWallE');
    if (nekoPosY > (containerEl ? containerEl.clientHeight : window.innerHeight) - 32) avalibleIdleAnimations.push('scratchWallS');
    idleAnimation =
      avalibleIdleAnimations[
        Math.floor(Math.random() * avalibleIdleAnimations.length)
      ];
  }

  switch (idleAnimation) {
    case 'sleeping':
      if (idleAnimationFrame < 8) {
        setSprite('tired', 0);
        break;
      }
      setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
      if (idleAnimationFrame > 192) {
        resetIdleAnimation();
      }
      break;
    case 'scratchWallN':
    case 'scratchWallS':
    case 'scratchWallE':
    case 'scratchWallW':
    case 'scratchSelf':
      setSprite(idleAnimation, idleAnimationFrame);
      if (idleAnimationFrame > 9) {
        resetIdleAnimation();
      }
      break;
    default:
      setSprite('idle', 0);
      return;
  }
  idleAnimationFrame += 1;
}

function frame() {
  frameCount += 1;
  
  let targetX = mousePosX;
  let targetY = mousePosY;

  // If container constrained, adjust target coordinates relative to container
  if (containerEl) {
    const rect = containerEl.getBoundingClientRect();
    // If mouse is outside container, target random point inside or center
    // But better to just follow mouse if inside, or idle if outside?
    // For ChatWidget, let's make it follow mouse but CLAMP to container bounds
    
    // Convert global mouse to local container coords
    let localMouseX = mousePosX - rect.left;
    let localMouseY = mousePosY - rect.top;

    targetX = Math.min(Math.max(16, localMouseX), rect.width - 16);
    targetY = Math.min(Math.max(16, localMouseY), rect.height - 16);
  }

  const diffX = nekoPosX - targetX;
  const diffY = nekoPosY - targetY;
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

  if (distance < nekoSpeed || distance < 16) {
    idle();
    return;
  }

  idleAnimation = null;
  idleAnimationFrame = 0;

  if (idleTime > 1) {
    setSprite('alert', 0);
    // count down after being alerted before moving
    idleTime = Math.min(idleTime, 7);
    idleTime -= 1;
    return;
  }

  let direction;
  direction = diffY / distance > 0.5 ? 'N' : '';
  direction += diffY / distance < -0.5 ? 'S' : '';
  direction += diffX / distance > 0.5 ? 'W' : '';
  direction += diffX / distance < -0.5 ? 'E' : '';
  setSprite(direction, frameCount);

  nekoPosX -= (diffX / distance) * nekoSpeed;
  nekoPosY -= (diffY / distance) * nekoSpeed;

  const boundaryW = containerEl ? containerEl.clientWidth : window.innerWidth;
  const boundaryH = containerEl ? containerEl.clientHeight : window.innerHeight;

  nekoPosX = Math.min(Math.max(16, nekoPosX), boundaryW - 16);
  nekoPosY = Math.min(Math.max(16, nekoPosY), boundaryH - 16);

  if (nekoEl) {
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }
}

function onAnimationFrame(timestamp) {
  if (!nekoEl || !nekoEl.isConnected) {
    return;
  }
  if (!lastFrameTimestamp) {
    lastFrameTimestamp = timestamp;
  }
  if (timestamp - lastFrameTimestamp > 100) {
    lastFrameTimestamp = timestamp;
    frame();
  }
  animationFrameId = window.requestAnimationFrame(onAnimationFrame);
}

function onMouseMove(event) {
  mousePosX = event.clientX;
  mousePosY = event.clientY;
}


function initNeko() {
  const mount = () => {
    if (props.containerId) {
        containerEl = document.getElementById(props.containerId);
    }
    
    // If container specified but not found, retry after a tick
    if (props.containerId && !containerEl) {
        setTimeout(mount, 50);
        return;
    }

    nekoEl = document.createElement('div');
    nekoEl.id = 'oneko';
    nekoEl.ariaHidden = true;
    nekoEl.style.width = '32px';
    nekoEl.style.height = '32px';
    nekoEl.style.position = containerEl ? 'absolute' : 'fixed';
    
    if (containerEl) {
        containerEl.style.position = 'relative';
        containerEl.style.overflow = 'hidden';
        nekoEl.style.zIndex = 10;
        containerEl.appendChild(nekoEl);
    } else {
        nekoEl.style.zIndex = 2147483647;
        document.body.appendChild(nekoEl);
    }
    
    nekoEl.style.pointerEvents = 'none';
    nekoEl.style.imageRendering = 'pixelated';
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.backgroundImage = `url(${props.catImage})`;

    document.addEventListener('mousemove', onMouseMove);
    animationFrameId = window.requestAnimationFrame(onAnimationFrame);
  };

  mount();
}

onMounted(() => {
  isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  if (isReducedMotion) return;
  initNeko();
});

onUnmounted(() => {
  if (nekoEl) {
    nekoEl.remove();
  }
  document.removeEventListener('mousemove', onMouseMove);
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }
});
</script>

