//模块默认创建参数
const defaultOpts = {

    //打开方式:链接,路由
    openType: 'href',

    url: '',
};
/**
 * 链接加载器
 */
class LinkLoader {

    //创建面板
    static createModule(args) {
        let props = Object.assign({}, defaultOpts, args);
        if (props.openType == 'href') {
            window.open(props.module);
        } else if (props.openType == 'route') {
            this.$router.push({
                name: props.module,
                query: props.startArgs,
            });
        }
    }

    //获取面板参数
    static getModuleInfo(id) {
        return null;
    }

    //获取面板实例
    static getModule(id) {
        return null;
    }

    //获取所有模块实例
    static getModules() {
        return [];
    }

    //激活面板
    static activeModule(id) {}

    //关闭模板
    static closeModule(id) {}

    //关闭所有模块
    static closeAllModules() {}
}
export default LinkLoader;