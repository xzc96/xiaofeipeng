---
title:  SpringBoot常见面试题总结
category: 框架
tag:
  - Spring
---

::: tip

原始官网（推荐）：https://spring.io/projects/spring-boot     
中文官网：https://springref.com/docs/index/spring-boot    
更多详解（很不错）：https://pdai.tech/md/spring/springboot/springboot.html

慕课教程（建议先看完这个）：https://www.imooc.com/wiki/springbootlesson/origin.html
:::


## 1. 简单介绍⼀下 Spring?有啥缺点?
Spring 是重量级企业开发框架**Enterprise JavaBean（EJB）** 的替代品，
Spring 为企业级 Java 开发提供了⼀种相对简单的⽅法，通过**依赖注⼊** 和 **⾯向
切⾯编程** ，⽤简单的 Java 对象（Plain Old Java Object，POJO） 实现了 EJB
的功能。  

**虽然 Spring 的组件代码是轻量级的，但它的配置却是重量级的（需要⼤量 XML
配置） 。**  

为此，Spring 2.5 引⼊了基于注解的组件扫描，这消除了⼤量针对应⽤程序⾃身
组件的显式 XML 配置。Spring 3.0 引⼊了基于 Java 的配置，这是⼀种类型安全
的可重构配置⽅式，可以代替 XML。  

尽管如此，我们依旧没能逃脱配置的魔⽖。开启某些 Spring 特性时，⽐如事务
管理和 Spring MVC，还是需要⽤ XML 或 Java 进⾏显式配置。启⽤第三⽅库时
也需要显式配置，⽐如基于 Thymeleaf 的 Web 视图。配置 Servlet 和过滤器
（⽐如 Spring 的 `DispatcherServlet` ）同样需要在 web.xml 或 Servlet 初始
化代码⾥进⾏显式配置。组件扫描减少了配置量，Java 配置让它看上去简洁不
少，但 Spring 还是需要不少配置。  

光配置这些 XML ⽂件都够我们头疼的了，占⽤了我们⼤部分时间和精⼒。除此
之外，相关库的依赖⾮常让⼈头疼，不同库之间的版本冲突也⾮常常⻅。

## 2. 为什么要有 SpringBoot?

Spring 旨在简化 J2EE 企业应⽤程序开发。Spring Boot 旨在简化 Spring 开发
（减少配置⽂件，开箱即⽤！）。  

![](./images/spring-boot01.png)  


## 3. 说出使⽤ Spring Boot 的主要优点
1. 开发基于 Spring 的应⽤程序很容易。
2. Spring Boot 项⽬所需的开发或⼯程时间明显减少，通常会提⾼整体⽣产
   ⼒。
3. Spring Boot 不需要编写⼤量样板代码、XML 配置和注释。
4. Spring 引导应⽤程序可以很容易地与 Spring ⽣态系统集成，如 Spring
   JDBC、Spring ORM、Spring Data、Spring Security 等。
5. Spring Boot 遵循“固执⼰⻅的默认配置”，以减少开发⼯作（默认配置可以
   修改）。
6. Spring Boot 应⽤程序提供嵌⼊式 HTTP 服务器，如 Tomcat 和 Jetty，可以
   轻松地开发和测试 web 应⽤程序。（这点很赞！普通运⾏ Java 程序的⽅式
   就能运⾏基于 Spring Boot web 项⽬，省事很多）
7. Spring Boot 提供命令⾏接⼝(CLI)⼯具，⽤于开发和测试 Spring Boot 应⽤
   程序，如 Java 或 Groovy。
8. Spring Boot 提供了多种插件，可以使⽤内置⼯具(如 Maven 和 Gradle)开发
   和测试 Spring Boot 应⽤程序。

## 4. 什么是 Spring Boot Starters?
Spring Boot Starters 是⼀系列依赖关系的集合，因为它的存在，项⽬的依赖之
间的关系对我们来说变的更加简单了。    

举个例⼦：在没有 Spring Boot Starters 之前，我们开发 REST 服务或 Web 应
⽤程序时; 我们需要使⽤像 Spring MVC，Tomcat 和 Jackson 这样的库，这些依
赖我们需要⼿动⼀个⼀个添加。但是，有了 Spring Boot Starters 我们只需要⼀
个只需添加⼀个spring-boot-starter-web⼀个依赖就可以了，这个依赖包含的
⼦依赖中包含了我们开发 REST 服务需要的所有依赖。

## 5. Spring Boot ⽀持哪些内嵌 Servlet 容器？

Spring Boot ⽀持以下嵌⼊式 Servlet 容器:
| Name                 | Servlet   |        Version    |          | 
| :------------------- | -------- | ---------- | -------- |
| Tomcat | 9.0 | 4.0 | -------- |
| Jetty | 9.4 | 3.1 | -------- |
| Undertow | 2.0 | 4.0 | -------- |

您还可以将 Spring 引导应⽤程序部署到任何 Servlet 3.1+兼容的 Web 容器中。   

