<template>
    <div>
        <div style="margin-left: 10px">{{ $t("vip_recharge.accountMoney") }}：{{ myProxy.bodyData.gold }}</div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="right"
            :label-width="_width"
            style="padding-top: 20px"
        >
            <el-form-item :label="$t('vip_recharge.rechargePlayer')" prop="user_id">
                <el-input
                    v-model="form.user_id"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
                <el-button type="primary" @click="onQueryUser" style="margin-left: 10px">{{
                    $t("vip_recharge.playerQuery")
                }}</el-button>
            </el-form-item>
            <el-form-item :label="$t('common.rechargeAmount')" prop="amount">
                <el-input
                    v-model="form.amount"
                    :placeholder="$t('common.pleaseEnter')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    style="width: 200px"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="onTopup"
                    style="margin-left: 10px"
                    v-if="checkUnique(unique.vip_recharge_recharge)"
                    >{{ $t("vip_recharge.submit") }}</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { IVipRecharge } from "../mediator/VipRechargeMediator";
import Cookies from "js-cookie";

@Component({
    components: {
        Pagination,
    },
})
export default class VipRechargeBody extends AbstractView implements IVipRecharge {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VipRechargeProxy = this.getProxy(VipRechargeProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.bodyData.form;

    private rules = {
        user_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        amount: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
    };

    @Watch("myProxy.bodyData.isRechargeSuccess")
    private onWatchRecharge() {
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

    private onTopup() {
        (this.$refs["form"] as any & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                // this.$confirm(`您是否要给玩家${this.form.user_id}充值${this.form.amount}金币`, "提示", {
                let str: any = this.$t("vip_recharge.confirm", { "0": this.form.user_id, "1": this.form.amount });
                let obj: any = {
                    str1: this.$t("vip_recharge.confirm", { "0": this.form.user_id, "1": this.form.amount }),
                    str2: this.$t("common.prompt"),
                    str3: this.$t("common.determine"),
                    str4: this.$t("common.cancel"),
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

    private onQueryUser() {
        if (this.form.user_id == "") {
            let str: any = this.$t("vip_recharge.errorCode");
            this.$message({
                type: "warning",
                message: str,
            });
        } else {
            this.myProxy.onQueryUser();
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
