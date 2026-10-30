/** Appended after per-page CSS so overrides win the cascade. */
export const responsiveCss = `
/* —— Base —— */
html{scroll-behavior:smooth;}
/* clip (not hidden) so position:sticky keeps working */
html,body{overflow-x:clip;}
img,video,svg{max-width:100%;height:auto;}
.nav-toggle{display:none;}

/* Keep split-section media inside the 1280px content column */
.overview-grid,.overview-media,.overview-copy{min-width:0;max-width:100%;}
[data-screen-label="05 Who we serve"] [style*="display:grid"] > *{min-width:0;max-width:100;}
[data-screen-label="05 Who we serve"] [style*="aspect-ratio:4/5"]{
  min-height:0 !important;width:100%;max-width:100%;box-sizing:border-box;
}

/* —— Header: transparent by default, solid when sticky (all breakpoints) —— */
.site-header{
  background:transparent !important;
  border-bottom-color:transparent !important;
  box-shadow:none !important;
}
.site-header.is-scrolled,
html.is-scrolled .site-header,
body.is-scrolled .site-header{
  background:rgba(255,255,255,.98) !important;
  border-bottom-color:#E3E4E6 !important;
  box-shadow:0 8px 30px rgba(0,42,75,.12) !important;
}
.site-header.is-scrolled .site-nav a,
html.is-scrolled .site-nav a,
body.is-scrolled .site-nav a{color:#1F2A36 !important;}
.site-header.is-scrolled .site-nav a:hover,
html.is-scrolled .site-nav a:hover,
body.is-scrolled .site-nav a:hover{color:#025B97 !important;}
.site-header.is-scrolled .site-nav a.active,
html.is-scrolled .site-nav a.active,
body.is-scrolled .site-nav a.active{color:#003F6B !important;border-bottom-color:#003F6B !important;}
.site-header.is-scrolled .header-cta,
html.is-scrolled .header-cta,
body.is-scrolled .header-cta{
  background:#003F6B !important;
  color:#FFFFFF !important;
}
.site-header.is-scrolled .header-cta:hover,
html.is-scrolled .header-cta:hover,
body.is-scrolled .header-cta:hover{background:#025B97 !important;color:#FFFFFF !important;}
.site-header.is-scrolled .site-logo img.logo-on-dark,
html.is-scrolled .site-logo img.logo-on-dark,
body.is-scrolled .site-logo img.logo-on-dark{display:none !important;}
.site-header.is-scrolled .site-logo img.logo-on-light,
html.is-scrolled .site-logo img.logo-on-light,
body.is-scrolled .site-logo img.logo-on-light{display:block !important;}

/* Drawer is transparent in the box tree on desktop so nav + CTA keep the header grid */
.nav-drawer{display:contents;}
.nav-backdrop{display:none;}

/* —— Tablet & mobile header (slide-in side drawer) —— */
@media (max-width:1024px){
  html body .site-header .header-inner{
    display:flex !important;
    flex-wrap:nowrap;
    align-items:center;
    justify-content:space-between !important;
    justify-items:unset !important;
    grid-template-columns:none !important;
    gap:12px 16px;
    position:relative;
  }
  html body .site-header .site-logo{order:1;flex:0 0 auto;position:relative;z-index:125;}
  html body .site-header .site-logo img,
  html body .site-header .site-logo img.logo-on-dark,
  html body .site-header .site-logo img.logo-on-light{height:56px;}
  html.is-scrolled body .site-header .site-logo img,
  html.is-scrolled body .site-header .site-logo img.logo-on-dark,
  html.is-scrolled body .site-header .site-logo img.logo-on-light{height:44px;}

  html body .nav-toggle{
    order:2;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:44px;height:44px;padding:0;margin:0;
    border:1px solid rgba(255,255,255,.45);
    border-radius:8px;
    background:transparent;
    cursor:pointer;
    flex:0 0 auto;
    z-index:130;
    position:relative;
  }
  html.is-scrolled body .nav-toggle{
    border-color:#CBCCCE;
    background:#fff;
  }
  html body .nav-toggle .nav-toggle-bars{
    display:flex;flex-direction:column;gap:5px;width:18px;
  }
  html body .nav-toggle .nav-toggle-bars span{
    display:block;height:2px;width:100%;border-radius:1px;background:#fff;
    transition:transform .25s ease,opacity .2s ease,background .2s ease;
  }
  html.is-scrolled body .nav-toggle .nav-toggle-bars span{background:#003F6B;}
  html.nav-open body .nav-toggle .nav-toggle-bars span:nth-child(1){
    transform:translateY(7px) rotate(45deg);
  }
  html.nav-open body .nav-toggle .nav-toggle-bars span:nth-child(2){opacity:0;}
  html.nav-open body .nav-toggle .nav-toggle-bars span:nth-child(3){
    transform:translateY(-7px) rotate(-45deg);
  }

  html body .nav-backdrop{
    display:block;
    position:fixed;
    inset:0;
    z-index:110;
    background:rgba(0,18,36,.5);
    opacity:0;
    pointer-events:none;
    transition:opacity .28s ease;
  }
  html.nav-open body .nav-backdrop{
    opacity:1;
    pointer-events:auto;
  }
  html body .nav-backdrop[hidden]{display:block !important;}

  html body .site-header .nav-drawer{
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:8px;
    position:fixed;
    top:0;
    left:0;
    right:auto;
    height:100vh;
    height:100dvh;
    width:min(360px,86vw);
    z-index:120;
    margin:0;
    padding:96px 28px 32px;
    box-sizing:border-box;
    background:#0B2A44;
    box-shadow:16px 0 40px rgba(0,18,36,.28);
    overflow-y:auto;
    -webkit-overflow-scrolling:touch;
    transform:translateX(-100%);
    visibility:hidden;
    pointer-events:none;
    transition:transform .3s ease,visibility 0s linear .3s;
  }
  html.nav-open body .site-header .nav-drawer{
    transform:translateX(0);
    visibility:visible;
    pointer-events:auto;
    transition:transform .3s ease,visibility 0s linear 0s;
  }

  html body .site-header .site-nav{
    display:flex;
    width:100%;
    flex-direction:column;
    align-items:stretch;
    justify-content:flex-start;
    flex-wrap:nowrap;
    gap:0;
    padding:0;
    border-top:0;
    font-size:17px;
  }
  html body .site-header .site-nav a{
    color:#FFFFFF !important;
    padding:14px 4px;
    border-bottom:1px solid rgba(255,255,255,.12);
  }
  html body .site-header .site-nav a:hover{color:#E4D7AE !important;}
  html body .site-header .site-nav a:last-child{border-bottom:0;}
  html body .site-header .site-nav a.active{
    color:#FFFFFF !important;
    border-bottom:1px solid rgba(255,255,255,.12);
    padding-bottom:14px;
  }

  html body .site-header .header-cta{
    display:inline-flex;
    width:100%;
    justify-content:center;
    margin:16px 0 0;
    box-sizing:border-box;
    background:#FFFFFF !important;
    color:#003F6B !important;
  }
  html body .site-header .header-cta:hover{
    background:#E6ECF2 !important;
    color:#003F6B !important;
  }

  html.nav-open body{overflow:hidden;}
}

/* —— Shared section / content tweaks —— */
@media (max-width:1024px){
  .pillar-grid,
  .svc-detail-grid,
  .find-us-grid,
  .overview-grid,
  .mission-split,
  .story-cards,
  .values-top,
  .who-stats,
  .contact-grid,
  .continue-grid,
  .team-grid,
  .faq-wrap{grid-template-columns:1fr !important;}

  .faq-left{position:static !important;top:auto !important;}
  .svc-nav-aside{position:static !important;}
  [data-screen-label="03 Services"] .svc-sticky-media{position:static !important;top:auto !important;}
  .overview-grid{width:100%;max-width:min(1280px,100%);box-sizing:border-box;min-width:0;}
  .overview-media{
    min-width:0;width:100%;max-width:100%;
    height:auto !important;min-height:0 !important;aspect-ratio:4/3;
  }
  [data-screen-label="05 Who we serve"] [style*="max-width:1280px"]{
    max-width:min(1280px,100%);box-sizing:border-box;
  }
  [data-screen-label="05 Who we serve"] [style*="aspect-ratio:4/5"]{
    min-height:0 !important;width:100%;max-width:100%;box-sizing:border-box;
  }
  .find-col{border-right:0 !important;border-bottom:1px solid #CBCCCE;padding-bottom:28px;margin-bottom:20px;}
  .find-us-band .find-col{border-bottom-color:rgba(255,255,255,0.18);}
  .find-col:last-child{border-bottom:0 !important;margin-bottom:0;padding-bottom:8px;}
  .mission-split .media,.values-top .media{max-height:none !important;}
  .values-top .media{position:relative;aspect-ratio:5/4;min-height:0;}
}

@media (max-width:900px){
  .audience-cards{grid-template-columns:1fr 1fr !important;}
  .footer-grid{grid-template-columns:1fr 1fr !important;}
  .sitemap-grid{grid-template-columns:1fr !important;}
}

@media (max-width:700px){
  .form-grid{grid-template-columns:1fr !important;}
  .svc-row{grid-template-columns:48px 1fr 28px !important;gap:12px !important;padding:22px 0;}
  .svc-row:hover{padding-left:10px;padding-right:10px;}
  .svc-row .svc-icon{width:44px;height:44px;}
  .svc-row .svc-icon img{width:36px;height:36px;}
  .team-card{grid-template-columns:1fr !important;}
  .who-stats{grid-template-columns:1fr !important;}
  [data-screen-label="07 Local"]{min-height:440px !important;}
  section[style*="min-height:640px"],
  section[style*="min-height:520px"]{min-height:420px !important;}
  section[style*="height:420px"]{
    height:auto !important;
    min-height:280px !important;
  }
  /* Hero / page titles: prevent oversized clamp() from dominating small screens */
  [data-screen-label="01 Hero"] h1,
  section[data-screen-label="01 Hero"] h1{
    font-size:clamp(32px,8.5vw,48px) !important;
    line-height:1.08 !important;
  }
  [data-screen-label="01 Hero"] > div,
  section[data-screen-label="01 Hero"] > div{
    padding-left:clamp(16px,4vw,24px) !important;
    padding-right:clamp(16px,4vw,24px) !important;
    max-width:100% !important;
    box-sizing:border-box !important;
  }
  [data-screen-label="01 Hero"] p,
  section[data-screen-label="01 Hero"] p{
    font-size:16px !important;
    max-width:100% !important;
  }
  p{font-size:17px;}
  .header-cta,
  a[style*="padding:17px 28px"],
  a[style*="padding:14px 24px"],
  a[style*="padding:15px 26px"],
  button.js-contact-submit{
    width:100%;
    max-width:100%;
    justify-content:center;
    text-align:center;
    box-sizing:border-box;
  }
}

@media (max-width:600px){
  .audience-cards{grid-template-columns:1fr !important;}
  .footer-grid{grid-template-columns:1fr !important;}
  .footer-bottom{flex-direction:column;align-items:flex-start;}
  .site-logo img,
  .site-logo img.logo-on-dark,
  .site-logo img.logo-on-light{height:48px !important;}
  html.is-scrolled .site-logo img,
  html.is-scrolled .site-logo img.logo-on-dark,
  html.is-scrolled .site-logo img.logo-on-light{height:40px !important;}
}
`;
