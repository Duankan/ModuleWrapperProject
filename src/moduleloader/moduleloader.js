import WindowLoader from './windowloader';
import PanelLoader from './panelloader';
import LinkLoader from './linkloader';

//模块默认参数
const defaultOptions = {
    loader: 'window', //加载器
    module: 'EmptyModule', //模块名称
};

//加载器映射表
const LOAD_MAP = {
    //window加载器
    // window: WindowLoader,
    //面板加载器
    panel: PanelLoader,
    //link加载器
    link: LinkLoader,
};

//通用模块加载器
class ModuleLoader {

    //创建模块
    static createModule(args) {
        let props = Object.assign({}, defaultOptions, args);
        if (!props.id) {
            props.id = this.uuid();
        }
        let loader = LOAD_MAP[props.action];
        if (!loader) {
            throw new Error(`未找到加载器${props.action}，加载失败！`);
        } else {
            loader.createModule(props);
        }
        return props.id;
    }

    //获取模块信息
    static getModuleInfo(id) {
        let props;
        let loaders = Object.values(LOAD_MAP);
        for (let i = 0; i < loaders.length; i++) {
            props = loaders[i].getModuleInfo(id);
            if (props) break;
        }
        return props;
    }

    //获取模块实例
    static getModule(id) {
        let props = this.getModuleInfo(id);
        if (!props) return null;
        let loader = LOAD_MAP[props.action];
        return loader.getModule(id);
    }

    //激活模块
    static activeModule(id) {
        let props = this.getModuleInfo(id);
        if (!props) return null;
        let loader = LOAD_MAP[props.action];
        loader.activeModule(id);
    }

    //关闭模块
    static closeModule(id) {
        let props = this.getModuleInfo(id);
        if (!props) return null;
        let loader = LOAD_MAP[props.action];
        loader.closeModule(id);
    }

    //关闭所有模块
    static closeAllModules() {}

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

}
export default ModuleLoader;