# 扩展

> Extend 是一个 Less 伪类，他可以合并该伪类引用的选择器规则集到当前选择器规则集。

## 概览

```less
.inline {
  color: red;
}
.nav li {
  &:extend(.inline);
  background: blue;
}
```

编译为:

```css
.inline,
.nav li {
  color: red;
}
.nav li {
  background: blue;
}
```

!> 释义：`extend`实际作用为扩展，这里的扩展类似于js中的对象扩展功能。即对于A和B两个对象(可能更多)，A本身可以具有自己的属性规则集定义，现要将B的属性规则集同样复制一份到A上。目标对象(target)为`：extend`伪类添加到的对象，源对象(source)为`:extend()`括号里的选择器对象。

## 语法

语法：`.selector-name(.extended-selector-names optional-keyword){};`

`extend`既可以被添加到一个已有的选择器上，也可以被放置在一个规则集中。它看上去像一个可带选项参数(只有一个all)的伪类。

```less
// 源对象
.b{
  color: #000;
}
// 待扩展对象
.a:extend(.b) {
}
// 父级引用写法
.a {
  &:extend(.b);
}
```

## 选择器上的 extend

附加到选择器的扩展看起来就像一个普通的以选择器作为参数的伪类。一个选择器可以包含多个扩展子句，但必须遵循所有扩展名位于选择器的末尾的规则。

- 选择器后的extend: `pre:hover:extend(div pre)`
- 选择和extend之间是允许有空格存在的: `pre:hover: extend(div pre)`
- 多个extend也是被允许的: `pre:hover:extend(div pre):extend(.bucket tr)`，其实这种写法完全可以用合并功能代替: `pre:hover:extend(div pre,.bucket tr)`
- extend必须位于最后： `pre:hover:extend(div pre):nth-child(odd)` 这种写法是错误的。

另外，对于选择器组声明的情况，对于组中的每一条选择器都可以单独使用extend。

```less
.bag{
  color: red;
}
.bucket{
  color: blue;
}
.big-division,
.big-bag:extend(.bag),
.big-bucket:extend(.bucket all){
  font-size: 14px;
}
```

## 规则集中的extend

`extend`可以放入规则集内部使用，其实这是选择器使用的变相写法而已。

```less
div pre {
  color: yellow;
}

pre:hover,
.some-class {
  &:extend(div pre);
  font-size: 15px;
}
```

这就等同于:

```less
pre:hover:extend(div pre),
.some-class:extend(div pre){
  font-size: 15px;
}
```

## 精确匹配

如上面所说的，`extend`语法是精确匹配的，除非你使用了`all`关键字或者是属性选择器。

```less
.a.class,
.class.a,
.class > .a {
  color: blue;
}
.test:extend(.class) {} // 报错: .class 未定义
```


### 后代关系

```less
.bucket {
  tr {
    color: #000;
  }
}

.some-class:extend(.bucket tr){
  font: "Microsoft YaHei";
}
```

值的注意的是嵌套关系(即后代选择器)必须为精确的，不能缺少某一层后代。

### 通配符

虽然`*.class` 和 `.class`有重复的部分，但是less并不会匹配`*.class`为'.class`。

```less
*.class{
    color: blue;
}
.noStart:extend(.class){}; 同样报错: .class 未定义
```

### 伪类顺序

同一个选择器具有多个伪类的时候，他们的顺序不同也会被less视作不同。

```less
a:link:hover:visited {
  color: red;
  text-decoration: underline;
}
.my-selector:extend(a.link:visited:hover){  // a.link:visited:hover 未定义
  display: inline-block;
}
```

### nth 表达式

虽然`1n+3` 和 `n+3`是等同的，但是less并不会将这两种视作同一种而匹配。

```less

ul.nav li:nth-child(1n+3) {
  display: inline-block;
  border-radius: 50%;
}

.child:extend(ul.nav li:nth-child(n+3)) {
}
```

### 属性选择器

```less
[title=identifier] {
  color: blue;
}
[title='identifier'] {
  color: blue;
}
[title="identifier"] {
  color: blue;
}

.noQuote:extend([title=identifier]) {}
.singleQuote:extend([title='identifier']) {}
.doubleQuote:extend([title="identifier"]) {}
```

编译为:

```css
[title=identifier],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}

[title='identifier'],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}

[title="identifier"],
.noQuote,
.singleQuote,
.doubleQuote {
  color: blue;
}
```

## 关键字 all

