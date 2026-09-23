module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/(client)/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/Navbar.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/Hero.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Marquee$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/Marquee.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$FeaturedCollection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/FeaturedCollection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$BrowseByCategory$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/BrowseByCategory.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/primitives.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$OurHeritage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/OurHeritage.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$JewellerySpotlight$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/JewellerySpotlight.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$ReviewsAndInstagram$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/ReviewsAndInstagram.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/Footer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const revalidate = 300;
async function Home() {
    const [content, all] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHomeContent"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllProducts"])()
    ]);
    const featured = content.featured_collection.map((f)=>{
        const p = all.find((x)=>x.slug === f.slug);
        if (!p) return null;
        return {
            id: p.id,
            catalogId: p.id,
            slug: p.slug,
            badge: f.badge ?? p.badge,
            badgeColor: p.badge ? '#D4880A' : undefined,
            gradient: p.gradient,
            name: p.name,
            sub: p.sub || p.weave,
            price: p.price,
            priceNum: p.priceNum,
            label: p.label,
            aspect: f.aspect,
            images: p.images,
            sold: p.sold
        };
    }).filter(Boolean);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-ivory",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                slides: content.hero
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Marquee$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                items: content.marquee
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$FeaturedCollection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                products: featured
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$BrowseByCategory$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: content.browse_by_category
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SareeBorderDivider"], {}, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$OurHeritage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: content.our_heritage
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$JewellerySpotlight$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: content.jewellery_spotlight
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$ReviewsAndInstagram$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                testimonials: content.testimonials,
                instagram: content.instagram_strip
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                footer: content.footer
            }, void 0, false, {
                fileName: "[project]/src/app/(client)/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(client)/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(client)/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(client)/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.2vob68tjqpejf.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/src/components/shared/primitives.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlponaDivider",
    ()=>AlponaDivider,
    "AlponaMotif",
    ()=>AlponaMotif,
    "Eyebrow",
    ()=>Eyebrow,
    "PAD",
    ()=>PAD,
    "SareeBorderDivider",
    ()=>SareeBorderDivider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cn.ts [app-rsc] (ecmascript)");
;
;
const PAD = 'px-[clamp(20px,6vw,85px)]';
function Eyebrow({ label, color = 'text-copper', hairline = true, cn: cls }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-3 mb-3.5', cls),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('font-sans text-[10px] font-normal tracking-[0.24em] uppercase', color),
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            hairline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('w-5 h-px shrink-0', color)
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 26,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/primitives.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function AlponaMotif({ size = 80, opacity = 0.25, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 80 80",
        fill: "none",
        style: {
            opacity
        },
        className: className,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "40,4 76,40 40,76 4,40",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "40,12 68,40 40,68 12,40",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "40,20 60,40 40,60 20,40",
                stroke: "#D4880A",
                strokeWidth: "0.4",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "40",
                cy: "27",
                rx: "5",
                ry: "10",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none",
                transform: "rotate(0,40,40)"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "40",
                cy: "27",
                rx: "5",
                ry: "10",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none",
                transform: "rotate(90,40,40)"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "40",
                cy: "27",
                rx: "5",
                ry: "10",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none",
                transform: "rotate(180,40,40)"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "40",
                cy: "27",
                rx: "5",
                ry: "10",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none",
                transform: "rotate(270,40,40)"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "40",
                r: "2",
                stroke: "#D4880A",
                strokeWidth: "0.5",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "8",
                r: "1",
                fill: "#D4880A",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "72",
                cy: "40",
                r: "1",
                fill: "#D4880A",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "40",
                cy: "72",
                r: "1",
                fill: "#D4880A",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "40",
                r: "1",
                fill: "#D4880A",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/primitives.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
function AlponaDivider({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cn$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('flex justify-center my-8', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "320",
            height: "24",
            viewBox: "0 0 320 24",
            fill: "none",
            style: {
                opacity: 0.5
            },
            "aria-hidden": true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "0",
                    y1: "12",
                    x2: "126",
                    y2: "12",
                    stroke: "#BF5E18",
                    strokeWidth: "0.75"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: "132,12 138,7 144,12 138,17",
                    stroke: "#D4880A",
                    strokeWidth: "0.5",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "160",
                    cy: "6",
                    rx: "4",
                    ry: "8",
                    stroke: "#BF5E18",
                    strokeWidth: "0.5",
                    fill: "none",
                    transform: "rotate(0,160,12)"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "160",
                    cy: "6",
                    rx: "4",
                    ry: "8",
                    stroke: "#BF5E18",
                    strokeWidth: "0.5",
                    fill: "none",
                    transform: "rotate(90,160,12)"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "160",
                    cy: "6",
                    rx: "4",
                    ry: "8",
                    stroke: "#BF5E18",
                    strokeWidth: "0.5",
                    fill: "none",
                    transform: "rotate(180,160,12)"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                    cx: "160",
                    cy: "6",
                    rx: "4",
                    ry: "8",
                    stroke: "#BF5E18",
                    strokeWidth: "0.5",
                    fill: "none",
                    transform: "rotate(270,160,12)"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "160",
                    cy: "12",
                    r: "1.5",
                    stroke: "#D4880A",
                    strokeWidth: "0.5",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: "176,12 182,7 188,12 182,17",
                    stroke: "#D4880A",
                    strokeWidth: "0.5",
                    fill: "none"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: "194",
                    y1: "12",
                    x2: "320",
                    y2: "12",
                    stroke: "#BF5E18",
                    strokeWidth: "0.75"
                }, void 0, false, {
                    fileName: "[project]/src/components/shared/primitives.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shared/primitives.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shared/primitives.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
function SareeBorderDivider({ count = 40, step = 36 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-3 bg-dark overflow-hidden shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 w-full h-full",
                preserveAspectRatio: "none",
                "aria-hidden": true,
                children: Array.from({
                    length: count
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: `${i * step + step / 2},2 ${i * step + step / 2 + 8},6 ${i * step + step / 2},10 ${i * step + step / 2 - 8},6`,
                        fill: "none",
                        stroke: "#D4880A",
                        strokeWidth: "0.4",
                        opacity: "0.18"
                    }, i, false, {
                        fileName: "[project]/src/components/shared/primitives.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[25%] left-0 right-0 h-px bg-gold opacity-55"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[60%] left-0 right-0 h-[1.5px] bg-copper opacity-75"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[90%] left-0 right-0 h-px bg-gold opacity-55"
            }, void 0, false, {
                fileName: "[project]/src/components/shared/primitives.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/primitives.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/storefront/Footer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/Footer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/Footer.tsx", "default");
}),
"[project]/src/components/storefront/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/Footer.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/Footer.tsx <module evaluation>", "default");
}),
"[project]/src/components/storefront/Footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/Footer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/storefront/Navbar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavLink",
    ()=>NavLink,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NavLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavLink() from the server but NavLink is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/Navbar.tsx", "NavLink");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/Navbar.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/Navbar.tsx", "default");
}),
"[project]/src/components/storefront/Navbar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavLink",
    ()=>NavLink,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NavLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavLink() from the server but NavLink is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/Navbar.tsx <module evaluation>", "NavLink");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/Navbar.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/Navbar.tsx <module evaluation>", "default");
}),
"[project]/src/components/storefront/Navbar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/Navbar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/Navbar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/storefront/ProductCard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProductCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProductCard() from the server but ProductCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/ProductCard.tsx", "ProductCard");
}),
"[project]/src/components/storefront/ProductCard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProductCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProductCard() from the server but ProductCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/ProductCard.tsx <module evaluation>", "ProductCard");
}),
"[project]/src/components/storefront/ProductCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/ProductCard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/ProductCard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/storefront/home/BrowseByCategory.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/BrowseByCategory.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/BrowseByCategory.tsx", "default");
}),
"[project]/src/components/storefront/home/BrowseByCategory.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/BrowseByCategory.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/BrowseByCategory.tsx <module evaluation>", "default");
}),
"[project]/src/components/storefront/home/BrowseByCategory.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$BrowseByCategory$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/home/BrowseByCategory.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$BrowseByCategory$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/BrowseByCategory.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$BrowseByCategory$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/storefront/home/FeaturedCollection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeaturedCollection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/storefront/ProductCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/primitives.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/reveal.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
const FEATURED = [
    {
        id: 1,
        catalogId: 'p1',
        slug: 'royal-crimson-benarasi',
        badge: 'NEW ARRIVAL',
        badgeColor: '#BF5E18',
        gradient: 'linear-gradient(145deg, #2A0D06, #6B2E0E 35%, #BF5E18 70%, #8B3A14)',
        name: 'Royal Crimson Benarasi',
        sub: 'Pure Silk · Handwoven · Varanasi',
        price: '₹24,500',
        priceNum: 24500,
        label: 'Benarasi silk — rich crimson with gold zari',
        aspect: 2 / 3,
        images: [
            '/Products/Banarasi/royal-crimson-benarasi.png'
        ]
    },
    {
        id: 2,
        catalogId: 'c2',
        slug: 'nilima-tant-cotton',
        badge: null,
        gradient: 'linear-gradient(145deg, #EDE3D6, #D4B896 40%, #B8956A 70%, #8C6A55)',
        name: 'Nilima Tant Cotton',
        sub: 'Cotton Tant · West Bengal',
        price: '₹3,800',
        priceNum: 3800,
        label: 'Tant cotton — ivory with delicate border',
        aspect: 3 / 4,
        images: [
            '/Products/Handlooms/nilima-tant-cotton.png'
        ]
    },
    {
        id: 3,
        catalogId: 'c5',
        slug: 'priya-kantha-stitch',
        badge: 'FEATURED',
        badgeColor: '#D4880A',
        gradient: 'linear-gradient(145deg, #1C0A06, #4A2010 45%, #8C6A55 90%)',
        name: 'Priya Kantha Stitch',
        sub: 'Kantha Embroidery · Hand-stitched',
        price: '₹8,900',
        priceNum: 8900,
        label: 'Kantha silk — hand embroidered',
        aspect: 3 / 4,
        images: [
            '/Products/Handlooms/priya-kantha-stitch.png'
        ]
    }
];
const GH = 780;
function FeaturedCollection({ products = FEATURED }) {
    const FEAT = products.length ? products : FEATURED;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-ivory px-5 py-14 md:py-24 md:px-[clamp(32px,6vw,85px)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-end justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-3.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-copper",
                                            children: "FEATURED SAREES"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-7 h-px bg-copper"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-display font-light text-[28px] md:text-[clamp(30px,3vw,42px)] leading-[1.15] text-dark",
                                    children: [
                                        "The ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                            className: "italic text-copper",
                                            children: "Season's"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                            lineNumber: 70,
                                            columnNumber: 19
                                        }, this),
                                        " Finest Drapes"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/sarees",
                            className: "hidden md:inline-block font-sans text-[10px] font-normal tracking-[0.2em] uppercase text-copper no-underline border-b border-copper pb-0.5 mb-1.5 whitespace-nowrap hover:text-[#A0501A] transition-colors",
                            children: "View All Sarees →"
                        }, void 0, false, {
                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                href: "/sarees",
                className: "md:hidden inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-copper no-underline border-b border-copper pb-0.5 mt-2 hover:text-[#A0501A] transition-colors",
                children: "View All Sarees →"
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                delay: 80,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AlponaDivider"], {
                    className: "my-8"
                }, void 0, false, {
                    fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 md:hidden",
                children: FEAT.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                        delay: i * 90,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductCard"], {
                            product: p
                        }, void 0, false, {
                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    }, p.id, false, {
                        fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:grid gap-5",
                style: {
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: `${GH * 0.58}px ${GH * 0.58}px`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridRow: '1 / 3'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                            className: "h-full",
                            as: "div",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductCard"], {
                                product: FEAT[0],
                                imgHeight: GH * 1.02
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridRow: '1 / 2'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                            as: "div",
                            className: "h-full",
                            delay: 120,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductCard"], {
                                product: FEAT[1],
                                imgHeight: GH * 0.58 * 0.72
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridRow: '2 / 3'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                            as: "div",
                            className: "h-full",
                            delay: 200,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductCard"], {
                                product: FEAT[2],
                                imgHeight: GH * 0.58 * 0.72
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/storefront/home/FeaturedCollection.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/storefront/home/Hero.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HERO_SLIDES",
    ()=>HERO_SLIDES,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HERO_SLIDES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HERO_SLIDES() from the server but HERO_SLIDES is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/Hero.tsx", "HERO_SLIDES");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/Hero.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/Hero.tsx", "default");
}),
"[project]/src/components/storefront/home/Hero.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HERO_SLIDES",
    ()=>HERO_SLIDES,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HERO_SLIDES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HERO_SLIDES() from the server but HERO_SLIDES is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/Hero.tsx <module evaluation>", "HERO_SLIDES");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/Hero.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/Hero.tsx <module evaluation>", "default");
}),
"[project]/src/components/storefront/home/Hero.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/home/Hero.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/Hero.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/storefront/home/JewellerySpotlight.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/JewellerySpotlight.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/JewellerySpotlight.tsx", "default");
}),
"[project]/src/components/storefront/home/JewellerySpotlight.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/JewellerySpotlight.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/JewellerySpotlight.tsx <module evaluation>", "default");
}),
"[project]/src/components/storefront/home/JewellerySpotlight.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$JewellerySpotlight$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/home/JewellerySpotlight.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$JewellerySpotlight$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/JewellerySpotlight.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$JewellerySpotlight$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/storefront/home/Marquee.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Marquee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const MARQUEE_ITEMS = [
    {
        en: 'Benarasi',
        bn: 'বেনারসি'
    },
    {
        en: 'Tant',
        bn: 'তাঁত'
    },
    {
        en: 'Muslin',
        bn: 'মসলিন'
    },
    {
        en: 'Kantha',
        bn: 'কাঁথা'
    },
    {
        en: 'Free Shipping Above ₹10,000'
    },
    {
        en: 'Silk',
        bn: 'সিল্ক'
    },
    {
        en: 'Temple Jewellery',
        bn: 'মন্দির গহনা'
    },
    {
        en: 'Handwoven Heritage',
        bn: 'হস্তনির্মিত ঐতিহ্য'
    }
];
function Marquee({ items = MARQUEE_ITEMS }) {
    const list = items.length ? items : MARQUEE_ITEMS;
    const tripled = [
        ...list,
        ...list,
        ...list
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-[36px] md:h-[38px] bg-ivory md:bg-copper border-y border-[rgba(212,136,10,0.3)] overflow-hidden flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "marquee-track hidden md:flex gap-0",
                children: tripled.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-2 pl-2 whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-sans text-[11px] font-normal tracking-[0.18em] uppercase text-ivory",
                                children: item.en
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this),
                            item.bn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bengali text-[13px] font-light text-[rgba(245,239,230,0.78)]",
                                children: item.bn
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[rgba(245,239,230,0.4)] text-sm pl-2",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "marquee-track flex md:hidden gap-0",
                children: tripled.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1.5 pl-4 whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-sans text-[10px] tracking-[0.18em] uppercase text-copper",
                                children: item.en
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            item.bn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bengali text-[12px] font-light text-[rgba(28,10,6,0.75)]",
                                children: item.bn
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[rgba(140,106,85,0.5)] text-xs pl-1.5",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/Marquee.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/storefront/home/Marquee.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/storefront/home/OurHeritage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurHeritage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/primitives.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/reveal.tsx [app-rsc] (ecmascript)");
;
;
;
const DEFAULT = {
    eyebrow: 'OUR HERITAGE',
    headlineParts: [
        'A Boutique Born from ',
        {
            italic: true,
            copper: true,
            text: 'Love'
        },
        ' of Weave'
    ],
    blockquote: 'Each saree we curate carries a piece of Shantiniketan — the same red soil where Tagore once walked, the same looms that have hummed for generations.',
    paragraphs: [
        "Sumam's Boutique began not as a business, but as a search — for sarees that still held the warmth of Bengali earth, the patience of handloom weavers, and the quiet grace of traditions passed down through generations.",
        'We travel each season to artisan families in Shantiniketan, Murshidabad, Bishnupur, and Shantipur — sourcing weaves that carry not just thread, but memory. Every piece is one-of-one. Once gone, never woven again.'
    ],
    image: '',
    founder: {
        en: 'Sumam',
        bn: 'সুমাম'
    },
    photoLabel: 'FOUNDER SUMAM AT THE SHANTINIKETAN LOOM'
};
function renderParts(parts) {
    return parts.map((p, i)=>typeof p === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: p
        }, i, false, {
            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
            className: "italic text-copper font-medium not-italic",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "italic font-light",
                children: p.text
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, i, false, {
            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this));
}
function OurHeritage({ data }) {
    const d = data && data.blockquote ? data : DEFAULT;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-dark relative overflow-hidden px-5 py-[72px] md:px-[clamp(32px,6vw,85px)] md:py-[112px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none opacity-[0.03]",
                style: {
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundSize: '200px 200px'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-3 mb-14",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-gold",
                                        children: d.eyebrow
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                        lineNumber: 53,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-px bg-gold"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                        lineNumber: 56,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                lineNumber: 52,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$primitives$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Eyebrow"], {
                                label: d.eyebrow,
                                color: "text-gold",
                                cn: "md:hidden"
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                lineNumber: 58,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-6 md:gap-[60px] items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                                as: "div",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-full aspect-[5/6] overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0",
                                                    style: {
                                                        background: 'linear-gradient(155deg, #2A1008, #BF5E18)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-3 border border-[rgba(212,136,10,0.4)] z-20 pointer-events-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 flex items-center justify-center z-10",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bengali text-[64px] font-light text-ivory opacity-30 tracking-[0.04em] select-none",
                                                        children: d.founder.bn
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden md:block absolute bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border border-dashed border-[rgba(245,239,230,0.15)] px-3.5 py-1.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-sans text-[9px] tracking-[0.12em] uppercase text-[rgba(245,239,230,0.3)] text-center",
                                                            children: [
                                                                d.photoLabel.split('/')[0],
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                                    lineNumber: 78,
                                                                    columnNumber: 21
                                                                }, this),
                                                                d.photoLabel.split('/')[1]?.trim()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                            lineNumber: 76,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                            lineNumber: 65,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:hidden text-center font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,230,0.35)] mt-5 mb-10",
                                            children: d.photoLabel.toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                            lineNumber: 85,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                    lineNumber: 64,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Reveal"], {
                                as: "div",
                                delay: 100,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:max-w-[480px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-display font-light text-[28px] md:text-[clamp(28px,2.8vw,38px)] leading-[1.2] text-ivory mb-7",
                                            children: renderParts(d.headlineParts)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                            lineNumber: 94,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                            className: "border-l-2 border-copper pl-5 mb-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-display italic text-[17px] md:text-[22px] font-light text-[rgba(245,239,230,0.95)] leading-[1.5]",
                                                children: [
                                                    '"',
                                                    d.blockquote,
                                                    '"'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                lineNumber: 99,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                            lineNumber: 98,
                                            columnNumber: 13
                                        }, this),
                                        d.paragraphs.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-sans text-[14px] font-light text-[rgba(245,239,230,0.70)] leading-[1.8] mb-4",
                                                children: p
                                            }, i, false, {
                                                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-7",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-display italic text-[18px] text-copper",
                                                    children: [
                                                        "— ",
                                                        d.founder.en
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bengali text-[13px] font-light text-[rgba(212,136,10,0.60)] mt-1",
                                                    children: [
                                                        "— ",
                                                        d.founder.bn
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                            lineNumber: 113,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                    lineNumber: 93,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/storefront/home/OurHeritage.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/storefront/home/ReviewsAndInstagram.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/ReviewsAndInstagram.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/ReviewsAndInstagram.tsx", "default");
}),
"[project]/src/components/storefront/home/ReviewsAndInstagram.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/storefront/home/ReviewsAndInstagram.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/storefront/home/ReviewsAndInstagram.tsx <module evaluation>", "default");
}),
"[project]/src/components/storefront/home/ReviewsAndInstagram.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$ReviewsAndInstagram$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/storefront/home/ReviewsAndInstagram.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$ReviewsAndInstagram$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/storefront/home/ReviewsAndInstagram.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$storefront$2f$home$2f$ReviewsAndInstagram$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/lib/catalog.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Unified client-side product catalog (Phase 2 storefront). Single source of
// truth so PLP/PDP/homepage all read from the same data. Swap internals for
// Supabase queries in Phase 3 without changing component props.
__turbopack_context__.s([
    "CATALOG",
    ()=>CATALOG,
    "JEWELLERY",
    ()=>JEWELLERY,
    "OCCASIONS",
    ()=>OCCASIONS,
    "OPTIONS",
    ()=>OPTIONS,
    "SAREES",
    ()=>SAREES,
    "WEAVES",
    ()=>WEAVES,
    "bySlug",
    ()=>bySlug,
    "numToPrice",
    ()=>n
]);
const G = {
    benarasiHero: 'linear-gradient(155deg, #2A0D06, #6B2410 35%, #A04514 70%, #BF5E18)',
    benarasiAlt: 'linear-gradient(165deg, #3D1408, #7A2C0C 45%, #BF5E18 75%, #8B3A14)',
    tantLight: 'linear-gradient(170deg, #F5EFE6, #DCC9A8 45%, #B8956A 80%, #8C6A55)',
    muslinLight: 'linear-gradient(170deg, #EDE3D6, #C9B488 50%, #8E6F4A 90%)',
    jamdaniLight: 'linear-gradient(170deg, #EDE3D6, #C4A878 55%, #6B5238)',
    kanthaDark: 'linear-gradient(155deg, #1C0A06, #4A2010 45%, #8C6A55 90%)',
    silkDark: 'linear-gradient(155deg, #2A1008, #5A2A14 40%, #A04A18 75%, #D4880A)',
    silkBridal: 'linear-gradient(160deg, #3D1408, #6B2310 40%, #BF5E18 70%, #D4880A)',
    garadLight: 'linear-gradient(170deg, #F5EFE6, #E8D5B0 50%, #BF5E18 95%)',
    mishraBry: 'linear-gradient(145deg, #14301E, #1F5236 50%, #4A8B68)',
    ivoryBry: 'linear-gradient(145deg, #EDE3D6, #D4B896 50%, #BFA678)',
    rustBry: 'linear-gradient(145deg, #3D1C0A, #8B3A14 50%, #C4611A)',
    maroonBry: 'linear-gradient(145deg, #1C0A06, #4A2010 50%, #BF5E18)',
    templeJ: 'linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)',
    maangtikkaJ: 'linear-gradient(165deg, #4A3810, #8B5E10 40%, #E8A820 70%, #BF5E18)',
    contemporaryJ: 'linear-gradient(165deg, #5A2A14, #8B3A14 40%, #C4611A 70%, #4A2010)'
};
const n = (s)=>parseInt(s.replace(/[₹,]/g, ''), 10);
const CATALOG = [
    {
        id: 'c1',
        slug: 'chandrakala-benarasi-silk',
        type: 'saree',
        name: 'Chandrakala Benarasi Silk',
        sub: 'Benarasi · Bridal',
        tag: '',
        price: '₹42,500',
        priceNum: n('42500'),
        badge: 'Featured',
        gradient: G.benarasiHero,
        label: 'chandrakala motif zari',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Bridal',
        images: [
            '/Products/Banarasi/chandrakala-benarasi-silk.png'
        ]
    },
    {
        id: 'c2',
        slug: 'nilima-tant-cotton',
        type: 'saree',
        name: 'Nilima Tant Cotton',
        sub: 'Tant · Everyday',
        tag: '',
        price: '₹3,800',
        priceNum: n('3800'),
        badge: 'New Arrival',
        gradient: G.tantLight,
        label: 'everyday tant weave',
        sold: false,
        weave: 'Tant',
        occasion: 'Everyday',
        images: [
            '/Products/Handlooms/nilima-tant-cotton.png'
        ]
    },
    {
        id: 'c3',
        slug: 'aarohi-muslin-drape',
        type: 'saree',
        name: 'Aarohi Muslin Drape',
        sub: 'Muslin · Festive',
        tag: '',
        price: '₹12,200',
        priceNum: n('12200'),
        badge: null,
        gradient: G.muslinLight,
        label: 'airlight muslin',
        sold: false,
        weave: 'Muslin',
        occasion: 'Festive',
        images: [
            '/Products/Handlooms/aarohi-muslin-drape.png'
        ]
    },
    {
        id: 'c4',
        slug: 'durga-temple-necklace-set',
        type: 'jewel',
        name: 'Durga Temple Necklace Set',
        sub: '',
        tag: 'Temple Collection',
        price: '₹18,750',
        priceNum: n('18750'),
        badge: null,
        gradient: G.templeJ,
        label: 'lakshmi temple necklace · antique gold',
        sold: false,
        weave: 'Temple',
        occasion: 'Festive',
        images: [
            '/Products/jewellery/durga-temple-necklace-set.png'
        ]
    },
    {
        id: 'c5',
        slug: 'priya-kantha-stitch',
        type: 'saree',
        name: 'Priya Kantha Stitch',
        sub: 'Kantha · Everyday',
        tag: '',
        price: '₹8,900',
        priceNum: n('8900'),
        badge: null,
        gradient: G.kanthaDark,
        label: 'hand embroidered kantha',
        sold: true,
        weave: 'Kantha',
        occasion: 'Everyday',
        images: [
            '/Products/Handlooms/priya-kantha-stitch.png'
        ]
    },
    {
        id: 'c6',
        slug: 'madhubani-silk-weave',
        type: 'saree',
        name: 'Madhubani Silk Weave',
        sub: 'Silk · Festive',
        tag: '',
        price: '₹28,000',
        priceNum: n('28000'),
        badge: 'New Arrival',
        gradient: G.silkDark,
        label: 'madhubani inspired silk',
        sold: false,
        weave: 'Silk',
        occasion: 'Festive',
        images: [
            '/Products/Handlooms/madhubani-silk-weave.png'
        ]
    },
    {
        id: 'c7',
        slug: 'rukmini-jamdani-cotton',
        type: 'saree',
        name: 'Rukmini Jamdani Cotton',
        sub: 'Jamdani · Puja',
        tag: '',
        price: '₹14,500',
        priceNum: n('14500'),
        badge: null,
        gradient: G.jamdaniLight,
        label: 'fine jamdani resist',
        sold: false,
        weave: 'Jamdani',
        occasion: 'Puja',
        images: [
            '/Products/Handlooms/rukmini-jamdani-cotton.png'
        ]
    },
    {
        id: 'c8',
        slug: 'shankha-garad-silk',
        type: 'saree',
        name: 'Shankha Garad Silk',
        sub: 'Garad · Wedding Guest',
        tag: '',
        price: '₹19,200',
        priceNum: n('19200'),
        badge: null,
        gradient: G.garadLight,
        label: 'wedding guest garad',
        sold: false,
        weave: 'Garad',
        occasion: 'Wedding Guest',
        images: [
            '/Products/Handlooms/shankha-garad-silk.png'
        ]
    },
    {
        id: 'c9',
        slug: 'annapurna-benarasi-silk',
        type: 'saree',
        name: 'Annapurna Benarasi Silk',
        sub: 'Benarasi · Puja',
        tag: '',
        price: '₹36,800',
        priceNum: n('36800'),
        badge: 'Featured',
        gradient: G.benarasiAlt,
        label: 'puja gold zari',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Puja',
        images: [
            '/Products/Banarasi/annapurna-benarasi-silk.png'
        ]
    },
    {
        id: 'c10',
        slug: 'kolkata-contemporary-studs',
        type: 'jewel',
        name: 'Kolkata Contemporary Studs',
        sub: '',
        tag: 'Contemporary Collection',
        price: '₹6,400',
        priceNum: n('6400'),
        badge: null,
        gradient: G.contemporaryJ,
        label: 'contemporary studs',
        sold: false,
        weave: 'Contemporary',
        occasion: 'Everyday',
        images: [
            '/Products/jewellery/kolkata-contemporary-studs.png'
        ]
    },
    {
        id: 'c11',
        slug: 'meera-tant-handloom',
        type: 'saree',
        name: 'Meera Tant Handloom',
        sub: 'Tant · Everyday',
        tag: '',
        price: '₹4,200',
        priceNum: n('4200'),
        badge: null,
        gradient: G.tantLight,
        label: 'handloom tant',
        sold: true,
        weave: 'Tant',
        occasion: 'Everyday',
        images: [
            '/Products/Handlooms/meera-tant-handloom.png'
        ]
    },
    {
        id: 'c12',
        slug: 'devika-silk-drape',
        type: 'saree',
        name: 'Devika Silk Drape',
        sub: 'Silk · Bridal',
        tag: '',
        price: '₹52,000',
        priceNum: n('52000'),
        badge: null,
        gradient: G.silkBridal,
        label: 'bridal silk drape',
        sold: false,
        weave: 'Silk',
        occasion: 'Bridal',
        images: [
            '/Products/Handlooms/devika-silk-drape.png'
        ]
    },
    // PDP resolve targets (also appear in related/styled strips)
    {
        id: 'p1',
        slug: 'royal-crimson-benarasi',
        type: 'saree',
        name: 'Royal Crimson Benarasi',
        sub: 'Benarasi · Bridal',
        tag: '',
        price: '₹24,500',
        priceNum: n('24500'),
        badge: null,
        gradient: 'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)',
        label: 'one of one crimson',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Bridal',
        images: [
            '/Products/Banarasi/royal-crimson-benarasi.png'
        ]
    },
    {
        id: 'p2',
        slug: 'emerald-benarasi-silk',
        type: 'saree',
        name: 'Emerald Benarasi Silk',
        sub: 'Benarasi · Festive',
        tag: '',
        price: '₹26,800',
        priceNum: n('26800'),
        badge: 'New Arrival',
        gradient: G.mishraBry,
        label: 'emerald with silver zari',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Festive',
        images: [
            '/Products/Banarasi/emerald-benarasi-silk.png'
        ]
    },
    {
        id: 'p3',
        slug: 'maroon-heritage-benarasi',
        type: 'saree',
        name: 'Maroon Heritage Benarasi',
        sub: 'Benarasi · Festive',
        tag: '',
        price: '₹22,400',
        priceNum: n('22400'),
        badge: null,
        gradient: G.maroonBry,
        label: 'classic maroon pallu',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Festive',
        images: [
            '/Products/Banarasi/maroon-heritage-benarasi.png'
        ]
    },
    {
        id: 'p4',
        slug: 'ivory-royal-benarasi',
        type: 'saree',
        name: 'Ivory Royal Benarasi',
        sub: 'Benarasi · Bridal',
        tag: '',
        price: '₹28,500',
        priceNum: n('28500'),
        badge: 'Featured',
        gradient: G.ivoryBry,
        label: 'ivory with gold zari',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Bridal',
        images: [
            '/Products/Banarasi/ivory-royal-benarasi.png'
        ]
    },
    {
        id: 'p5',
        slug: 'rust-antique-benarasi',
        type: 'saree',
        name: 'Rust Antique Benarasi',
        sub: 'Benarasi · Festive',
        tag: '',
        price: '₹19,800',
        priceNum: n('19800'),
        badge: null,
        gradient: G.rustBry,
        label: 'rust antique gold work',
        sold: false,
        weave: 'Benarasi',
        occasion: 'Festive',
        images: [
            '/Products/Banarasi/rust-antique-benarasi.png'
        ]
    },
    {
        id: 'j1',
        slug: 'lakshmi-temple-necklace',
        type: 'jewel',
        name: 'Lakshmi Temple Necklace',
        sub: '',
        tag: 'Temple Collection',
        price: '₹3,200',
        priceNum: n('3200'),
        badge: null,
        gradient: G.templeJ,
        label: 'lakshmi temple necklace · antique gold',
        sold: false,
        weave: 'Temple',
        occasion: 'Festive',
        images: [
            '/Products/jewellery/lakshmi-temple-necklace.png'
        ]
    },
    {
        id: 'j2',
        slug: 'heirloom-maangtikka',
        type: 'jewel',
        name: 'Heirloom Maangtikka',
        sub: '',
        tag: 'Gold-Plated',
        price: '₹1,950',
        priceNum: n('1950'),
        badge: null,
        gradient: G.maangtikkaJ,
        label: 'golden maangtikka · forehead ornament',
        sold: false,
        weave: 'Gold-Plated',
        occasion: 'Festive',
        images: [
            '/Products/jewellery/heirloom-maangtikka.png'
        ]
    },
    {
        id: 'j3',
        slug: 'drop-temple-earrings',
        type: 'jewel',
        name: 'Drop Temple Earrings',
        sub: '',
        tag: 'Temple Collection',
        price: '₹2,400',
        priceNum: n('2400'),
        badge: null,
        gradient: G.templeJ,
        label: 'temple earrings · drop style',
        sold: false,
        weave: 'Temple',
        occasion: 'Bridal',
        images: [
            '/Products/jewellery/drop-temple-earrings.png'
        ]
    }
];
const bySlug = (slug)=>CATALOG.find((p)=>p.slug === slug);
const SAREES = CATALOG.filter((p)=>p.type === 'saree');
const JEWELLERY = CATALOG.filter((p)=>p.type === 'jewel');
const OPTIONS = {
    sarees: SAREES,
    jewellery: JEWELLERY,
    all: CATALOG
};
const WEAVES = [
    'Benarasi',
    'Tant',
    'Muslin',
    'Jamdani',
    'Kantha',
    'Garad',
    'Silk',
    'Temple',
    'Contemporary',
    'Gold-Plated'
];
const OCCASIONS = [
    'Bridal',
    'Festive',
    'Everyday',
    'Puja',
    'Wedding Guest'
];
;
}),
"[project]/src/lib/cn.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
function cn(...parts) {
    return parts.filter(Boolean).join(' ');
}
}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearDataCache",
    ()=>clearDataCache,
    "fmt",
    ()=>fmt,
    "getAllProducts",
    ()=>getAllProducts,
    "getHomeContent",
    ()=>getHomeContent,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByType",
    ()=>getProductsByType
]);
// Server-side data access for the storefront. Reads from Supabase and maps
// rows to the CatalogProduct shape the components already consume.
// Falls back to the static catalog when the DB isn't reachable or is empty,
// so the site still renders pre-seed. Mark caching: these are server fetches.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/catalog.ts [app-rsc] (ecmascript)");
;
;
const GRADIENTS = {
    Benarasi: 'linear-gradient(155deg, #2A0D06 0%, #7A2C0C 50%, #BF5E18 100%)',
    Tant: 'linear-gradient(170deg, #F5EFE6 0%, #DCC9A8 45%, #B8956A 80%, #8C6A55 100%)',
    Muslin: 'linear-gradient(170deg, #EDE3D6 0%, #C9B488 50%, #8E6F4A 90%)',
    Silk: 'linear-gradient(155deg, #2A1008 0%, #5A2A14 40%, #A04A18 75%, #D4880A 100%)',
    Kantha: 'linear-gradient(155deg, #1C0A06 0%, #4A2010 45%, #8C6A55 90%)',
    Jamdani: 'linear-gradient(170deg, #EDE3D6 0%, #C4A878 55%, #6B5238)',
    Garad: 'linear-gradient(170deg, #F5EFE6 0%, #E8D5B0 50%, #BF5E18 95%)',
    Temple: 'linear-gradient(165deg, #4A2010 0%, #8B3A14 40%, #C4611A 70%, #7A2C0C 100%)',
    Contemporary: 'linear-gradient(165deg, #5A2A14 0%, #8B3A14 40%, #C4611A 70%, #4A2010 100%)',
    'Gold-Plated': 'linear-gradient(165deg, #4A3810 0%, #8B5E10 40%, #E8A820 70%, #BF5E18 100%)'
};
function fmt(n) {
    const num = Number(n);
    return '₹' + num.toLocaleString('en-IN');
}
// map a products row to CatalogProduct
function toProduct(row, parentOf) {
    const weave = row.categories?.name ?? '';
    const parentName = row.category_id ? parentOf.get(row.category_id) ?? null : null;
    const type = parentName === 'Jewellery' ? 'jewel' : 'saree';
    const priceNum = Number(row.price);
    const firstTag = row.occasion_tags?.[0] ?? 'Festive';
    return {
        id: row.id,
        slug: row.slug,
        type,
        name: row.name,
        sub: row.short_description ?? '',
        tag: type === 'jewel' ? row.short_description ?? '' : '',
        price: fmt(row.price),
        priceNum,
        badge: row.badge_text ?? null,
        gradient: GRADIENTS[weave] ?? GRADIENTS.Benarasi,
        label: row.name,
        sold: row.stock_status === 'sold',
        weave: weave || 'Benarasi',
        occasion: firstTag,
        images: row.product_images?.map((i)=>i.storage_path) ?? []
    };
}
// ── Circuit Breaker & Caching ────────────────────────────────────────────────
let isSupabaseAvailableState = true;
let lastFailureTimestamp = 0;
const CIRCUIT_BREAKER_COOLDOWN_MS = 60 * 1000 // 60s cooldown if host fails
;
function isSupabaseAvailable() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"]) return false;
    if (!isSupabaseAvailableState) {
        if (Date.now() - lastFailureTimestamp > CIRCUIT_BREAKER_COOLDOWN_MS) {
            isSupabaseAvailableState = true; // Allow retry after cooldown
        } else {
            return false;
        }
    }
    return true;
}
function markSupabaseFailure(err) {
    isSupabaseAvailableState = false;
    lastFailureTimestamp = Date.now();
    if ("TURBOPACK compile-time truthy", 1) {
        console.warn('[data.ts] Supabase query failed or timed out. Tripping circuit breaker for 60s:', err instanceof Error ? err.message : err);
    }
}
// Timeout helper: rejects if promise takes longer than ms
function withTimeout(promise, ms = 1500) {
    let timer;
    const timeout = new Promise((_, reject)=>{
        timer = setTimeout(()=>reject(new Error(`Timeout after ${ms}ms`)), ms);
    });
    return Promise.race([
        Promise.resolve(promise),
        timeout
    ]).finally(()=>clearTimeout(timer));
}
let cachedProducts = null;
let cachedHomeContent = null;
const CACHE_TTL_MS = 60 * 1000 // 60s in-memory cache
;
function clearDataCache() {
    cachedProducts = null;
    cachedHomeContent = null;
}
async function fetchProducts() {
    if (!isSupabaseAvailable()) return null;
    try {
        const res = await withTimeout(Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('categories').select('id, name, parent_id'),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('products').select('id, name, slug, category_id, short_description, price, compare_at_price, badge_text, badge_color, is_featured_large, stock_status, occasion_tags, product_images(storage_path), categories(name)').eq('is_published', true).eq('is_active', true)
        ]), 1500);
        const [{ data: cats, error: catErr }, { data, error }] = res;
        if (error || catErr) {
            markSupabaseFailure(error || catErr);
            return null;
        }
        const parentOf = new Map();
        const byId = new Map((cats ?? []).map((c)=>[
                c.id,
                c
            ]));
        for (const c of cats ?? []){
            const p = c.parent_id ? byId.get(c.parent_id) : undefined;
            if (p) parentOf.set(c.id, p.name);
        }
        return {
            rows: data ?? [],
            parentOf
        };
    } catch (err) {
        markSupabaseFailure(err);
        return null;
    }
}
async function getAllProducts() {
    const now = Date.now();
    if (cachedProducts && cachedProducts.expiresAt > now) {
        return cachedProducts.data;
    }
    const res = await fetchProducts();
    const data = !res || res.rows.length === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CATALOG"] : res.rows.map((r)=>toProduct(r, res.parentOf));
    cachedProducts = {
        data,
        expiresAt: now + CACHE_TTL_MS
    };
    return data;
}
async function getProductsByType(type) {
    const all = await getAllProducts();
    return all.filter((p)=>p.type === type);
}
async function getProductBySlug(slug) {
    const all = await getAllProducts();
    return all.find((p)=>p.slug === slug);
}
const emptyHomeContent = {
    hero: [],
    marquee: [],
    browse_by_category: {
        sarees: {
            hero: {},
            small: []
        },
        jewellery: []
    },
    featured_collection: [],
    our_heritage: {},
    jewellery_spotlight: {},
    testimonials: [],
    instagram_strip: {},
    footer: {}
};
async function fetchAllContentBlocks() {
    if (!isSupabaseAvailable()) return null;
    try {
        const { data, error } = await withTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('content_blocks').select('section_key, content').eq('is_published', true), 1500);
        if (error || !data) {
            markSupabaseFailure(error);
            return null;
        }
        const map = {};
        for (const item of data){
            map[item.section_key] = item.content;
        }
        return map;
    } catch (err) {
        markSupabaseFailure(err);
        return null;
    }
}
async function getHomeContent() {
    const now = Date.now();
    if (cachedHomeContent && cachedHomeContent.expiresAt > now) {
        return cachedHomeContent.data;
    }
    const blockMap = await fetchAllContentBlocks();
    const out = {
        ...emptyHomeContent
    };
    if (blockMap) {
        if (blockMap.hero) out.hero = blockMap.hero;
        if (blockMap.marquee) out.marquee = blockMap.marquee;
        if (blockMap.browse_by_category) out.browse_by_category = blockMap.browse_by_category;
        if (blockMap.featured_collection) out.featured_collection = blockMap.featured_collection;
        if (blockMap.our_heritage) out.our_heritage = blockMap.our_heritage;
        if (blockMap.jewellery_spotlight) out.jewellery_spotlight = blockMap.jewellery_spotlight;
        if (blockMap.testimonials) out.testimonials = blockMap.testimonials;
        if (blockMap.instagram_strip) out.instagram_strip = blockMap.instagram_strip;
        if (blockMap.footer) out.footer = blockMap.footer;
    }
    cachedHomeContent = {
        data: out,
        expiresAt: now + CACHE_TTL_MS
    };
    return out;
}
}),
"[project]/src/lib/reveal.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Reveal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Reveal() from the server but Reveal is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/lib/reveal.tsx", "Reveal");
}),
"[project]/src/lib/reveal.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Reveal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Reveal() from the server but Reveal is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/lib/reveal.tsx <module evaluation>", "Reveal");
}),
"[project]/src/lib/reveal.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/reveal.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/lib/reveal.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1c3vhoz._.js.map