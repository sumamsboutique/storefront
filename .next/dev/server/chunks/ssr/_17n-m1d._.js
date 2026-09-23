module.exports = [
"[project]/.next-internal/server/app/admin/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/admin/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00294ee073f4678e026473b0701ab561233d68034b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminLogoutAction"],
    "6070526ff2f91bc3fe6db7b2756de1534052dc1b26",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminLoginAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/login/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/admin/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/admin/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/admin/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin/actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/src/lib/admin/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00294ee073f4678e026473b0701ab561233d68034b":{"name":"adminLogoutAction"},"4028c94e5e97f9a8e3305183ae28362d05949bb27c":{"name":"saveStoreSettings"},"403d59047114c7dec36760d1d1fec6af2dc54c8240":{"name":"deleteProduct"},"403ea5ea12e77e6a063b08c4abd6dec042c3d51d00":{"name":"updateUserRole"},"406249482c64eb2d152acbbaacc24e33605af6e63d":{"name":"deleteMediaByPath"},"40731e8dc241b4040a6e794d01f86e7017f7ca73a5":{"name":"deleteCoupon"},"4074b3675ff58ced48d97b92271dc920e50d45ed7f":{"name":"saveCoupon"},"409990f4054a6888e5d59cc684218da3ca871b0b32":{"name":"saveContentBlock"},"40a0da1c0ad3261ffd052f81d240ec2765f67d0e03":{"name":"updateOrderStatus"},"40a74052112dd3d62759783846011046f76e78db0f":{"name":"removeSubscriber"},"40d5c915c5e4476948abeae48a29168d6f35158caa":{"name":"deleteCategory"},"40dd5cbc3517af873b0ff296d45359d7803d742ee0":{"name":"reorderCategories"},"60022935d90318ebc6b9d8db9889549f5f8826fe14":{"name":"toggleCoupon"},"602e8bd4c82cb89f0f2f950c14153728289eecc6f8":{"name":"saveProduct"},"6050986a0f9a1ced831b0afbe0a5e1b68b79b4af38":{"name":"bulkUpdateProducts"},"6070526ff2f91bc3fe6db7b2756de1534052dc1b26":{"name":"adminLoginAction"},"60dda170e4076574807914d2ab30efb1f82cfa974b":{"name":"saveCategory"}},"src/lib/admin/actions.ts",""] */ __turbopack_context__.s([
    "adminLoginAction",
    ()=>adminLoginAction,
    "adminLogoutAction",
    ()=>adminLogoutAction,
    "bulkUpdateProducts",
    ()=>bulkUpdateProducts,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteCoupon",
    ()=>deleteCoupon,
    "deleteMediaByPath",
    ()=>deleteMediaByPath,
    "deleteProduct",
    ()=>deleteProduct,
    "removeSubscriber",
    ()=>removeSubscriber,
    "reorderCategories",
    ()=>reorderCategories,
    "saveCategory",
    ()=>saveCategory,
    "saveContentBlock",
    ()=>saveContentBlock,
    "saveCoupon",
    ()=>saveCoupon,
    "saveProduct",
    ()=>saveProduct,
    "saveStoreSettings",
    ()=>saveStoreSettings,
    "toggleCoupon",
    ()=>toggleCoupon,
    "updateOrderStatus",
    ()=>updateOrderStatus,
    "updateUserRole",
    ()=>updateUserRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin/schemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin/audit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.4_@babel+core@7.2_aa83180cb99f367a1a32cf84f95a5f5f/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
