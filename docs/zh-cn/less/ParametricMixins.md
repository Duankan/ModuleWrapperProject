# 带参数的mixin

## 概览

> 如何向mixin中传递参数呢？

Mixins也可以引用参数，这些参数是在混合时传递给选择器块的变量。例如：

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

也可以具有其参数的默认值：

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

#header {
  .border-radius;
}
```

## 不输出

也可以使用没有参数的mixin。如果要从CSS输出中隐藏规则集，但是希望将其属性包含在其他规则集中，这很有用：

```less
.wrap() {
  text-wrap: wrap;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}

pre { .wrap }
```

## 多参数

参数使用分号或逗号分隔，但建议使用分号。逗号具有双重含义：它既可以解释为mixin参数分隔符又可以看做css列表分隔符。

如果使用逗号作为mixin分隔符，则不能使用逗号分隔的列表作为参数。反过来说，如果编译器在mixin调用或声明中至少看到一个分号，它便假定参数用分号分隔，所有逗号都属于css列表。

- 两个参数并且每个都包含逗号分隔列表：`.name(1, 2, 3; something, else)`
- 三个参数，每个包含一个数字: `.name(1, 2, 3)`
- 使用假分号来创建一个使用包含逗号分隔作为参数的mixin：`.name(1, 2, 3;)`
- 逗号分隔默认值: `.name(@param1: red, blue;)`

定义具有相同名称和参数数量的多个mixins是合法的。Less将使用所有可适用的属性。如果你使用只有一个参数的mixin例如:`.mixin(green);`，那么符合一个参数情景的所有mixin属性都会被使用。

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div {
  .mixin(#008000);
}
```

编译为:

```css
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```

!> 在统计参数个数的时候，具有默认值的参数可以忽略不计。

## 命名参数

mixin调用时可以通过名称而不是位置来提供参数值。

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
```

编译为:

```css
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

### `arguments`变量

@arguments在mixins中有一个特殊的含义，它包含了当调用mixin时传递的所有参数。如果您不想处理各个参数，这很有用：

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```

### 高级参数

您可以使用...如果您希望您的mixin采用可变数量的参数。在变量名后面使用这个参数会将这些参数分配给变量。

```less
.mixin(...) {        // matches 0-N arguments
.mixin() {           // matches exactly 0 arguments
.mixin(@a: 1) {      // matches 0-1 arguments
.mixin(@a: 1; ...) { // matches 0-N arguments
.mixin(@a; ...) {    // matches 1-N arguments
```

更高级的：

```less
.mixin(@a; @rest...) {
   // @rest is bound to arguments after @a
   // @arguments is bound to all arguments
}
```