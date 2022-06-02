/**
 * description: 设置多语言图片
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766371
 */
import cmd_admin_system_lang_image_show_key from "@/views/lang_img_dialog/command/cmd_admin_system_lang_image_show_key";
import cmd_admin_system_lang_image_store from "@/views/lang_img_dialog/command/cmd_admin_system_lang_image_store";
import cmd_admin_system_lang_image_update from "@/views/lang_img_dialog/command/cmd_admin_system_lang_image_update";
import cmd_admin_system_lang_image_table_columns from "@/views/lang_img_dialog/command/cmd_admin_system_lang_image_table_columns";
import cmd_admin_resource_lang_upload from "@/views/lang_img_dialog/command/cmd_admin_resource_lang_upload";
/**协议*/
export var HttpType = {
    admin_system_lang_image_show_key: "admin/system_lang/image/show_key",
    admin_system_lang_image_store: "admin/system_lang/image/store",
    admin_system_lang_image_update: "admin/system_lang/image/update/{id}",
    admin_system_lang_image_table_columns: "admin/plat_lang/table_columns#",
    //由于此dialog注册的早，新页面注册的会把他覆盖掉，可以加个空格或者#来区分，不会被覆盖
    admin_resource_lang_upload: "admin/resource/upload ",
};
/**事件*/
export var EventType = {
    admin_system_lang_image_show_key: "admin_system_lang_image_show_key",
    admin_system_lang_image_store: "admin_system_lang_image_store",
    admin_system_lang_image_update: "admin_system_lang_image_update",
    admin_system_lang_image_table_columns: "admin_system_lang_image_table_columns",
    admin_resource_lang_upload: "admin_resource_lang_upload",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_system_lang_image_show_key, cmd_admin_system_lang_image_show_key);
facade.registerCommand(HttpType.admin_system_lang_image_store, cmd_admin_system_lang_image_store);
facade.registerCommand(HttpType.admin_system_lang_image_update, cmd_admin_system_lang_image_update);
facade.registerCommand(HttpType.admin_system_lang_image_table_columns, cmd_admin_system_lang_image_table_columns);
facade.registerCommand(HttpType.admin_resource_lang_upload, cmd_admin_resource_lang_upload);
