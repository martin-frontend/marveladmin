<template>
    <div v-loading="net_status.loading">
        <div class="header-content">
            <div class="group">
                <div>
                    <SearchSelect
                        :title="LangUtil('所属平台')"
                        :options="platTableColumns.plat_id.options"
                        v-model="listQuery.plat_id"
                        @change="changePlat()"
                        :clearable="false"
                    />
                </div>
            </div>
        </div>
        <div style="margin-left: 10px">{{ LangUtil("账号当前持有金额") }}：{{ myProxy.bodyData.gold }}</div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="right"
            :label-width="_width"
            style="padding-top: 20px"
        >
            <el-form-item :label="LangUtil('充值玩家ID')" prop="user_id">
                <el-input
                    oninput="value=value.replace(/[^\d,]/g, '')"
                    v-model="form.user_id"
                    :placeholder="LangUtil('请输入')"
                    style="width: 200px"
                ></el-input>
                <el-button :disabled="!canSearchUser" type="primary" @click="onQueryUser" style="margin-left: 10px">{{
                    LangUtil("玩家查询")
                }}</el-button>
                <input
                    v-show="false"
                    ref="excel-upload-input"
                    class="excel-upload-input"
                    type="file"
                    accept=".xlsx, .xls"
                    @change="handleClick"
                />
                <el-button type="primary" style="margin-left: 10px;" @click="onImportUser">
                    {{ LangUtil("导入用户") }}
                </el-button>
                <el-button type="primary" @click="onLoadModule">
                    {{ LangUtil("下载导入模版") }}
                </el-button>
            </el-form-item>
            <SearchSelect
                class="mb-22"
                :title="LangUtil('币种')"
                :options="platTableColumns.coin_name_unique_option"
                v-model="listQuery.coin_name_unique"
                @change="changeCoin()"
                :clearable="false"
            />
            <el-form-item :label="LangUtil('充值金额')" prop="amount">
                <el-input
                    v-model="form.amount"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item :label="platTableColumns.bonus_multiple.name" prop="bonus_multiple">
                <el-input
                    v-model="form.bonus_multiple"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item :label="LangUtil('备注')" prop="remark">
                <el-input
                    v-model="form.remark"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value;"
                    style="width: 237px"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="onTopup"
                    style="margin-left: 10px"
                    v-if="checkUnique(unique.vip_recharge_recharge)"
                    
                    >{{ LangUtil("提交充值") }}</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import VipReplenishRechargeProxy from "../proxy/VipReplenishRechargeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { IVipReplenishRecharge } from "../mediator/VipReplenishRechargeMediator";
import Cookies from "js-cookie";
import SearchSelect from "@/components/SearchSelect.vue";
import { readerData } from "@/core/global/Excel";
import { removeRepeatStr } from "@/core/global/Functions";
import { BaseInfo } from "@/components/vo/commonVo";
import { dateFormat } from "@/core/global/Functions";

@Component({
    components: {
        Pagination,
        SearchSelect,
    },
})
export default class VipReplenishRechargeBody extends AbstractView implements IVipReplenishRecharge {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VipReplenishRechargeProxy = this.getProxy(VipReplenishRechargeProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    platTableColumns = this.myProxy.tableData.plat_columns;
    form = this.myProxy.bodyData.form;
    listQuery = this.myProxy.listQuery;

    rules = {
        user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        amount: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
    };

    @Watch("myProxy.bodyData.isRechargeSuccess")
    onWatchRecharge() {
        this.$nextTick(() => {
            (this.$refs.form as any).clearValidate();
        });
    }

    get _width() {
        let _w: string = "";
        let lang: string = Cookies.get("language") || "zh";
        if (lang === "zh") {
            _w = "100px";
        } else if (lang === "vi") {
            _w = "260px";
        }
        return _w;
    }

    onTopup() {
        (this.$refs["form"] as any & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                // this.$confirm(`您是否要给玩家${this.form.user_id}充值${this.form.amount}金币`, "提示", {
                let str: any = LangUtil(
                    "您是否要给玩家 <p class='text-hidden'>{0}</p> 总共 {1} 人<br>充值 {2} {3}",
                    this.form.user_id,
                    this.form.user_id.split(",").length,
                    this.form.amount,
                    this.listQuery.coin_name_unique
                );
                let obj: any = {
                    str1: str,
                    str2: this.LangUtil("提示"),
                    str3: this.LangUtil("确定"),
                    str4: this.LangUtil("取消"),
                };

                this.$confirm(obj.str1, obj.str2, {
                    confirmButtonText: obj.str3,
                    cancelButtonText: obj.str4,
                    type: "warning",
                    dangerouslyUseHTMLString: true,
                })
                    .then(() => {
                        this.myProxy.onTopup();
                    })
                    .catch(() => {});
            }
        });
    }

    onQueryUser() {
        if (this.form.user_id == "") {
            let str: any = this.LangUtil("请输入玩家ID");
            this.$message({
                type: "warning",
                message: str,
            });
        } else {
            this.myProxy.onQueryUser();
        }
    }

    //更换平台切换对应渠道
    changePlat() {
        //@ts-ignore
        this.platTableColumns.coin_name_unique_option = this.platTableColumns.coin_name_unique.options[
            this.listQuery.plat_id
        ];
        //设定选取币种第一个
        const coin_name_unique_options_keys = Object.keys(this.platTableColumns.coin_name_unique_option);
        this.listQuery.coin_name_unique = coin_name_unique_options_keys[0];
    }

    changeCoin() {
        this.myProxy.getCoinGold();
    }

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let user_id = removeRepeatStr(excel.results, this.myProxy.dialogData.excelColumnInfo.user_id.name, ",");
        this.form.user_id = user_id;
    }

    // 汇入用户excel
    onImportUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    // 载入模组
    onLoadModule() {
        let userIdTemplate: any = this.LangUtil("用户模版");
        new BaseInfo.ExportExcel(
            `【` + userIdTemplate + `】${this.curTime}`,
            [],
            this.myProxy.dialogData.excelColumnInfo,
            [],
            []
        );
    }

    get curTime() {
        return dateFormat(new Date(), "yyyy-MM-dd hh-mm-ss");
    }

    get canSearchUser() {
        return this.form.user_id != "" && !this.form.user_id.includes(",");
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.mb-22 {
    margin-bottom: 22px;
}
</style>
