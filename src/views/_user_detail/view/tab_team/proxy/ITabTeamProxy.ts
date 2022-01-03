import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ITabTeamProxy {
    /**取得根节点 */
    getRoot(): void;
    /**设置根节点 */
    setRoot(data: any): void;
    /**取得更多成员 */
    getMoreMember(data: any): void;
    /**增加节点 */
    addTree(data: any): void;
    /**打开用户详情页 */
    showUserDetail(user_id: number): void;
}
export class MemberTree {
    private defaultNode: IMember = {
        level: 0,
        user_id: "",
        invite_user_id: "",
        bind_relation: "",
        username: "",
        nick_name: "",
        directly_users: 0,
        group_users: 0,
        children: []
    };
    // 实体资料
    private _list: IMember[] = [];

    // 显示资料
    private _viewList: IMember[] = [];
    get viewList() {
        if (this._viewList[0] && this._viewList[0].children) {
            return this._viewList[0].children;
        }
        return [];
    }
    // 根节点
    private _rootNode: IMember = JSON.parse(JSON.stringify(this.defaultNode));
    get rootNode() {
        return this._rootNode;
    }
    setRoot(data: IMember) {
        this.clearList();
        Object.assign(this._rootNode, {
            level: 0,
            user_id: data.user_id,
            invite_user_id: data.invite_user_id,
            bind_relation: data.bind_relation,
            username: data.username,
            nick_name: data.nick_name,
            directly_users: data.directly_users,
            group_users: data.group_users,
            children: []
        })
        this._list.push(this._rootNode);
        this._viewList = JSON.parse(JSON.stringify(this._list));
        this.updateViewList(this._viewList[0]);
    }
    // 更新显示资料
    private updateViewList(node: IMember) {
        // 有直属成员
        if (node.hasMore && node.directly_users && node.directly_users > 0) {
            let getMoreNode: IMember = JSON.parse(JSON.stringify(this.defaultNode));
            getMoreNode = {
                hasMore: true,
                user_id: "",
                level: node.level + 1,
                invite_user_id: node.user_id,
                directly_users: 0,
                bind_relation: node.bind_relation,
                page_count: node.page_count,
                children: []
            }
            node.hasMore = false;
            node.children.push(getMoreNode);
        }
        // 有效节点 且 资料未载完
        if (node.hasMore && node.user_id) {
            let getMoreNode: IMember = JSON.parse(JSON.stringify(this.defaultNode));
            getMoreNode = {
                hasMore: true,
                user_id: "",
                level: node.level,
                invite_user_id: node.invite_user_id,
                directly_users: 0,
                bind_relation: node.bind_relation,
                page_count: node.page_count,
                children: []
            }
            node.hasMore = false;
            let parent_node = this.getNode(this._viewList[0], node.invite_user_id);
            if (parent_node) {
                parent_node.children.push(getMoreNode);
            }
        }
        if (node.children && node.children.length) {
            node.children.forEach(element => {
                this.updateViewList(element);
            });
        }
    }
    addTree(data: IMemberData) {
        if (data.list.length == 0) {
            return;
        }
        let pageCurrent: number = 0;
        let hasMore: boolean = false;
        if (data.pageInfo.pageCount && data.pageInfo.pageCurrent) {
            hasMore = (data.pageInfo.pageCount > data.pageInfo.pageCurrent);
            pageCurrent = data.pageInfo.pageCurrent;
        }

        let node: IMember | null = this.getNode(this._rootNode, data.list[0].invite_user_id);

        if (node) {
            let i = 0;
            data.list.forEach(element => {
                let member: IMember = {
                    level: node!.level + 1,
                    hasMore: (element.directly_users > 0),
                    invite_user_id: element.invite_user_id,
                    user_id: element.user_id,
                    username: element.username,
                    bind_relation: element.bind_relation,
                    nick_name: element.nick_name,
                    directly_users: element.directly_users,
                    page_count: 0,
                    children: []
                }
                node!.children.push(member);
                i++;
            });
            if (i == data.list.length) {
                if (hasMore) {
                    node.page_count = pageCurrent;
                    node.hasMore = hasMore;
                } else {
                    node.hasMore = false;
                }
            }
        }
        this._viewList = JSON.parse(JSON.stringify(this._list));
        this.updateViewList(this._viewList[0]);
    }

    private getNode(node: IMember, id: string): IMember | null {
        if (node.user_id == id) {
            return node;
        } else if (node.children && node.children.length) {
            let result = null;
            for (let i = 0; result == null && i < node.children.length; i++) {
                result = this.getNode(node.children[i], id);
            }
            return result;
        }
        return null;
    }

    public clearList() {
        this._list = [];
        this._viewList = [];
    }
}
interface IMember {
    level: number,
    user_id: string,
    username?: string,
    nick_name?: string,
    directly_users: number,
    group_users?: number,
    children: IMember[],
    bind_relation: string,
    invite_user_id: string,
    // 是否加载
    hasMore?: boolean,
    page_count?: number,
}
interface IMemberData {
    list: IMember[],
    pageInfo: PageInfoVO
}
