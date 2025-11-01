use tauri::{
    menu::{
        CheckMenuItemBuilder, MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder,
    },
    AppHandle, Emitter,
};

struct Tool {
    id: &'static str,
    name: &'static str,
}

// This list should be in sync with the on in tools.ts
const TOOLS: &[Tool] = &[
    Tool {
        id: "base64-encoder",
        name: "Base64 encoder/decoder",
    },
    Tool {
        id: "color-converter",
        name: "Color converter",
    },
    Tool {
        id: "html-entity-encoder",
        name: "HTML entity encoder/decoder",
    },
    Tool {
        id: "json-formatter",
        name: "JSON formatter",
    },
    Tool {
        id: "regexp-tester",
        name: "RegExp tester",
    },
    Tool {
        id: "string-case-converter",
        name: "String case converter",
    },
    Tool {
        id: "text-diff",
        name: "Text diff",
    },
    Tool {
        id: "text-stats",
        name: "Text stats",
    },
    Tool {
        id: "unicode-lookup",
        name: "Unicode lookup",
    },
    Tool {
        id: "url-encoder",
        name: "URL encoder/decoder",
    },
    Tool {
        id: "url-parser",
        name: "URL parser",
    },
];

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
                    .item(&tools_menu)
                    .build()?;

                app.set_menu(menu)?;

                app.on_menu_event(move |app, event| {
                    let event_id = event.id().as_ref();
                    if event_id == "toggle-sidebar" {
                        let _ = app.emit("toggle-sidebar", ());
                    } else if event_id == "toggle-command-palette" {
                        let _ = app.emit("toggle-command-palette", ());
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
