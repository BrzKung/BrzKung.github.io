const SITE = {
  legalName: "Warachat Khuntong",
  businessName: "Warachat Khuntong",
  businessType: "บุคคลธรรมดา — พัฒนาซอฟต์แวร์ เกม และ AI",
  description:
    "พัฒนาซอฟต์แวร์ เกมบนเว็บและ Facebook Instant Games รวมถึงระบบ AI และ Machine Learning สำหรับลูกค้าและโปรเจกต์ส่วนตัว",
  email: "warachat12345@gmail.com",
  phone: "",
  address: {
    street: "",
    subdistrict: "",
    district: "",
    province: "",
    postalCode: "",
    country: "ประเทศไทย",
  },
  website: "https://brzkung.github.io",
  github: "https://github.com/BrzKung",
  lastUpdated: "16 มิถุนายน 2026",
};

function formatAddress(addr) {
  if (!addr) return null;
  const parts = [
    addr.street,
    addr.subdistrict,
    addr.district,
    addr.province,
    addr.postalCode,
    addr.country,
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : null;
}

function renderBusinessInfo(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const address = formatAddress(SITE.address);
  const rows = [
    ["ชื่อธุรกิจ / Legal Name", SITE.legalName],
    ["ชื่อที่ใช้แสดง", SITE.businessName],
    ["ประเภทธุรกิจ", SITE.businessType],
    ["อีเมล", `<a href="mailto:${SITE.email}">${SITE.email}</a>`],
    SITE.phone ? ["โทรศัพท์", `<a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a>`] : null,
    address ? ["ที่อยู่", address] : null,
    ["เว็บไซต์", `<a href="${SITE.website}">${SITE.website.replace("https://", "")}</a>`],
    ["GitHub", `<a href="${SITE.github}" target="_blank" rel="noopener noreferrer">github.com/BrzKung</a>`],
  ].filter(Boolean);

  el.innerHTML = `
    <dl class="business-info">
      ${rows
        .map(
          ([label, value]) => `
        <div class="business-info__row">
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>`
        )
        .join("")}
    </dl>
    <p class="business-info__note">
      ข้อมูลธุรกิจนี้แสดงบนเว็บไซต์เพื่อการติดต่อและการยืนยันตัวตนธุรกิจกับ Meta (Facebook)
      ข้อมูลต้องตรงกับที่ลงทะเบียนใน Meta Business Suite
    </p>
  `;
}

function renderLegalFooter() {
  const footer = document.getElementById("legal-footer");
  if (!footer) return;

  const address = formatAddress(SITE.address);
  const contactParts = [
    SITE.email ? `<a href="mailto:${SITE.email}">${SITE.email}</a>` : "",
    SITE.phone ? `<a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a>` : "",
  ].filter(Boolean);

  footer.innerHTML = `
    <div class="container legal-footer__inner">
      <div class="legal-footer__brand">
        <strong>${SITE.legalName}</strong>
        <span>${SITE.businessType}</span>
        ${address ? `<span>${address}</span>` : ""}
        ${contactParts.length ? `<span>${contactParts.join(" · ")}</span>` : ""}
      </div>
      <nav class="legal-footer__links" aria-label="Legal">
        <a href="/">หน้าแรก</a>
        <a href="/privacy-policy.html">นโยบายความเป็นส่วนตัว</a>
        <a href="/terms-of-service.html">ข้อกำหนดการใช้งาน</a>
        <a href="/data-deletion.html">ลบข้อมูลผู้ใช้</a>
      </nav>
      <p class="legal-footer__copy">&copy; <span class="js-year"></span> ${SITE.legalName}</p>
    </div>
  `;

  footer.querySelectorAll(".js-year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function injectBusinessSchema() {
  const address = formatAddress(SITE.address);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.legalName,
    email: SITE.email,
    url: SITE.website,
    sameAs: [SITE.github],
    jobTitle: "Software Developer",
    description: SITE.description,
  };

  if (address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.district || SITE.address.province,
      addressRegion: SITE.address.province,
      postalCode: SITE.address.postalCode,
      addressCountry: "TH",
    };
  }

  if (SITE.phone) schema.telephone = SITE.phone;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBusinessInfo("business-info");
  renderLegalFooter();
  injectBusinessSchema();
});
