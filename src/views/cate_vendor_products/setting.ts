/**
 * description: 首页分类游戏
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777155
 */
import cmd_admin_cate_vendor_products_table_columns from "@/views/cate_vendor_products/command/cmd_admin_cate_vendor_products_table_columns";
import cmd_admin_cate_vendor_products_index from "@/views/cate_vendor_products/command/cmd_admin_cate_vendor_products_index";
import cmd_admin_cate_vendor_products_store from "@/views/cate_vendor_products/command/cmd_admin_cate_vendor_products_store";
import cmd_admin_cate_vendor_products_update from "@/views/cate_vendor_products/command/cmd_admin_cate_vendor_products_update";
import cmd_admin_cate_vendor_products_batch_copy_data from "@/views/cate_vendor_products/command/cmd_admin_cate_vendor_products_batch_copy_data";
import cmd_admin_game_type_tag_table_columns from "@/views/cate_vendor_products/command/cmd_admin_game_type_tag_table_columns";
import cmd_admin_game_type_tag_index from "@/views/cate_vendor_products/command/cmd_admin_game_type_tag_index";
import cmd_admin_game_type_tag_store from "@/views/cate_vendor_products/command/cmd_admin_game_type_tag_store";
import cmd_admin_game_type_tag_update from "@/views/cate_vendor_products/command/cmd_admin_game_type_tag_update";
/**协议*/
export var HttpType = {
    admin_cate_vendor_products_table_columns: "admin/cate_vendor_products/table_columns",
    admin_cate_vendor_products_index: "admin/cate_vendor_products/index",
    admin_cate_vendor_products_store: "admin/cate_vendor_products/store",
    admin_cate_vendor_products_update: "admin/cate_vendor_products/update/{id}",
    admin_cate_vendor_products_batch_copy_data: "admin/cate_vendor_products/batch_copy_data",
    admin_game_type_tag_table_columns: "admin/game_type_tag/table_columns",
    admin_game_type_tag_index: "admin/game_type_tag/index",
    admin_game_type_tag_store: "admin/game_type_tag/store",
    admin_game_type_tag_update: "admin/game_type_tag/update/{id}",
};
/**事件*/
export var EventType = {
    admin_cate_vendor_products_table_columns: "admin_cate_vendor_products_table_columns",
    admin_cate_vendor_products_index: "admin_cate_vendor_products_index",
    admin_cate_vendor_products_store: "admin_cate_vendor_products_store",
    admin_cate_vendor_products_update: "admin_cate_vendor_products_update",
    admin_cate_vendor_products_batch_copy_data: "admin_cate_vendor_products_batch_copy_data",
    admin_game_type_tag_table_columns: "admin_game_type_tag_table_columns",
    admin_game_type_tag_index: "admin_game_type_tag_index",
    admin_game_type_tag_store: "admin_game_type_tag_store",
    admin_game_type_tag_update: "admin_game_type_tag_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_cate_vendor_products_table_columns, cmd_admin_cate_vendor_products_table_columns);
facade.registerCommand(HttpType.admin_cate_vendor_products_index, cmd_admin_cate_vendor_products_index);
facade.registerCommand(HttpType.admin_cate_vendor_products_store, cmd_admin_cate_vendor_products_store);
facade.registerCommand(HttpType.admin_cate_vendor_products_update, cmd_admin_cate_vendor_products_update);
facade.registerCommand(HttpType.admin_cate_vendor_products_batch_copy_data, cmd_admin_cate_vendor_products_batch_copy_data);
facade.registerCommand(HttpType.admin_game_type_tag_table_columns, cmd_admin_game_type_tag_table_columns);
facade.registerCommand(HttpType.admin_game_type_tag_index, cmd_admin_game_type_tag_index);
facade.registerCommand(HttpType.admin_game_type_tag_store, cmd_admin_game_type_tag_store);
facade.registerCommand(HttpType.admin_game_type_tag_update, cmd_admin_game_type_tag_update);

