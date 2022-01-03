/**
 * 对象池
 */
export default class ObjectPool {
    private _pools: any = {};
    public getPool(clazz: any): any {
        const cname = core.getQualifiedClassName(clazz);
        const pool = (this._pools[cname] = this._pools[cname] || []);
        return pool.length > 0 ? pool.pop() : new clazz();
    }

    public returnPool(obj: any) {
        const cname = core.getQualifiedClassName(obj);
        const pool = (this._pools[cname] = this._pools[cname] || []);
        pool.push(obj);
    }

    public clearPool(clazz: any) {
        const cname = core.getQualifiedClassName(clazz);
        this._pools[cname] = null;
    }

    public clearAll() {
        this._pools = {};
    }
}
