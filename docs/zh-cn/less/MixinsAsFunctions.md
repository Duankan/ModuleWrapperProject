# Mixin作为函数

> 在mixin中返回变量或者mixin

## 概览

在mixin中定义的变量或者mixin可以在这个mixin被调用的时候，在当前作用域内使用。但是原作用域内的变量具有高优先级。

```less
.functionmixin1() {
  @width: 100%;
  @height: 100%;
  color: #000000;
}

.my-mixin {
  width: @width;
  height: @height;
  .functionmixin1();
}
```

编译为:

```css
.my-mixin {
  width: 100%;
  height: 100%;
  color: #000000;
}
```

## 作为函数

既然mixin中定义的变量可以在调用时的作用域内使用。那么我们可以实现像函数一样，将变量作为返回值。

```less
.functionmixin2(@x;@y) {
  @line-height: @x+@y;
}

.my-mixin {
  .functionmixin2(.1, .2);
  line-height: @line-height;
}
```

编译为:

```css
.my-mixin {
  line-height: 0.3;
}
```

> 变量具有作用域和保护机制。具体的体现在当前作用域中的原有变量优先级最高，但是父级变量优先级却低于mixin中的变量。