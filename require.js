
const factories = {}; // 全局的模块名和方法映射 { 'name': function () {} }

/**
 * 定义模块
 * @param {string} moduleName 模块名
 * @param {Array} deps 依赖
 * @param {Function} factory 模块返回值
 */
function define(moduleName, deps, factory) {
  factory.deps = deps; // 保存当前定义模块的依赖
  factories[moduleName] = factory;
}

/**
 * 使用模块
 * @param {String[]} modules 模块名数组
 * @param {Function} callback 拿到模块后, 执行的方法
 */
function require(modules, callback) {
  const results = modules.map((moduleName) => {
    let factory = factories[moduleName];
    let exports;
    // deps: 依赖在define方法中保存过的
    require(factory.deps, (...args) => {
      exports = factory.apply(null, args);
    });
    return exports;
  });
  callback.apply(null, results);
}

define("name", [], () => "jerry");
define("age", ["name"], (name) => name + 21);

require(["age"], (age) => {
  console.info(age);
});
