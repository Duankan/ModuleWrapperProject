/**
 * require.context('./', true, /\.vue$/)
 * 函数的功能:webpack的api,通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块
 * 参数:接收三个参数;
 *      1.'./'表示文件夹string类型
 *      2.true|false是否遍历子目录
 *      3.正则匹配
 * 返回结果(都是函数):
 *    1.resolve {Function}返回这个匹配文件相对于整个工程的相对路径
 *    2.keys {Function}返回匹配成功模块的名字组成的数组
 *    3.id {String} 执行环境的id,返回的是一个字符串
 *
 **/
function importAll(r) {
    let components = {};
    r.keys().forEach(key => {
        const name = key.match(/\/(\w+?)\.vue$/)[1];
        if (key.indexOf(name.toLowerCase()) > -1) {
            components[name] = r(key).default;
        }
    });
    return components;
}

//导出所有模块
export default importAll(require.context('./', true, /\.vue$/));