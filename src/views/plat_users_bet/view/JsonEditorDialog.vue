<template>
    <el-dialog
        :title="LangUtil('详情')"
        width="400px"
        :append-to-body="true"
        :visible.sync="myProxy.jsonEditorDialog.bShow"
    >
        <div class="editor-container">
            <json-editor ref="jsonEditor" v-model="json" :readOnly="true" />
        </div>
    </el-dialog>
</template>
<script lang="ts">
import JsonEditor from "@/components/JsonEditor/index.vue";
import AbstractView from "@/core/abstract/AbstractView";
import PlatUsersBetProxy from "../proxy/PlatUsersBetProxy";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        JsonEditor,
    },
})
export default class jsonEditorDialog extends AbstractView {
    myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    LangUtil = LangUtil;
    json = this.myProxy.jsonEditorDialog.data;
}
</script>
