import { createTimeline, easings, utils } from 'animejs';
import dingSoundFx from '../../sounds/ding-101492.mp3';
import sharppopSoundFx from '../../sounds/sharp-pop-328170.mp3';
import popSoundFx from '../../sounds/pop-94319.mp3';

const createParticles = () => {
  const particleAmount = 54
  const particleContainer = document.querySelector('.particles-container')
  const particles = document.querySelectorAll('.particle')

  if (!particleContainer || particles.length) return

  for (let i = 0; i < particleAmount; i++) {
    const particleElement = document.createElement('span')
    particleElement.className = 'particle'
    particleElement.setAttribute('data-idx', `idx-${i + 1}`)
    particleContainer.appendChild(particleElement)
  }
}


const animateParticles = () => {
  let particlesTimeline

  utils.$('.particle').forEach(($particle, idx) => {
    const angle = ((idx * utils.random(1, 1.1, 2) * 2 * Math.PI) / 12)
    const distance = utils.random(30, 40)

    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    utils.set($particle, {
      backgroundColor: () => `var(--hex-${utils.randomPick(['red', 'orange', 'yellow', 'blue', 'purple', 'green'])})`,
      scale: utils.random(1, 2, 2),
    })

    particlesTimeline = createTimeline({ defaults: { ease: easings.cubicBezier(0, 0.7, 0, 1) }, onComplete: () => $particle.remove() })
      .label('start')
      .add($particle, { x: x.toPrecision(2), y: y.toPrecision(2), duration: 2000, delay: utils.randomPick([0, 10, 20, 30, 40, 100]) }, 'start')
      .label('sparkle')
      .add($particle, { opacity: { to: utils.random(0, 1, 2) }, duration: utils.randomPick([100, 200, 300]), loop: utils.random(1, 5) }, 'start')
      .label('fade-out')
      .add($particle, { opacity: { to: 0 }, delay: utils.randomPick([0, 100, 200]), duration: 400, ease: 'outExpo' }, '<')
  })

  const heartTimeline = createTimeline({ defaults: { ease: easings.cubicBezier(0, 0.7, 0, 1) }, onBegin: () => new Audio(sharppopSoundFx).play() })
    .label('start')
    .add('.button-icon', { scale: 0, opacity: 0.5, duration: 0 })
    .add('.button-icon', { scale: 1.2, opacity: 0.7, duration: 100, delay: 400 })
    .add('.button-icon', { scale: 1, opacity: 1, duration: 400, delay: 400 })

  const bubbleTimeline = createTimeline({ defaults: { ease: easings.cubicBezier(0, 0.7, 0, 1) } })
    .label('start')
    .add('.bubble', { opacity: 1, scale: 0.8, borderWidth: 0, backgroundColor: '#d88adcee', duration: 100, delay: 50, onComplete: () => new Audio(popSoundFx).play() })
    .add('.bubble', { opacity: 0, scale: 1.5, borderWidth: 5, backgroundColor: '#d88adc00', delay: 250, duration: 1000 })

  createTimeline({ onBegin: () => new Audio(dingSoundFx).play() })
    .label('start')
    .sync(heartTimeline, 'start')
    .sync(bubbleTimeline, 'start')
    .sync(particlesTimeline, 'start')
}


export const ParticleButton = () => {
  const handleClick = () => {
    if (document.querySelectorAll('.particle').length) return

    createParticles()
    animateParticles()
  }

  return (
    <div className='particle-button-container'>
      <button className="particle-button" onClick={handleClick}>
        <div className="particles-container"></div>
        <span className="bubble"></span>
        <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
        </svg>
      </button>
    </div>
  )
}