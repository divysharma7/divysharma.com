const queue = [];
let loaded = false;
let loading = false;

function envBool(value) {
    return String(value).toLowerCase() === "true";
}

function getEnv() {
    const enabled = envBool(import.meta.env.VITE_UMAMI_ENABLED || 'true');
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    const src = import.meta.env.VITE_UMAMI_SRC || "https://cloud.umami.is/script.js";
    const hostUrl = import.meta.env.VITE_UMAMI_HOST_URL;
    const domains = import.meta.env.VITE_UMAMI_DOMAINS;

    return { enabled, websiteId, src, hostUrl, domains };
}

function runOrQueue(fn) {
    if (loaded && window.umami) fn();
    else queue.push(fn);
}

function flushQueue() {
    if (!window.umami) return;
    while (queue.length) {
        const fn = queue.shift();
        try {
            fn?.();
        } catch {
            // swallow; analytics should never take your UI down with it
        }
    }
}

export function loadUmamiScript() {
    const { enabled, websiteId, src, hostUrl, domains } = getEnv();

    if (!enabled) return Promise.resolve(false);
    if (!websiteId) {
        console.warn("[umami] missing VITE_UMAMI_WEBSITE_ID");
        return Promise.resolve(false);
    }

    if (loaded) return Promise.resolve(true);

    if (loading) {
        return new Promise((resolve) => {
            const check = setInterval(() => {
                if (loaded) {
                    clearInterval(check);
                    resolve(true);
                }
            }, 50);
        });
    }

    loading = true;

    return new Promise((resolve) => {
        // Avoid double-injecting
        const existing = document.querySelector('script[data-umami="true"]');
        if (existing) {
            existing.addEventListener("load", () => {
                loaded = true;
                loading = false;
                flushQueue();
                resolve(true);
            });
            resolve(true);
            return;
        }

        const s = document.createElement("script");
        s.defer = true;
        s.src = src;

        // Mark so we can find it later
        s.dataset.umami = "true";

        // Umami expects these data-* attributes:
        s.setAttribute("data-website-id", websiteId);

        // Turn off auto tracking so we control SPA pageviews and don't risk double-counts
        s.setAttribute("data-auto-track", "false");

        // Restrict tracker to prod domains if configured
        if (domains) s.setAttribute("data-domains", domains);

        // Optional: send to a different collector endpoint (proxy/self-host use-case)
        if (hostUrl) s.setAttribute("data-host-url", hostUrl);

        s.addEventListener("load", () => {
            loaded = true;
            loading = false;
            flushQueue();
            resolve(true);
        });

        s.addEventListener("error", () => {
            loaded = false;
            loading = false;
            resolve(false);
        });

        document.head.appendChild(s);
    });
}

/**
 * Track a SPA pageview.
 */
export function trackPage(url, title) {
    runOrQueue(() => {
        window.umami?.track((props) => ({
            ...props,
            url,
            title: title ?? document.title,
        }));
    });
}

/** Track a named event with optional data */
export function trackEvent(name, data) {
    runOrQueue(() => {
        window.umami?.track(name, data ?? {});
    });
}

/**
 * Convenience: track outbound link clicks.
 */
export function trackOutbound(label, href, extra) {
    trackEvent("outbound:click", {
        label,
        href,
        ...extra,
    });
}
