 

**目录**

[一、概述 ](#t0)

[二、使用介绍 ](#t1)

[第一种Poi-tl：](#t2)

[1、介绍 ](#t3)

[2、功能](#t4)

[第二种Poi:](#t5)

[什么是POI](#t6)

[二进制分布](#t7)

[源码分发](#t8)

* * *

一、概述 
=====

Word模板引擎：使用Word模板和数据生成对应的Word文档。

方案

移植性

功能性

易用性

**Poi-tl**

Java跨平台

Word模板引擎，基于Apache [POI](https://so.csdn.net/so/search?q=POI&spm=1001.2101.3001.7020)，提供更友好的API

低代码，准备文档模板和数据即可

Apache POI

Java跨平台

Apache项目，封装了常见的文档操作，也可以操作底层XML结构

文档不全，这里有一个教程：[Apache POI Word快速入门](http://deepoove.com/poi-tl/apache-poi-guide.html "Apache POI Word快速入门")

Freemarker

XML跨平台

仅支持文本，很大的局限性

不推荐，XML结构的代码几乎无法维护

[OpenOffice](https://so.csdn.net/so/search?q=OpenOffice&spm=1001.2101.3001.7020)

部署OpenOffice，移植性较差

-

需要了解OpenOffice的API

HTML浏览器导出

依赖浏览器的实现，移植性较差

HTML不能很好的兼容Word的格式，样式糟糕

-

Jacob、winlib

Windows平台

-

复杂，完全不推荐使用

使用场景：

               1.合同导出 2.题库导出 等等

二、使用介绍 
=======

第一种Poi-tl：
----------

### 1、介绍 

        **poi-tl**是一个基于Apache POI的Word模板引擎，也是一个免费开源的Java类库，你可以非常方便的加入到你的项目中，并且拥有着让人喜悦的特性。

> poi-tl supports **custom functions (plug-ins)**, functions can be executed anywhere in the Word template, do anything anywhere in the document is the goal of poi-tl.

### 2、功能

![](https://img-blog.csdnimg.cn/19989701511f4aceb19bbdbb2dea1836.png)

**Poi-tl的TDO模式**

> **TDO模式：Template + data-model = output**

    <dependency>  <groupId>com.deepoove</groupId>  <artifactId>poi-tl</artifactId>  <version>1.12.0</version></dependency>

    XWPFTemplate template = XWPFTemplate.compile("template.docx").render(  new HashMap<String, Object>(){{    put("title", "Hi, poi-tl Word模板引擎");}});  template.writeAndClose(new FileOutputStream("output.docx"));compile 编译模板 - Templaterender 渲染数据 - data-modelwrite 输出到流 - output

**Template：模板**

        模板是Docx格式的Word文档，你可以使用Microsoft office、WPS Office、Pages等任何你喜欢的软件制作模板，也可以使用Apache POI代码来生成模板。

        所有的标签都是以`{{`开头，以`}}`结尾，标签可以出现在任何位置，包括页眉，页脚，表格内部，文本框等，表格布局可以设计出很多优秀专业的文档，推荐使用表格布局。

        poi-tl模板遵循**“**所见即所得**”**的设计，模板和标签的样式会被完全保留。

**Data-model：数据**

数据类似于哈希或者字典，可以是Map结构（key是标签名称）：

    Map<String, Object> data = new HashMap<>();data.put("name", "Sayi");data.put("start_time", "2019-08-04");

可以是对象（属性名是标签名称）:

    public class Data {  private String name;  private String startTime;  private Author author;}

数据可以是树结构，每级之间用点来分隔开，比如`{{author.name}}`标签对应的数据是author对象的name属性值。

        FreeMarker、Velocity文本模板中可以通过三个标签设置图片路径、宽和高：

    <img src="{{path}}" width="{{width}}" height="{{height}}">

        但是Word模板不是由简单的文本表示，所以在渲染图片、表格等元素时提供了数据模型，它们都**实现了接口RenderData**，比如图片数据模型PictureRenderData包含图片路径、宽、高三个属性。

**Output：输出**

以流的方式进行输出：

    template.write(OutputStream stream);
    

可以写到任意输出流中，比如文件流：

    template.write(new FileOutputStream("output.docx"));
    

比如网络流：

    response.setContentType("application/octet-stream");response.setHeader("Content-disposition","attachment;filename=\""+"out_template.docx"+"\""); // HttpServletResponse responseOutputStream out = response.getOutputStream();BufferedOutputStream bos = new BufferedOutputStream(out);template.write(bos);bos.flush();out.flush();PoitlIOUtils.closeQuietlyMulti(template, bos, out); // 最后不要忘记关闭这些流。

**插件**

        插件，又称为**自定义函数**，它允许用户在模板标签位置处执行预先定义好的函数。由于插件机制的存在，我们几乎可以在模板的任何位置执行任何操作。

**插件是poi-tl的核心**，默认的标签和引用标签都是通过插件加载。默认有八个策略插件，用来处理文本、图片、列表、表格、文档嵌套、引用图片、引用多系列图表、引用单系列图表等

*   TextRenderPolicy
    
*   PictureRenderPolicy
    
*   NumberingRenderPolicy
    
*   TableRenderPolicy
    
*   DocxRenderPolicy
    
*   MultiSeriesChartTemplateRenderPolicy
    
*   SingleSeriesChartTemplateRenderPolicy
    
*   DefaultPictureTemplateRenderPolicy
    

**案例：**

    /**     * 生成word 普通格式     * @param filePath     * @throws IOException     */    public static void generateWordXWPFTemplate(String filePath) throws IOException {        Map<String, Object> content = new HashMap<>();        content.put("title", "Springboot 生成Word文档");        content.put("author", "zhw");        content.put("site", new HyperlinkTextRenderData("http://deepoove.com/poi-tl/", "http://deepoove.com/poi-tl/"));         content.put("poiText",            "poi-tl是一个基于Apache POI的Word模板引擎，也是一个免费开源的Java类库，你可以非常方便的加入到你的项目中，并且拥有着让人喜悦的特性。");         content.put("poiTextTwo", "条形图（3D条形图）、柱形图（3D柱形图）、面积图（3D面积图）、折线图（3D折线图）、雷达图、饼图（3D饼图）、散点图等图表渲染");        content.put("poiTlList", Numberings.create("将标签渲染为文本", "将标签渲染为表格","将标签渲染为列表"));         RowRenderData headRow = Rows.of("标题一", "标题二", "标题三", "标题四", "标题五").textColor("FFFFFF").bgColor("4472C4").center().create();        TableRenderData table = Tables.create(headRow);         List<Integer> dataList=new ArrayList<>();        for (int i = 0; i < 100; i++) {            dataList.add(i);        }        List<List<Integer>> subList = Lists.partition(dataList, 5);        for (List<Integer> list : subList) {            for (Integer value : list) {                table.addRow(Rows.create(value+"", value+"", value+"", value + "", value+""));            }         }        //填充数据        content.put("poiTable", table);         //图片        Resource resource = new ClassPathResource("a.jpeg");        content.put("poiImage", Pictures.ofStream(new FileInputStream(resource.getFile())).create());         //读取模板        XWPFTemplate render = XWPFTemplate.compile(new ClassPathResource("poi-tl-template.docx").getFile()).render(content);        //渲染模板        render.write(new FileOutputStream(filePath));    }     /**     * 导出markdown为word     *     * @param filePath     * @throws IOException     */    public static void generateWordXWPFTemplateMD(String filePath) throws IOException {        MarkdownRenderData code = new MarkdownRenderData();         Resource resource = new ClassPathResource("test.md");        code.setMarkdown(new String(Files.readAllBytes(resource.getFile().toPath())));        code.setStyle(MarkdownStyle.newStyle());         Map<String, Object> data = new HashMap<>();        data.put("md", code);         Configure config = Configure.builder().bind("md", new MarkdownRenderPolicy()).build();        XWPFTemplate render = XWPFTemplate.compile(new ClassPathResource("markdown_template.docx").getFile(), config).render(data);        render.write(new FileOutputStream(filePath));    }

第二种Poi:
-------

        Apache POI 是创建和维护操作各种符合Office Open XML（OOXML）标准和微软的OLE 2复合文档格式（OLE2）的Java API。用它可以使用Java读取和创建,修改MS Excel文件.而且,还可以使用Java读取和创建MS Word和MSPowerPoint文件。更多请参考\[官方文档\]([https://poi.apache.org/index.html)。](https://poi.apache.org/index.html%29%E3%80%82 "https://poi.apache.org/index.html)。")

### 什么是POI

> Apache POI 是用Java编写的免费开源的跨平台的 Java API，Apache POI提供API给Java程序对Microsoft Office格式档案读和写的功能。POI为“Poor Obfuscation Implementation”的首字母缩写，意为“**简洁版的模糊实现**”.

        Apache POI 是创建和维护操作各种符合Office Open XML（OOXML）标准和微软的OLE 2复合文档格式（OLE2）的Java API。更多请参考[官方文档](https://poi.apache.org/index.html "官方文档")。

![](https://img-blog.csdnimg.cn/cc6057c6cddd49b0bee368978d0d52de.png)

![](https://img-blog.csdnimg.cn/cdf43978f72f47cf81cf1b306fb227bf.png)

** POI 即可以导出word文档也可以到出Execl 和PPTX文档。**

### 二进制分布

*   [poi-bin-5.2.3-20220909.tgz](https://www.apache.org/dyn/closer.lua/poi/release/bin/poi-bin-5.2.3-20220909.tgz "poi-bin-5.2.3-20220909.tgz") （58 MB，[签名（.asc）](https://downloads.apache.org/poi/release/bin/poi-bin-5.2.3-20220909.tgz.asc "签名（.asc）")，校验和：[SHA-256](https://downloads.apache.org/poi/release/bin/poi-bin-5.2.3-20220909.tgz.sha256 "SHA-256")， [SHA-512](https://downloads.apache.org/poi/release/bin/poi-bin-5.2.3-20220909.tgz.sha512 "SHA-512")）
*   [poi-bin-5.2.3-20220909.zip](https://www.apache.org/dyn/closer.lua/poi/release/bin/poi-bin-5.2.3-20220909.zip "poi-bin-5.2.3-20220909.zip") （58 MB，[签名 (.asc)](https://downloads.apache.org/poi/release/bin/poi-bin-5.2.3-20220909.zip.asc "签名 (.asc)")，校验和：[SHA-256](https://downloads.apache.org/poi/release/bin/poi-bin-5.2.3-20220909.zip.sha256 "SHA-256")、 [SHA-512](https://downloads.apache.org/poi/release/bin/poi-bin-5.2.3-20220909.zip.sha512 "SHA-512")）

### 源码分发

*   [poi-src-5.2.3-20220909.tgz](https://www.apache.org/dyn/closer.lua/poi/release/src/poi-src-5.2.3-20220909.tgz "poi-src-5.2.3-20220909.tgz") （112 MB，[签名（.asc）](https://downloads.apache.org/poi/release/src/poi-src-5.2.3-20220909.tgz.asc "签名（.asc）")，校验和：[SHA-256](https://downloads.apache.org/poi/release/src/poi-src-5.2.3-20220909.tgz.sha256 "SHA-256")， [SHA-512](https://downloads.apache.org/poi/release/src/poi-src-5.2.3-20220909.tgz.sha512 "SHA-512")）
*   [poi-src-5.2.3-20220909.zip](https://www.apache.org/dyn/closer.lua/poi/release/src/poi-src-5.2.3-20220909.zip "poi-src-5.2.3-20220909.zip") （116 MB，[签名（.asc）](https://downloads.apache.org/poi/release/src/poi-src-5.2.3-20220909.zip.asc "签名（.asc）")，校验和：[SHA-256](https://downloads.apache.org/poi/release/src/poi-src-5.2.3-20220909.zip.sha256 "SHA-256")， [SHA-512](https://downloads.apache.org/poi/release/src/poi-src-5.2.3-20220909.zip.sha512 "SHA-512")） 

            <dependency>            <groupId>org.apache.poi</groupId>            <artifactId>poi</artifactId>            <version>5.2.2</version>        </dependency>        <dependency>            <groupId>org.apache.poi</groupId>            <artifactId>poi-ooxml</artifactId>            <version>5.2.2</version>        </dependency>

*   HSSF － 提供读写 Microsoft Excel XLS 格式 (Microsoft Excel 97 (-2003)) 档案的功能。
    
*   XSSF － 提供读写 Microsoft Excel OOXML XLSX 格式 (Microsoft Excel XML (2007+)) 档案的功能。
    
*   SXSSF － 提供低内存占用量读写 Microsoft Excel OOXML XLSX 格式档案的功能。
    
*   HWPF － 提供读写 Microsoft Word DOC97 格式 (Microsoft Word 97 (-2003)) 档案的功能。
    
*   XWPF － 提供读写 Microsoft Word DOC2003 格式 (WordprocessingML (2007+)) 档案的功能。
    
*   HSLF/XSLF － 提供读写 Microsoft PowerPoint 格式档案的功能。
    
*   HDGF/XDGF － 提供读 Microsoft Visio 格式档案的功能。
    
*   HPBF － 提供读 Microsoft Publisher 格式档案的功能。
    
*   HSMF － 提供读 Microsoft Outlook 格式档案的功能。
    

**1、Word文件**

> 1.构建文档对象
> 
> XWPFDocument doc = new XWPFDocument();
> 
> 2.创建段落
> 
> XWPFParagraph xwpfParagraph = doc.createParagraph();
> //设置位置 居中 左 右
> xwpfParagraph.setAlignment(ParagraphAlignment.CENTER);
> 
> 3.设置文本
> 
> XWPFRun xwpfRun = xwpfParagraph.createRun();
> //加粗
> xwpfRun.setBold(true);
> //文本
> xwpfRun.setText(content);
> //字体大小
> xwpfRun.setFontSize(fontSize);
> 
> 4.设置表格
> 
> // 表格
> XWPFParagraph paragraph = doc.createParagraph();
> //创建table 表格 5行 5 列
> XWPFTable table = paragraph.getDocument().createTable(5, 5);
> //设置宽度
> table.setWidth(500);
> //设置每行 内外边距
> table.setCellMargins(40, 40, 40, 40);
> 
> // 表格属性
> CTTblPr tablePr = table.getCTTbl().addNewTblPr();
> // 表格宽度
> CTTblWidth width = tablePr.addNewTblW();
> width.setW(BigInteger.valueOf(8000));
> 
> //设置标题
> List<XWPFTableCell> tableCells = table.getRow(0).getTableCells();
> tableCells.get(0).setText("标题一");
> tableCells.get(1).setText("标题二");
> tableCells.get(2).setText("标题三");
> tableCells.get(3).setText("标题四");
> tableCells.get(4).setText("标题五");
> 
> //填充数据
> for (int i = 1; i < 5; i++) {
>     tableCells = table.getRow(i).getTableCells();
>     for (int j = 0; j < 5; j++) {
>         tableCells.get(j).setText("a"+j);
>     }
> }
> 
> 5.设置图片
> 
> // 图片
> InputStream stream = null;
> try {
>     XWPFParagraph paragraph2 = doc.createParagraph();
>     Resource resource = new ClassPathResource("a.jpeg");
>     stream = new FileInputStream(resource.getFile());
>     XWPFRun run = paragraph2.createRun();
>     //填充图片对象 设置 宽高
>     run.addPicture(stream, Document.PICTURE\_TYPE\_PNG, "Generated", Units.toEMU(256), Units.toEMU(256));
> } catch (Exception e) {
>     e.printStackTrace();
> }

**实现案例**

    package com.lean.word; import org.apache.poi.util.Units;import org.apache.poi.xwpf.usermodel.*;import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTblPr;import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTblWidth;import org.springframework.core.io.ClassPathResource;import org.springframework.core.io.Resource; import java.io.FileInputStream;import java.io.FileOutputStream;import java.io.InputStream;import java.math.BigInteger;import java.util.ArrayList;import java.util.List; /** *https://poi.apache.org/index.html */public class WordPoiTest {     public static void main(String[] args) throws Exception {         XWPFDocument xwpfDocument = generateWordXWPFDocument();        xwpfDocument.write(new FileOutputStream("./doc/aa.docx"));    }     public static XWPFDocument generateWordXWPFDocument() {        //1.构建文档对象        XWPFDocument doc = new XWPFDocument();         // 标题        XWPFParagraph xwpfParagraph = doc.createParagraph();        xwpfParagraph.setAlignment(ParagraphAlignment.CENTER);        XWPFRun xwpfRun = xwpfParagraph.createRun();        xwpfRun.setBold(true);        xwpfRun.setFontFamily("宋体");        xwpfRun.setText("Springboot 生成Word文档");        xwpfRun.setFontSize(22);         // 段落        createChapter(doc, "1. 概述",18);        createChapter(doc, "1.1 介绍POI",12);        createParagraph(doc,            "Apache POI 项目的任务是创建和维护 Java API，以便根据 Office Open XML 标准 (OOXML) 和 Microsoft 的 OLE 2 复合文档格式 (OLE2) 处理各种文件格式。简而言之，您可以使用 Java 读写 MS Excel 文件。此外，您还可以使用 Java 读写 MS Word 和 MS PowerPoint 文件。Apache POI 是您的 Java Excel 解决方案（适用于 Excel 97-2008）。我们有完整的 API 用于移植其他 OOXML 和 OLE2 格式，欢迎其他人参与。");        createChapter(doc, "1.2 二进制分布",12);        createParagraph(doc, "poi-bin-5.2.3-20220909.tgz （58 MB，签名（.asc），校验和：SHA-256， SHA-512）");        createParagraph(doc, "poi-bin-5.2.3-20220909.zip （58 MB，签名 (.asc)，校验和：SHA-256、 SHA-512）");         // Chapter 2        createChapter(doc, "2. 实现案例",18);        createChapter(doc, "2.1 表单展示",12);        createParagraph(doc, "假数据为例");         // 表格        XWPFParagraph paragraph = doc.createParagraph();        //创建table 表格 5行 5 列        XWPFTable table = paragraph.getDocument().createTable(5, 5);        //设置宽度        table.setWidth(500);        //设置每行 内外边距        table.setCellMargins(40, 40, 40, 40);         // 表格属性        CTTblPr tablePr = table.getCTTbl().addNewTblPr();        // 表格宽度        CTTblWidth width = tablePr.addNewTblW();        width.setW(BigInteger.valueOf(8000));         //设置标题        List<XWPFTableCell> tableCells = table.getRow(0).getTableCells();        tableCells.get(0).setText("标题一");        tableCells.get(1).setText("标题二");        tableCells.get(2).setText("标题三");        tableCells.get(3).setText("标题四");        tableCells.get(4).setText("标题五");         //填充数据        for (int i = 1; i < 5; i++) {            tableCells = table.getRow(i).getTableCells();            for (int j = 0; j < 5; j++) {                tableCells.get(j).setText("a"+j);            }        }         createChapter(doc, "2.2 图片展示",12);        createParagraph(doc, "以导出图片为例");        // 图片        InputStream stream = null;        try {            XWPFParagraph paragraph2 = doc.createParagraph();            Resource resource = new ClassPathResource("a.jpeg");            stream = new FileInputStream(resource.getFile());            XWPFRun run = paragraph2.createRun();            //填充图片对象 设置 宽高            run.addPicture(stream, Document.PICTURE_TYPE_PNG, "Generated", Units.toEMU(256), Units.toEMU(256));        } catch (Exception e) {            e.printStackTrace();        }         return doc;    }      public static void createChapter(XWPFDocument doc, String content,Integer fontSize) {        XWPFParagraph xwpfParagraph = doc.createParagraph();        //设置位置 居中 左 右        xwpfParagraph.setAlignment(ParagraphAlignment.LEFT);        XWPFRun xwpfRun = xwpfParagraph.createRun();        //加粗        xwpfRun.setBold(true);        //文本        xwpfRun.setText(content);        //字体大小        xwpfRun.setFontSize(fontSize);    }      public static void createParagraph(XWPFDocument doc, String content) {        XWPFParagraph xwpfParagraph = doc.createParagraph();        XWPFRun xwpfRun = xwpfParagraph.createRun();        xwpfRun.setText(content);        xwpfRun.setFontSize(11);    }}

**2、PPT文件**

基础类：

**XMLSlideShow：创建和管理演示文稿**

方法

描述

**addPicture**

添加图片。

**XSLFSlide createSlide()** 

创建空白幻灯片。

**XSLFSlide createSlide(XSLFSlideLayout布局)** 

创建具有给定幻灯片布局的幻灯片。

**List< XSLFPictureData>** getAllPictures()

返回所有图片的数组。

**Dimension getPageSize()**

 当前页面大小。

**XSLFSlideMaster \[\] getSlideMasters()**

 返回所有幻灯片的数组。

**XSLFSlide \[\] getSlides()**

 返回所有幻灯片。

**XslFSlide removeSlide(int index)**

 删除幻灯片。

**void setPageSize(java.awt.Dimension pgSize)**

 重置页面大小。

**void setSlideOrder(XSLFSlide slide，int newIndex)**

 重新排序幻灯片。

**XSLFSlide：创建和管理幻灯片**

方法

描述

**XSLFBackground getBackground()**

用于检索幻灯片背景的颜色和锚点等详细信息。

**XSLFSlideLayout getSlideLayout()**

提供对当前幻灯片的** XSLFSlideLayout **对象的访问。

**XSLFSlideMaster getSlideMaster()**

提供对当前幻灯片的幻灯片母版的访问。

**XSLFTheme getTheme()**

返回当前幻灯片的** XSLFTheme **对象。

**java.lang.String getTitle()**

返回当前幻灯片的标题。

**XSLFSlide importContent(XSLFSheet src)**

将另一张幻灯片的内容复制到此幻灯片。

**createPicture()**

创建图片管理对象

**createTextBox()**

获取文本框对象

**addChart(XSLFChart chart)**

插入图形界面如折线图、柱状图等

**createTable()**

获取操作表单对象

**XSLFSlideMaster：****幻灯片母版****。**

方法

描述

**XSLFBackground getBackground()**

返回幻灯片母版的常用背景。

**XSLFSlideLayout getLayout(SlideLayout type)**

返回XSLFSlideLayout对象。

**XSLFSlideLayout \[\] getSlideLayouts()**

返回此幻灯片母版中的所有幻灯片布局。

**XSLFSlideLayout: 幻灯片布局**

方法

描述

**void copyLayout(XSLFSlide幻灯片)**

将占位符从此布局复制到给定幻灯片。

** XSLFTextBox： 文本框**

方法

描述

XSLFSlide 类方法：createTextBox()

获取文本框

**XSLFTextParagraph： 文本段落**

方法

描述

**XSLFTextRun addLineBreak()**

在段落中插入换行符。

**XSLFTextRun addNewTextRun()**

在段落中添加新的文本行。

**setBulletAutoNumber(ListAutoNumber scheme，int startAt)**

将自动编号的项目符号点应用于段落。

**void setIndent(double value)**

将缩进设置为段落中的文本。

**void setLeftMargin(double value)**

用于添加段落的左边距。

**void setLineSpacing(double line spacing)**

此方法用于在段落中设置行间距。

**void setTextAlign(TextAlign align)**

用于设置要设置为段落的对齐方式。

**XSLFTextParagraph ： 文本运行，用 XSLFTextRun 类来管理段落的文本运行。**

方法

描述

**addNewTextRun()**

获取XSLFTextRun类来管理文本

**XSLFHyperlink createHyperlink()**

创建超链接。

**XSLFHyperlink getHyperlink()**

用于获取超链接。

**java.lang.String getText()**

以Java字符串形式返回此Text节点的值。

**void setBold(boolean bold)**

用于以粗体设置文本。

**void setCharacterSpacing(double spc)**

设置文本运行中的字符之间的间距。

**void setFontColor(java.awt.Color color)**

设置文本的字体颜色。

**void setFontSize(double fontSize)**

设置文本的字体大小。

**void setItalic(boolean italic)**

用于使段落斜体。

**void setStrikethrough(boolean strike)**

用于将一段文本格式化为删除线文本。

**void setSubscript(boolean flag)**

用于将文本格式化为下标。

**void setSuperscript(boolean flag)**

用于将此运行中的文本格式化为上标。

**void setText(java.lang.String text)**

用于在运行中设置文本。

**void setUnderline(Boolean underline)**

用于在文本运行中对文本加下划线。

**XSLFTextShape： 文本形状**

方法

描述

**void setPlaceholder(Placeholder placeholder)**

使用此方法，可以选择占位符。

**Placeholder getTextType()**

返回当前占位符的类型。

**void clearText()**

清除当前文本形状的文本区域。

**XSLFTextParagraph addNewTextParagraph()**

向形状添加新的段落运行。

**void drawContent(java.awt.Graphics2D graphics)**

绘制任何内容。

**XSLFHyperlink ：超链接**

方法

描述

**java.net.URI getTargetURL()**

返回演示文稿幻灯片中存在的网址。

**void setAddress(java.lang.String address)**

用于将地址设置为URL。

**void setAddress(XSLFSlide幻灯片)**

将地址设置为演示文稿幻灯片中显示的网址。

创建PPT之前需要先创建一个空白的ppt，然后在其上面填充对应的文本，表格，图片等信息。且填充的时候需要定位，放置在固定的位置上。

> // x y设置距离  w h 设置大小
> 
> setAnchor(new Rectangle2D.Double(300, 50, 100, 50));

生成PPT有两种方式：

１、代码生成PPT，需要编写大量的逻辑代码，比较复杂，尤其生成：折线图，柱状图等图形。

２、通过PPT模板生成，操作简单，使用方便。

**读取PPT：**

    ​/**     * 读取ppt     */    public static void readPpt(String filePath) {        File file = new File(filePath);        StringBuffer content = new StringBuffer();        try {            InputStream is = new FileInputStream(file);            XMLSlideShow xmlSlideShow = new XMLSlideShow(is);            // 获取ppt中所有幻灯片            List<XSLFSlide> slides = xmlSlideShow.getSlides();            for (XSLFSlide slide : slides) {                List<XSLFShape> shapes = slide.getShapes();                for (XSLFShape shape : shapes) {                    System.out.println(shape.getShapeName());                }            }            // 获取所有的图表            List<XSLFChart> charts = xmlSlideShow.getCharts();            for (XSLFChart chart : charts) {                // 获取图表标题                String text = chart.getTitleShape().getText();                System.out.println(text);            }            xmlSlideShow.close();        } catch (Exception e) {            e.printStackTrace();        }        System.out.println(content.toString());    } ​

**ppt 转成图片： **

    /**     * ppt 转成图片     * @param filePath     * @param times 生成图片放大的倍数,倍数越高，清晰度越高     * @throws Exception     */    public static void pptToPng(String filePath,Integer times) throws Exception {        File file = new File(filePath);        XMLSlideShow ppt = new XMLSlideShow(new FileInputStream(file));         Dimension pgsize = ppt.getPageSize();        List<XSLFSlide> slideList = ppt.getSlides();        for (XSLFSlide xslfShapes : slideList) {            // 解决乱码问题            XSLFShape[] shapes = xslfShapes.getShapes().toArray(new XSLFShape[0]);            for (XSLFShape shape : shapes) {                if (shape instanceof XSLFTextShape) {                    XSLFTextShape sh = (XSLFTextShape) shape;                    List<XSLFTextParagraph> textParagraphs = sh.getTextParagraphs();                    for (XSLFTextParagraph xslfTextParagraph : textParagraphs) {                        List<XSLFTextRun> textRuns = xslfTextParagraph.getTextRuns();                        for (XSLFTextRun xslfTextRun : textRuns) {                            xslfTextRun.setFontFamily("宋体");                        }                    }                }            }            // 创建BufferedImage对象，图像的尺寸为原来的每页的尺寸*倍数times            BufferedImage img = new BufferedImage(pgsize.width * times,                    pgsize.height * times, BufferedImage.TYPE_INT_RGB);            Graphics2D graphics = img.createGraphics();            graphics.setPaint(Color.white);            graphics.scale(times, times);// 将图片放大times倍            graphics.fill(new Rectangle2D.Float(0, 0, pgsize.width,pgsize.height));            // 最核心的代码            xslfShapes.draw(graphics);            // 这里设置图片的存放路径和图片的格式(jpeg,png,bmp等等),注意生成文件路径            FileOutputStream out = new FileOutputStream("./doc/ppt_image_" + System.currentTimeMillis() + ".png");            // 写入到图片中去            ImageIO.write(img, "png", out);            out.close();        }        System.out.println("Image successfully created");    }

**合并 pdf ：**

    /**     * 合并 pdf     *     * @param files     * @param outPaths     * @throws Exception     */    public static void mergePptx(String[] files, String outPaths) throws Exception {        XMLSlideShow ppt = new XMLSlideShow();        for (String arg : files) {            FileInputStream fileInputStream = new FileInputStream(arg);            XMLSlideShow src = new XMLSlideShow(fileInputStream);            for (XSLFSlide srcSlide : src.getSlides()) {                ppt.createSlide().importContent(srcSlide);            }        }        FileOutputStream out = new FileOutputStream(outPaths);        ppt.write(out);        System.out.println("Merging done successfully");        out.close();    }

生成PPT 

第一种：

    public static void createBaseXSLFPPT() throws Exception {        // 创建一个新的空幻灯片        XMLSlideShow ppt = new XMLSlideShow();        // 检索页面大小。坐标以点表示 (72 dpi)        // Dimension pgsize = ppt.getPageSize();        // int pgx = pgsize.width; //以磅为单位的滑动宽度        // System.out.println(pgx);        // int pgy = pgsize.height; //以磅为单位的滑动高度        // System.out.println(pgy);        // //设置新页面大小        // ppt.setPageSize(new java.awt.Dimension(1024, 768));         // 空白幻灯片 设置标题        XSLFSlide titleslide = ppt.createSlide();        XSLFTextShape titleShape = titleslide.createTextBox();        titleShape.setPlaceholder(Placeholder.TITLE);        titleShape.setText("This is a slide title");        titleShape.setAnchor(new Rectangle(50, 50, 400, 100));         // 获取布局模板 默认 BLANK布局        XSLFSlideMaster defaultMaster = ppt.getSlideMasters().get(0);        // 标题幻灯片布局        XSLFSlideLayout titleLayout = defaultMaster.getLayout(SlideLayout.TITLE);        // 添加第一张幻灯片        XSLFSlide firstSlide = ppt.createSlide(titleLayout);        // 添加标题        XSLFTextShape title = firstSlide.getPlaceholder(0);        title.setText("标题");         XSLFTextBox shape1 = firstSlide.createTextBox();        // initial height of the text box is 100 pt but        Rectangle anchor = new Rectangle(10, 100, 300, 100);        shape1.setAnchor(anchor);         XSLFTextParagraph p1 = shape1.addNewTextParagraph();        XSLFTextRun textRun = p1.addNewTextRun();        textRun.setText("org.apache.poi.xslf.usermodel.XSLFTextParagraph");        textRun.setFontSize(24d);        textRun.setFontColor(new Color(85, 142, 213));         XSLFTextParagraph p2 = shape1.addNewTextParagraph();         p2.setSpaceBefore(-20d);        p2.setSpaceAfter(300d);        XSLFTextRun textRun1 = p2.addNewTextRun();        textRun1.setText("com/lean/word/PptTest.java:157");        textRun1.setFontSize(16d);         XSLFTextParagraph p3 = shape1.addNewTextParagraph();         XSLFTextRun textRun2 = p3.addNewTextRun();        textRun2.setText("com/lean/word/PptTest.java:163");        textRun2.setFontSize(24d);        textRun2.setFontColor(new Color(85, 142, 213));         XSLFTextParagraph p4 = shape1.addNewTextParagraph();        // 设置距离之前的间隔        p4.setSpaceBefore(-20d);        // 设置距离之后的间隔        p4.setSpaceAfter(300d);        XSLFTextRun textRun3 = p4.addNewTextRun();        // 字体大小        textRun3.setFontSize(16d);        textRun3.setText("V2.returns.get_return_list API: 可获取一个店铺的退货退款申请列表，" + "每个申请都将会返回一个return_sn作为唯一标识，买家针对同一个订单可能会提交多个return_sn。"            + "返回参数中包含order_sn即为此退货退款申请关联的订单号。另外，接口支持筛选不同类型的退货退款申请，包括退货状态（status）、"            + "谈判状态（negotiation_status）、证据上传状态（seller_proof_status）、卖家赔偿状态（seller_compensation_status）。");        // 调整形状大小以适合文本        shape1.resizeToFitText();         // 标题和内容 第三个布局        XSLFSlideLayout titleBodyLayout = defaultMaster.getLayout(SlideLayout.TITLE_AND_CONTENT);        XSLFSlide slide2 = ppt.createSlide(titleBodyLayout);        XSLFTextShape title2 = slide2.getPlaceholder(0);        title2.setText("第二个标题");        XSLFTextShape body2 = slide2.getPlaceholder(1);        body2.clearText(); // 取消设置任何现有的文本        body2.addNewTextParagraph().addNewTextRun().setText("第一段");        body2.addNewTextParagraph().addNewTextRun().setText("第二段");        body2.addNewTextParagraph().addNewTextRun().setText("第三段");         // 设置层级        XSLFTextParagraph xslfTextRuns1 = body2.addNewTextParagraph();        xslfTextRuns1.setIndentLevel(0);        xslfTextRuns1.addNewTextRun().setText("第一段");        XSLFTextParagraph xslfTextRuns2 = body2.addNewTextParagraph();        xslfTextRuns1.setIndentLevel(1);        xslfTextRuns2.addNewTextRun().setText("第二段");        XSLFTextParagraph xslfTextRuns3 = body2.addNewTextParagraph();        xslfTextRuns3.setIndentLevel(3);        xslfTextRuns3.addNewTextRun().setText("第三段");         // 布局页面        XSLFSlide slide3 = ppt.createSlide();        // 构建一个文本框        XSLFTextBox shape = slide3.createTextBox();        // 设置文本        shape.setText("com/lean/word/PptTest.java:210");        shape.setAnchor(new Rectangle2D.Double(100, 100, 500, 350));         XSLFTextParagraph p = shape.addNewTextParagraph();        XSLFTextRun r1 = p.addNewTextRun();        r1.setText("blue ");        r1.setFontColor(Color.blue);        r1.setFontSize(24.);        XSLFTextRun r2 = p.addNewTextRun();        r2.setText(" red");        r2.setFontColor(Color.red);        r2.setBold(true);        XSLFTextRun r3 = p.addNewTextRun();        r3.setFontColor(Color.black);        r3.setText(" black");        r3.setFontSize(12.);        r3.setItalic(true);        r3.setStrikethrough(true);        XSLFTextRun r4 = p.addNewTextRun();        r4.setFontColor(Color.yellow);        r4.setText(" yellow");        r4.setUnderlined(true);        // 创建超链接        XSLFTextRun r5 = p.addNewTextRun();        r5.setText("超链接");        XSLFHyperlink link = r5.createHyperlink();        link.setAddress("https://poi.apache.org");        r5.setText("https://poi.apache.org"); // visible text         // 创建文本框        XSLFTextBox shape2 = slide3.createTextBox();        // 定位        shape2.setAnchor(new Rectangle(300, 50, 200, 50));        XSLFTextRun textRun4 = shape2.addNewTextParagraph().addNewTextRun();        XSLFHyperlink link2 = textRun4.createHyperlink();        textRun4.setText("Go to top");        // 超链接定位到第三个幻灯片        link2.linkToSlide(slide2);         // 创建第四个幻灯片 表格        XSLFSlide slide4 = ppt.createSlide();        // 将图像添加到幻灯片        byte[] pictureData = IOUtils.toByteArray(new FileInputStream("./doc/3.png"));        XSLFPictureData idx = ppt.addPicture(pictureData, PictureData.PictureType.PNG);        // 插入图片        XSLFPictureShape pic = slide4.createPicture(idx);        pic.setAnchor(new Rectangle2D.Double(100, 100, 500, 350));         // 插入表格        createTextList(ppt);         // 插入表格        createTable(ppt);         // 插入表格        createTableOne(ppt);         String chartTitle = "10 languages with most speakers as first language";        String[] seriesdata = new String[] {"countries", "speakers", "language"};         String[] categories = new String[] {"???????", "?????", "中文", "English", "??????", "日本語", "português", "??????", "Русский язык", "espa?ol"};        Double[] values1 = new Double[] {58.0, 4.0, 38.0, 118.0, 4.0, 2.0, 15.0, 6.0, 18.0, 31.0};        Double[] values2 = new Double[] {315.0, 243.0, 1299.0, 378.0, 260.0, 128.0, 223.0, 119.0, 154.0, 442.0};         /**         * 柱状图         */        createSlideWithChart(ppt, chartTitle, seriesdata, categories, values1, values2);        /**         * 扇形图         */        createSlideWithChartOne(ppt, chartTitle, seriesdata, categories, values2, COLUMN_SPEAKERS);         // 柱状图        createSlideWithChartTwo(ppt);         // 输出ppt文件        ppt.write(new FileOutputStream("./doc/2.pptx"));         //        readPpt("./doc/2.pptx");     } private static void createSlideWithChartTwo(XMLSlideShow ppt) {        // 创建了一个幻灯片 这就是个空白的幻灯片        XSLFSlide slide6 = ppt.createSlide();        // 创建一个图表        XSLFChart chart = ppt.createChart();        // 创建一个工作簿        XSSFWorkbook workbook = new XSSFWorkbook();        // 写入数据        XSSFSheet sheet = workbook.createSheet();        XSSFRow row0 = sheet.createRow(0);        row0.createCell(1).setCellValue("A");        row0.createCell(2).setCellValue("B");        for (int i = 0; i < 4; i++) {            // 设置每一行的字段标题和数据            XSSFRow row = sheet.createRow(i + 1);            row.createCell(0).setCellValue((i + 1) + "队");            row.createCell(1).setCellValue(3);            row.createCell(2).setCellValue(4);        }        // 把工作簿放到图表里，这样可以方便文件更新        chart.setWorkbook(workbook);        // 图表头        chart.setTitleText("测试文本title");        // 这个是生成图表底部的示例的        XDDFChartLegend legend = chart.getOrAddLegend();        legend.setPosition(LegendPosition.BOTTOM);        // x坐标轴 底部        XDDFCategoryAxis bottomAxis = chart.createCategoryAxis(AxisPosition.BOTTOM);        // y轴 左侧        XDDFValueAxis leftAxis = chart.createValueAxis(AxisPosition.LEFT);        // 创建图表数据，第一个指定是什么图表 柱状图或者饼图，折线图都ok，        XDDFChartData data = chart.createData(ChartTypes.BAR, bottomAxis, leftAxis);        // 底部类别的数据源，可以从数组读，也可以从指定一个excel范围        XDDFCategoryDataSource xddfCategoryDataSource = XDDFDataSourcesFactory.fromStringCellRange(sheet, new CellRangeAddress(1, 4, 0, 0));        // 这是第一个柱状图的数据源        XDDFNumericalDataSource<Double> doubleXDDFNumericalDataSource = XDDFDataSourcesFactory.fromNumericCellRange(sheet, new CellRangeAddress(1, 4, 1, 1));        // 这是第二个柱状图的数据源        XDDFNumericalDataSource<Double> doubleXDDFNumericalDataSource2 = XDDFDataSourcesFactory.fromNumericCellRange(sheet, new CellRangeAddress(1, 4, 2, 2));        // 把第一组柱状图添加到图表数据里 返回一个系列数据        XDDFChartData.Series series = data.addSeries(xddfCategoryDataSource, doubleXDDFNumericalDataSource);        // 第二组        XDDFChartData.Series series1 = data.addSeries(xddfCategoryDataSource, doubleXDDFNumericalDataSource2);        // 设置第一个系列的名称 上面那个生成图表底部的示例的就是这里 ,第一个指定名称，第二个可以给一个单元格。两个参数可以有一个为null        series.setTitle("A", new CellReference(sheet.getRow(0).getCell(1)));        series1.setTitle("B", new CellReference(sheet.getRow(0).getCell(2)));        // 数据源转为barchart        XDDFBarChartData bar = (XDDFBarChartData)data;        // 这一句是y轴的一个操作，也没懂什么意思，但是没有这个，画的图表会超出画布范围        leftAxis.setCrossBetween(AxisCrossBetween.BETWEEN);        // 是否设置不同的颜色 false就行        bar.setVaryColors(false);        // 柱状图的方向        bar.setBarDirection(BarDirection.COL);        // 柱状图的类型，不是有什么堆积。。。的        bar.setBarGrouping(BarGrouping.STANDARD);        // 可以设置间隙宽度        // bar.setGapWidth(200);        // 开始画图        chart.plot(data);        Rectangle2D.Double rect = new Rectangle2D.Double(700000, 500000, 7000000, 5000000);        // 把柱状图加到幻灯片里，指定画布        slide6.addChart(chart, rect);    } private static void createSlideWithChart(XMLSlideShow ppt, String chartTitle, String[] series, String[] categories, Double[] values1, Double[] values2) {        XSLFSlide slide = ppt.createSlide();        XSLFChart chart = ppt.createChart();        Rectangle2D rect2D = new java.awt.Rectangle(fromCM(1.5), fromCM(4), fromCM(22), fromCM(14));        // 把柱状图加到幻灯片里，指定画布        slide.addChart(chart, rect2D);        setBarData(chart, chartTitle, series, categories, values1, values2);    }     private static void createSlideWithChartOne(XMLSlideShow ppt, String chartTitle, String[] series, String[] categories, Double[] values, int valuesColumn) {        XSLFSlide slide = ppt.createSlide();        XSLFChart chart = ppt.createChart();        Rectangle2D rect2D = new java.awt.Rectangle(fromCM(1.5), fromCM(4), fromCM(22), fromCM(14));        slide.addChart(chart, rect2D);        setDoughnutData(chart, chartTitle, series, categories, values, valuesColumn);    }     private static int fromCM(double cm) {        return (int)(Math.rint(cm * Units.EMU_PER_CENTIMETER));    }     private static void setBarData(XSLFChart chart, String chartTitle, String[] series, String[] categories, Double[] values1, Double[] values2) {         XDDFChartAxis bottomAxis = chart.createCategoryAxis(AxisPosition.BOTTOM);         bottomAxis.setTitle(series[2]);         XDDFValueAxis leftAxis = chart.createValueAxis(AxisPosition.LEFT);        leftAxis.setTitle(series[0] + "," + series[1]);        leftAxis.setCrosses(AxisCrosses.AUTO_ZERO);        leftAxis.setMajorTickMark(AxisTickMark.OUT);        leftAxis.setCrossBetween(AxisCrossBetween.BETWEEN);         final int numOfPoints = categories.length;         final String categoryDataRange = chart.formatRange(new CellRangeAddress(1, numOfPoints, COLUMN_LANGUAGES, COLUMN_LANGUAGES));         final String valuesDataRange = chart.formatRange(new CellRangeAddress(1, numOfPoints, COLUMN_COUNTRIES, COLUMN_COUNTRIES));         final String valuesDataRange2 = chart.formatRange(new CellRangeAddress(1, numOfPoints, COLUMN_SPEAKERS, COLUMN_SPEAKERS));         // 底部类别的数据源        final XDDFDataSource<?> categoriesData = XDDFDataSourcesFactory.fromArray(categories, categoryDataRange, COLUMN_LANGUAGES);         // 这是第一个柱状图的数据源        final XDDFNumericalDataSource<? extends Number> valuesData = XDDFDataSourcesFactory.fromArray(values1, valuesDataRange, COLUMN_COUNTRIES);        valuesData.setFormatCode("General");         values1[6] = 16.0;        // 这是第二个柱状图的数据源        final XDDFNumericalDataSource<? extends Number> valuesData2 = XDDFDataSourcesFactory.fromArray(values2, valuesDataRange2, COLUMN_SPEAKERS);        valuesData2.setFormatCode("General");         // 创建图表数据，第一个指定是什么图表 柱状图或者饼图，折线图都ok，        XDDFBarChartData bar = (XDDFBarChartData)chart.createData(ChartTypes.BAR, bottomAxis, leftAxis);        // 柱状图的类型        bar.setBarGrouping(BarGrouping.CLUSTERED);         // 把第一组柱状图添加到图表数据里 返回一个系列数据        // 设置第一个系列的名称 上面那个生成图表底部的示例的就是这里 ,第一个指定名称，第二个可以给一个单元格。两个参数可以有一个为null        XDDFBarChartData.Series series1 = (XDDFBarChartData.Series)bar.addSeries(categoriesData, valuesData);        series1.setTitle(series[0], chart.setSheetTitle(series[COLUMN_COUNTRIES - 1], COLUMN_COUNTRIES));        // 第二组        XDDFBarChartData.Series series2 = (XDDFBarChartData.Series)bar.addSeries(categoriesData, valuesData2);        series2.setTitle(series[1], chart.setSheetTitle(series[COLUMN_SPEAKERS - 1], COLUMN_SPEAKERS));        // 是否设置不同的颜色 false就行        bar.setVaryColors(true);        // 柱状图的方向        bar.setBarDirection(BarDirection.COL);        // 可以设置间隙宽度        // bar.setGapWidth(200);        // 开始画图        chart.plot(bar);         XDDFChartLegend legend = chart.getOrAddLegend();        legend.setPosition(LegendPosition.LEFT);        legend.setOverlay(false);         chart.setTitleText(chartTitle);        chart.setTitleOverlay(false);        chart.setAutoTitleDeleted(false);    }private static void setDoughnutData(XSLFChart chart, String chartTitle, String[] series, String[] categories, Double[] values, int valuesColumn) {        final int numOfPoints = categories.length;        final String categoryDataRange = chart.formatRange(new CellRangeAddress(1, numOfPoints, COLUMN_LANGUAGES, COLUMN_LANGUAGES));        final String valuesDataRange = chart.formatRange(new CellRangeAddress(1, numOfPoints, valuesColumn, valuesColumn));        final XDDFDataSource<?> categoriesData = XDDFDataSourcesFactory.fromArray(categories, categoryDataRange, COLUMN_LANGUAGES);        final XDDFNumericalDataSource<? extends Number> valuesData = XDDFDataSourcesFactory.fromArray(values, valuesDataRange, valuesColumn);        valuesData.setFormatCode("General");         XDDFDoughnutChartData data = (XDDFDoughnutChartData)chart.createData(ChartTypes.DOUGHNUT, null, null);        XDDFDoughnutChartData.Series series1 = (XDDFDoughnutChartData.Series)data.addSeries(categoriesData, valuesData);        series1.setTitle(series[0], chart.setSheetTitle(series[valuesColumn - 1], valuesColumn));         data.setVaryColors(true);        // data.setHoleSize(42);        // data.setFirstSliceAngle(90);        chart.plot(data);         XDDFChartLegend legend = chart.getOrAddLegend();        legend.setPosition(LegendPosition.LEFT);        legend.setOverlay(false);         chart.setTitleText(chartTitle);        chart.setTitleOverlay(false);        chart.setAutoTitleDeleted(false);    }     private static void createTextList(XMLSlideShow ppt) {        XSLFSlide slide = ppt.createSlide();        XSLFTextBox shape = slide.createTextBox();        shape.setAnchor(new Rectangle(50, 50, 400, 200));         XSLFTextParagraph p1 = shape.addNewTextParagraph();        p1.setIndentLevel(0);        p1.setBullet(true);        XSLFTextRun r1 = p1.addNewTextRun();        r1.setText("r1");         XSLFTextParagraph p2 = shape.addNewTextParagraph();        // 文本前缩进        p2.setLeftMargin(60d);        p2.setIndent(-40d);        p2.setBullet(true);        // 自定义颜色        p2.setBulletFontColor(Color.red);        p2.setBulletFont("Wingdings");        p2.setBulletCharacter("\u0075");        p2.setIndentLevel(1);        XSLFTextRun r2 = p2.addNewTextRun();        r2.setText("Bullet2");         XSLFTextParagraph p3 = shape.addNewTextParagraph();        p3.setBulletAutoNumber(AutoNumberingScheme.alphaLcParenRight, 1);        p3.setIndentLevel(2);        XSLFTextRun r3 = p3.addNewTextRun();        r3.setText("Numbered List Item - 1");         XSLFTextParagraph p4 = shape.addNewTextParagraph();        p4.setBulletAutoNumber(AutoNumberingScheme.alphaLcParenRight, 2);        p4.setIndentLevel(2);        XSLFTextRun r4 = p4.addNewTextRun();        r4.setText("Numbered List Item - 2");         XSLFTextParagraph p5 = shape.addNewTextParagraph();        p5.setBulletAutoNumber(AutoNumberingScheme.alphaLcParenRight, 3);        p5.setIndentLevel(2);        XSLFTextRun r5 = p5.addNewTextRun();        r5.setText("Numbered List Item - 3");         shape.resizeToFitText();    }public static void createTableOne(XMLSlideShow ppt) {        XSLFSlide slide = ppt.createSlide();        XSLFTable tbl = slide.createTable();        tbl.setAnchor(new Rectangle(50, 50, 450, 300));        int numColumns = 3;        int numRows = 5;        XSLFTableRow headerRow = tbl.addRow();        headerRow.setHeight(50);        // header        for (int i = 0; i < numColumns; i++) {            XSLFTableCell th = headerRow.addCell();            XSLFTextParagraph p = th.addNewTextParagraph();            p.setTextAlign(TextParagraph.TextAlign.CENTER);            XSLFTextRun r = p.addNewTextRun();            r.setText("Header " + (i + 1));            r.setBold(true);            r.setFontColor(Color.white);            th.setFillColor(new Color(79, 129, 189));            th.setBorderWidth(TableCell.BorderEdge.bottom, 2.0);            th.setBorderColor(TableCell.BorderEdge.bottom, Color.white);             tbl.setColumnWidth(i, 150); // all columns are equally sized        }        // rows        for (int rownum = 0; rownum < numRows; rownum++) {            XSLFTableRow tr = tbl.addRow();            tr.setHeight(50);            // header            for (int i = 0; i < numColumns; i++) {                XSLFTableCell cell = tr.addCell();                XSLFTextParagraph p = cell.addNewTextParagraph();                XSLFTextRun r = p.addNewTextRun();                 r.setText("Cell " + (i + 1));                if (rownum % 2 == 0) {                    cell.setFillColor(new Color(208, 216, 232));                } else {                    cell.setFillColor(new Color(233, 247, 244));                }            }        }    }     private static void createTable(XMLSlideShow ppt) {        XSLFSlide slide5 = ppt.createSlide();        // 创建文本框        XSLFTextBox textBox4 = slide5.createTextBox();        // x y设置距离 w h 设置大小        textBox4.setAnchor(new Rectangle2D.Double(300, 50, 100, 50));        textBox4.addNewTextParagraph().addNewTextRun().setText("表格测试");        // 渲染的基础数据        Object[][] datas = {{"aaaaa", "", ""}, {"bb", "ccc", "dddd"}, {"A", 1, 2}, {"B", 3, 4}};        // 创建表格        XSLFTable table = slide5.createTable();        // 定位 如果不通过setAnchor()方法指定坐标，则幻灯片中不会显示该文本元素。        table.setAnchor(new Rectangle2D.Double(10, 50, 0, 0));        for (int i = 0; i < datas.length; i++) {            // 创建表格行            XSLFTableRow tableRow = table.addRow();            for (int j = 0; j < datas[i].length; j++) {                // 创建表格单元格                XSLFTableCell tableCell = tableRow.addCell();                XSLFTextParagraph xslfTextRuns = tableCell.addNewTextParagraph();                XSLFTextRun tr = xslfTextRuns.addNewTextRun();                tr.setText(String.valueOf(datas[i][j]));                 tableCell.setFillColor(Color.getColor("0xdd7e6b"));                xslfTextRuns.setTextAlign(TextParagraph.TextAlign.CENTER);                tableCell.setVerticalAlignment(VerticalAlignment.MIDDLE);                 if (i == datas.length - 1 && j == 3 - 1) {                    tr.setFontSize(16D);                    tr.setBold(true);                    tr.setItalic(true);                    tr.setUnderlined(true);                    tr.setFontFamily("\u5b8b\u4f53");                    tr.setFontColor(Color.RED);                }                // 表格宽度 和颜色                tableCell.setBorderWidth(TableCell.BorderEdge.bottom, 1);                tableCell.setBorderWidth(TableCell.BorderEdge.left, 1);                tableCell.setBorderWidth(TableCell.BorderEdge.top, 1);                tableCell.setBorderWidth(TableCell.BorderEdge.right, 1);                 tableCell.setBorderColor(TableCell.BorderEdge.bottom, Color.black);                tableCell.setBorderColor(TableCell.BorderEdge.left, Color.black);                tableCell.setBorderColor(TableCell.BorderEdge.top, Color.black);                tableCell.setBorderColor(TableCell.BorderEdge.right, Color.black);            }            // 每行高度            tableRow.setHeight(30);        }        // 设置列宽        table.setColumnWidth(0, 150);        table.setColumnWidth(1, 150);        table.setColumnWidth(2, 250);        // 合并单元格        table.mergeCells(0, 0, 0, 2);    }

第二种：模板文件

![](https://img-blog.csdnimg.cn/526946c94091441a8d7b66f38b0a2670.png)

 ![](https://img-blog.csdnimg.cn/90a7b87bd8eb4f1384c03ec73f18ac59.png)

 ![](https://img-blog.csdnimg.cn/dcd47aaf9a954f4eb839c952caf27e9a.png)

    private static void createPPTByTemplate() throws Exception {        // 读取模板文件        ClassPathResource resource = new ClassPathResource("ppt-template.pptx");        // 根据模板，创建一个新的ppt文档        XMLSlideShow ppt = new XMLSlideShow(resource.getInputStream());        // 替换模板内容        // 得到每页ppt        List<XSLFSlide> slides = ppt.getSlides();        // 遍历ppt，填充模板        for (int i = 0; i < slides.size(); i++) {            // 遍历每页ppt中待填充的形状组件            String slideName = slides.get(i).getSlideName();            System.out.println(slideName);            for (XSLFShape shape : slides.get(i).getShapes()) {                if (shape instanceof TextShape) {                    // 替换文本                    TextShape textShape = (TextShape) shape;                    TextRun textRun;                    String text = textShape.getText().trim();                    switch (text) {                        case "username":                            textRun = textShape.setText("张三");                            textRun.setFontFamily("宋体(正文)");                            textRun.setFontSize(18.0);                            break;                        case "dates":                            textRun = textShape.setText("2022-10-30");                            textRun.setFontFamily("宋体(正文)");                            textRun.setFontSize(18.0);                            break;                        case "desc":                            textRun = textShape.setText("描述");                            textRun.setFontFamily("宋体(正文)");                            textRun.setFontSize(18.0);                            textRun.setFontColor(Color.green);                            break;                        case "prec":                            textRun = textShape.setText("23%");                            textRun.setFontFamily("宋体(正文)");                            textRun.setFontSize(18.0);                            textRun.setFontColor(Color.red);                            break;                    }                } else if (shape instanceof PictureShape) {                    // 替换图片                    PictureData pictureData = ((PictureShape) shape).getPictureData();                    byte[] bytes = IOUtils.toByteArray(new FileInputStream("./doc/3.png"));                    pictureData.setData(bytes);                } else if (shape instanceof XSLFTable) {                    // 表格                    XSLFTable xslfTable = ((XSLFTable) shape);                    List<XSLFTableRow> rowList = xslfTable.getRows();                    //每一行                    for (int i1 = 0; i1 < rowList.size(); i1++) {                        //每一列                        rowList.get(i1).setHeight(12);                        List<XSLFTableCell> cells = rowList.get(i1).getCells();                        for (int a1 = 0; a1 < cells.size(); a1++) {                            cells.get(a1).setText("cells" + a1);                        }                    }                    //XSLFGraphicFrame                }else if(shape instanceof XSLFGraphicFrame){                    XSLFGraphicFrame xslfGraphicFrame=(XSLFGraphicFrame)shape;                    System.out.println("图形");                }            }        }        // 将新的ppt写入到指定的文件中        FileOutputStream outputStream = new FileOutputStream("./doc/33.pptx");        ppt.write(outputStream);        outputStream.close();     }

**3、EXECL文件**

XLS

XLSX

只能打开xls格式，无法直接打开xlsx格式

可以直接打开xls、xlsx格式

只有65536行、256列

可以有1048576行、16384列

占用空间大

占用空间小，运算速度也会快一点

Excel

POI XLS

POI XLSX(Excel 2007+)

Excel 文件

HSSFWorkbook （xls）

XSSFWorkbook（xlsx）

Excel 工作表

HSSFSheet

XSSFSheet

Excel 行

HSSFRow

XSSFRow

Excel 单元格

HSSFCell

XSSFCell

Excel 单元格样式

HSSFCellStyle

HSSFCellStyle

Excel 颜色

HSSFColor

XSSFColor

Excel 字体

HSSFFont

XSSFFont

1.导入

    /**     * 生成 execl     * @return     */    public static SXSSFWorkbook generateExcelWorkbook() {         SXSSFWorkbook workbook = new SXSSFWorkbook();        Sheet sheet = workbook.createSheet();         int rows = 1;        int cols = 1;        // 表头        Row head = sheet.createRow(rows++);        String[] columns = new String[] {"标题一", "标题二", "标题三", "标题四", "标题五"};        //每行宽度        int[] colWidths = new int[] {5000, 5000, 5000, 5000, 5000};         CellStyle headStyle = workbook.createCellStyle();        // 字体        Font font = workbook.createFont();        font.setBold(true);        headStyle.setFont(font);         // 位置        headStyle.setAlignment(HorizontalAlignment.CENTER);        headStyle.setVerticalAlignment(VerticalAlignment.TOP);         // 设置表格样式        headStyle.setBorderBottom(BorderStyle.THIN);        headStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());        headStyle.setBorderLeft(BorderStyle.THIN);        headStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());        headStyle.setBorderRight(BorderStyle.THIN);        headStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());        headStyle.setBorderTop(BorderStyle.THIN);        headStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());         headStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);         for (int i = 0; i < columns.length; ++i) {            sheet.setColumnWidth(cols, colWidths[i]);            //设置样式            Cell cell = head.createCell(cols++);            cell.setCellStyle(headStyle);            cell.setCellValue(columns[i]);        }        // 设置表格样式        CellStyle contentStyle = workbook.createCellStyle();        // 字体        Font contentFont = workbook.createFont();        contentFont.setBold(true);        contentStyle.setFont(contentFont);         // 位置        contentStyle.setAlignment(HorizontalAlignment.CENTER);        contentStyle.setVerticalAlignment(VerticalAlignment.TOP);         // 设置表格样式        contentStyle.setBorderBottom(BorderStyle.THIN);        contentStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());        contentStyle.setBorderLeft(BorderStyle.THIN);        contentStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());        contentStyle.setBorderRight(BorderStyle.THIN);        contentStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());        contentStyle.setBorderTop(BorderStyle.THIN);        contentStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());         //填充数据        List<Integer> dataList=new ArrayList<>();        for (int i = 0; i < 100; i++) {            dataList.add(i);        }        List<List<Integer>> subList = Lists.partition(dataList, 5);        for (List<Integer> list : subList) {            cols = 1;            Row row = sheet.createRow(rows++);            for (Integer value : list) {                Cell cell = row.createCell(cols++);                cell.setCellStyle(contentStyle);                cell.setCellValue(value);            }        }        return workbook;    }

2.导出

    public static void parseExeclFile(String filePath) throws Exception {        XSSFWorkbook book = new XSSFWorkbook(new FileInputStream(filePath));        XSSFSheet sheet = book.getSheetAt(0);        // 解析数据        int cols;        for (int i = 1; i < sheet.getLastRowNum(); i++) {            // 排除 表头            XSSFRow row = sheet.getRow(i + 1);            cols = 1;            for (int j = 0; j < 5; j++) {                int cellLongValue = Integer.parseInt("" + (int)(row.getCell(cols++)).getNumericCellValue());                System.out.print(cellLongValue);                System.out.print(" ");            }            System.out.println("\n");        }         book.close();    }

测试：

        public static void main(String[] args) throws Exception{         //导入 execl//        SXSSFWorkbook sxssfWorkbook = generateExcelWorkbook();//        sxssfWorkbook.write(new FileOutputStream("./doc/a.xlsx"));//        sxssfWorkbook.dispose();         //解析 execl        parseExeclFile("./doc/a.xlsx");      }

 ![](https://img-blog.csdnimg.cn/3fb5f99638a445a78fd9b03e91b2480d.png)

[Poi官网](https://poi.apache.org/index.html "Poi官网")

[Poi-tl官网](http://deepoove.com/poi-tl/ "Poi-tl官网")

[代码地址](https://gitee.com/zhw123/java-write-frame/tree/master/spring-lean-word "代码地址")返回文档

笔记来源：[尚硅谷 JVM 全套教程，百万播放，全网巅峰（宋红康详解 java 虚拟机）](https://www.bilibili.com/video/BV1PJ411n7xZ)

同步更新：[https://gitee.com/vectorx/NOTE_JVM](https://gitee.com/vectorx/NOTE_JVM)

[https://codechina.csdn.net/qq_35925558/NOTE_JVM](https://codechina.csdn.net/qq_35925558/NOTE_JVM)

[https://github.com/uxiahnan/NOTE_JVM](https://github.com/uxiahnan/NOTE_JVM)

\[toc\]

1\. Class 文件结构

1.1. Class 字节码文件结构

类型

名称

说明

长度

数量

魔数

u4

magic

魔数,识别 Class 文件格式

4 个字节

1

版本号

u2

minor_version

副版本号(小版本)

2 个字节

1

u2

major_version

主版本号(大版本)

2 个字节

1

常量池集合

u2

constant_pool_count

常量池计数器

2 个字节

1

cp_info

constant_pool

常量池表

n 个字节

constant_pool_count - 1

访问标识

u2

access_flags

访问标识

2 个字节

1

索引集合

u2

this_class

类索引

2 个字节

1

u2

super_class

父类索引

2 个字节

1

u2

interfaces_count

接口计数器

2 个字节

1

u2

interfaces

接口索引集合

2 个字节

interfaces_count

字段表集合

u2

fields_count

字段计数器

2 个字节

1

field_info

fields

字段表

n 个字节

fields_count

方法表集合

u2

methods_count

方法计数器

2 个字节

1

method_info

methods

方法表

n 个字节

methods_count

属性表集合

u2

attributes_count

属性计数器

2 个字节

1

attribute_info

attributes

属性表

n 个字节

attributes_count

1.2. Class 文件数据类型

数据类型

定义

说明

无符号数

无符号数可以用来描述数字、索引引用、数量值或按照 utf-8 编码构成的字符串值。

其中无符号数属于基本的数据类型。 以 u1、u2、u4、u8 来分别代表 1 个字节、2 个字节、4 个字节和 8 个字节

表

表是由多个无符号数或其他表构成的复合数据结构。

所有的表都以“\_info”结尾。 由于表没有固定长度，所以通常会在其前面加上个数说明。

1.3. 魔数

Magic Number（魔数）

● 每个 Class 文件开头的 4 个字节的无符号整数称为魔数（Magic Number）  
● 它的唯一作用是确定这个文件是否为一个能被虚拟机接受的有效合法的 Class 文件。即：魔数是 Class 文件的标识符。  
● 魔数值固定为 0xCAFEBABE。不会改变。  
● 如果一个 Class 文件不以 0xCAFEBABE 开头，虚拟机在进行文件校验的时候就会直接抛出以下错误：

​

9

1

2

Error: A JNI error has occurred, please check your installation and try again

Exception in thread "main" java.lang.ClassFormatError: Incompatible magic value 1885430635 in class file StringTest

● 使用魔数而不是扩展名来进行识别主要是基于安全方面的考虑，因为文件扩展名可以随意地改动。

1.4. 文件版本号

紧接着魔数的 4 个字节存储的是 Class 文件的版本号。同样也是 4 个字节。第 5 个和第 6 个字节所代表的含义就是编译的副版本号 minor_version，而第 7 个和第 8 个字节就是编译的主版本号 major_version。

它们共同构成了 class 文件的格式版本号。譬如某个 Class 文件的主版本号为 M，副版本号为 m，那么这个 Class 文件的格式版本号就确定为 M.m。

版本号和 Java 编译器的对应关系如下表：

1.4.1. Class 文件版本号对应关系

主版本（十进制）

副版本（十进制）

编译器版本

45

3

1.1

46

0

1.2

47

0

1.3

48

0

1.4

49

0

1.5

50

0

1.6

51

0

1.7

52

0

1.8

53

0

1.9

54

0

1.10

55

0

1.11

Java 的版本号是从 45 开始的，JDK1.1 之后的每个 JDK 大版本发布主版本号向上加 1。

不同版本的 Java 编译器编译的 Class 文件对应的版本是不一样的。目前，高版本的 Java 虚拟机可以执行由低版本编译器生成的 Class 文件，但是低版本的 Java 虚拟机不能执行由高版本编译器生成的 Class 文件。否则 JVM 会抛出 java.lang.UnsupportedClassVersionError 异常。（向下兼容）

在实际应用中，由于开发环境和生产环境的不同，可能会导致该问题的发生。因此，需要我们在开发时，特别注意开发编译的 JDK 版本和生产环境中的 JDK 版本是否一致。

● 虚拟机 JDK 版本为 1.k（k>=2）时，对应的 class 文件格式版本号的范围为 45.0 - 44+k.0（含两端）。

1.5. 常量池集合

常量池是 Class 文件中内容最为丰富的区域之一。常量池对于 Class 文件中的字段和方法解析也有着至关重要的作用。

随着 Java 虚拟机的不断发展，常量池的内容也日渐丰富。可以说，常量池是整个 Class 文件的基石。

![](/api/filetransfer/images?url=https%3A%2F%2Fgitee.com%2Fvectorx%2FImageCloud%2Fraw%2Fmaster%2Fimg%2F20210508233538.png&sign=32b58c9310ea7a227a398b34da4eda42de30bc86e17cfafb80a5ce047eebf787)

在版本号之后，紧跟着的是常量池的数量，以及若干个常量池表项。

常量池中常量的数量是不固定的，所以在常量池的入口需要放置一项 u2 类型的无符号数，代表常量池容量计数值（constant_pool_count）。与 Java 中语言习惯不一样的是，这个容量计数是从 1 而不是 0 开始的。

类型

名称

数量

u2（无符号数）

constant_pool_count

1

cp_info（表）

constant_pool

constant_pool_count - 1

由上表可见，Class 文件使用了一个前置的容量计数器（constant_pool_count）加若干个连续的数据项（constant_pool）的形式来描述常量池内容。我们把这一系列连续常量池数据称为常量池集合。

● 常量池表项中，用于存放编译时期生成的各种字面量和符号引用，这部分内容将在类加载后进入方法区的运行时常量池中存放

1.5.1. 常量池计数器

constant_pool_count（常量池计数器）

● 由于常量池的数量不固定，时长时短，所以需要放置两个字节来表示常量池容量计数值。  
● 常量池容量计数值（u2 类型）：从 1 开始，表示常量池中有多少项常量。即 constant_pool_count=1 表示常量池中有 0 个常量项。  
●Demo 的值为：

![](/api/filetransfer/images?url=https%3A%2F%2Fgitee.com%2Fvectorx%2FImageCloud%2Fraw%2Fmaster%2Fimg%2F20210508234022.png&sign=2798aebecb8ddeb1e668dd549ccd36dd5c6c01d3e7d5aa7403eea339c7c2c455)

其值为 0x0016，掐指一算，也就是 22。需要注意的是，这实际上只有 21 项常量。索引为范围是 1-21。为什么呢？

通常我们写代码时都是从 0 开始的，但是这里的常量池却是从 1 开始，因为它把第 0 项常量空出来了。这是为了满足后面某些指向常量池的索引值的数据在特定情况下需要表达“不引用任何一个常量池项目”的含义，这种情况可用索引值 0 来表示。

1.5.2. 常量池表

constant_pool 是一种表结构，以 1 ~ constant_pool_count - 1 为索引。表明了后面有多少个常量项。

常量池主要存放两大类常量：字面量（Literal）和符号引用（Symbolic References）

它包含了 class 文件结构及其子结构中引用的所有字符串常量、类或接口名、字段名和其他常量。常量池中的每一项都具备相同的特征。第 1 个字节作为类型标记，用于确定该项的格式，这个字节称为 tag byte（标记字节、标签字节）。

类型

标志(或标识)

描述

CONSTANT_Utf8_info

1

UTF-8 编码的字符串

CONSTANT_Integer_info

3

整型字面量

CONSTANT_Float_info

4

浮点型字面量

CONSTANT_Long_info

5

长整型字面量

CONSTANT_Double_info

6

双精度浮点型字面量

CONSTANT_Class_info

7

类或接口的符号引用

CONSTANT_String_info

8

字符串类型字面量

CONSTANT_Fieldref_info

9

字段的符号引用

CONSTANT_Methodref_info

10

类中方法的符号引用

CONSTANT_InterfaceMethodref_info

11

接口中方法的符号引用

CONSTANT_NameAndType_info

12

字段或方法的符号引用

CONSTANT_MethodHandle_info

15

表示方法句柄

CONSTANT_MethodType_info

16

标志方法类型

CONSTANT_InvokeDynamic_info

18

表示一个动态方法调用点

Ⅰ. 字面量和符号引用

在对这些常量解读前，我们需要搞清楚几个概念。

常量池主要存放两大类常量：字面量（Literal）和符号引用（Symbolic References）。如下表：

常量

具体的常量

字面量

文本字符串

声明为 final 的常量值

符号引用

类和接口的全限定名

字段的名称和描述符

方法的名称和描述符

全限定名

com/atguigu/test/Demo 这个就是类的全限定名，仅仅是把包名的“.“替换成”/”，为了使连续的多个全限定名之间不产生混淆，在使用时最后一般会加入一个“;”表示全限定名结束。

简单名称

简单名称是指没有类型和参数修饰的方法或者字段名称，上面例子中的类的 add()方法和 num 字段的简单名称分别是 add 和 num。

描述符

描述符的作用是用来描述字段的数据类型、方法的参数列表（包括数量、类型以及顺序）和返回值。根据描述符规则，基本数据类型（byte、char、double、float、int、long、short、boolean）以及代表无返回值的 void 类型都用一个大写字符来表示，而对象类型则用字符 L 加对象的全限定名来表示，详见下表：

标志符

含义

B

基本数据类型 byte

C

基本数据类型 char

D

基本数据类型 double

F

基本数据类型 float

I

基本数据类型 int

J

基本数据类型 long

S

基本数据类型 short

Z

基本数据类型 boolean

V

代表 void 类型

L

对象类型，比如：  
Ljava/lang/Object;

\[

数组类型，代表一维数组。比如：`double\[\] is \[D

用描述符来描述方法时，按照先参数列表，后返回值的顺序描述，参数列表按照参数的严格顺序放在一组小括号“()”之内。如方法 java.lang.String tostring()的描述符为()Ljava/lang/String; ，方法 int abc(int\[\]x, int y)的描述符为(\[II)I。

补充说明：

虚拟机在加载 Class 文件时才会进行动态链接，也就是说，Class 文件中不会保存各个方法和字段的最终内存布局信息。因此，这些字段和方法的符号引用不经过转换是无法直接被虚拟机使用的。当虚拟机运行时，需要从常量池中获得对应的符号引用，再在类加载过程中的解析阶段将其替换为直接引用，并翻译到具体的内存地址中。

这里说明下符号引用和直接引用的区别与关联：

● 符号引用：符号引用以一组符号来描述所引用的目标，符号可以是任何形式的字面量，只要使用时能无歧义地定位到目标即可。符号引用与虚拟机实现的内存布局无关，引用的目标并不一定已经加载到了内存中。  
● 直接引用：直接引用可以是直接指向目标的指针、相对偏移量或是一个能间接定位到目标的句柄。直接引用是与虚拟机实现的内存布局相关的，同一个符号引用在不同虚拟机实例上翻译出来的直接引用一般不会相同。如果有了直接引用，那说明引用的目标必定已经存在于内存之中了。

Ⅱ. 常量类型和结构

常量池中每一项常量都是一个表，J0K1.7 之后共有 14 种不同的表结构数据。如下表格所示：

根据上图每个类型的描述我们也可以知道每个类型是用来描述常量池中哪些内容（主要是字面量、符号引用）的。比如: CONSTANT_Integer_info 是用来描述常量池中字面量信息的，而且只是整型字面量信息。

标志为 15、16、18 的常量项类型是用来支持动态语言调用的（jdk1.7 时才加入的）。

细节说明:

●CONSTANT_Class_info 结构用于表示类或接口  
●CONSTAT_Fieldref_info、CONSTAHT_Methodref_infoF 和 lCONSTANIT_InterfaceMethodref_info 结构表示字段、方汇和按口小法  
●CONSTANT_String_info 结构用于表示示 String 类型的常量对象  
●CONSTANT_Integer_info 和 CONSTANT_Float_info 表示 4 字节（int 和 float）的数值常量  
●CONSTANT_Long_info 和 CONSTAT_Double_info 结构表示 8 字作（long 和 double）的数值常量  
○ 在 class 文件的常最池表中，所行的 a 字节常借均占两个表成员（项）的空问。如果一个 CONSTAHT_Long_info 和 CNSTAHT_Double_info 结构在常量池中的索引位 n，则常量池中一个可用的索引位 n+2，此时常量池长中索引为 n+1 的项仍然有效但必须视为不可用的。

●CONSTANT_NameAndType_info 结构用于表示字段或方法，但是和之前的 3 个结构不同，CONSTANT_NameAndType_info 结构没有指明该字段或方法所属的类或接口。  
●CONSTANT_Utf8_info 用于表示字符常量的值  
●CONSTANT_MethodHandle_info 结构用于表示方法句柄  
●CONSTANT_MethodType_info 结构表示方法类型  
●CONSTANT_InvokeDynamic_info 结构表示 invokedynamic 指令所用到的引导方法(bootstrap method)、引导方法所用到的动态调用名称(dynamic invocation name)、参数和返回类型，并可以给引导方法传入一系列称为静态参数（static argument）的常量。

解析方法：

● 一个字节一个字节的解析

● 使用 javap 命令解析：javap-verbose Demo.class 或 jclasslib 工具会更方便。

总结 1：

● 这 14 种表（或者常量项结构）的共同点是：表开始的第一位是一个 u1 类型的标志位（tag），代表当前这个常量项使用的是哪种表结构，即哪种常量类型。  
● 在常量池列表中，CONSTANT_Utf8_info 常量项是一种使用改进过的 UTF-8 编码格式来存储诸如文字字符串、类或者接口的全限定名、字段或者方法的简单名称以及描述符等常量字符串信息。  
● 这 14 种常量项结构还有一个特点是，其中 13 个常量项占用的字节固定，只有 CONSTANT_Utf8_info 占用字节不固定，其大小由 length 决定。为什么呢？因为从常量池存放的内容可知，其存放的是字面量和符号引用，最终这些内容都会是一个字符串，这些字符串的大小是在编写程序时才确定，比如你定义一个类，类名可以取长取短，所以在没编译前，大小不固定，编译后，通过 utf-8 编码，就可以知道其长度。

总结 2：

● 常量池：可以理解为 Class 文件之中的资源仓库，它是 Class 文件结构中与其他项目关联最多的数据类型（后面的很多数据类型都会指向此处），也是占用 Class 文件空间最大的数据项目之一。  
● 常量池中为什么要包含这些内容？Java 代码在进行 Javac 编译的时候，并不像 C 和 C++那样有“连接”这一步骤，而是在虚拟机加载 C1ass 文件的时候进行动态链接。也就是说，在 Class 文件中不会保存各个方法、字段的最终内存布局信息，因此这些字段、方法的符号引用不经过运行期转换的话无法得到真正的内存入口地址，也就无法直接被虚拟机使用。当虚拟机运行时，需要从常量池获得对应的符号引用，再在类创建时或运行时解析、翻译到具体的内存地址之中。关于类的创建和动态链接的内容，在虚拟机类加载过程时再进行详细讲解

1.6. 访问标志

访问标识（access_flag、访问标志、访问标记）

在常量池后，紧跟着访问标记。该标记使用两个字节表示，用于识别一些类或者接口层次的访问信息，包括：这个 Class 是类还是接口；是否定义为 public 类型；是否定义为 abstract 类型；如果是类的话，是否被声明为 final 等。各种访问标记如下所示：

标志名称

标志值

含义

ACC_PUBLIC

0x0001

标志为 public 类型

ACC_FINAL

0x0010

标志被声明为 final，只有类可以设置

ACC_SUPER

0x0020

标志允许使用 invokespecial 字节码指令的新语义，JDK1.0.2 之后编译出来的类的这个标志默认为真。（使用增强的方法调用父类方法）

ACC_INTERFACE

0x0200

标志这是一个接口

ACC_ABSTRACT

0x0400

是否为 abstract 类型，对于接口或者抽象类来说，次标志值为真，其他类型为假

ACC_SYNTHETIC

0x1000

标志此类并非由用户代码产生（即：由编译器产生的类，没有源码对应）

ACC_ANNOTATION

0x2000

标志这是一个注解

ACC_ENUM

0x4000

标志这是一个枚举

类的访问权限通常为 ACC\_开头的常量。

每一种类型的表示都是通过设置访问标记的 32 位中的特定位来实现的。比如，若是 public final 的类，则该标记为 ACC_PUBLIC | ACC_FINAL。

使用 ACC_SUPER 可以让类更准确地定位到父类的方法 super.method()，现代编译器都会设置并且使用这个标记。

补充说明：

1 带有 ACC_INTERFACE 标志的 class 文件表示的是接口而不是类，反之则表示的是类而不是接口。○ 如果一个 class 文件被设置了 ACC_INTERFACE 标志，那么同时也得设置 ACC_ABSTRACT 标志。同时它不能再设置 ACC_FINAL、ACC_SUPER 或 ACC_ENUM 标志。  
○ 如果没有设置 ACC_INTERFACE 标志，那么这个 class 文件可以具有上表中除 ACC_ANNOTATION 外的其他所有标志。当然，ACC_FINAL 和 ACC_ABSTRACT 这类互斥的标志除外。这两个标志不得同时设置。

2 ACC_SUPER 标志用于确定类或接口里面的 invokespecial 指令使用的是哪一种执行语义。针对 Java 虚拟机指令集的编译器都应当设置这个标志。对于 Java SE 8 及后续版本来说，无论 class 文件中这个标志的实际值是什么，也不管 class 文件的版本号是多少，Java 虚拟机都认为每个 class 文件均设置了 ACC_SUPER 标志。○ACC_SUPER 标志是为了向后兼容由旧 Java 编译器所编译的代码而设计的。目前的 ACC_SUPER 标志在由 JDK1.0.2 之前的编译器所生成的 access_flags 中是没有确定含义的，如果设置了该标志，那么 0racle 的 Java 虚拟机实现会将其忽略。

3 ACC_SYNTHETIC 标志意味着该类或接口是由编译器生成的，而不是由源代码生成的。4 注解类型必须设置 ACC_ANNOTATION 标志。如果设置了 ACC_ANNOTATION 标志，那么也必须设置 ACC_INTERFACE 标志。5 ACC_ENUM 标志表明该类或其父类为枚举类型。  
1.7. 类索引、父类索引、接口索引

在访问标记后，会指定该类的类别、父类类别以及实现的接口，格式如下：

长度

含义

u2

this_class

u2

super_class

u2

interfaces_count

u2

interfaces\[interfaces_count\]

这三项数据来确定这个类的继承关系：

● 类索引用于确定这个类的全限定名  
● 父类索引用于确定这个类的父类的全限定名。由于 Java 语言不允许多重继承，所以父类索引只有一个，除了 java.1ang.Object 之外，所有的 Java 类都有父类，因此除了 java.lang.Object 外，所有 Java 类的父类索引都不为 e。  
● 接口索引集合就用来描述这个类实现了哪些接口，这些被实现的接口将按 implements 语句（如果这个类本身是一个接口，则应当是 extends 语句）后的接口顺序从左到右排列在接口索引集合中。

1.7.1. this_class（类索引）

2 字节无符号整数，指向常量池的索引。它提供了类的全限定名，如 com/atguigu/java1/Demo。this_class 的值必须是对常量池表中某项的一个有效索引值。常量池在这个索引处的成员必须为 CONSTANT_Class_info 类型结构体，该结构体表示这个 class 文件所定义的类或接口。

1.7.2. super_class（父类索引）

2 字节无符号整数，指向常量池的索引。它提供了当前类的父类的全限定名。如果我们没有继承任何类，其默认继承的是 java/lang/object 类。同时，由于 Java 不支持多继承，所以其父类只有一个。

super_class 指向的父类不能是 final。

1.7.3. interfaces

指向常量池索引集合，它提供了一个符号引用到所有已实现的接口

由于一个类可以实现多个接口，因此需要以数组形式保存多个接口的索引，表示接口的每个索引也是一个指向常量池的 CONSTANT_Class（当然这里就必须是接口，而不是类）。

Ⅰ. interfaces_count（接口计数器）

interfaces_count 项的值表示当前类或接口的直接超接口数量。

Ⅱ. interfaces\[\]（接口索引集合）

interfaces\[\]中每个成员的值必须是对常量池表中某项的有效索引值，它的长度为 interfaces_count。每个成员 interfaces\[i\]必须为 CONSTANT_Class_info 结构，其中 0 <= i < interfaces_count。在 interfaces\[\]中，各成员所表示的接口顺序和对应的源代码中给定的接口顺序（从左至右）一样，即 interfaces\[0\]对应的是源代码中最左边的接口。

1.8. 字段表集合

fields

用于描述接口或类中声明的变量。字段（field）包括类级变量以及实例级变量，但是不包括方法内部、代码块内部声明的局部变量。

字段叫什么名字、字段被定义为什么数据类型，这些都是无法固定的，只能引用常量池中的常量来描述。

它指向常量池索引集合，它描述了每个字段的完整信息。比如字段的标识符、访问修饰符（public、private 或 protected）、是类变量还是实例变量（static 修饰符）、是否是常量（final 修饰符）等。

注意事项：

● 字段表集合中不会列出从父类或者实现的接口中继承而来的字段，但有可能列出原本 Java 代码之中不存在的字段。譬如在内部类中为了保持对外部类的访问性，会自动添加指向外部类实例的字段。  
● 在 Java 语言中字段是无法重载的，两个字段的数据类型、修饰符不管是否相同，都必须使用不一样的名称，但是对于字节码来讲，如果两个字段的描述符不一致，那字段重名就是合法的。

1.8.1. 字段计数器

fields_count（字段计数器）

fields_count 的值表示当前 class 文件 fields 表的成员个数。使用两个字节来表示。

fields 表中每个成员都是一个 field_info 结构，用于表示该类或接口所声明的所有类字段或者实例字段，不包括方法内部声明的变量，也不包括从父类或父接口继承的那些字段。

标志名称

标志值

含义

数量

u2

access_flags

访问标志

1

u2

name_index

字段名索引

1

u2

descriptor_index

描述符索引

1

u2

attributes_count

属性计数器

1

attribute_info

attributes

属性集合

attributes_count

1.8.2. 字段表

Ⅰ. 字段表访问标识

我们知道，一个字段可以被各种关键字去修饰，比如：作用域修饰符（public、private、protected）、static 修饰符、final 修饰符、volatile 修饰符等等。因此，其可像类的访问标志那样，使用一些标志来标记字段。字段的访问标志有如下这些：

标志名称

标志值

含义

ACC_PUBLIC

0x0001

字段是否为 public

ACC_PRIVATE

0x0002

字段是否为 private

ACC_PROTECTED

0x0004

字段是否为 protected

ACC_STATIC

0x0008

字段是否为 static

ACC_FINAL

0x0010

字段是否为 final

ACC_VOLATILE

0x0040

字段是否为 volatile

ACC_TRANSTENT

0x0080

字段是否为 transient

ACC_SYNCHETIC

0x1000

字段是否为由编译器自动产生

ACC_ENUM

0x4000

字段是否为 enum

Ⅱ. 描述符索引

描述符的作用是用来描述字段的数据类型、方法的参数列表（包括数量、类型以及顺序）和返回值。根据描述符规则，基本数据类型（byte，char，double，float，int，long，short，boolean）及代表无返回值的 void 类型都用一个大写字符来表示，而对象则用字符 L 加对象的全限定名来表示，如下所示：

标志符

含义

B

基本数据类型 byte

C

基本数据类型 char

D

基本数据类型 double

F

基本数据类型 float

I

基本数据类型 int

J

基本数据类型 long

S

基本数据类型 short

Z

基本数据类型 boolean

V

代表 void 类型

L

对象类型，比如：  
Ljava/lang/Object;

\[

数组类型，代表一维数组。比如：`double\[\]\[\]\[\] is \[\[\[D

Ⅲ. 属性表集合

一个字段还可能拥有一些属性，用于存储更多的额外信息。比如初始化值、一些注释信息等。属性个数存放在 attribute_count 中，属性具体内容存放在 attributes 数组中。

说明：对于常量属性而言，attribute_length 值恒为 2。

1.9. 方法表集合

methods：指向常量池索引集合，它完整描述了每个方法的签名。

● 在字节码文件中，每一个 method_info 项都对应着一个类或者接口中的方法信息。比如方法的访问修饰符（public、private 或 protected），方法的返回值类型以及方法的参数信息等。  
● 如果这个方法不是抽象的或者不是 native 的，那么字节码中会体现出来。  
● 一方面，methods 表只描述当前类或接口中声明的方法，不包括从父类或父接口继承的方法。另一方面，methods 表有可能会出现由编译器自动添加的方法，最典型的便是编译器产生的方法信息（比如：类（接口）初始化方法<clinit>()和实例初始化方法<init>()）。

使用注意事项：

在 Java 语言中，要重载（Overload）一个方法，除了要与原方法具有相同的简单名称之外，还要求必须拥有一个与原方法不同的特征签名，特征签名就是一个方法中各个参数在常量池中的字段符号引用的集合，也就是因为返回值不会包含在特征签名之中，因此 Java 语言里无法仅仅依靠返回值的不同来对一个已有方法进行重载。但在 Class 文件格式中，特征签名的范围更大一些，只要描述符不是完全一致的两个方法就可以共存。也就是说，如果两个方法有相同的名称和特征签名，但返回值不同，那么也是可以合法共存于同一个 class 文件中。

也就是说，尽管 Java 语法规范并不允许在一个类或者接口中声明多个方法签名相同的方法，但是和 Java 语法规范相反，字节码文件中却恰恰允许存放多个方法签名相同的方法，唯一的条件就是这些方法之间的返回值不能相同。

1.9.1. 方法计数器

methods_count（方法计数器）

methods_count 的值表示当前 class 文件 methods 表的成员个数。使用两个字节来表示。

methods 表中每个成员都是一个 method_info 结构。

1.9.2. 方法表

methods\[\]（方法表）

methods 表中的每个成员都必须是一个 method_info 结构，用于表示当前类或接口中某个方法的完整描述。如果某个 method_info 结构的 access_flags 项既没有设置 ACC_NATIVE 标志也没有设置 ACC_ABSTRACT 标志，那么该结构中也应包含实现这个方法所用的 Java 虚拟机指令。

method_info 结构可以表示类和接口中定义的所有方法，包括实例方法、类方法、实例初始化方法和类或接口初始化方法

方法表的结构实际跟字段表是一样的，方法表结构如下：

标志名称

标志值

含义

数量

u2

access_flags

访问标志

1

u2

name_index

方法名索引

1

u2

descriptor_index

描述符索引

1

u2

attributes_count

属性计数器

1

attribute_info

attributes

属性集合

attributes_count

方法表访问标志

跟字段表一样，方法表也有访问标志，而且他们的标志有部分相同，部分则不同，方法表的具体访问标志如下：

标志名称

标志值

含义

ACC_PUBLIC

0x0001

public，方法可以从包外访问

ACC_PRIVATE

0x0002

private，方法只能本类访问

ACC_PROTECTED

0x0004

protected，方法在自身和子类可以访问

ACC_STATIC

0x0008

static，静态方法

1.10. 属性表集合

方法表集合之后的属性表集合，指的是 class 文件所携带的辅助信息，比如该 class 文件的源文件的名称。以及任何带有 RetentionPolicy.CLASS 或者 RetentionPolicy.RUNTIME 的注解。这类信息通常被用于 Java 虚拟机的验证和运行，以及 Java 程序的调试，一般无须深入了解。

此外，字段表、方法表都可以有自己的属性表。用于描述某些场景专有的信息。

属性表集合的限制没有那么严格，不再要求各个属性表具有严格的顺序，并且只要不与已有的属性名重复，任何人实现的编译器都可以向属性表中写入自己定义的属性信息，但 Java 虚拟机运行时会忽略掉它不认识的属性。

1.10.1. 属性计数器

attributes_count（属性计数器）

attributes_count 的值表示当前 class 文件属性表的成员个数。属性表中每一项都是一个 attribute_info 结构。

1.10.2. 属性表

attributes\[\]（属性表）

属性表的每个项的值必须是 attribute_info 结构。属性表的结构比较灵活，各种不同的属性只要满足以下结构即可。

属性的通用格式

类型

名称

数量

含义

u2

attribute_name_index

1

属性名索引

u4

attribute_length

1

属性长度

u1

info

attribute_length

属性表

属性类型

属性表实际上可以有很多类型，上面看到的 Code 属性只是其中一种，Java8 里面定义了 23 种属性。下面这些是虚拟机中预定义的属性：

属性名称

使用位置

含义

Code

方法表

Java 代码编译成的字节码指令

ConstantValue

字段表

final 关键字定义的常量池

Deprecated

类，方法，字段表

被声明为 deprecated 的方法和字段

Exceptions

方法表

方法抛出的异常

EnclosingMethod

类文件

仅当一个类为局部类或者匿名类时才能拥有这个属性，这个属性用于标识这个类所在的外围方法

InnerClass

类文件

内部类列表

LineNumberTable

Code 属性

Java 源码的行号与字节码指令的对应关系

LocalVariableTable

Code 属性

方法的局部变量描述

StackMapTable

Code 属性

JDK1.6 中新增的属性，供新的类型检查检验器和处理目标方法的局部变量和操作数有所需要的类是否匹配

Signature

类，方法表，字段表

用于支持泛型情况下的方法签名

SourceFile

类文件

记录源文件名称

SourceDebugExtension

类文件

用于存储额外的调试信息

Synthetic

类，方法表，字段表

标志方法或字段为编译器自动生成的

LocalVariableTypeTable

类

是哟很难过特征签名代替描述符，是为了引入泛型语法之后能描述泛型参数化类型而添加

RuntimeVisibleAnnotations

类，方法表，字段表

为动态注解提供支持

RuntimeInvisibleAnnotations

类，方法表，字段表

用于指明哪些注解是运行时不可见的

RuntimeVisibleParameterAnnotation

方法表

作用与 RuntimeVisibleAnnotations 属性类似，只不过作用对象或方法

RuntimeInvisibleParameterAnnotation

方法表

作用与 RuntimeInvisibleAnnotations 属性类似，只不过作用对象或方法

AnnotationDefault

方法表

用于记录注解类元素的默认值

BootstrapMethods

类文件

用于保存 invokeddynamic 指令引用的引导方法限定符

或者（查看官网）

部分属性详解

① ConstantValue 属性

ConstantValue 属性表示一个常量字段的值。位于 field_info 结构的属性表中。

② Deprecated 属性

Deprecated 属性是在 JDK1.1 为了支持注释中的关键词@deprecated 而引入的。

③ Code 属性

Code 属性就是存放方法体里面的代码。但是，并非所有方法表都有 Code 属性。像接口或者抽象方法，他们没有具体的方法体，因此也就不会有 Code 属性了。Code 属性表的结构，如下图：

类型

名称

数量

含义

u2

attribute_name_index

1

属性名索引

u4

attribute_length

1

属性长度

u2

max_stack

1

操作数栈深度的最大值

u2

max_locals

1

局部变量表所需的存续空间

u4

code_length

1

字节码指令的长度

u1

code

code_lenth

存储字节码指令

u2

exception_table_length

1

异常表长度

exception_info

exception_table

exception_length

异常表

u2

attributes_count

1

属性集合计数器

attribute_info

attributes

attributes_count

属性集合

可以看到：Code 属性表的前两项跟属性表是一致的，即 Code 属性表遵循属性表的结构，后面那些则是他自定义的结构。

④ InnerClasses 属性

为了方便说明特别定义一个表示类或接口的 Class 格式为 C。如果 C 的常量池中包含某个 CONSTANT_Class_info 成员，且这个成员所表示的类或接口不属于任何一个包，那么 C 的 ClassFile 结构的属性表中就必须含有对应的 InnerClasses 属性。InnerClasses 属性是在 JDK1.1 中为了支持内部类和内部接口而引入的，位于 ClassFile 结构的属性表。

⑤ LineNumberTable 属性

LineNumberTable 属性是可选变长属性，位于 Code 结构的属性表。

LineNumberTable 属性是用来描述 Java 源码行号与字节码行号之间的对应关系。这个属性可以用来在调试的时候定位代码执行的行数。

●start_pc，即字节码行号；1ine_number，即 Java 源代码行号。

在 Code 属性的属性表中，LineNumberTable 属性可以按照任意顺序出现，此外，多个 LineNumberTable 属性可以共同表示一个行号在源文件中表示的内容，即 LineNumberTable 属性不需要与源文件的行一一对应。

⑥ LocalVariableTable 属性

LocalVariableTable 是可选变长属性，位于 Code 属性的属性表中。它被调试器用于确定方法在执行过程中局部变量的信息。在 Code 属性的属性表中，LocalVariableTable 属性可以按照任意顺序出现。Code 属性中的每个局部变量最多只能有一个 LocalVariableTable 属性。

●start pc + length 表示这个变量在字节码中的生命周期起始和结束的偏移位置（this 生命周期从头 e 到结尾 10）  
●index 就是这个变量在局部变量表中的槽位（槽位可复用）  
●name 就是变量名  
●Descriptor 表示局部变量类型描述

⑦ Signature 属性

Signature 属性是可选的定长属性，位于 ClassFile，field_info 或 method_info 结构的属性表中。在 Java 语言中，任何类、接口、初始化方法或成员的泛型签名如果包含了类型变量（Type Variables）或参数化类型（Parameterized Types），则 Signature 属性会为它记录泛型签名信息。

⑧ SourceFile 属性

SourceFile 属性结构

类型

名称

数量

含义

u2

attribute_name_index

1

属性名索引

u4

attribute_length

1

属性长度

u2

sourcefile index

1

源码文件素引

可以看到，其长度总是固定的 8 个字节。

⑨ 其他属性

Java 虚拟机中预定义的属性有 20 多个，这里就不一一介绍了，通过上面几个属性的介绍，只要领会其精髓，其他属性的解读也是易如反掌。

​

23 人点赞

- ![大树](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![Eric](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![鲤素](https://cdn.nlark.com/yuque/0/2022/png/25732086/1659075988606-avatar/08ae5ba0-2b17-4b27-b464-daa01e2891c9.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng)
- ![pmj](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![修休](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![ggs](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![刘小強](https://cdn.nlark.com/yuque/0/2020/jpeg/anonymous/1603710597587-068b4c1d-41a7-4a6b-aba3-245d2b5be0a1.jpeg?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng)
- ![香满路](https://cdn.nlark.com/yuque/0/2022/png/21398437/1649648183321-avatar/5bb61107-e550-49b4-87e7-dba20874349c.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng)
- ![总要有个昵称](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![%2](https://cdn.nlark.com/yuque/0/2022/jpeg/anonymous/1644589710447-454d5969-9688-4384-b285-b370ba6dfd4a.jpeg?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng)
- ![小天文](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![whjxnyzhgjl](https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*khrYRYi6VN0AAAAAAAAAAAAADvuFAQ/original)
- ![ZYLer_](https://cdn.nlark.com/yuque/0/2022/jpeg/anonymous/1643083006699-49a5b826-bb86-44ce-97a3-a39c4a842f3f.jpeg?x-oss-process=image%2Fresize%2Cm_fill%2Cw_64%2Ch_64%2Fformat%2Cpng)

23
