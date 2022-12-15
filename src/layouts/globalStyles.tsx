import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    /* Safe areas */
    @supports (padding-top: env(safe-area-inset-top)) {
      --sat: env(safe-area-inset-top);
      --sar: env(safe-area-inset-right);
      --sab: env(safe-area-inset-bottom);
      --sal: env(safe-area-inset-left);
    }

    /* Page margins */
    --page-margin-left: max(4rem, var(--sal, 0px));
    --page-margin-right: max(4rem, var(--sar, 0px));

    @media only screen and (max-width: 48rem), only screen and (max-height: 48rem) {
      --page-margin-left: max(2rem, var(--sal, 0px));
      --page-margin-right: max(2rem, var(--sar, 0px));
    }

    @media only screen and (max-width: 30rem) {
      --page-margin-left: max(1rem, var(--sal, 0px));
      --page-margin-right: max(1rem, var(--sar, 0px));
    }

    /* Sizes */
    --size-xs: 30rem;
    --size-s: 48rem;
    --size-m: 64rem;
    --size-l: 78rem;
    --size-xl: 90rem;

    /* Nav sizes */
    --nav-width: 2.5rem;
    --nav-height: 100%;
    ${(p) => p.theme.breakpoints.mobile} {
      --nav-width: 100%;
      --nav-height: 3rem;
    }

    /* Colors */
    --color-white: #F1F2F4;
    --color-black: #212529;
    
    /* Paper palette */
    --color-scale-paper-surface1: #F8EAEC;
    --color-scale-paper-surface2: #FAF0F2;
    --color-scale-paper-surface3: #FCF5F7;
    --color-scale-paper-surface4: #FDFCFC;
    --color-scale-paper-surface5: #FFF;
    --color-scale-paper-gray1: #161213;
    --color-scale-paper-gray2: #2F2729;
    --color-scale-paper-gray3: #4A3F41;
    --color-scale-paper-gray4: #65585A;
    --color-scale-paper-gray5: #7C6E71;
    --color-scale-paper-gray6: #A19798;
    --color-scale-paper-gray7: #C5BFC0;
    --color-scale-paper-gray8: rgb(148 137 139 / 22%);
    --color-scale-paper-gray9: rgb(148 137 139 / 16%);
    --color-scale-paper-red1: #CB3510;
    --color-scale-paper-red2: #ED4921;
    --color-scale-paper-red3: #F17456;
    --color-scale-paper-red4: #F59A84;
    --color-scale-paper-red5: #F9C5B8;
    --color-scale-paper-red6: #FDECE7;
    --color-scale-paper-yellow1: #84A10D;
    --color-scale-paper-yellow2: #9BBD0F;
    --color-scale-paper-yellow3: #BAE312;
    --color-scale-paper-yellow4: #D3F155;
    --color-scale-paper-yellow5: #E5F79C;
    --color-scale-paper-yellow6: #F6FCDE;
    --color-scale-paper-green1: #04A934;
    --color-scale-paper-green2: #06D542;
    --color-scale-paper-green3: #1FFA5E;
    --color-scale-paper-green4: #65FB90;
    --color-scale-paper-green5: #96FDB4;
    --color-scale-paper-green6: #CDFEDB;
    --color-scale-paper-teal1: #0D88A5;
    --color-scale-paper-teal2: #0F9CBD;
    --color-scale-paper-teal3: #12BEE8;
    --color-scale-paper-teal4: #55D3F2;
    --color-scale-paper-teal5: #A0E7F8;
    --color-scale-paper-teal6: #DEF7FC;
    --color-scale-paper-blue1: #5D39EF;
    --color-scale-paper-blue2: #6847F0;
    --color-scale-paper-blue3: #927BF4;
    --color-scale-paper-blue4: #AA97F7;
    --color-scale-paper-blue5: #D4CBFB;
    --color-scale-paper-blue6: #EFECFD;
    --color-scale-paper-purple1: #C610A3;
    --color-scale-paper-purple2: #ED1CC4;
    --color-scale-paper-purple3: #F150D2;
    --color-scale-paper-purple4: #F580DE;
    --color-scale-paper-purple5: #F9B4EC;
    --color-scale-paper-purple6: #FDE3F8;

    /* Charcoal palette */
    --color-scale-charcoal-surface1: #131313;
    --color-scale-charcoal-surface2: #171717;
    --color-scale-charcoal-surface3: #1B1B1B;
    --color-scale-charcoal-surface4: #1F1F1F;
    --color-scale-charcoal-surface5: #242424;
    --color-scale-charcoal-gray1: #F1F2F4;
    --color-scale-charcoal-gray2: #D5D9DC;
    --color-scale-charcoal-gray3: #BDC2C7;
    --color-scale-charcoal-gray4: #A2A8AE;
    --color-scale-charcoal-gray5: #858C93;
    --color-scale-charcoal-gray6: #686E73;
    --color-scale-charcoal-gray7: #494D50;
    --color-scale-charcoal-gray8: rgb(102 107 112 / 24%);
    --color-scale-charcoal-gray9: rgb(102 107 112 / 14%);
    --color-scale-charcoal-red1: rgb(255 115 82 / 100%);
    --color-scale-charcoal-red2: rgb(255 115 82 / 90%);
    --color-scale-charcoal-red3: rgb(255 115 82 / 80%);
    --color-scale-charcoal-red4: rgb(255 115 82 / 60%);
    --color-scale-charcoal-red5: rgb(255 115 82 / 40%);
    --color-scale-charcoal-red6: rgb(255 115 82 / 12%);
    --color-scale-charcoal-yellow1: rgb(184 229 0 / 100%);
    --color-scale-charcoal-yellow2: rgb(184 229 0 / 90%);
    --color-scale-charcoal-yellow3: rgb(184 229 0 / 80%);
    --color-scale-charcoal-yellow4: rgb(184 229 0 / 60%);
    --color-scale-charcoal-yellow5: rgb(184 229 0 / 40%);
    --color-scale-charcoal-yellow6: rgb(184 229 0 / 08%);
    --color-scale-charcoal-green1: rgb(0 204 59 / 100%);
    --color-scale-charcoal-green2: rgb(0 204 59 / 90%);
    --color-scale-charcoal-green3: rgb(0 204 59 / 80%);
    --color-scale-charcoal-green4: rgb(0 204 59 / 60%);
    --color-scale-charcoal-green5: rgb(0 204 59 / 40%);
    --color-scale-charcoal-green6: rgb(0 204 59 / 14%);
    --color-scale-charcoal-teal1: rgb(15 209 255 / 100%);
    --color-scale-charcoal-teal2: rgb(15 209 255 / 90%);
    --color-scale-charcoal-teal3: rgb(15 209 255 / 80%);
    --color-scale-charcoal-teal4: rgb(15 209 255 / 60%);
    --color-scale-charcoal-teal5: rgb(15 209 255 / 40%);
    --color-scale-charcoal-teal6: rgb(15 209 255 / 12%);
    --color-scale-charcoal-blue1: rgb(153 128 255 / 100%);
    --color-scale-charcoal-blue2: rgb(153 128 255 / 90%);
    --color-scale-charcoal-blue3: rgb(153 128 255 / 80%);
    --color-scale-charcoal-blue4: rgb(153 128 255 / 60%);
    --color-scale-charcoal-blue5: rgb(153 128 255 / 40%);
    --color-scale-charcoal-blue6: rgb(153 128 255 / 12%);
    --color-scale-charcoal-purple1: rgb(255 92 223 / 100%);
    --color-scale-charcoal-purple2: rgb(255 92 223 / 90%);
    --color-scale-charcoal-purple3: rgb(255 92 223 / 80%);
    --color-scale-charcoal-purple4: rgb(255 92 223 / 60%);
    --color-scale-charcoal-purple5: rgb(255 92 223 / 40%);
    --color-scale-charcoal-purple6: rgb(255 92 223 / 14%);

    /* Light box shadows */
    --box-shadow-light-s: 0 1px 2px rgb(33 37 41 / 4%);
    --box-shadow-light-m: 0 1px 4px rgb(33 37 41 / 6%);
    --box-shadow-light-l: 0 4px 32px rgb(33 37 41 / 8%);
    --box-shadow-light-text: 0 1px 8px rgb(33 37 41 / 16%);

    /* Dark box shadows */
    --box-shadow-dark-s: 0 1px 2px rgb(25 25 25);
    --box-shadow-dark-m: 0 1px 4px rgb(25 25 25);
    --box-shadow-dark-l: 0 4px 32px rgb(25 25 25);
    --box-shadow-dark-text: 0 1px 12px rgb(25 25 25 / 32%);

    /* Z-indices */
    --z-index-nav: 9;
    --z-index-dialog: 10;
    --z-index-popover: 10;    
    --z-index-tooltip: 10;

    /* Border radii */
    --border-radius-xs: 0.25rem;
    --border-radius-s: 0.375rem;
    --border-radius-m: 0.5rem;
    --border-radius-l: 0.75rem;

    /* Animation easings */
    --ease-in-sine: cubic-bezier(0.12, 0, 0.39, 0);
    --ease-out-sine: cubic-bezier(0.61, 1, 0.88, 1);
    --ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1);
    --ease-in-quad: cubic-bezier(0.11, 0, 0.5, 0);
    --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);
    --ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
    --ease-in-cubic: cubic-bezier(0.32, 0, 0.67, 0);
    --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
    --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
    --ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0);
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
    --ease-in-quint: cubic-bezier(0.64, 0, 0.78, 0);
    --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);
    --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
    --ease-in-circ: cubic-bezier(0.55, 0, 1, 0.45);
    --ease-out-circ: cubic-bezier(0, 0.55, 0.45, 1);
    --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
    --ease-in-back: cubic-bezier(0.36, 0, 0.66, -0.56);
    --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-in-out-back: cubic-bezier(0.68, -0.6, 0.32, 1.6);

    /* Animations */
    --animation-v-fast-in: 0.125s var(--ease-in-quad);
    --animation-v-fast-out: 0.125s var(--ease-out-quad);
    --animation-v-fast-in-out: 0.125s var(--ease-in-out-quad);
    --animation-fast-in: 0.25s var(--ease-in-quart);
    --animation-fast-out: 0.25s var(--ease-out-quart);
    --animation-fast-in-out: 0.25s var(--ease-in-out-quart);
    --animation-medium-in: 0.5s var(--ease-in-quart);
    --animation-medium-out: 0.5s var(--ease-out-quart);
    --animation-medium-in-out: 0.5s var(--ease-in-out-quart);
    --animation-slow-in: 0.75s var(--ease-in-cubic);
    --animation-slow-out: 0.75s var(--ease-out-cubic);
    --animation-slow-in-out: 0.75s var(--ease-in-out-cubic);

    /* Space */
    --space-0: 4px;
    --space-0-5: 6px;
    --space-1: 8px;
    --space-1-5: 12px;
    --space-2: 16px;
    --space-3: 24px;
    --space-4: 32px;
    --space-5: 48px;
    --space-6: 64px;
    --space-7: 96px;
    --space-8: 128px;

    /* Adaptive space */
    --adaptive-space-0: var(--space-0);
    --adaptive-space-1: var(--space-1);
    --adaptive-space-2: var(--space-2);
    --adaptive-space-3: var(--space-3);
    --adaptive-space-4: var(--space-4);
    --adaptive-space-5: var(--space-5);
    --adaptive-space-6: var(--space-6);
    --adaptive-space-7: var(--space-7);
    --adaptive-space-8: var(--space-8);
    --adaptive-space-0-5: var(--space-0-5);
    --adaptive-space-1-5: var(--space-1-5);

    @media only screen and (max-width: 90rem){
      --adaptive-space-0: var(--space-0);
      --adaptive-space-1: var(--space-1);
      --adaptive-space-2: var(--space-2);
      --adaptive-space-3: var(--space-3);
      --adaptive-space-4: var(--space-4);
      --adaptive-space-5: var(--space-5);
      --adaptive-space-6: var(--space-6);
      --adaptive-space-7: var(--space-7);
      --adaptive-space-8: var(--space-8);
      --adaptive-space-0-5: var(--space-0-5);
      --adaptive-space-1-5: var(--space-1-5)
    }

    @media only screen and (max-width: 78rem){
      --adaptive-space-0: var(--space-0);
      --adaptive-space-1: var(--space-1);
      --adaptive-space-2: var(--space-2);
      --adaptive-space-3: var(--space-3);
      --adaptive-space-4: var(--space-4);
      --adaptive-space-5: var(--space-5);
      --adaptive-space-6: var(--space-6);
      --adaptive-space-7: var(--space-7);
      --adaptive-space-8: var(--space-8);
      --adaptive-space-0-5: var(--space-0-5);
      --adaptive-space-1-5: var(--space-1-5)
    }

    @media only screen and (max-width: 64rem){
      --adaptive-space-0: var(--space-0);
      --adaptive-space-1: var(--space-1);
      --adaptive-space-2: var(--space-1);
      --adaptive-space-3: var(--space-2);
      --adaptive-space-4: var(--space-3);
      --adaptive-space-5: var(--space-4);
      --adaptive-space-6: var(--space-5);
      --adaptive-space-7: var(--space-6);
      --adaptive-space-8: var(--space-7);
      --adaptive-space-0-5: var(--space-0-5);
      --adaptive-space-1-5: var(--space-1)
    }

    @media only screen and (max-width: 48rem){
      --adaptive-space-0: var(--space-0);
      --adaptive-space-1: var(--space-1);
      --adaptive-space-2: var(--space-1);
      --adaptive-space-3: var(--space-2);
      --adaptive-space-4: var(--space-3);
      --adaptive-space-5: var(--space-4);
      --adaptive-space-6: var(--space-5);
      --adaptive-space-7: var(--space-6);
      --adaptive-space-8: var(--space-7);
      --adaptive-space-0-5: var(--space-0-5);
      --adaptive-space-1-5: var(--space-1)
    }

    @media only screen and (max-width: 30rem){
      --adaptive-space-0: var(--space-0);
      --adaptive-space-1: var(--space-0);
      --adaptive-space-2: var(--space-1);
      --adaptive-space-3: var(--space-1);
      --adaptive-space-4: var(--space-2);
      --adaptive-space-5: var(--space-2);
      --adaptive-space-6: var(--space-3);
      --adaptive-space-7: var(--space-4);
      --adaptive-space-8: var(--space-5);
      --adaptive-space-0-5: var(--space-0-5);
      --adaptive-space-1-5: var(--space-1);
    }
  }

  html {
    /* Colors */
    --opacity-factor: 1;
    --color-scale-surface1: var(--color-scale-paper-surface1);
    --color-scale-surface2: var(--color-scale-paper-surface2);
    --color-scale-surface3: var(--color-scale-paper-surface3);
    --color-scale-surface4: var(--color-scale-paper-surface4);
    --color-scale-surface5: var(--color-scale-paper-surface5);
    --color-scale-gray1: var(--color-scale-paper-gray1);
    --color-scale-gray2: var(--color-scale-paper-gray2);
    --color-scale-gray3: var(--color-scale-paper-gray3);
    --color-scale-gray4: var(--color-scale-paper-gray4);
    --color-scale-gray5: var(--color-scale-paper-gray5);
    --color-scale-gray6: var(--color-scale-paper-gray6);
    --color-scale-gray7: var(--color-scale-paper-gray7);
    --color-scale-gray8: var(--color-scale-paper-gray8);
    --color-scale-gray9: var(--color-scale-paper-gray9);
    --color-scale-red1: var(--color-scale-paper-red1);
    --color-scale-red2: var(--color-scale-paper-red2);
    --color-scale-red3: var(--color-scale-paper-red3);
    --color-scale-red4: var(--color-scale-paper-red4);
    --color-scale-red5: var(--color-scale-paper-red5);
    --color-scale-red6: var(--color-scale-paper-red6);
    --color-scale-yellow1: var(--color-scale-paper-yellow1);
    --color-scale-yellow2: var(--color-scale-paper-yellow2);
    --color-scale-yellow3: var(--color-scale-paper-yellow3);
    --color-scale-yellow4: var(--color-scale-paper-yellow4);
    --color-scale-yellow5: var(--color-scale-paper-yellow5);
    --color-scale-yellow6: var(--color-scale-paper-yellow6);
    --color-scale-green1: var(--color-scale-paper-green1);
    --color-scale-green2: var(--color-scale-paper-green2);
    --color-scale-green3: var(--color-scale-paper-green3);
    --color-scale-green4: var(--color-scale-paper-green4);
    --color-scale-green5: var(--color-scale-paper-green5);
    --color-scale-green6: var(--color-scale-paper-green6);
    --color-scale-teal1: var(--color-scale-paper-teal1);
    --color-scale-teal2: var(--color-scale-paper-teal2);
    --color-scale-teal3: var(--color-scale-paper-teal3);
    --color-scale-teal4: var(--color-scale-paper-teal4);
    --color-scale-teal5: var(--color-scale-paper-teal5);
    --color-scale-teal6: var(--color-scale-paper-teal6);
    --color-scale-blue1: var(--color-scale-paper-blue1);
    --color-scale-blue2: var(--color-scale-paper-blue2);
    --color-scale-blue3: var(--color-scale-paper-blue3);
    --color-scale-blue4: var(--color-scale-paper-blue4);
    --color-scale-blue5: var(--color-scale-paper-blue5);
    --color-scale-blue6: var(--color-scale-paper-blue6);
    --color-scale-purple1: var(--color-scale-paper-purple1);
    --color-scale-purple2: var(--color-scale-paper-purple2);
    --color-scale-purple3: var(--color-scale-paper-purple3);
    --color-scale-purple4: var(--color-scale-paper-purple4);
    --color-scale-purple5: var(--color-scale-paper-purple5);
    --color-scale-purple6: var(--color-scale-paper-purple6);

    /* Box shadows */
    --box-shadow-s: var(--box-shadow-light-s);
    --box-shadow-m: var(--box-shadow-light-m);
    --box-shadow-l: var(--box-shadow-light-l);

    @media (prefers-color-scheme: dark) {
      /* Colors */
      --opacity-factor: 1.2;
      --color-scale-surface1: var(--color-scale-charcoal-surface1);
      --color-scale-surface2: var(--color-scale-charcoal-surface2);
      --color-scale-surface3: var(--color-scale-charcoal-surface3);
      --color-scale-surface4: var(--color-scale-charcoal-surface4);
      --color-scale-surface5: var(--color-scale-charcoal-surface5);
      --color-scale-gray1: var(--color-scale-charcoal-gray1);
      --color-scale-gray2: var(--color-scale-charcoal-gray2);
      --color-scale-gray3: var(--color-scale-charcoal-gray3);
      --color-scale-gray4: var(--color-scale-charcoal-gray4);
      --color-scale-gray5: var(--color-scale-charcoal-gray5);
      --color-scale-gray6: var(--color-scale-charcoal-gray6);
      --color-scale-gray7: var(--color-scale-charcoal-gray7);
      --color-scale-gray8: var(--color-scale-charcoal-gray8);
      --color-scale-gray9: var(--color-scale-charcoal-gray9);
      --color-scale-red1: var(--color-scale-charcoal-red1);
      --color-scale-red2: var(--color-scale-charcoal-red2);
      --color-scale-red3: var(--color-scale-charcoal-red3);
      --color-scale-red4: var(--color-scale-charcoal-red4);
      --color-scale-red5: var(--color-scale-charcoal-red5);
      --color-scale-red6: var(--color-scale-charcoal-red6);
      --color-scale-yellow1: var(--color-scale-charcoal-yellow1);
      --color-scale-yellow2: var(--color-scale-charcoal-yellow2);
      --color-scale-yellow3: var(--color-scale-charcoal-yellow3);
      --color-scale-yellow4: var(--color-scale-charcoal-yellow4);
      --color-scale-yellow5: var(--color-scale-charcoal-yellow5);
      --color-scale-yellow6: var(--color-scale-charcoal-yellow6);
      --color-scale-green1: var(--color-scale-charcoal-green1);
      --color-scale-green2: var(--color-scale-charcoal-green2);
      --color-scale-green3: var(--color-scale-charcoal-green3);
      --color-scale-green4: var(--color-scale-charcoal-green4);
      --color-scale-green5: var(--color-scale-charcoal-green5);
      --color-scale-green6: var(--color-scale-charcoal-green6);
      --color-scale-teal1: var(--color-scale-charcoal-teal1);
      --color-scale-teal2: var(--color-scale-charcoal-teal2);
      --color-scale-teal3: var(--color-scale-charcoal-teal3);
      --color-scale-teal4: var(--color-scale-charcoal-teal4);
      --color-scale-teal5: var(--color-scale-charcoal-teal5);
      --color-scale-teal6: var(--color-scale-charcoal-teal6);
      --color-scale-blue1: var(--color-scale-charcoal-blue1);
      --color-scale-blue2: var(--color-scale-charcoal-blue2);
      --color-scale-blue3: var(--color-scale-charcoal-blue3);
      --color-scale-blue4: var(--color-scale-charcoal-blue4);
      --color-scale-blue5: var(--color-scale-charcoal-blue5);
      --color-scale-blue6: var(--color-scale-charcoal-blue6);
      --color-scale-purple1: var(--color-scale-charcoal-purple1);
      --color-scale-purple2: var(--color-scale-charcoal-purple2);
      --color-scale-purple3: var(--color-scale-charcoal-purple3);
      --color-scale-purple4: var(--color-scale-charcoal-purple4);
      --color-scale-purple5: var(--color-scale-charcoal-purple5);
      --color-scale-purple6: var(--color-scale-charcoal-purple6);

      /* Box shadows */
      --box-shadow-s: var(--box-shadow-dark-s);
      --box-shadow-m: var(--box-shadow-dark-m);
      --box-shadow-l: var(--box-shadow-dark-l);
    }

    /* Semantic colors */
    --color-heading: var(--color-scale-gray1);
    --color-body: var(--color-scale-gray1);
    --color-label: var(--color-scale-gray5);
    --color-bar: var(--color-scale-gray7);
    --color-focus: var(--color-scale-red3);
    --color-button-label: var(--color-scale-gray1);
    --color-button-label-hover: var(--color-scale-gray3);
    --color-primary-text: var(--color-scale-red1);
    --color-primary-background: var(--color-scale-red2);
    --color-primary-opaque-background: var(--color-scale-red6);
    --color-on-primary-background: var(--color-scale-white);
    --color-active-text: var(--color-scale-red1);
    --color-active-background: var(--color-scale-red2);
    --color-on-active-background: var(--color-scale-white);
    --color-success-text: var(--color-scale-red1);
    --color-success-background: var(--color-scale-red2);
    --color-on-success-background: var(--color-scale-white);
    --color-error-text: var(--color-scale-red1);
    --color-error-background: var(--color-scale-red2);
    --color-on-error-background: var(--color-scale-white);
    --color-link-text: var(--color-scale-gray1);
    --color-link-underline: var(--color-scale-gray7);
    --color-content-link-text: var(--color-scale-gray1);
    --color-content-link-underline: var(--color-scale-gray6);
    --color-content-link-underline-hover: var(--color-scale-gray5);
    --color-primary-link-text: var(--color-scale-red1);
    --color-primary-link-underline: var(--color-scale-red4);

    font-size: 100%;
    line-height: 1.2;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .surface-1 {
    --color-color-background: var(--color-scale-scale-surface1);
    --color-o-background: var(--color-scale-surface2);
    --color-oo-background: var(--color-scale-surface3);
    --color-i-background: var(--color-scale-surface1);
    --color-ii-background: var(--color-scale-surface1);
    --color-line: var(--color-scale-gray9);
    --color-o-line: var(--color-scale-gray9);
    --color-i-line: var(--color-scale-gray9);
  }

  .surface-2 {
    --color-background: var(--color-scale-surface2);
    --color-o-background: var(--color-scale-surface3);
    --color-oo-background: var(--color-scale-surface4);
    --color-i-background: var(--color-scale-surface1);
    --color-ii-background: var(--color-scale-surface1);
    --color-line: var(--color-scale-gray9);
    --color-o-line: var(--color-scale-gray9);
    --color-i-line: var(--color-scale-gray9);
  }

  .surface-3, html {
    --color-background: var(--color-scale-surface3);
    --color-o-background: var(--color-scale-surface4);
    --color-oo-background: var(--color-scale-surface5);
    --color-i-background: var(--color-scale-surface2);
    --color-ii-background: var(--color-scale-surface1);
    --color-line: var(--color-scale-gray9);
    --color-o-line: var(--color-scale-gray8);
    --color-i-line: var(--color-scale-gray9);
  }

  .surface-4 {
    --color-background: var(--color-scale-surface4);
    --color-o-background: var(--color-scale-surface5);
    --color-oo-background: var(--color-scale-surface5);
    --color-i-background: var(--color-scale-surface3);
    --color-ii-background: var(--color-scale-surface2);
    --color-line: var(--color-scale-gray8);
    --color-o-line: var(--color-scale-gray8);
    --color-i-line: var(--color-scale-gray9);
  }

  .surface-5 {
    --color-background: var(--color-scale-surface5);
    --color-o-background: var(--color-scale-surface5);
    --color-oo-background: var(--color-scale-surface5);
    --color-i-background: var(--color-scale-surface4);
    --color-ii-background: var(--color-scale-surface3);
    --color-line: var(--color-scale-gray8);
    --color-o-line: var(--color-scale-gray8);
    --color-i-line: var(--color-scale-gray8);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    transition: background-color var(--animation-medium-out), 
      border-color var(--animation-medium-out),
      box-shadow var(--animation-medium-out);
  }

  body {
    ${(p) => p.theme.text.system.body}; 
    background: var(--color-background);
    color: var(--color-body);
    font-feature-settings: 'kern', 'liga';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    direction: ltr;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    position: relative;
    color: var(--color-heading);
    margin: 0;
  }
  h1 {${(p) => p.theme.text.system.h1}}
  h2 {${(p) => p.theme.text.system.h2}}
  h3 {${(p) => p.theme.text.system.h3}}
  h4 {${(p) => p.theme.text.system.h4}}
  h5 {${(p) => p.theme.text.system.h5}}
  h6 {${(p) => p.theme.text.system.h6}}

  p, a, li, input, label {
    ${(p) => p.theme.text.system.body}; 
    color: var(--color-body);
    margin: 0;
  }

  small {
    ${(p) => p.theme.text.system.small}; 
    color: var(--color-label);
  }

  strong {
    color: var(--color-heading);
  }

  a {
    cursor: pointer;
    border-radius: var(--border-radius-xs);

    text-decoration-line: underline;
    text-decoration-color: transparent;
    transition: color var(--animation-v-fast-out), 
      box-shadow var(--animation-v-fast-out);
  }
  a:hover:not([data-no-underline="true"]) {
    text-decoration-color: var(--color-link-underline);
  }
  a:focus {
    outline: none;
  }
  a.focus-visible {
    ${(p) => p.theme.focusVisible}; 
  }

  button {
    margin: 0;
  }


  input {
    appearance: none;
    font-size: 1rem;
    transition: color var(--animation-v-fast-out), 
      box-shadow var(--animation-v-fast-out);
  }
  input:focus {
    outline: none;
  }
  input.focus-visible {
    ${(p) => p.theme.focusVisible}; 
  }

  ol, ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  abbr {
    text-decoration: none;
    @media not all and (hover: none) {
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-color: var(--color-content-link-underline);
      text-decoration-thickness: 0.05rem;
    }
  }

  svg {
    overflow: visible;
  }

  .tl-edges {
    overflow: initial;
  }

  .autolinked-header.before {
    ${(p) => p.theme.flexCenter};
    height: 100%;
    padding-right: var(--space-0-5);

    > div {
      ${(p) => p.theme.flexCenter};
    }

    ${(p) => p.theme.breakpoints.xs} {
      padding-right: var(--space-0);
    }
  }
  .autolinked-header svg {
    fill: var(--color-label);

    ${(p) => p.theme.breakpoints.xs} {
      width: 0.75em;
    }
  }

  .katex {
    display: inline-block;
    color: transparent;
    transition: color var(--animation-v-fast-out);
  }
  .katex-display {
    ${(p) => p.theme.text.content.body}
    margin-bottom: var(--adaptive-space-3);

    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`

export default GlobalStyles
