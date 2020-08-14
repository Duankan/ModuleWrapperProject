# 导入指令

> 导入其他less文件到当前文件

在css规则中，`@import`指令必须在最前，但是less中不必这样。

## 文件扩展名

- `.css`后缀的文件被当做css文件引入；
- `.less`或者没有后缀的文件被当做less文件引入
- 其他的后缀文件也被当做less文件引入

```less
@import "foo";      // foo.less is imported
@import "foo.less"; // foo.less is imported
@import "foo.php";  // foo.php imported as a less file
@import "foo.css";  // statement left in place, as-is
```

## 导入指令配置项

语法: `@import (keyword) "filename";`

可选配置项如下：

- `reference`: 使用一个less文件但是不输出该文件的内容
- `inline`: 引入一个文件但是不处理它直接输出
- `less`: 不论引入的文件类型是怎样的都按照less文件处理
- `css`: 不论引入的文件类型是怎样的都按照css文件处理
- `once`: 只引入文件一次，避免在多处多次重复引入，这是默认的
- `multiple`: 与once相对，可多次引入
- `optional`: 如果待引入的文件不存在的时候这个选项可以避免报错从而继续运行下去

可以同时使用多个配置项，每个配置项之间都需要用逗号分隔。

