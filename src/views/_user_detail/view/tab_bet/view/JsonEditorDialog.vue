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
import TabBetProxy from "../proxy/TabBetProxy";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component({
    components: {
        JsonEditor,
    },
})
export default class jsonEditorDialog extends AbstractView {
    myProxy: TabBetProxy = getProxy(TabBetProxy);
    LangUtil = LangUtil;
    json = this.myProxy.jsonEditorDialog.data;
}
</script>
