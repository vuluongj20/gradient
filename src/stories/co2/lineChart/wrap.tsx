import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(p) => p.theme.breakpoints.l};
  margin: 0 auto;

  .viz-svg-wrap {
    width: 85%;
    overflow: visible;
  }

  /* Axes */
  .axis > .domain {
    display: none;
  }
  .axis text {
    font-size: 0.875rem;
    color: var(--color-label);
    ${(p) => p.theme.media.s} {
      font-size: 0.75rem;
    }
  }

  .axis.x text {
    transform: translateX(1.6rem);
  }
  .axis.y text {
    transform: translateY(-0.8rem);
  }
  .bottom-axis {
    stroke: var(--color-label);
    stroke-linecap: round;
    stroke-width: 2;
  }

  /* Grid lines */
  .grid > .domain {
    display: none;
  }
  .grid line {
    stroke: var(--color-line);
    opacity: 0.8;
  }

  /* Data line */
  .data-line {
    stroke: var(--color-body);
    stroke-width: 2;
    stroke-linejoin: round;
    fill: none;
    transition: stroke 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    ${(p) => p.theme.media.xs} {
      stroke-width: 1.5;
    }
  }
  .data-line.faded {
    opacity: 0.2;
  }

  /* Regression line */
  .reg-line {
    stroke: var(--theme);
    stroke-width: 3;
    stroke-linejoin: round;
    fill: none;
    ${(p) => p.theme.media.xs} {
      stroke-width: 2;
    }
  }

  /* Hover elements */
  .hover-line,
  .hover-data-circle,
  .hover-text-group,
  .hover-reg-circle,
  .hover-reg-label,
  .hover-reg-text,
  .hover-diff-line,
  .hover-diff-label,
  .hover-diff-text {
    opacity: 0;
    transition: opacity ${(p) => p.theme.animation.fastOut};
  }
  svg.hover-initiated:hover {
    .hover-line.visible,
    .hover-data-circle.visible,
    .hover-text-group.visible,
    .hover-reg-circle.visible,
    .hover-reg-label.visible,
    .hover-reg-text.visible,
    .hover-diff-line.visible,
    .hover-diff-label.visible,
    .hover-diff-text.visible {
      opacity: 1;
    }
  }
  .hover-line {
    stroke: var(--color-label);
    stroke-width: 2;
  }
  .hover-data-circle {
    fill: var(--theme);
  }
  .hover-data-circle.out {
    fill: var(--warm);
  }
  .hover-text-group {
    font-size: 0.875rem;
    ${(p) => p.theme.media.s} {
      font-size: 0.75rem;
    }
  }
  .hover-rect {
    width: 13.1em;
    height: 2.8em;
    fill: var(--color-o-background);
    stroke: var(--color-line);
    transform: translate(-14.6em, -4.72em);
    transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    will-change: transform, width, height;
    filter: drop-shadow(var(--box-shadow-s));
  }
  .hover-text-group.big > .hover-rect {
    width: 17.8em;
    height: 6.4em;
    transform: translate(-19em, -8.75em);
  }

  .hover-data-label,
  .hover-reg-label,
  .hover-diff-label {
    fill: var(--color-label);
  }

  .hover-data-label {
    transform: translate(-13.46em, -3em);
    transition: none;
  }
  .hover-data-text {
    fill: var(--color-heading);
    transform: translate(-8.8em, -3em);
    font-weight: 500;
  }
  .hover-data-label.big {
    transform: translate(-13.46em, -7em);
  }
  .hover-data-text.big {
    transform: translate(-8.8em, -7em);
  }
  .hover-data-text.out {
    fill: var(--color-body);
  }

  .hover-reg-circle {
    fill: var(--theme);
  }
  .hover-reg-label {
    transform: translate(-15.9em, -5.2em);
  }
  .hover-reg-text {
    fill: var(--theme);
    transform: translate(-8.8em, -5.2em);
    font-weight: 500;
  }

  .hover-diff-line {
    stroke: var(--color-error-text);
    stroke-width: 2;
  }
  .hover-diff-label {
    transform: translate(-17.7em, -3.4em);
  }
  .hover-diff-text {
    fill: var(--color-error-text);
    transform: translate(-8.8em, -3.4em);
    font-weight: 500;
  }

  /* MSE */
  .mse-group {
    font-size: 0.875rem;
    opacity: 0;
    &.visible {
      opacity: 1;
    }
  }
  ${(p) => p.theme.media.s} {
    .mse-group {
      display: none;
    }
  }
  .mse-rect {
    fill: var(--color-o-background);
    stroke: var(--color-line);
    stroke-width: 1;
    rx: 0.4rem;
    ry: 0.4rem;
    width: 12.6em;
    height: 5.8em;
    transform: translate(-1.2em, -1.65em);
    will-change: width;
    transition: width 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    filter: drop-shadow(var(--box-shadow-s));
  }
  .mse-rect.quadratic {
    width: 14.8em;
  }
  .mse-rect.cosine {
    width: 24em;
  }
  .mse-title {
    fill: var(--color-label);
  }
  .mse-equation-label {
    fill: var(--color-label);
    transform: translateY(1.6em);
  }
  .mse-equation {
    position: absolute;
    fill: var(--color-label);
    transform: translate(3.6em, 1.6em);
  }
  .mse-equation > tspan {
    fill: var(--color-body);
    font-weight: 500;
    visibility: hidden;
    &.linear,
    &.visible {
      visibility: visible;
    }
  }
  .mse-equation > .span.off {
    fill: var(--color-label);
  }
  .mse-acc-label {
    fill: var(--color-label);
    transform: translateY(3.2em);
  }
  .mse-acc-text {
    fill: var(--color-error-text);
    transform: translate(3.2em, 3.2em);
    font-weight: 500;
  }
`

export default Wrap
