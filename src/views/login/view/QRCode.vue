<template>
    <el-dialog :visible.sync="isShow" :title="$t('login.title')" @close="hide" width="500px">
        <div class="img">
            <img :src="image" />
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AbstractView from "../../../core/abstract/AbstractView";
import mediator, { IView } from "../mediator/QRcodeMediator";

@Component
export default class QRcode extends AbstractView implements IView {
    constructor() {
        super(mediator);
    }
    destroyed() {
        super.destroyed();
    }
    private isShow: boolean = false;
    private image: string = "";

    public showQR(data: string) {
        this.image = data;

        this.show();
    }

    public show() {
        this.isShow = true;
    }
    private hide() {
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