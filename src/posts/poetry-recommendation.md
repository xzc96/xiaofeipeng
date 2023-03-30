
## 问chatGPT，在springboot中,如何将查询出的列表数据转换成word文件的表格形式

要将查询出的列表数据转换成Word文件的表格形式，您可以使用Apache POI库，它是一个Java API，用于处理Microsoft Office格式的文件。以下是一个使用Apache POI将查询结果转换为Word文件表格形式的简单示例：

1. 首先，将以下依赖项添加到您的Maven项目中，以使用Apache POI库：
```xml
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi</artifactId>
  <version>5.2.0</version>
</dependency>
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>poi-ooxml</artifactId>
  <version>5.2.0</version>
</dependency>

```
2. 在您的Spring Boot控制器类中，编写一个方法来查询数据并将其转换为Word表格。以下是一个示例方法：

```java
@GetMapping("/data-to-word")
public ResponseEntity<byte[]> getDataAsWord() throws IOException {
    List<MyData> dataList = myDataService.getData(); //从服务层获取数据

    //创建一个新的Word文档
    XWPFDocument document = new XWPFDocument();

    //创建一个新的表格，并指定列数
    XWPFTable table = document.createTable(dataList.size() + 1, 3);

    //设置表格的列宽
    table.getCTTbl().addNewTblGrid().addNewGridCol().setW(BigInteger.valueOf(1500));
    table.getCTTbl().getTblGrid().addNewGridCol().setW(BigInteger.valueOf(3000));
    table.getCTTbl().getTblGrid().addNewGridCol().setW(BigInteger.valueOf(1500));

    //设置表头
    XWPFTableRow headerRow = table.getRow(0);
    headerRow.getCell(0).setText("ID");
    headerRow.getCell(1).setText("Name");
    headerRow.getCell(2).setText("Value");

    //设置表格内容
    for (int i = 0; i < dataList.size(); i++) {
        MyData data = dataList.get(i);
        XWPFTableRow row = table.getRow(i + 1);
        row.getCell(0).setText(String.valueOf(data.getId()));
        row.getCell(1).setText(data.getName());
        row.getCell(2).setText(String.valueOf(data.getValue()));
    }

    //将Word文档保存为字节数组
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    document.write(outputStream);
    byte[] bytes = outputStream.toByteArray();

    //设置响应头信息，告诉浏览器返回的是Word文件
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDisposition(ContentDisposition.attachment().filename("data.docx").build());

    //返回字节数组和响应头信息
    return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
}

```
在此示例中，我们从数据服务层获取数据，使用XWPFDocument创建一个新的Word文档，然后使用createTable创建一个新的表格，并为其指定列数和列宽。接下来，我们将表头添加到第一行，将查询结果添加到表格的其余行中。最后，将Word文档保存为字节数组，并使用ResponseEntity将其作为响应发送回浏览器。
