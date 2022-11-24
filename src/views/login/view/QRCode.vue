<template>
    <el-dialog :visible.sync="isShow" :title="LangUtil('使用Authenticator扫描以下维码')" @close="hide" width="500px">
        <div class="img">
            <img :src="image" />
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Component, Vue } from "vue-property-decorator";
import AbstractView from "../../../core/abstract/AbstractView";
import mediator, { IView } from "../mediator/QRcodeMediator";

@Component
export default class QRcode extends AbstractView implements IView {
    LangUtil = LangUtil;
    constructor() {
        super(mediator);
    }
    destroyed() {
        super.destroyed();
    }
    isShow: boolean = false;
    image: string = "";

    public showQR(data: string) {
        this.image = data;

        this.show();
    }

    public show() {
        this.isShow = true;
    }
    hide() {
        this.isShow = false;
    }
}
</script>

<style lang="scss" scoped>
.el-dialog {
    .img {
        text-align: center;
    }
}
</style>
