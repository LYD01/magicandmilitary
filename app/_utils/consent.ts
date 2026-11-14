export const CONSENT_COOKIE = "mm_consent";
export const REGION_COOKIE = "mm_eu";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type ConsentChoice = "granted" | "denied";

/**
 * Inline script run before `gtm.js`. Sets the Consent Mode default:
 * a stored choice wins; otherwise analytics is denied unless the proxy
 * positively marked the visitor as outside the EU (`mm_eu=0`).
 */
export const CONSENT_INIT_SCRIPT = `window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };
(function () {
  var c = document.cookie;
  var stored = c.match(/(?:^|; )${CONSENT_COOKIE}=(granted|denied)/);
  var outsideEu = /(?:^|; )${REGION_COOKIE}=0/.test(c);
  var analytics = stored ? stored[1] : outsideEu ? "granted" : "denied";
  window.gtag("consent", "default", {
    analytics_storage: analytics,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
})();
window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });`;
