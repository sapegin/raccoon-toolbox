use std::sync::Mutex;

use block2::RcBlock;
use objc2_app_kit::{
    NSApplication, NSApplicationActivationPolicy, NSColor, NSColorSampler, NSColorSpace,
};
use tauri::AppHandle;
use tokio::sync::oneshot;

/// Switch between regular (Dock + menu bar) and accessory (menu-bar-only) policies.
pub fn set_activation_policy(policy: NSApplicationActivationPolicy) {
    let Some(mtm) = objc2::MainThreadMarker::new() else {
        return;
    };
    let app = NSApplication::sharedApplication(mtm);
    let _ = app.setActivationPolicy(policy);
}

/// Bring the app to the foreground after a tray selection.
pub fn activate_frontmost() {
    let Some(mtm) = objc2::MainThreadMarker::new() else {
        return;
    };
    let app = NSApplication::sharedApplication(mtm);
    let _ = app.setActivationPolicy(NSApplicationActivationPolicy::Regular);
    // Force activation when another app is frontmost (tray → show window).
    #[allow(deprecated)]
    app.activateIgnoringOtherApps(true);
}

/// Open the system screen color sampler and return `#rrggbb`, or `None` if cancelled.
pub async fn pick_screen_color(app: AppHandle) -> Result<Option<String>, String> {
    let (tx, rx) = oneshot::channel();

    app.run_on_main_thread(move || {
        let sampler = NSColorSampler::new();
        let tx = Mutex::new(Some(tx));
        let handler = RcBlock::new(move |color: *mut NSColor| {
            // SAFETY: `color` is null on cancel or a valid `NSColor` from AppKit.
            let hex = unsafe { color.as_ref().and_then(ns_color_to_hex) };
            if let Ok(mut guard) = tx.lock() {
                if let Some(tx) = guard.take() {
                    let _ = tx.send(hex);
                }
            }
        });
        // SAFETY: AppKit NSColorSampler API; must run on the main thread.
        unsafe {
            sampler.showSamplerWithSelectionHandler(&handler);
        }
    })
    .map_err(|e| e.to_string())?;

    rx.await
        .map_err(|_| "Color sampler was interrupted".to_string())
}

fn ns_color_to_hex(color: &NSColor) -> Option<String> {
    let srgb = color.colorUsingColorSpace(&NSColorSpace::sRGBColorSpace())?;
    let to_byte = |component: f64| (component * 255.0).round().clamp(0.0, 255.0) as u8;
    let r = to_byte(srgb.redComponent());
    let g = to_byte(srgb.greenComponent());
    let b = to_byte(srgb.blueComponent());
    Some(format!("#{r:02x}{g:02x}{b:02x}"))
}
