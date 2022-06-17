import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: ${(p) => p.theme.breakpoints.m};
  margin: 0 auto;

  /* Axes */
  .axis .tick,
  .ticks .tick {
    font-size: 0.875rem;
    position: relative;
    fill: ${(p) => p.theme.label};
    transition: opacity ${(p) => p.theme.animation.slowOut};
    ${(p) => p.theme.utils.media.s} {
      font-size: 0.75rem;
    }
  }

  .tick:not(.secondary) {
    animation: opacity ${(p) => p.theme.animation.slowOut};
  }
  .ticks .tick .text {
    fill: ${(p) => p.theme.label};
  }

  /* Grid lines */
  .grid-line,
  .grid-circle {
    fill: none;
    stroke: ${(p) => p.theme.line};
    opacity: 0.8;
    transition: opacity ${(p) => p.theme.animation.slowOut};
  }
  .grid-circle.secondary,
  .r.tick.secondary,
  .grid-circle.off,
  .r.tick.off {
    opacity: 0;
  }
  .grid-circle.secondary.on,
  .r.tick.secondary.on {
    opacity: 1;
  }

  .data-line {
    stroke-linejoin: round;
    stroke-width: 2;
    fill: none;
    stroke: ${(p) => p.theme.body};
  }

  .stretch {
    stroke: ${(p) => p.theme.label};
    opacity: 0;
    transition: opacity ${(p) => p.theme.animation.slowOut};
    &.on {
      opacity: 0.4;
    }
  }
  .winter.stretch {
    fill: var(--cool);
  }
  .summer.stretch {
    fill: var(--warm);
  }
`

export default Wrap
