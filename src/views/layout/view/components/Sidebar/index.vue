<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in permission_routes"
                    :key="index"
                    :item="route"
                    :index="index.toString()"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { layoutRouteSetting } from "@/core/global/LayoutRouteSetting";

export default {
    data: function() {
        return {
            permission_routes: layoutRouteSetting,
        };
    },
    props: ["sidebar"],
    components: { SidebarItem, Logo },
    computed: {
        activeMenu() {
            const route = this.$route;
            const { meta, path, name } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }

            // let idx = "";
            // for(let i=0; i<layoutRouteSetting.length; i++){
            //     const item1 = layoutRouteSetting[i];
            //     if(item1.path == path){
            //         idx += i;
            //         return idx;
            //     }
            //     if(item1.children){
            //         for(let j=0; j<item1.children.length; j++){
            //             const item2 = item1.children[j];
            //             if(item2.path == path){
            //                 idx += i + "-" + j;
            //                 return idx;
            //             }
            //             if(item2.children){
            //                 for(let m=0; m<item2.children.length; m++){
            //                     const item3 = item2.children[m];
            //                     if(item3.path == path){
            //                         idx += i + "-" + j + "-" + m;
            //                         return idx;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            // console.log(route);
            return name;
        },
        showLogo() {
            return false;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
    },
};
</script>
