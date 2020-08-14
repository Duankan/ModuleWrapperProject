# 循环

## 概览

less中mixin可以调用它自身，利用这点我们可以创建很多的迭代输出。

```less
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}

div {
  .loop(5); // launch the loop
}
```

编译为:

```css
div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
```

## 一个典型的生成栅格类的例子：

```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
```

编译为：

```css
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

## 自己实现的24格的栅格系统例子

```less
.collg {
  position: relative;
  min-height: 1px;
  float: left;
}
.looper(@base:24;@index:24) when (@index > 0) {
  .col-lg-@{index} {
    &:extend(.collg);
    width: (100% * @index / @base);
  }
  .looper(@index:(@index - 1));
}

.row {
  .looper()
}
```

编译为:

```css
.row .col-lg-24 {
  width: 100%;
}
.row .col-lg-23 {
  width: 95.83333333%;
}
.row .col-lg-22 {
  width: 91.66666667%;
}
.row .col-lg-21 {
  width: 87.5%;
}
.row .col-lg-20 {
  width: 83.33333333%;
}
.row .col-lg-19 {
  width: 79.16666667%;
}
.row .col-lg-18 {
  width: 75%;
}
.row .col-lg-17 {
  width: 70.83333333%;
}
.row .col-lg-16 {
  width: 66.66666667%;
}
.row .col-lg-15 {
  width: 62.5%;
}
.row .col-lg-14 {
  width: 58.33333333%;
}
.row .col-lg-13 {
  width: 54.16666667%;
}
.row .col-lg-12 {
  width: 50%;
}
.row .col-lg-11 {
  width: 45.83333333%;
}
.row .col-lg-10 {
  width: 41.66666667%;
}
.row .col-lg-9 {
  width: 37.5%;
}
.row .col-lg-8 {
  width: 33.33333333%;
}
.row .col-lg-7 {
  width: 29.16666667%;
}
.row .col-lg-6 {
  width: 25%;
}
.row .col-lg-5 {
  width: 20.83333333%;
}
.row .col-lg-4 {
  width: 16.66666667%;
}
.row .col-lg-3 {
  width: 12.5%;
}
.row .col-lg-2 {
  width: 8.33333333%;
}
.row .col-lg-1 {
  width: 4.16666667%;
}
```