当您在`extend`参数中指定all关键字时，会指示Less将该选择器与其他选择器的一部分进行匹配。选择器将被复制，然后选择器的匹配部分将被替换为扩展，从而创建一个新的选择器。

```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {}
```

编译为:

```css
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```

!> 可以将这种操作模式视为基本上进行非破坏性的搜索和替换。

## 插值模式的选择器

```less
@variable: .bucket;
@{variable} { // interpolated selector
  color: blue;
}
.some-class:extend(.bucket) {} // does nothing, no match is found
```

如上，less会忽略选择器为变量类型的extend。

另外，`extend`中有变量的也会忽略匹配。

```less
.bucket {
  color: blue;
}
.some-class:extend(@{variable}) {} // interpolated selector matches nothing
@variable: .bucket;
```

但是，如下这种模式是有效的。

```less
.bucket {
  color: blue;
}
@{variable}:extend(.bucket) {}
@variable: .selector;
```

## @media 扩展时的作用域


```less

// 1
.test {
  color: yellow;
}

// 2
@media screen {
  .test {
    color: red;
  }

  .screenClass:extend(.test) {
    color: black;
  }
}

// 3
@media print {
  .test {
    color: white;
  }
}
```

编译为:

```css
.test {
  color: yellow;
}
@media screen {
  .test,
  .screenClass {
    color: red;
  }
  .screenClass {
    color: black;
  }
}
@media print {
  .test {
    color: white;
  }
}
```


!> 不同的`@media`域都有各自的扩展关系作用域，他们是独立的，而且`@media`域中不能扩展顶级作用域内的规则集。

```less
@media screen {
  .selector {  /* ruleset inside nested media - top level extend works */
    color: blue;
  }
  @media (min-width: 1023px) {
    .selector {  /* ruleset inside nested media - top level extend works */
      color: blue;
    }
  }
}

.topLevel:extend(.selector) {} /* top level extend matches everything */
```

编译为：

```css
@media screen {
  .selector,
  .topLevel { /* ruleset inside media was extended */
    color: blue;
  }
}
@media screen and (min-width: 1023px) {
  .selector,
  .topLevel { /* ruleset inside nested media was extended */
    color: blue;
  }
}
```

!> 上面说过`@media`域中不能扩展顶级作用域内的规则集，但顶级作用域中可以扩展`@media`中的规则集。

## 重复检测

目前来说，less中还未有重复检测的功能。

```less
.a,
.b {
  color: #000;
}

.c:extend(.a,.b) {
}
```

编译为:

```css
.a,
.b,
.c,
.c{
    color: #000;
}
```

## 使用场景

### 经典用法

假如我们现在有以下的一个`.animal`类。

```css
.animal{
    background-color: black;
    color: white;
    // other more rules
}
```

现在我们有一个需求是除了background-color这个属性值不同外，其他的均和animal类一样，我们的处理方法可以像下面这样：

改变HTML`<a class="animal bear">Bear</a>`，添加一个bear类后，用bear这个类来覆盖background-color属性。

```css
.animal {
  background-color: black;
  color: white;
}
.bear {
  background-color: brown;
}
```

同样的，我们也可以使用extend。

···html
<a class="bear">Bear</a>
```

```less
.animal {
  background-color: black;
  color: white;
}
.bear:extend(.animal) {
  background-color: brown;
}
```

### 减小CSS规则集体积

mixin是复制所有的属性规则到一个选择器中，有时候这会造成一些不必要的重复声明。因此，您可以使用extends而不是mixins将选择器移动到要使用的属性，这会导致较少的css生成。

```less
.my-inline-block() {
    display: inline-block;
  font-size: 0;
}
.thing1 {
  .my-inline-block;
}
.thing2 {
  .my-inline-block;
}
```

编译为:

```css
.thing1 {
  display: inline-block;
  font-size: 0;
}
.thing2 {
  display: inline-block;
  font-size: 0;
}
```

如果使用extend:

```less
.my-inline-block {
  display: inline-block;
  font-size: 0;
}
.thing1 {
  &:extend(.my-inline-block);
}
.thing2 {
  &:extend(.my-inline-block);
}
```

编译为:

```css
.my-inline-block,
.thing1,
.thing2 {
  display: inline-block;
  font-size: 0;
}
```

### 合并规则/mixin的高级用法

另一种用例是一个mixin的替代方法 - 因为mixins只能与简单的选择器一起使用，如果你有两个不同的html块，但是需要应用相同的样式，你可以使用extend来关联两个区域。

```less
li.list > a {
  // list styles
}
button.list-style {
  &:extend(li.list > a); // use the same list styles
}
```