这就是你为什么可以通过直接像运⾏ 普通 Java 项⽬⼀样运⾏ SpringBoot 项
⽬。这样的确省事了很多，⽅便了我们进⾏开发，降低了学习难度。  


## 6. 如何在 Spring Boot 应⽤程序中使⽤ Jetty ⽽不是 Tomcat?
Spring Boot （ spring-boot-starter-web ）使⽤ Tomcat 作为默认的嵌⼊
式 servlet 容器, 如果你想使⽤ Jetty 的话只需要修改 pom.xml (Maven)或者 bu
ild.gradle (Gradle)就可以了。
Maven：
```xml
 <!-- SpringBoot Web容器 -->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
   <!-- 使用Jetty，需要在spring-boot-starter-web排除spring-boot-starter-tomcat，因为SpringBoot默认使用tomcat -->
   <exclusions>
      <exclusion>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-tomcat</artifactId>
      </exclusion>
   </exclusions>
</dependency>

        <!-- Jetty适合长连接应用，就是聊天类的长连接 -->
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-jetty</artifactId>
</dependency>


```

application.yml配置:
配置方面，保持之前的内容即可。server.port和server.servlet.context-path的配置不变。
```xml
server:
  port: XXX
  servlet:
      context-path: /xxxx

  #jetty配置，主要是acceptors和selectors
  jetty:
    acceptors: 2
    selectors: 4

  #tomcat的配置可以保留，切换回来可用，反正不会生效
  tomcat:
    # tomcat的URI编码
    uri-encoding: UTF-8
    # 连接数满后的排队数，默认为100
    accept-count: 1000
    threads:
    # tomcat最大线程数，默认为200
    max: 800
    # Tomcat启动初始化的线程数，默认值10
    min-spare: 100
```

application.properties配置
如果properties可以配置如下:
```properties

####Jetty properties########
server.jetty.acceptors=2 # acceptor线程数
server.jetty.max-http-post-size=0 # put或post方法最大字节数
server.jetty.selectors=4 # selector线程数
```

## 7. 介绍⼀下@SpringBootApplication 注解
@SpringBootApplication 点进去，源码：
```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {
    @AliasFor(
        annotation = EnableAutoConfiguration.class
    )
    Class<?>[] exclude() default {};

    @AliasFor(
        annotation = EnableAutoConfiguration.class
    )
    String[] excludeName() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "basePackages"
    )
    String[] scanBasePackages() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "basePackageClasses"
    )
    Class<?>[] scanBasePackageClasses() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "nameGenerator"
    )
    Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    @AliasFor(
        annotation = Configuration.class
    )
    boolean proxyBeanMethods() default true;
}

```

可以看出⼤概可以把 @SpringBootApplication 看作是
@Configuration 、 @EnableAutoConfiguration 、 @ComponentScan
注解的集合。根据 SpringBoot 官⽹，这三个注解的作⽤分别是：
- @EnableAutoConfiguration ：启⽤ SpringBoot 的⾃动配置机制
- @ComponentScan ： 扫描被 @Component ( @Service , @Controller)注解的 bean，注解默认会扫描该类所在的包下所有的类。
- @Configuration ：允许在上下⽂中注册额外的 bean 或导⼊其他配置类
- @Target({ElementType.TYPE}) ： 指示注释类型适用的上下文。用于定义注解的使用位置，如果没有该项，表示注解可以用于任何地方
- @Retention(RetentionPolicy.RUNTIME)：  用于指明修饰的注解的生存周期，即会保留到哪个阶段
- @Documented ：指明修饰的注解，可以被例如javadoc此类的工具文档化，只负责标记，没有成员取值。
- @Inherited：用于标注一个父类的注解是否可以被子类继承，如果一个注解需要被其子类所继承，则在声明时直接使用@Inherited注解即可。如果没有写此注解，则无法被子类继承。


## 8. Spring Boot 的⾃动配置是如何实现的?

这个是因为 `@SpringBootApplication` 注解的原因，在上⼀个问题中已经提 到了这个注解。我们知道  `@SpringBootApplication` 看作是 ` @Configuration`、` @EnableAutoConfiguration` 、 `@ComponentScan` 注解的集合

- @EnableAutoConfiguration ：启⽤ SpringBoot 的⾃动配置机制
- @ComponentScan ： 扫描被 @Component ( @Service , @Controller )注解的 bean，注解默认会扫描该类所在的包下所有的类。
- @Configuration ：允许在上下⽂中注册额外的 bean 或导⼊其他配置类

@EnableAutoConfiguration 是启动⾃动配置的关键，源码如下(建议⾃⼰打 断点调试，⾛⼀遍基本的流程)：
@EnableAutoConfiguration 注解通过 Spring 提供的  @Import 注解导⼊了 AutoConfigurationImportSelector 类（ @Import 注解可以导⼊配置 类或者`Bean` 到当前类中）。

AutoConfigurationImportSelector 类中 getCandidateConfigurations ⽅法会将所有⾃动配置类的信息以 List 的形式返回。这些配置信息会被 Spring容器作 bean 来管理。

⾃动配置信息有了，那么⾃动配置还差什么呢？
