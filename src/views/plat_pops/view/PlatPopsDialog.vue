<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" top="20px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id">
                <el-select
                    v-model="form.plat_id"
                    filterable
                    :placeholder="LangUtil('请选择')"
                    @change="onPlatChange"
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['app_platform'].name" prop="app_platform">
                <el-checkbox-group v-model="form.app_platform">
                    <el-checkbox
                        v-for="(value, key) in tableColumns['app_platform'].options"
                        :key="key"
                        :label="Number(key)"
                        :disabled="form.type == 1 && form.type_bind_id != ''"
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages">
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox
                        v-for="(value, key) in tableColumns['languages'].options"
                        :key="key"
                        :label="key"
                        :disabled="
                            (form.type == 1 && form.type_bind_id != '') || (form.type == 2 && form.type_bind_id != '')
                        "
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('有效时间')" prop="time">
                <el-date-picker
                    v-model="form.time"
                    type="datetimerange"
                    :range-separator="to"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :start-placeholder="start"
                    :end-placeholder="end"
                    :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="tableColumns['type'].name" prop="type">
                <el-select
                    v-model="form.type"
                    clearable
                    class="select"
                    placeholder="请选择"
                    @change="onTypeChange"
                    :disabled="form.plat_id == '' || isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="form.type_bind_id"
                    clearable
                    class="select"
                    placeholder="请选择"
                    style="margin-left: 20px;"
                    @change="onNoticeChange"
                    v-if="(form.type == 1 && !isStatusUpdate) || (form.type == 1 && !myProxy.tableData.showNoticeError)"
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['notice'].options"
                        :key="key"
                        :label="value.name"
                        :value="value.id"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="form.type_bind_id"
                    clearable
                    class="select"
                    placeholder="请选择"
                    style="margin-left: 20px;"
                    @change="onActivityChange"
                    v-if="
                        (form.type == 2 && !isStatusUpdate) || (form.type == 2 && !myProxy.tableData.showActivityError)
                    "
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['acitvity'].options"
                        :key="key"
                        :label="value.activity_name"
                        :value="value.id"
                    ></el-option>
                </el-select>
                <span
                    style="margin-left: 20px;"
                    v-if="
                        (isStatusUpdate && myProxy.tableData.showNoticeError) ||
                            (isStatusUpdate && myProxy.tableData.showActivityError)
                    "
                >
                    {{ LangUtil("原资料已被撤销/删除") }}
                </span>
            </el-form-item>
            <el-form-item :label="LangUtil('URL')" prop="subject" v-if="form.type == 3">
                <el-input
                    :placeholder="LangUtil('请输入')"
                    v-model="form.subject"
                    maxlength="500"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item :label="LangUtil('参数')" prop="content" v-if="form.type == 3">
                <el-input
                    :placeholder="LangUtil('请输入')"
                    v-model="form.content"
                    maxlength="500"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['scenarios_type'].name" prop="scenarios_type">
                <el-radio-group v-model="form.scenarios_type">
                    <el-radio
                        v-for="(value, key) in tableColumns.scenarios_type.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <div style="height: 28px;">
                <div class="red_label"><span style="color:red;">* </span>{{ LangUtil("受众范围") }}</div>
            </div>
            <!-- 参与用户 -->
            <el-form-item size="mini" :label="LangUtil('全部用户')" prop="assign_is_all" label-width="200px">
                <el-checkbox
                    v-model="form.range_type_all"
                    :true-label="1"
                    :false-label="99"
                    @change="onSelectAll"
                    :disabled="form.type == 2 && form.type_bind_id != ''"
                >
                </el-checkbox>
            </el-form-item>
            <!-- 指定用户 -->
            <el-form-item
                size="mini"
                :label="tableColumns['range_type_user_id'].name"
                prop="assign_is_user"
                class="display_felx"
                label-width="200px"
            >
                <el-checkbox
                    v-model="form.range_type_user_id"
                    :true-label="1"
                    :false-label="99"
                    :disabled="form.range_type_all == 1"
                    @change="onChangeUser(form.range_type_user_id)"
                >
                </el-checkbox>
                <el-form-item
                    size="mini"
                    :label="LangUtil('用户ID')"
                    class="display"
                    prop="range_user_ids"
                    v-if="form.range_type_user_id == 1"
                >
                    <div class="send_users">
                        <el-input
                            size="medium"
                            filterable
                            clearable
                            :placeholder="LangUtil('请输入单个或多个用户')"
                            v-model.trim="form.range_user_ids"
                            oninput="value=value.replace(/[^\d,]/g,'')"
                            @blur="inputChangeUser"
                            style="margin-right: 0.8rem"
                        ></el-input>
                        <input
                            v-show="false"
                            ref="excel-upload-input"
                            class="excel-upload-input"
                            type="file"
                            accept=".xlsx, .xls"
                            @change="handleClick"
                        />
                        <el-button @click="onImportAssignUser" type="primary" icon="">
                            {{ LangUtil("导入用户") }}
                        </el-button>
                        <el-button @click="onLoadModule" type="primary" icon="">
                            {{ LangUtil("下载导入模版") }}
                        </el-button>
                    </div>
                    <div class="mark_font">
                        {{ LangUtil("用户ID, 多个用户使用英文逗号", "区分") }}
                    </div>
                </el-form-item>
            </el-form-item>
            <!-- 指定标签 -->
            <el-form-item
                size="mini"
                :label="tableColumns['range_type_user_tag_id'].name"
                prop="range_type_user_tag_id"
                label-width="200px"
            >
                <el-checkbox
                    v-model="form.range_type_user_tag_id"
                    :true-label="1"
                    :false-label="99"
                    :disabled="form.range_type_all == 1"
                    @change="onChangeTag(form.range_type_user_tag_id)"
                >
                </el-checkbox>
                <el-select
                    v-model="form.range_user_tag_ids"
                    multiple
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    style="width: 80%; margin-left: 25px"
                    v-if="form.range_type_user_tag_id == 1"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.user_tag.options[form.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 指定渠道 -->
            <el-form-item
                size="mini"
                :label="tableColumns['range_type_channel_id'].name"
                prop="range_type_channel_id"
                class="display_felx"
                label-width="200px"
            >
                <el-checkbox
                    v-model="form.range_type_channel_id"
                    :true-label="1"
                    :false-label="99"
                    :disabled="form.range_type_all == 1"
                    @change="onChangeChannel(form.range_type_channel_id)"
                >
                </el-checkbox>
                <!-- <el-select
                    v-model="form.range_channel_ids"
                    multiple
                    filterable
                    :placeholder="LangUtil('请选择')"
                    style="width: 80%; margin-left: 25px"
                    v-if="form.range_type_channel_id == 1"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.channel_id.options[form.plat_id]"
                        :key="key"
                        :label="key"
                        :value="key"
                    >
                    </el-option>
                </el-select> -->
                <el-form-item
                    size="mini"
                    :label="LangUtil('渠道ID')"
                    class="display"
                    prop="range_channel_ids"
                    v-if="form.range_type_channel_id == 1"
                >
                    <div class="send_users">
                        <el-input
                            size="medium"
                            filterable
                            clearable
                            :placeholder="LangUtil('请输入单个或多个渠道')"
                            v-model.trim="form.range_channel_ids"
                            oninput="value=value.replace(/[^\d,]/g,'')"
                            @blur="inputChangeChannel"
                            style="margin-right: 0.8rem"
                        ></el-input>
                        <input
                            v-show="false"
                            ref="excel-upload-input-channel"
                            class="excel-upload-input-channel"
                            type="file"
                            accept=".xlsx, .xls"
                            @change="handleClickChannel"
                        />
                        <el-button @click="onImportChannel" type="primary" icon="">
                            {{ LangUtil("导入渠道") }}
                        </el-button>
                        <el-button @click="onLoadChannelModule" type="primary" icon="">
                            {{ LangUtil("下载导入模版") }}
                        </el-button>
                    </div>
                    <div class="mark_font">
                        {{ LangUtil("渠道ID, 多个渠道使用英文逗号", "区分") }}
                    </div>
                </el-form-item>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('受众条件')" prop="range_type_channel_id">
                <el-button
                    @click="myProxy.addCondition()"
                    size="mini"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                >
                    {{ LangUtil("条件") }}
                </el-button>
                <div
                    class="rules_item"
                    v-for="(item, index) in form.condition"
                    :key="index"
                    style="margin-bottom: 5px; margin-top: 10px;"
                >
                    <el-row type="flex" justify="start" align="middle" :gutter="24">
                        <el-col :span="4">
                            <el-button @click="deleteCondition(index)" size="mini" icon="el-icon-delete">
                                {{ LangUtil("刪除") }}
                            </el-button>
                        </el-col>
                        <el-col :span="8" class="vi_div">
                            <el-select v-model="item.condition" :placeholder="LangUtil('请选择')" filterable>
                                <el-option
                                    v-for="{ name, key, disabled } in newConditions"
                                    :key="key"
                                    :label="name"
                                    :value="key"
                                    :disabled="disabled"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8" class="vi_div" v-if="item.condition == 'condition_is_first_login'">
                            <el-radio-group v-model="item.firstLogin">
                                <template v-for="(value, key) in tableColumns['condition_is_first_login'].options">
                                    <el-radio :key="key" :label="Number(key)" v-if="key != 0">
                                        {{ value }}
                                        <el-tooltip
                                            class="tip-item"
                                            effect="dark"
                                            :content="
                                                key == 1
                                                    ? LangUtil('表示未登录过新用户')
                                                    : LangUtil('已经登录过的老用户')
                                            "
                                            placement="top"
                                            v-if="key != 0"
                                            :key="value"
                                        >
                                            <i class="el-icon-question"></i>
                                        </el-tooltip>
                                    </el-radio>
                                </template>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8" class="vi_div" v-if="item.condition == 'condition_is_first_recharge'">
                            <el-radio-group v-model="item.firstRecharge">
                                <template v-for="(value, key) in tableColumns['condition_is_first_recharge'].options">
                                    <el-radio :key="key" :label="Number(key)" v-if="key != 0">
                                        {{ value }}
                                        <el-tooltip
                                            class="tip-item"
                                            effect="dark"
                                            :content="
                                                key == 1
                                                    ? LangUtil('已有首次充值的用户')
                                                    : LangUtil('未有首次充值的用户')
                                            "
                                            placement="top"
                                            v-if="key != 0"
                                            :key="value"
                                        >
                                            <i class="el-icon-question"></i>
                                        </el-tooltip>
                                    </el-radio>
                                </template>
                            </el-radio-group>
                        </el-col>
                        <el-col
                            :span="5"
                            class="vi_div"
                            v-if="
                                item.condition != 'condition_is_first_login' &&
                                    item.condition != 'condition_is_first_recharge' &&
                                    item.condition != 'condition_exchange' &&
                                    item.condition != 'condition_recharge' &&
                                    item.condition != 'condition_vip_level' &&
                                    item.condition != 'condition_water' &&
                                    item.condition != 'condition_win_loss' &&
                                    item.condition != ''
                            "
                        >
                            <el-select v-model="item.coin" :placeholder="LangUtil('请选择')" filterable>
                                <el-option
                                    v-for="(value, key) in tableColumns['condition_balance_options']"
                                    :key="key"
                                    :label="value"
                                    :value="value"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col
                            :span="3"
                            class="vi_div"
                            v-if="
                                item.condition != 'condition_is_first_login' &&
                                    item.condition != 'condition_is_first_recharge' &&
                                    item.condition != ''
                            "
                        >
                            <el-select
                                v-model="item.mark"
                                :placeholder="LangUtil('请选择')"
                                filterable
                                :disabled="item.condition == 'condition_balance'"
                            >
                                <el-option
                                    v-for="(value, key) in tableColumns['mark'].options"
                                    :key="key"
                                    :label="value"
                                    :value="key"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col
                            :span="4"
                            class="vi_div"
                            v-if="
                                item.condition != 'condition_is_first_login' &&
                                    item.condition != 'condition_is_first_recharge' &&
                                    item.condition != ''
                            "
                        >
                            <el-input
                                size="small"
                                v-model="item.balance"
                                :placeholder="LangUtil('请输入')"
                                onkeyup="this.value=(this.value.match(/\d+(.\d{0,3})?/)||[''])[0]"
                                @blur="inputChangeBalance($event, item)"
                            ></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatPopsProxy from "../proxy/PlatPopsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { removeRepeatStr, dateFormat } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { readerData } from "@/core/global/Excel";
import { BaseInfo } from "@/components/vo/commonVo";

@Component
export default class PlatPopsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatPopsProxy = this.getProxy(PlatPopsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    start: any = LangUtil("发布时间");
    end: any = LangUtil("结束时间");
    to: any = LangUtil("至");

    textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
    };

    mounted() {
        this.onPlatChange();
    }

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get curTime() {
        return dateFormat(new Date(), "yyyy-MM-dd hh-mm-ss");
    }

    get newConditions() {
        let newArr = [];
        const keys = Object.keys(this.tableColumns.conditions.options);
        // @ts-ignore
        const selectedKeys = this.form.condition.map(item => item.condition);
        newArr = keys.map(key => {
            return {
                name: this.tableColumns.conditions.options[key],
                key,
                disabled:
                    selectedKeys.includes(key) &&
                    key != "condition_balance" &&
                    key != "condition_exchange" &&
                    key != "condition_recharge" &&
                    key != "condition_vip_level" &&
                    key != "condition_water" &&
                    key != "condition_win_loss",
            };
        });
        return newArr;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            app_platform: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            languages: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            scenarios_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            range_user_ids: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            range_channel_ids: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            time: [
                {
                    type: "array",
                    required: true,
                    message: this.LangUtil("必须选择"),
                },
            ],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    onPlatChange() {
        this.tableColumns.condition_balance_options = this.tableColumns.condition_balance.options[this.form.plat_id];
        if (this.form.type != "3") {
            this.form.type = "";
        }
    }

    onTypeChange() {
        this.form.type_bind_id = "";
        if (this.form.type == "1") {
            this.myProxy.onQueryNotice(this.form.plat_id);
        } else if (this.form.type == "2") {
            this.myProxy.onQueryActivity(this.form.plat_id);
        }
    }

    onNoticeChange() {
        if (this.form.type_bind_id) {
            this.myProxy.onNoticeShow(this.form.type_bind_id);
        }
    }

    onActivityChange() {
        if (this.form.type_bind_id) {
            this.myProxy.onActivityShow(this.form.type_bind_id);
            this.form.range_type_all = 1;
            this.onSelectAll();
        }
    }

    onSelectAll() {
        if (this.form.range_type_all == 1) {
            this.form.range_type_user_id = 99;
            this.form.range_user_ids = "";
            this.form.range_type_user_tag_id = 99;
            this.form.range_user_tag_ids = "";
            this.form.range_type_channel_id = 99;
            this.form.range_channel_ids = "";
        }
    }

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let userList = removeRepeatStr(excel.results, this.myProxy.dialogData.excelColumnInfo.userid.name, ",");
        this.form.range_user_ids = userList;
    }

    // 汇入用户excel
    onImportAssignUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    // excel 导入
    async handleClickChannel(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input-channel"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let channelList = removeRepeatStr(
            excel.results,
            this.myProxy.dialogData.excelChannelColumnInfo.channelid.name,
            ","
        );
        this.form.range_channel_ids = channelList;
    }

    // 汇入渠道excel
    onImportChannel() {
        (this.$refs["excel-upload-input-channel"] as any).click();
    }

    // 载入模组
    onLoadModule() {
        let emailTemplate: any = this.LangUtil("用户模版");
        new BaseInfo.ExportExcel(
            `【` + emailTemplate + `】${this.curTime}`,
            [],
            this.myProxy.dialogData.excelColumnInfo,
            [],
            []
        );
    }

    onLoadChannelModule() {
        let channelTemplate: any = this.LangUtil("渠道模版");
        new BaseInfo.ExportExcel(
            `【` + channelTemplate + `】${this.curTime}`,
            [],
            this.myProxy.dialogData.excelChannelColumnInfo,
            [],
            []
        );
    }

    deleteCondition(index: any) {
        this.form.condition.splice(index, 1);
    }

    onChangeUser(type: any) {
        if (type == 99) {
            this.form.range_user_ids = "";
        }
    }

    onChangeTag(type: any) {
        if (type == 99) {
            this.form.range_user_tag_ids = "";
        }
    }

    onChangeChannel(type: any) {
        if (type == 99) {
            this.form.range_channel_ids = "";
        }
    }

    inputChangeUser(e: any) {
        this.form.range_user_ids = e.target.value;
    }

    inputChangeChannel(e: any) {
        this.form.range_channel_ids = e.target.value;
    }

    inputChangeBalance(e: any, item: any) {
        item.balance = e.target.value;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.display_felx {
    ::v-deep .el-form-item__content {
        display: flex;
    }
    ::v-deep .el-form-item {
        margin-bottom: 0px;
    }
}
.display {
    ::v-deep .el-form-item__content {
        display: block;
    }
}
.send_users {
    display: flex;
    flex-direction: row;
}
.red_label {
    width: 115px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    padding: 0 12px 0 0;
    line-height: 28px;
}
.vi_div {
    padding: 0 3px !important;
}
</style>
