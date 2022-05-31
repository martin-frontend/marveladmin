/**
 * description: 平台语言管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766368
 */
import cmd_admin_plat_lang_table_columns from "@/views/plat_lang/command/cmd_admin_plat_lang_table_columns";
import cmd_admin_plat_lang_index from "@/views/plat_lang/command/cmd_admin_plat_lang_index";
import cmd_admin_plat_lang_store from "@/views/plat_lang/command/cmd_admin_plat_lang_store";
import cmd_admin_plat_lang_update from "@/views/plat_lang/command/cmd_admin_plat_lang_update";
import cmd_admin_plat_lang_delete from "@/views/plat_lang/command/cmd_admin_plat_lang_delete";
import cmd_admin_system_lang_translate from "@/views/plat_lang/command/cmd_admin_system_lang_translate";
import cmd_admin_plat_lang_import from "@/views/plat_lang/command/cmd_admin_plat_lang_import";
import cmd_admin_plat_lang_generate from "@/views/plat_lang/command/cmd_admin_plat_lang_generate";
/**协议*/
export var HttpType = {
    admin_plat_lang_table_columns: "admin/plat_lang/table_columns",
    admin_plat_lang_index: "admin/plat_lang/index",
    admin_plat_lang_store: "admin/plat_lang/store",
    admin_plat_lang_update: "admin/plat_lang/update/{id}",
    admin_plat_lang_delete: "admin/plat_lang/delete/{id}",
    admin_system_lang_translate: "admin/system_lang/translate",
    admin_plat_lang_import: "admin/plat_lang/import",
    admin_plat_lang_generate: "admin/plat_lang/generate",
};
/**事件*/
export var EventType = {
    admin_plat_lang_table_columns: "admin_plat_lang_table_columns",
    admin_plat_lang_index: "admin_plat_lang_index",
    admin_plat_lang_store: "admin_plat_lang_store",
    admin_plat_lang_update: "admin_plat_lang_update",
    admin_plat_lang_delete: "admin_plat_lang_delete",
    admin_system_lang_translate: "admin_system_lang_translate",
    admin_plat_lang_import: "admin_plat_lang_import",
    admin_plat_lang_generate: "admin_plat_lang_generate",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_lang_table_columns, cmd_admin_plat_lang_table_columns);
facade.registerCommand(HttpType.admin_plat_lang_index, cmd_admin_plat_lang_index);
facade.registerCommand(HttpType.admin_plat_lang_store, cmd_admin_plat_lang_store);
facade.registerCommand(HttpType.admin_plat_lang_update, cmd_admin_plat_lang_update);
facade.registerCommand(HttpType.admin_plat_lang_delete, cmd_admin_plat_lang_delete);
facade.registerCommand(HttpType.admin_system_lang_translate, cmd_admin_system_lang_translate);
facade.registerCommand(HttpType.admin_plat_lang_import, cmd_admin_plat_lang_import);
facade.registerCommand(HttpType.admin_plat_lang_generate, cmd_admin_plat_lang_generate);

