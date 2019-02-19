"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview This adapts the buildOptimizer to run over each file as it is
 * processed by Rollup. We must do this since buildOptimizer expects to see the
 * ESModules in the input sources, and therefore cannot run on the rollup output
 */
const path = require("path");
const build_optimizer_1 = require("./build-optimizer");
const DEBUG = false;
function optimizer(options) {
    // Normalize paths for comparison.
    if (options.sideEffectFreeModules) {
        options.sideEffectFreeModules = options.sideEffectFreeModules.map(p => p.replace(/\\/g, '/'));
    }
    return {
        name: 'build-optimizer',
        transform: (content, id) => {
            const normalizedId = id.replace(/\\/g, '/');
            const isSideEffectFree = options.sideEffectFreeModules &&
                options.sideEffectFreeModules.some(m => normalizedId.indexOf(m) >= 0);
            const { content: code, sourceMap: map } = build_optimizer_1.buildOptimizer({
                content, inputFilePath: id, emitSourceMap: true, isSideEffectFree,
            });
            if (!code) {
                if (DEBUG) {
                    console.error('no transforms produced by buildOptimizer for '
                        + path.relative(process.cwd(), id));
                }
                return null;
            }
            if (!map) {
                throw new Error('no sourcemap produced by buildOptimizer');
            }
            return { code, map };
        },
    };
}
exports.default = optimizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwLXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfb3B0aW1pemVyL3NyYy9idWlsZC1vcHRpbWl6ZXIvcm9sbHVwLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVIOzs7O0dBSUc7QUFFSCw2QkFBNkI7QUFFN0IsdURBQW1EO0FBRW5ELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQztBQU1wQixTQUF3QixTQUFTLENBQUMsT0FBZ0I7SUFDaEQsa0NBQWtDO0lBQ2xDLElBQUksT0FBTyxDQUFDLHFCQUFxQixFQUFFO1FBQ2pDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvRjtJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDLE9BQWUsRUFBRSxFQUFVLEVBQTBDLEVBQUU7WUFDakYsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMscUJBQXFCO2dCQUNwRCxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsZ0NBQWMsQ0FBQztnQkFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxnQkFBZ0I7YUFDbEUsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLEtBQUssRUFBRTtvQkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQzswQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDeEM7Z0JBRUQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUE5QkQsNEJBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgVGhpcyBhZGFwdHMgdGhlIGJ1aWxkT3B0aW1pemVyIHRvIHJ1biBvdmVyIGVhY2ggZmlsZSBhcyBpdCBpc1xuICogcHJvY2Vzc2VkIGJ5IFJvbGx1cC4gV2UgbXVzdCBkbyB0aGlzIHNpbmNlIGJ1aWxkT3B0aW1pemVyIGV4cGVjdHMgdG8gc2VlIHRoZVxuICogRVNNb2R1bGVzIGluIHRoZSBpbnB1dCBzb3VyY2VzLCBhbmQgdGhlcmVmb3JlIGNhbm5vdCBydW4gb24gdGhlIHJvbGx1cCBvdXRwdXRcbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUmF3U291cmNlTWFwIH0gZnJvbSAnc291cmNlLW1hcCc7XG5pbXBvcnQgeyBidWlsZE9wdGltaXplciB9IGZyb20gJy4vYnVpbGQtb3B0aW1pemVyJztcblxuY29uc3QgREVCVUcgPSBmYWxzZTtcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgc2lkZUVmZmVjdEZyZWVNb2R1bGVzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9wdGltaXplcihvcHRpb25zOiBPcHRpb25zKSB7XG4gIC8vIE5vcm1hbGl6ZSBwYXRocyBmb3IgY29tcGFyaXNvbi5cbiAgaWYgKG9wdGlvbnMuc2lkZUVmZmVjdEZyZWVNb2R1bGVzKSB7XG4gICAgb3B0aW9ucy5zaWRlRWZmZWN0RnJlZU1vZHVsZXMgPSBvcHRpb25zLnNpZGVFZmZlY3RGcmVlTW9kdWxlcy5tYXAocCA9PiBwLnJlcGxhY2UoL1xcXFwvZywgJy8nKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdidWlsZC1vcHRpbWl6ZXInLFxuICAgIHRyYW5zZm9ybTogKGNvbnRlbnQ6IHN0cmluZywgaWQ6IHN0cmluZyk6IHtjb2RlOiBzdHJpbmcsIG1hcDogUmF3U291cmNlTWFwfXxudWxsID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRJZCA9IGlkLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgICAgIGNvbnN0IGlzU2lkZUVmZmVjdEZyZWUgPSBvcHRpb25zLnNpZGVFZmZlY3RGcmVlTW9kdWxlcyAmJlxuICAgICAgICBvcHRpb25zLnNpZGVFZmZlY3RGcmVlTW9kdWxlcy5zb21lKG0gPT4gbm9ybWFsaXplZElkLmluZGV4T2YobSkgPj0gMCk7XG4gICAgICBjb25zdCB7IGNvbnRlbnQ6IGNvZGUsIHNvdXJjZU1hcDogbWFwIH0gPSBidWlsZE9wdGltaXplcih7XG4gICAgICAgIGNvbnRlbnQsIGlucHV0RmlsZVBhdGg6IGlkLCBlbWl0U291cmNlTWFwOiB0cnVlLCBpc1NpZGVFZmZlY3RGcmVlLFxuICAgICAgfSk7XG4gICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgaWYgKERFQlVHKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignbm8gdHJhbnNmb3JtcyBwcm9kdWNlZCBieSBidWlsZE9wdGltaXplciBmb3IgJ1xuICAgICAgICAgICAgICsgcGF0aC5yZWxhdGl2ZShwcm9jZXNzLmN3ZCgpLCBpZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoIW1hcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHNvdXJjZW1hcCBwcm9kdWNlZCBieSBidWlsZE9wdGltaXplcicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjb2RlLCBtYXAgfTtcbiAgICB9LFxuICB9O1xufVxuIl19