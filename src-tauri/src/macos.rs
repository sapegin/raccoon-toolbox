use objc2::MainThreadMarker;
use objc2_app_kit::{NSApplication, NSApplicationActivationPolicy};

/// Switch between regular (Dock + menu bar) and accessory (menu-bar-only) policies.
pub fn set_activation_policy(policy: NSApplicationActivationPolicy) {
    let Some(mtm) = MainThreadMarker::new() else {
        return;
    };
    let app = NSApplication::sharedApplication(mtm);
    let _ = app.setActivationPolicy(policy);
}

/// Bring the app to the foreground after a tray selection.
pub fn activate_frontmost() {
    let Some(mtm) = MainThreadMarker::new() else {
        return;
    };
    let app = NSApplication::sharedApplication(mtm);
    let _ = app.setActivationPolicy(NSApplicationActivationPolicy::Regular);
    // Force activation when another app is frontmost (tray → show window).
    #[allow(deprecated)]
    app.activateIgnoringOtherApps(true);
}
