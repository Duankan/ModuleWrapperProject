# 变量

> 提取常用的公共值作为变量，在固定的一处进行声明，代码抽象、易于管理。

## 概览

在样式声明语句中，我们经常遇见在不同的地方使用同一个值的情况。

```css
a,
.link {
  color: #428bca;
}
.widget {
  color: #fff;
  background: #428bca;
}
```

Less中的变量可以通过在一个地方声明在多处使用，这样使得代码更易于管理。

```less
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
.widget {
  color: #fff;
  background: @link-color;
}
```

## 插值

概览中的例子只展示了如何在 css 规则集中使用变量，实际上，变量还可以被运用在其他地方，比如： 选择器名称、属性名称、URLs 和 `@import`语句中.

### 选择器

```less
// Variables
@my-selector: banner;

// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

### URLs

```less
@images: "../images";

body{
    color: #444；
    background: url("@{images}/white-sand.png");
}
```

!> 注意LESS中涉及路径的变量在声明的时候均要为字符串形式。

### import 语句

```less
@themes: "../../src/themes"

@import　"@{themes}/tital-wave.less"

```

### 属性名

```less
@color-property: color;

.header{
    @{color-property}: #444;
    background-@{color-property}: #666;
}
```

### 变量名

定义变量的时候，变量值可以取自另一个变量。

```less
@fnord:  "I am fnord.";
@var:    "fnord";
content: @@var;
```

对于这个用法，暂时没碰到过比较典型的用例。

## 懒加载

```less
.lazy-eval {
  width: @var;
}

@var: @a;
@a: 9%;
```

等同于

```less
.lazy-eval-scope {
  width: @var;
  @a: 9%;
}

@var: @a;
@a: 100%;
```

!> 变量具有作用域概念，less变量作用域和js作用域基本相似。1.作用域链从当前块内向外直到全局作用域；2.变量的使用不必事先声明(即懒加载)。

## 默认变量

可以通过事先声明一组变量作为默认变量，在其他需要使用的地方直接引入即可。当然如果想要默认变量的值不同的时候，直接按照less变量规则重新声明赋值覆盖即可。