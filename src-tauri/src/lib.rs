mod tools;

use tauri::{
    menu::{
        AboutMetadata, CheckMenuItemBuilder, MenuBuilder, MenuItemBuilder, PredefinedMenuItem,
        SubmenuBuilder,
    },
    AppHandle, Emitter,
};
use tools::TOOLS;

#[tauri::command]
fn set_selected_tool(app: AppHandle, tool_id: &str) -> Result<(), String> {
    let menu = app.menu().ok_or("Menu not found")?;
    let tools_menu_item = menu.get("tools-menu").ok_or("Tools menu not found")?;
    let tools_menu = tools_menu_item
        .as_submenu()
        .ok_or("Tools menu is not a submenu")?;

    for tool in TOOLS {
        if let Some(item) = tools_menu.get(tool.id) {
            if let Some(check_item) = item.as_check_menuitem() {
                let _ = check_item.set_checked(tool.id == tool_id);
            }
        }
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_selected_tool])
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                let toggle_sidebar = MenuItemBuilder::with_id("toggle-sidebar", "Toggle Sidebar")
                    .accelerator("CmdOrCtrl+/")
                    .build(app)?;

                let toggle_command_palette =
                    MenuItemBuilder::with_id("toggle-command-palette", "Command Palette…")
                        .accelerator("CmdOrCtrl+K")
                        .build(app)?;

                let mut tools_menu = SubmenuBuilder::new(app, "Tools").id("tools-menu");
                for tool in TOOLS {
                    let item = CheckMenuItemBuilder::with_id(tool.id, tool.name).build(app)?;
                    tools_menu = tools_menu.item(&item);
                }
                let tools_menu = tools_menu.build()?;

                let view_menu = SubmenuBuilder::new(app, "View")
                    .item(&toggle_command_palette)
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
                        &PredefinedMenuItem::about(
                            app,
                            None,
                            Some(AboutMetadata {
                                copyright: Some(
                                    "© 2025 Artem Sapegin. Made with coffee and tacos.".into(),
                                ),
                                ..Default::default()
                            }),
                        )?,
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

                let support_project =
                    MenuItemBuilder::with_id("support-project", "Support Project").build(app)?;
                let report_issue =
                    MenuItemBuilder::with_id("report-issue", "Report Issue").build(app)?;
                let source_code =
                    MenuItemBuilder::with_id("source-code", "Source Code").build(app)?;

                let help_menu = SubmenuBuilder::new(app, "Help")
                    .items(&[&support_project, &report_issue, &source_code])
                    .build()?;

                let menu = MenuBuilder::new(app)
                    .item(&app_menu)
                    .item(&edit_menu)
                    .item(&view_menu)
                    .item(&tools_menu)
                    .item(&help_menu)
                    .build()?;

                app.set_menu(menu)?;

                app.on_menu_event(move |app, event| {
                    let event_id = event.id().as_ref();
                    if event_id == "toggle-sidebar" {
                        let _ = app.emit("toggle-sidebar", ());
                    } else if event_id == "toggle-command-palette" {
                        let _ = app.emit("toggle-command-palette", ());
                    } else if event_id == "support-project" {
                        let _ = app.emit("open-url", "https://buymeacoffee.com/sapegin");
                    } else if event_id == "report-issue" {
                        let _ = app.emit(
                            "open-url",
                            "https://github.com/sapegin/raccoon-toolbox/issues",
                        );
                    } else if event_id == "source-code" {
                        let _ = app.emit("open-url", "https://github.com/sapegin/raccoon-toolbox");
                    } else if TOOLS.iter().any(|tool| tool.id == event_id) {
                        let _ = app.emit("select-tool", event_id);
                    }
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
