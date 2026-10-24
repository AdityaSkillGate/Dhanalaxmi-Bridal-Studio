/* ==========================================================================
   Dhanalaxmi Bridal Studio — central business configuration
   Edit the values below. Nothing else needs to change for routine updates.
   ========================================================================== */
window.SITE_CONFIG = {
  businessName: "Dhanalaxmi Bridal Studio",

  // WhatsApp: international format, digits only (no +, spaces or dashes).
  whatsappNumber: "919791230730",
  whatsappDisplay: "97912 30730",

  // Opening hours — PROVISIONAL demo value. Change here (EN + TA) before launch.
  // The visible text lives in js/i18n.js under the keys hours.val
  // (search for "hours.val").

  addressLine: "Sankarankovil, Tamil Nadu, India",       // add the exact street address once confirmed
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dhanalaxmi%20Bridal%20Studio%20Sankarankovil",

  // Instagram profiles supplied by the studio.
  instagram: {
    main:      "https://www.instagram.com/sankarankovilmakeupartistdhana/",
    mehendi:   "https://www.instagram.com/sankarankovil_mehendi_by_dhana/",
    nails:     "https://www.instagram.com/dhanalaxmi_nail_artistry/",
    jewellery: "https://www.instagram.com/sankarankovil_rental_jewellery/",
    bangles:   "https://www.instagram.com/sparklenest_by_dhanalaxmi/"
  },

  // Services shown in the enquiry form drop-down (names come from i18n: svc.<id>.name)
  serviceIds: ["bridal", "occasion", "hair", "saree", "nails", "mehendi", "jewellery", "bangles"]
};
