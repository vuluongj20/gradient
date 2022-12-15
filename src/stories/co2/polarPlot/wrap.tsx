import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: var(--size-m);
  margin: 0 auto;

  /* Axes */
  .axis .tick,
  .ticks .tick {
    font-size: 0.875rem;
    position: relative;
    fill: var(--color-label);
    transition: opacity var(--animation-slow-out);
    ${(p) => p.theme.media.s} {
      font-size: 0.75rem;
    }
  }

  .tick:not(.secondary) {
    animation: opacity var(--animation-slow-out);
  }
  .ticks .tick .text {
    fill: var(--color-label);
  }

  /* Grid lines */
  .grid-line,
  .grid-circle {
    fill: none;
    stroke: var(--color-line);
    opacity: 0.8;
    transition: opacity var(--animation-slow-out);
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
    stroke: var(--color-body);
  }

  .stretch {
    stroke: var(--color-label);
    opacity: 0;
    transition: opacity var(--animation-slow-out);
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
