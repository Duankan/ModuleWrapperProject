# 向mixin中传递规则集

> 这条规则是指允许在mixin中定义一个css声明块

```less
@detached-ruleset: { background: red; };

// use detached ruleset
.top {
    @detached-ruleset();
}
```

编译为:

```css
.top {
  background: red;
}
```

> 这时的作用域规则为: TODO// 情况较为复杂而且几乎用不到