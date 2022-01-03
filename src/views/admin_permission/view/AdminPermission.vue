<template>
    <div class="content">
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form
                ref="form"
                :rules="rules"
                :model="form"
                label-position="right"
                label-width="100px"
                style="width: 100%; padding-left: 50px; padding-right: 50px"
            >
                <el-form-item size="mini" label="所属节点">
                    {{
                        dialogStatus === "create"
                            ? currNodeData
                                ? currNodeData.meta.title
                                : "-"
                            : parentNodeData
                            ? parentNodeData.meta.title
                            : "-"
                    }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                    <el-input v-model="form.icon" placeholder="输入节点图标"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['title'].name" prop="title">
                    <el-input v-model="form.title" placeholder="输入节点名称"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['unique'].name" prop="unique">
                    <el-input v-model="form.unique" placeholder="输入节点标识"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['route'].name" prop="route">
                    <el-input v-model="form.route" placeholder="输入路由名称"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['is_sidebar'].name" prop="is_sidebar">
                    <el-switch v-model="form.is_sidebar"></el-switch>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['is_accessible'].name" prop="is_accessible">
                    <el-switch v-model="form.is_accessible"></el-switch>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['is_system_menu'].name" prop="is_system_menu">
                    <el-switch v-model="form.is_system_menu"></el-switch>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['is_channel_user'].name" prop="is_channel_user">
                    <el-switch v-model="form.is_channel_user"></el-switch>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['is_coin_user'].name" prop="is_coin_user">
                    <el-switch v-model="form.is_coin_user"></el-switch>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['is_coin_user_exchange'].name"
                    prop="is_coin_user_exchange"
                >
                    <el-switch v-model="form.is_coin_user_exchange"></el-switch>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['is_agent_user'].name" prop="is_agent_user">
                    <el-switch v-model="form.is_agent_user"></el-switch>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['is_save_log'].name" prop="is_save_log">
                    <el-switch v-model="form.is_save_log"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="dialogStatus === 'update'" type="danger" size="mini" @click="onDelete">
                    删除该节点
                </el-button>
                <el-button type="primary" size="mini" @click="dialogStatus === 'create' ? onAdd() : onEdit()">
                    确认并保存
                </el-button>
            </div>
        </el-dialog>

        <div class="row">
            <el-button class="item" type="primary" @click="appendHandler()"> 新增节点 </el-button>
            <el-button class="item" type="primary" @click="setAllExpand(true)"> 展示所有节点 </el-button>
            <el-button class="item" type="primary" @click="setAllExpand(false)"> 收起所有节点 </el-button>
        </div>
        <div class="tree-content">
            <!-- <el-tree
                ref="tree"
                :data="tableData"
                node-key="permission_id"
                :default-expanded-keys="expandedList"
                @node-expand="nodeExpand"
                @node-collapse="nodeCollapse"
                draggable
                @node-drag-end="handleDragEnd"
                :allow-drop="allowDrag"
                :expand-on-click-node="false"
            > -->
            <el-tree
                ref="tree"
                :data="tableData"
                node-key="permission_id"
                :default-expanded-keys="expandedList"
                @node-expand="nodeExpand"
                @node-collapse="nodeCollapse"
                :allow-drop="allowDrag"
                :expand-on-click-node="false"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :class="data.meta.icon"
                        >{{ data.meta.title }}
                        <span style="color: #ff0000" v-if="data.meta.route && data.meta.route != ''"
                            >（{{ data.meta.route }}）</span
                        >
                        <span style="color: green" v-if="data.meta.unique && data.meta.unique != ''"
                            >（{{ data.meta.unique }}）</span
                        >
                    </span>

                    <span>
                        侧边栏:<span :style="'color:' + data.meta.is_sidebar ? 'red' : 'green'">{{
                            data.meta.is_sidebar ? "是" : "否"
                        }}</span>
                        / 默认授权:<span :style="'color:' + data.meta.is_accessible ? 'red' : 'green'">{{
                            data.meta.is_accessible ? "是" : "否"
                        }}</span>
                        / 系统菜单:<span :style="'color:' + data.meta.is_system_menu ? 'red' : 'green'"
                            >{{ data.meta.is_system_menu ? "是" : "否" }}
                        </span>
                        / {{ tableColumns["is_channel_user"].name }}:<span
                            :style="'color:' + data.meta.is_channel_user ? 'red' : 'green'"
                            >{{ data.meta.is_channel_user ? "是" : "否" }}
                        </span>
                        / {{ tableColumns["is_agent_user"].name }}:<span
                            :style="'color:' + data.meta.is_agent_user ? 'red' : 'green'"
                            >{{ data.meta.is_agent_user ? "是" : "否" }}
                        </span>
                        {{ tableColumns["is_coin_user"].name }}:<span
                            :style="'color:' + data.meta.is_coin_user ? 'red' : 'green'"
                            >{{ data.meta.is_coin_user ? "是" : "否" }}
                        </span>
                        {{ tableColumns["is_coin_user_exchange"].name }}:<span
                            :style="'color:' + data.meta.is_coin_user_exchange ? 'red' : 'green'"
                            >{{ data.meta.is_coin_user_exchange ? "是" : "否" }}
                        </span>
                        <el-button type="primary" size="mini" @click="() => appendHandler(node, data)">
                            添加
                        </el-button>
                        <el-button type="primary" size="mini" @click="() => editHandler(node, data)"> 编辑 </el-button>
                        <el-button type="primary" size="mini" @click="() => removeHandler(node, data)">
                            删除
                        </el-button>
                        <el-button
                            :type="data.meta.status == 1 ? 'warning' : 'danger'"
                            size="mini"
                            @click="() => disableHandler(node, data)"
                        >
                            {{ data.meta.status == 1 ? "禁用" : "开启" }}
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminPermissionMediator from "@/views/admin_permission/mediator/AdminPermissionMediator";
import { Component, Vue } from "vue-property-decorator";
import { objectRemoveNull } from "@/core/global/Functions";
import { MessageBox } from "element-ui";

@Component
export default class AdminPermission extends AbstractView {
    // 跳窗
    private dialogFormVisible: boolean = false;
    private dialogStatus: string = "";
    private textMap = {
        update: "编辑节点",
        create: "添加节点",
    };
    private form = {
        permission_id: null,
        parent_id: null,
        icon: "",
        title: "",
        route: "",
        unique: "",
        is_sidebar: true,
        is_accessible: false,
        is_system_menu: false,
        is_channel_user: false,
        is_agent_user: false,
        is_save_log: false,
        is_coin_user: false,
        is_coin_user_exchange: false,
        status: 1,
    };
    private parentNodeData: any = {
        meta: { title: "" },
    };
    private currNodeData: any = {
        meta: { title: "" },
    };
    private rules = {
        title: [{ required: true, message: "节点名称未填写", trigger: "change" }],
    };
    // 列表
    private tableColumns: any = {
        icon: { name: "" },
        title: { name: "" },
        route: { name: "" },
        unique: { name: " " },
        is_sidebar: { name: "" },
        is_accessible: { name: "" },
        is_system_menu: { name: "" },
        is_channel_user: { name: "" },
        is_agent_user: { name: "" },
        is_save_log: { name: "" },
        is_coin_user: { name: "" },
        is_coin_user_exchange: { name: "" },
    };
    private tableData: any[] = [];

    private expandedList: any[] = [];

    constructor() {
        super(AdminPermissionMediator);
    }

    public setTableColumns(value: any) {
        this.tableColumns = value;
    }

    public setTableData(value: any) {
        this.tableData = value;
    }

    private appendHandler(node: any, data: any) {
        if (node) {
            this.parentNodeData = data && data.meta.parent_id ? node.parent.data : null;
            this.currNodeData = data;
        } else {
            this.parentNodeData = null;
            this.currNodeData = null;
        }

        this.form = {
            permission_id: null,
            parent_id: data ? data.meta.permission_id : 0,
            icon: "",
            title: "",
            route: "",
            unique: "",
            is_sidebar: true,
            is_accessible: false,
            is_system_menu: false,
            is_channel_user: false,
            is_agent_user: false,
            is_save_log: false,
            is_coin_user: false,
            is_coin_user_exchange: false,
            status: 1,
        };

        this.dialogStatus = "create";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    private editHandler(node: any, data: any) {
        this.parentNodeData = data.meta.parent_id ? node.parent.data : null;
        this.currNodeData = data;
        Object.assign(this.form, data.meta);
        this.form.is_sidebar = data.meta.is_sidebar == 1;
        this.form.is_accessible = data.meta.is_accessible == 1;
        this.form.is_system_menu = data.meta.is_system_menu == 1;
        this.form.is_channel_user = data.meta.is_channel_user == 1;
        this.form.is_agent_user = data.meta.is_agent_user == 1;
        this.form.is_save_log = data.meta.is_save_log == 1;
        this.form.is_coin_user = data.meta.is_coin_user == 1;
        this.form.is_coin_user_exchange = data.meta.is_coin_user_exchange == 1;
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    private disableHandler(node: any, data: any) {
        this.parentNodeData = data.meta.parent_id ? node.parent.data : null;
        this.currNodeData = data;
        Object.assign(this.form, data.meta);
        this.onDisabled();
    }

    private removeHandler(node: any, data: any) {
        this.parentNodeData = data.meta.parent_id ? node.parent.data : null;
        this.currNodeData = data;
        Object.assign(this.form, data.meta);
        this.onDelete();
    }
    // dropType: 被拖拽节点的放置位置（before、after、inner）
    private handleDragEnd(draggingNode: any, dropNode: any, dropType: string, ev: any) {
        console.log(dropType);
        if (!dropType || dropType == "none") return;

        const meta = draggingNode.data.meta;
        const dropMeta = dropNode.data.meta;
        const data = {
            opt: 11,
            permission_id: meta.permission_id,
            parent_id: meta.parent_id,
            next_id: 0,
        };
        switch (dropType) {
            case "before":
                data.parent_id = dropMeta.parent_id;
                data.next_id = dropMeta.permission_id;
                break;
            case "after":
                data.parent_id = dropMeta.parent_id;
                if (data.parent_id == 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i] == dropNode.data) {
                            if (i < this.tableData.length - 1) {
                                data.next_id = this.tableData[i + 1].meta.permission_id;
                                break;
                            }
                        }
                    }
                } else {
                    const brothers = dropNode.parent.data.children;
                    for (let i = 0; i < brothers.length; i++) {
                        if (brothers[i] == dropNode.data) {
                            if (i < brothers.length - 1) {
                                data.next_id = brothers[i + 1].meta.permission_id;
                                break;
                            }
                        }
                    }
                }
                break;
            case "inner":
                data.parent_id = dropMeta.permission_id;
                break;
        }

        this.dispatchEvent("edit", data);
    }

    private allowDrag(draggingNode: any, dropNode: any, type: string) {
        return draggingNode != dropNode;
    }

    private onAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.dispatchEvent("add", objectRemoveNull(this.form));
                this.dialogFormVisible = false;
            }
        });
    }

    private onEdit() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.dispatchEvent("edit", this.form);
                this.dialogFormVisible = false;
            }
        });
    }

    private onDisabled() {
        MessageBox.confirm("确定要" + (this.form.status == 1 ? "禁用" : "开启") + "节点：" + this.form.title, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.dispatchEvent("edit", {
                    permission_id: this.form.permission_id,
                    status: this.form.status == 1 ? 98 : 1,
                });
            })
            .catch(() => {});
    }

    private onDelete() {
        MessageBox.confirm("确定要删除节点：" + this.form.title, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.dialogFormVisible = false;
                this.dispatchEvent("edit", { permission_id: this.form.permission_id, is_delete: 1 });
            })
            .catch(() => {});
    }
    // 展开收起所有节点
    private setAllExpand(state: boolean) {
        const that = this;
        function dis(nodes: any) {
            for (const node of nodes) {
                node.expanded = state;
                if (state) {
                    if (node.childNodes.length > 0) that.nodeExpand(node.data);
                } else {
                    that.nodeCollapse(node.data);
                }
                if (state && node.childNodes.length > 0) {
                    dis(node.childNodes);
                }
            }
        }
        const tree: any = this.$refs.tree;
        dis(tree.store.root.childNodes);
    }
    // 节点展开时
    private nodeExpand(data: any) {
        this.expandedList.push(data.permission_id); // 在节点展开是添加到默认展开数组
    }
    // 节点收起时
    private nodeCollapse(data: any) {
        const idx = this.expandedList.indexOf(data.permission_id);
        this.expandedList.splice(idx, 1); // 收起时删除数组里对应选项
        for (const item of data.children) {
            this.nodeCollapse(item);
        }
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-tree {
    padding: 5px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
}
.tree-content {
    margin-top: 10px;
    padding: 1px;
    background-color: #eeeeee;
}
</style>
