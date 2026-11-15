# Hydra Analytics Pro SaaS surface

This is a public, browser-safe dashboard surface. It never contains PayPal credentials, wallet keys, RPC secrets, or customer data.

Set `window.HYDRA_CONFIG.apiBase` in a deployment-specific config layer to the HTTPS origin of the private Hydra API. Until that is configured, the interface intentionally shows zeroed Sandbox demo metrics.