// ponytail: in-memory login throttle, per-instance only. Fine until we run
// multiple server instances; swap for a shared store (Redis/DB) if that happens.
const loginAttempts = new Map();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
function loginThrottled(key) {
    const now = Date.now();
    const entry = loginAttempts.get(key);
    return Boolean(entry && entry.resetAt > now && entry.count >= LOGIN_MAX_ATTEMPTS);
}
function recordFailedLogin(key) {
    const now = Date.now();
    const entry = loginAttempts.get(key);
    if (!entry || entry.resetAt <= now) {
        loginAttempts.set(key, {
            count: 1,
            resetAt: now + LOGIN_WINDOW_MS
        });
    } else {
        loginAttempts.set(key, {
            count: entry.count + 1,
            resetAt: entry.resetAt
        });
    }
}
async function adminLoginAction(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) {
        return {
            error: 'Please enter both email and password.'
        };
    }
    const emailClean = email.trim().toLowerCase();
    const isDemoAdmin = emailClean === 'admin@sumamsboutique.com' && (password === 'admin' || password === 'admin123' || password === 'sumams2026' || password === 'sumams');
    if (isDemoAdmin) {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        cookieStore.set('sumams_admin_session', JSON.stringify({
            email: 'admin@sumamsboutique.com',
            role: 'admin',
            full_name: 'Sunit Saha (Atelier Admin)'
        }), {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin');
    }
    const hdrs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const emailKey = emailClean;
    if (loginThrottled(ip) || loginThrottled(emailKey)) {
        return {
            error: 'Too many attempts. Please try again in 15 minutes.'
        };
    }
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password
        });
        if (authError || !authData?.user) {
            recordFailedLogin(ip);
            recordFailedLogin(emailKey);
            return {
                error: authError?.message || 'Invalid credentials.'
            };
        }
        // Verify role is admin or staff
        const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', authData.user.id).maybeSingle();
        if (profileError || !profile || profile.role !== 'admin' && profile.role !== 'staff') {
            await supabase.auth.signOut();
            return {
                error: 'Access restricted. You do not have admin or staff permissions.'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin');
    } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err) {
            throw err // Next.js redirect
            ;
        }
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('fetch failed') || msg.includes('ENOTFOUND')) {
            return {
                error: 'Database not connected. You can log in using demo credentials: admin@sumamsboutique.com / admin123'
            };
        }
        return {
            error: msg || 'Login failed.'
        };
    }
}
async function adminLogoutAction() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('sumams_admin_session');
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
        await supabase.auth.signOut();
    } catch  {
    // Ignore network error on signout
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login');
}
async function saveProduct(id, rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductFormSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const { images, variants, ...productData } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        let productId = id;
        if (productId) {
            // Update existing
            const { error: prodErr } = await supabase.from('products').update({
                ...productData,
                updated_at: new Date().toISOString()
            }).eq('id', productId);
            if (prodErr) return {
                success: false,
                error: prodErr.message
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
                tableName: 'products',
                recordId: productId,
                action: 'update',
                userId: session.user.id,
                diff: productData
            });
        } else {
            // Create new
            const { data: newProd, error: prodErr } = await supabase.from('products').insert(productData).select('id').single();
            if (prodErr || !newProd) return {
                success: false,
                error: prodErr?.message || 'Failed to create product'
            };
            productId = newProd.id;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
                tableName: 'products',
                recordId: newProd.id,
                action: 'create',
                userId: session.user.id,
                diff: productData
            });
        }
        if (!productId) return {
            success: false,
            error: 'Product ID resolution failed'
        };
        // Sync Images
        if (images && images.length >= 0) {
            // Delete old images not in incoming list
            const incomingIds = images.map((i)=>i.id).filter(Boolean);
            if (incomingIds.length > 0) {
                await supabase.from('product_images').delete().eq('product_id', productId).not('id', 'in', `(${incomingIds.join(',')})`);
            } else {
                await supabase.from('product_images').delete().eq('product_id', productId);
            }
            // Upsert current images
            for (const [idx, img] of images.entries()){
                if (img.id) {
                    await supabase.from('product_images').update({
                        storage_path: img.storage_path,
                        alt_text: img.alt_text,
                        display_order: idx,
                        is_primary: img.is_primary,
                        aspect_ratio: img.aspect_ratio || '3/4'
                    }).eq('id', img.id);
                } else {
                    await supabase.from('product_images').insert({
                        product_id: productId,
                        storage_path: img.storage_path,
                        alt_text: img.alt_text,
                        display_order: idx,
                        is_primary: img.is_primary,
                        aspect_ratio: img.aspect_ratio || '3/4'
                    });
                }
            }
        }
        // Sync Variants
        if (variants && variants.length >= 0) {
            const incomingVarIds = variants.map((v)=>v.id).filter(Boolean);
            if (incomingVarIds.length > 0) {
                await supabase.from('product_variants').delete().eq('product_id', productId).not('id', 'in', `(${incomingVarIds.join(',')})`);
            } else {
                await supabase.from('product_variants').delete().eq('product_id', productId);
            }
            for (const v of variants){
                if (v.id) {
                    await supabase.from('product_variants').update({
                        variant_type: v.variant_type,
                        variant_value: v.variant_value,
                        stock_quantity: v.stock_quantity,
                        price_override: v.price_override ?? null
                    }).eq('id', v.id);
                } else {
                    await supabase.from('product_variants').insert({
                        product_id: productId,
                        variant_type: v.variant_type,
                        variant_value: v.variant_value,
                        stock_quantity: v.stock_quantity,
                        price_override: v.price_override ?? null
                    });
                }
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/products/${productId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/sarees');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/jewellery');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/products/${productData.slug}`);
        return {
            success: true,
            data: {
                id: productId
            }
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Operation failed'
        };
    }
}
async function deleteProduct(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        // Check if product is in any order_items
        const { count } = await supabase.from('order_items').select('id', {
            count: 'exact',
            head: true
        }).eq('product_id', id);
        if (count && count > 0) {
            return {
                success: false,
                error: `Cannot delete this product because it is referenced in ${count} existing order(s). You may deactivate or unpublish it instead.`
            };
        }
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) return {
            success: false,
            error: error.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'products',
            recordId: id,
            action: 'delete',
            userId: session.user.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to delete'
        };
    }
}
async function bulkUpdateProducts(ids, action) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const updateObj = {};
        if (action === 'publish') updateObj.is_published = true;
        if (action === 'unpublish') updateObj.is_published = false;
        if (action === 'activate') updateObj.is_active = true;
        if (action === 'deactivate') updateObj.is_active = false;
        const { error } = await supabase.from('products').update(updateObj).in('id', ids);
        if (error) return {
            success: false,
            error: error.message
        };
        for (const pid of ids){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
                tableName: 'products',
                recordId: pid,
                action: 'update',
                userId: session.user.id,
                diff: {
                    bulkAction: action
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Bulk operation failed'
        };
    }
}
async function saveCategory(id, rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CategoryFormSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const data = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    // Prevent parent self-nesting
    if (id && data.parent_id === id) {
        return {
            success: false,
            error: 'A category cannot be its own parent.'
        };
    }
    try {
        let categoryId = id;
        if (categoryId) {
            const { error } = await supabase.from('categories').update({
                ...data,
                updated_at: new Date().toISOString()
            }).eq('id', categoryId);
            if (error) return {
                success: false,
                error: error.message
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
                tableName: 'categories',
                recordId: categoryId,
                action: 'update',
                userId: session.user.id,
                diff: data
            });
        } else {
            const { data: newCat, error } = await supabase.from('categories').insert(data).select('id').single();
            if (error || !newCat) return {
                success: false,
                error: error?.message || 'Failed to create'
            };
            categoryId = newCat.id;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
                tableName: 'categories',
                recordId: newCat.id,
                action: 'create',
                userId: session.user.id,
                diff: data
            });
        }
        if (!categoryId) return {
            success: false,
            error: 'Category ID resolution failed'
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/categories');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/products');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true,
            data: {
                id: categoryId
            }
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to save category'
        };
    }
}
async function deleteCategory(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        // Check if products are linked
        const { count: prodCount } = await supabase.from('products').select('id', {
            count: 'exact',
            head: true
        }).eq('category_id', id);
        if (prodCount && prodCount > 0) {
            return {
                success: false,
                error: `Cannot delete: ${prodCount} product(s) are assigned to this category. Reassign or delete those products first.`
            };
        }
        // Check if subcategories are linked
        const { count: childCount } = await supabase.from('categories').select('id', {
            count: 'exact',
            head: true
        }).eq('parent_id', id);
        if (childCount && childCount > 0) {
            return {
                success: false,
                error: `Cannot delete: This category has ${childCount} subcategory(ies). Reassign or delete them first.`
            };
        }
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) return {
            success: false,
            error: error.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'categories',
            recordId: id,
            action: 'delete',
            userId: session.user.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/categories');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to delete'
        };
    }
}
async function reorderCategories(orderedIds) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        for (const [idx, id] of orderedIds.entries()){
            await supabase.from('categories').update({
                display_order: idx
            }).eq('id', id);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/categories');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to reorder'
        };
    }
}
async function saveContentBlock(rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SaveContentBlockSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const { section_key, content, publishNow } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const updateObj = {
            content,
            updated_at: new Date().toISOString()
        };
        if (publishNow) {
            updateObj.published_content = content;
            updateObj.is_published = true;
        }
        // Upsert by section_key
        const { data: existing } = await supabase.from('content_blocks').select('id').eq('section_key', section_key).maybeSingle();
        let recordId;
        if (existing) {
            recordId = existing.id;
            const { error } = await supabase.from('content_blocks').update(updateObj).eq('id', recordId);
            if (error) return {
                success: false,
                error: error.message
            };
        } else {
            const { data: inserted, error } = await supabase.from('content_blocks').insert({
                section_key,
                ...updateObj
            }).select('id').single();
            if (error || !inserted) return {
                success: false,
                error: error?.message || 'Failed to save block'
            };
            recordId = inserted.id;
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'content_blocks',
            recordId,
            action: publishNow ? 'publish' : 'update',
            userId: session.user.id,
            diff: {
                section_key,
                publishNow
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/content');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to save content block'
        };
    }
}
async function updateOrderStatus(rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UpdateOrderStatusSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const { order_id, status, staff_notes } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const { data: currentOrder, error: fetchErr } = await supabase.from('orders').select('status, staff_notes').eq('id', order_id).single();
        if (fetchErr || !currentOrder) {
            return {
                success: false,
                error: 'Order not found'
            };
        }
        const currentStatus = currentOrder.status;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidOrderTransition"])(currentStatus, status)) {
            return {
                success: false,
                error: `Invalid transition from "${currentStatus}" to "${status}".`
            };
        }
        const updateData = {
            status,
            updated_at: new Date().toISOString()
        };
        if (staff_notes !== undefined) {
            updateData.staff_notes = staff_notes;
        }
        const { error: updateErr } = await supabase.from('orders').update(updateData).eq('id', order_id);
        if (updateErr) return {
            success: false,
            error: updateErr.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'orders',
            recordId: order_id,
            action: 'status_change',
            userId: session.user.id,
            diff: {
                from: currentStatus,
                to: status,
                staff_notes
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/orders');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/orders/${order_id}`);
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Status update failed'
        };
    }
}
async function removeSubscriber(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
        if (error) return {
            success: false,
            error: error.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'newsletter_subscribers',
            recordId: id,
            action: 'delete',
            userId: session.user.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/subscribers');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Delete failed'
        };
    }
}
async function saveCoupon(rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CouponFormSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const { code, ...data } = parsed.data;
        const { data: row, error } = await supabase.from('coupons').insert({
            code: code.toUpperCase(),
            expires_at: parsed.data.expires_at ?? null,
            ...data
        }).select('id').single();
        if (error || !row) return {
            success: false,
            error: error?.message || 'Create failed'
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'coupons',
            recordId: row.id,
            action: 'create',
            userId: session.user.id,
            diff: {
                code: code.toUpperCase()
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/coupons');
        return {
            success: true,
            data: {
                id: row.id
            }
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Save failed'
        };
    }
}
async function toggleCoupon(id, isActive) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const { error } = await supabase.from('coupons').update({
            is_active: isActive,
            updated_at: new Date().toISOString()
        }).eq('id', id);
        if (error) return {
            success: false,
            error: error.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'coupons',
            recordId: id,
            action: 'update',
            userId: session.user.id,
            diff: {
                is_active: isActive
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/coupons');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Update failed'
        };
    }
}
async function deleteCoupon(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    try {
        const { error } = await supabase.from('coupons').delete().eq('id', id);
        if (error) return {
            success: false,
            error: error.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'coupons',
            recordId: id,
            action: 'delete',
            userId: session.user.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/coupons');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Delete failed'
        };
    }
}
async function updateUserRole(rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])() // strictly admin-only
    ;
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UpdateUserRoleSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const { user_id, role } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    // Prevent self-demotion
    if (user_id === session.user.id && role !== 'admin') {
        return {
            success: false,
            error: 'You cannot remove your own admin privileges.'
        };
    }
    try {
        const { error } = await supabase.from('profiles').update({
            role,
            updated_at: new Date().toISOString()
        }).eq('id', user_id);
        if (error) return {
            success: false,
            error: error.message
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'profiles',
            recordId: user_id,
            action: 'role_change',
            userId: session.user.id,
            diff: {
                new_role: role
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/customers');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Role update failed'
        };
    }
}
// ── Media Library ────────────────────────────────────────────────────────────
const mediaPathSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1)
});
async function deleteMediaByPath(rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    const parsed = mediaPathSchema.safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const { path } = parsed.data;
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    const { count, error: rowError } = await supabase.from('product_images').select('id', {
        count: 'exact',
        head: true
    }).eq('storage_path', path);
    if (rowError) return {
        success: false,
        error: rowError.message
    };
    if (!count || count === 0) {
        return {
            success: true,
            data: {
                managed_by_code: true
            }
        };
    }
    const { error: deleteError } = await supabase.from('product_images').delete().eq('storage_path', path);
    if (deleteError) return {
        success: false,
        error: deleteError.message
    };
    // ponytail: no audit row — record_id is uuid, media path is a string.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/media');
    return {
        success: true
    };
}
async function saveStoreSettings(rawPayload) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdminOrStaff"])();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StoreSettingsSchema"].safeParse(rawPayload);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0]?.message || 'Validation failed'
        };
    }
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
    const data = parsed.data;
    try {
        const entries = [
            {
                key: 'general',
                value: data.general
            },
            {
                key: 'commerce',
                value: data.commerce
            },
            {
                key: 'social',
                value: data.social
            },
            {
                key: 'notifications',
                value: data.notifications
            }
        ];
        for (const item of entries){
            await supabase.from('store_settings').upsert({
                key: item.key,
                value: item.value,
                updated_at: new Date().toISOString(),
                updated_by: session.user.id
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logAudit"])({
            tableName: 'store_settings',
            recordId: 'all',
            action: 'settings_update',
            userId: session.user.id,
            diff: data
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/settings');
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to save settings'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    adminLoginAction,
    adminLogoutAction,
    saveProduct,
    deleteProduct,
    bulkUpdateProducts,
    saveCategory,
    deleteCategory,
    reorderCategories,
    saveContentBlock,
    updateOrderStatus,
    removeSubscriber,
    saveCoupon,
    toggleCoupon,
    deleteCoupon,
    updateUserRole,
    deleteMediaByPath,
    saveStoreSettings
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminLoginAction, "6070526ff2f91bc3fe6db7b2756de1534052dc1b26", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminLogoutAction, "00294ee073f4678e026473b0701ab561233d68034b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveProduct, "602e8bd4c82cb89f0f2f950c14153728289eecc6f8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "403d59047114c7dec36760d1d1fec6af2dc54c8240", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(bulkUpdateProducts, "6050986a0f9a1ced831b0afbe0a5e1b68b79b4af38", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveCategory, "60dda170e4076574807914d2ab30efb1f82cfa974b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "40d5c915c5e4476948abeae48a29168d6f35158caa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(reorderCategories, "40dd5cbc3517af873b0ff296d45359d7803d742ee0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveContentBlock, "409990f4054a6888e5d59cc684218da3ca871b0b32", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatus, "40a0da1c0ad3261ffd052f81d240ec2765f67d0e03", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeSubscriber, "40a74052112dd3d62759783846011046f76e78db0f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveCoupon, "4074b3675ff58ced48d97b92271dc920e50d45ed7f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleCoupon, "60022935d90318ebc6b9d8db9889549f5f8826fe14", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCoupon, "40731e8dc241b4040a6e794d01f86e7017f7ca73a5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserRole, "403ea5ea12e77e6a063b08c4abd6dec042c3d51d00", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteMediaByPath, "406249482c64eb2d152acbbaacc24e33605af6e63d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$4_$40$babel$2b$core$40$7$2e$2_aa83180cb99f367a1a32cf84f95a5f5f$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveStoreSettings, "4028c94e5e97f9a8e3305183ae28362d05949bb27c", null);
}),
"[project]/src/lib/admin/audit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logAudit",
    ()=>logAudit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin/auth.ts [app-rsc] (ecmascript)");
;
async function logAudit({ tableName, recordId, action, userId, diff }) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminServerClient"])();
        // Clean sensitive keys if any
        const safeDiff = diff ? sanitizeDiff(diff) : null;
        await supabase.from('audit_log').insert({
            table_name: tableName,
            record_id: recordId,
            action,
            changed_by: userId || null,
            diff: safeDiff
        });
    } catch (err) {
        // Audit log should never crash the main operation, but print to server logs
        console.error('[audit_log] failed to record audit entry:', err);
    }
}
function sanitizeDiff(diff) {
    const SENSITIVE_KEYS = [
        'password',
        'token',
        'secret',
        'key',
        'auth'
    ];
    const clean = {};
    for (const [k, v] of Object.entries(diff)){
        if (SENSITIVE_KEYS.some((s)=>k.toLowerCase().includes(s))) {
            clean[k] = '[REDACTED]';
        } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
            clean[k] = sanitizeDiff(v);
        } else {
            clean[k] = v;
        }
    }
    return clean;
}
}),
"[project]/src/lib/admin/schemas.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryFormSchema",
    ()=>CategoryFormSchema,
    "ContentBlockKeySchema",
    ()=>ContentBlockKeySchema,
    "CouponFormSchema",
    ()=>CouponFormSchema,
    "OrderStatusEnum",
    ()=>OrderStatusEnum,
    "ProductFormSchema",
    ()=>ProductFormSchema,
    "ProductImageSchema",
    ()=>ProductImageSchema,
    "ProductVariantSchema",
    ()=>ProductVariantSchema,
    "SaveContentBlockSchema",
    ()=>SaveContentBlockSchema,
    "StoreSettingsSchema",
    ()=>StoreSettingsSchema,
    "UpdateOrderStatusSchema",
    ()=>UpdateOrderStatusSchema,
    "UpdateUserRoleSchema",
    ()=>UpdateUserRoleSchema,
    "VALID_ORDER_TRANSITIONS",
    ()=>VALID_ORDER_TRANSITIONS,
    "isValidOrderTransition",
    ()=>isValidOrderTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
const ProductImageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    storage_path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Image path or URL is required'),
    alt_text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Alt text is required for accessibility'),
    display_order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().default(0),
    is_primary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    aspect_ratio: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('3/4')
});
const ProductVariantSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().optional(),
    variant_type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Variant type is required (e.g. Size, Blouse)'),
    variant_value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Variant value is required (e.g. Unstitched, Red)'),
    stock_quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(0, 'Stock quantity must be 0 or greater').default(0),
    price_override: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().positive().nullable().optional()
});
const ProductFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, 'Name must be at least 2 characters').max(180),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, 'Slug must be at least 2 characters').max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens (e.g. crimson-kadwa-benarasi)'),
    category_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Please select a valid category').nullable().optional(),
    short_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(350).nullable().optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().nullable().optional(),
    fabric_weave_details: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().nullable().optional(),
    occasion_tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim()).default([]),
    dimensions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().nullable().optional(),
    care_instructions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().nullable().optional(),
    shipping_returns_note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().nullable().optional(),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().positive('Price must be greater than 0'),
    compare_at_price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().positive().nullable().optional(),
    sku: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(80).nullable().optional(),
    badge_text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(40).nullable().optional(),
    badge_color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(30).nullable().optional(),
    is_featured_large: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    stock_status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'in_stock',
        'low_stock',
        'out_of_stock',
        'sold'
    ]).default('in_stock'),
    is_active: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
    is_published: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    seo_title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(120).nullable().optional(),
    seo_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(250).nullable().optional(),
    images: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ProductImageSchema).default([]),
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ProductVariantSchema).default([])
});
const CategoryFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, 'Category name must be at least 2 characters').max(100),
    name_bn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(100).nullable().optional(),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, 'Slug must be at least 2 characters').max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
    parent_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid().nullable().optional(),
    is_hero_tile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    tile_gradient_fallback: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().nullable().optional(),
    display_order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().default(0),
    is_active: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
});
const ContentBlockKeySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'hero',
    'marquee',
    'browse_by_category',
    'featured_collection',
    'our_heritage',
    'jewellery_spotlight',
    'testimonials',
    'instagram_strip',
    'footer'
]);
const SaveContentBlockSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    section_key: ContentBlockKeySchema,
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown(),
    publishNow: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false)
});
const CouponFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, 'Code must be at least 2 characters').max(40).regex(/^[a-zA-Z0-9_-]+$/, 'Code may only contain letters, numbers, _ and -'),
    discount_type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'percent',
        'amount'
    ]),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().positive('Value must be greater than 0'),
    min_subtotal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0).default(0),
    max_uses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().positive().optional().nullable(),
    is_active: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true),
    expires_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional().nullable()
});
const OrderStatusEnum = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
    'expired'
]);
const VALID_ORDER_TRANSITIONS = {
    pending: [
        'paid',
        'cancelled',
        'expired'
    ],
    paid: [
        'processing',
        'cancelled',
        'refunded'
    ],
    processing: [
        'shipped',
        'cancelled',
        'refunded'
    ],
    shipped: [
        'delivered',
        'cancelled',
        'refunded'
    ],
    delivered: [
        'refunded'
    ],
    cancelled: [],
    refunded: [],
    expired: []
};
function isValidOrderTransition(from, to) {
    if (from === to) return true;
    const allowed = VALID_ORDER_TRANSITIONS[from];
    return allowed ? allowed.includes(to) : false;
}
const UpdateOrderStatusSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    order_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    status: OrderStatusEnum,
    staff_notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(1000).optional()
});
const UpdateUserRoleSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    user_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'admin',
        'staff',
        'customer'
    ])
});
const StoreSettingsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    general: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        store_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2).max(100),
        tagline: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(200).optional(),
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().email('Invalid email address'),
        phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(5).max(30),
        whatsapp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(30).optional(),
        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(300).optional()
    }),
    commerce: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        free_shipping_threshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0),
        flat_shipping_rate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0),
        currency_symbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().default('₹'),
        currency_code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().default('INR'),
        tax_inclusive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
    }),
    social: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        instagram: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().url().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('')).optional(),
        facebook: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().url().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('')).optional(),
        youtube: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().url().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('')).optional()
    }),
    notifications: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        order_alert_email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().email().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal('')).optional(),
        low_stock_threshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().int().min(0).default(3),
        notify_on_new_order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$25$2e$76$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true)
    })
});
}),
];

//# sourceMappingURL=_17n-m1d._.js.map