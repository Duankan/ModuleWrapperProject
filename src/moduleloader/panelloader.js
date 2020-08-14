//面板默认创建参数
const defaultOpts = {
    //标题
    title: '新建面板',
    //模块名称
    module: 'EmptyModule',
    //模块显示参数
    showArgs: {
        position: 'bottom',
    },
    //模块启动参数
    startArgs: {},
};
/**
 * @class 面板加载器
 */
class PanelLoader {
    //内部加载器
    static innerLoader = null;
    //初始化面板
    static inst(loader) {
        if (!this.innerLoader && loader) {
            this.innerLoader = loader;
        }
        return this.innerLoader;
    }

    //销毁面板加载器
    static destroy() {
        this.innerLoader = null;
    }

    //检查是否已初始化
    static checkInit() {
        if (!PanelLoader.innerLoader) {
            throw new Error('面板加载器未初始化，加载失败！');
        }
    }

    //生成uuid
    static uuid() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';

        var uuid = s.join('');
        return uuid;
    }

    //创建模块
    static createModule(args) {
        this.checkInit();
        let props = Object.assign({}, defaultOpts, args); //源对象属性复制到目标对象
        props.showArgs = Object.assign({}, defaultOpts.showArgs, props.showArgs);
        if (!props.id) {
            props.id = this.uuid();
        }
        if (this.innerLoader.modules[props.id]) {
            this.activeModule(props.id);
        } else {
            this.innerLoader.createModule(props);
        }
        return props.id;
    }

    //激活模块
    static activeModule(id) {
        this.checkInit();
        return this.innerLoader.activeModule(id);
    }

    //获取模块实例
    static getModule(id) {
        this.checkInit();
        return this.innerLoader.getModule(id);
    }

    //获取模块参数
    static getModuleInfo(id) {
        this.checkInit();
        return this.innerLoader.getModuleInfo(id);
    }

    // //获取模块实例
    // static getModules() {}

    //获取所有模块
    static getModules() {}

    //关闭模块
    static closeModule(id) {}

    //关闭所有模块模块
    static closeAllModules() {
        this.checkInit();
        return this.innerLoader.closeAllModules();
    }

    //设置底侧面板状态
    static setBottomPanel(state) {}

    //设置模块标题
    static setModuleTitle(id, title) {}
}
export default PanelLoader;