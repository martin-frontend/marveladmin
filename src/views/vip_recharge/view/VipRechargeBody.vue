<template>
    <div>
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
        <div style="margin-left: 10px">{{ LangUtil("账号当前持有金币") }}：{{ myProxy.bodyData.gold }}</div>
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
                    v-model="form.user_id"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
                <el-button type="primary" @click="onQueryUser" style="margin-left: 10px">{{
                    LangUtil("玩家查询")
                }}</el-button>
            </el-form-item>
            <SearchSelect
                class="mb-22"
                :title="LangUtil('币种')"
                :options="platTableColumns.coin_name_unique_option"
                v-model="listQuery.coin_name_unique"
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
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { IVipRecharge } from "../mediator/VipRechargeMediator";
import Cookies from "js-cookie";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        Pagination,
        SearchSelect,
    },
})
export default class VipRechargeBody extends AbstractView implements IVipRecharge {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VipRechargeProxy = this.getProxy(VipRechargeProxy);
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
                    "您是否要给玩家{0}充值{1} {2}",
                    this.form.user_id,
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.mb-22 {
    margin-bottom: 22px;
}
</style>
