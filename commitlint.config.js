/**
* feat：新功能
* update：更新某功能
* fix：修补某功能的bug
* refactor：重构某个功能
* optimize: 优化构建工具或运行时性能
* style：仅样式改动
* docs：仅文档新增/改动
* chore：构建过程或辅助工具的变动
* revert：回滚
* ci：持续集成
* test：测试
*/
module.exports = {
    extends: [
      "@commitlint/config-conventional"
    ],
    rules: {
      'type-enum': [2, 'always', [
        'feat', 'update', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert', 'ci', 'optimize', 'test'
       ]],
      'type-case': [0],
      'type-empty': [0],
      'scope-empty': [0],
      'scope-case': [0],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never'],
      'header-max-length': [0, 'always', 72]
    }
};