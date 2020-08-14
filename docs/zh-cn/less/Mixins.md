# Mixins

## 概览

> `mixin` 用来混合已有样式到规则集中。


```less
.a, #b {
  color: #000;
}
.mixin-class {
  .a;
}
.mixin-id {
  #b;
}
```

编译为:

```css
.a,
#b {
  color: #000;
}
.mixin-class {
  color: #000;
}
.mixin-id {
  color: #000;
}
```


*混合的括号是可选的，一般为了提高辨识度，建议加上括号。*

## 不输出

如果要创建一个mixin，但是您不希望输出mixin，则可以在其后面加上括号。

```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}
```

编译为:

```css
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

## 选择器

Mixins不仅可以包含属性，还可以包含选择器。

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
```

## 命名空间

如果要在很复杂的选择器中混合属性，可以堆叠多个id或类。

```less
#outer {
  .inner {
    color: red;
  }
}
.c {
  #outer > .inner;
}
```

而且`>`和空格都是可选的。

```less
// all do the same thing
#outer > .inner;
#outer > .inner();
#outer .inner;
#outer .inner();
#outer.inner;
#outer.inner();
```

这一点的使用被称为命名空间。你可以把你的mixins放在id选择器下，这样可以确保它不会与另一个库冲突。

```less
#my-library {
  .my-mixin() {
    color: black;
  }
}
// which can be used like this
.class {
  #my-library > .my-mixin();
}
```

## important 关键字

在mixin调用后使用！important关键字会将其继承的所有属性标记为！important：

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
```

编译为:

```css
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

