use tauri::{Emitter, menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder}};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                let toggle_sidebar = MenuItemBuilder::with_id("toggle-sidebar", "Toggle Sidebar")
                    .accelerator("CmdOrCtrl+/")
                    .build(app)?;

                let view_menu = SubmenuBuilder::new(app, "View")
                    .item(&toggle_sidebar)
                    .build()?;

                let edit_menu = SubmenuBuilder::new(app, "Edit")
                    .items(&[
                        &PredefinedMenuItem::undo(app, None)?,
                        &PredefinedMenuItem::redo(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::cut(app, None)?,
                        &PredefinedMenuItem::copy(app, None)?,
                        &PredefinedMenuItem::paste(app, None)?,
                        &PredefinedMenuItem::select_all(app, None)?,
                    ])
                    .build()?;

                let app_menu = SubmenuBuilder::new(app, "Raccoon Toolbox")
                    .items(&[
                        &PredefinedMenuItem::about(app, None, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::services(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::hide(app, None)?,
                        &PredefinedMenuItem::hide_others(app, None)?,
                        &PredefinedMenuItem::show_all(app, None)?,
                        &PredefinedMenuItem::separator(app)?,
                        &PredefinedMenuItem::quit(app, None)?,
                    ])
                    .build()?;

                let menu = MenuBuilder::new(app)
                    .item(&app_menu)
                    .item(&edit_menu)
                    .item(&view_menu)
                    .build()?;

                app.set_menu(menu)?;

                app.on_menu_event(move |app, event| {
                    if event.id() == "toggle-sidebar" {
                        let _ = app.emit("toggle-sidebar", ());
                    }
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
