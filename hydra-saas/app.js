const config = window.HYDRA_CONFIG || { apiBase: "", environment: "sandbox" };
const $ = (id) => document.getElementById(id);
const demo = { sandbox: true, metrics: { grossVolumeMinor: 0, orders: 0, activeCreators: 0, approvalRate: 0 }, providers: { paypal: "not_configured", usdt: "not_configured" } };
const money = (minor) => `$${(Number(minor || 0) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
function render(data) {
  $("environment").textContent = data.sandbox ? "SANDBOX" : "LIVE";
  $("volume").textContent = money(data.metrics.grossVolumeMinor);
  $("orders").textContent = Number(data.metrics.orders || 0).toLocaleString();
  $("creators").textContent = Number(data.metrics.activeCreators || 0).toLocaleString();
  $("approval").textContent = `${Number(data.metrics.approvalRate || 0)}%`;
  $("paypal").textContent = data.providers.paypal === "configured" ? "مهيأ" : "غير مهيأ";
  $("usdt").textContent = data.providers.usdt === "configured" ? "مهيأ" : "غير مهيأ";
}
async function refresh() {
  $("notice").textContent = "جاري تحديث المؤشرات…";
  try {
    if (!config.apiBase) throw new Error("API base is not configured");
    const response = await fetch(`${config.apiBase.replace(/\/$/, "")}/api/v1/analytics/overview`, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`API ${response.status}`);
    render(await response.json());
    $("notice").textContent = "متصل بواجهة Hydra الخاصة — وضع Sandbox.";
    $("notice").className = "notice success";
  } catch (error) {
    render(demo);
    $("notice").textContent = "وضع العرض التجريبي: اربط apiBase بواجهة Hydra الخاصة لعرض بيانات حقيقية.";
    $("notice").className = "notice warning";
  }
}
$("refresh").addEventListener("click", refresh);
$("lang").addEventListener("click", () => { document.documentElement.dir = document.documentElement.dir === "rtl" ? "ltr" : "rtl"; document.documentElement.lang = document.documentElement.lang === "ar" ? "en" : "ar"; });
refresh();
