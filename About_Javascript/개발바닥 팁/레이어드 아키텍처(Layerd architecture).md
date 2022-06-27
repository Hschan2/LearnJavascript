# 레이어드 아키텍처(Layerd architecture)

## 레이어드 아키텍처가 사용되는 이유
웹 페이지를 개발할 때 중복하여 개발되는 요소가 존재한다. 즉, 다른 페이지지만 같은 부분을 사용하는 개발이 존재한다. 페이지마다 중복하여 코드를 입력하는 것을 보완하기 위해 레이어드 아키텍처를 사용하게 되었다.   

## Controller에서 중복되는 부분을 처리하기
Controller에서 중복되는 부분을 처리하기 위해서는 아래의 방법이 존재한다.   

* 별도의 객체로 분리하기
* 중복된 부분을 별도의 메서드로 분리하기
* 예. 쇼핑몰에서 게시판에서도 회원정보를 보여주고, 상품 목록 보기에서도 회원 정보를 보여줘야한다면 회원 정보를 읽어오는 코드는 어떻게 할까?
    * 회원 정보를 읽어들이는 것만 별도의 객체로 만들고 게시판과 회원 정보 Controller가 이 객체를 이용   

Controller들이 중복적으로 호출하는 부분들은 별도의 객체인 Service로 구현하며, Service 객체는 비즈니스 메서드를 갖는다. (업무와 관련된 메서드: 비즈니스 메서드)   

## 서비스 객체
* 비즈니스 로직을 수행하는 메서드를 가지고 있는 객체
* 보통 하나의 비즈니스 로직은 하나의 트랜잭션으로 동작 (하나의 트랜잭션에는 여러 개의 DB 작업이 수행될 수 있음)
* 서비스 객체에서 중복으로 호출되는 코드의 처리
    * 데이터 엑세스 메소드를 별도의 Repository(Dao) 객체에서 구현하도록 하고, Service는 Repository 객체를 사용   

### 트랜잭션
* 하나의 논리적인 작업을 의미
* 트랜잭션의 특징
    * 원자성(Atomicity)
    * 일관성(Consistency)
    * 독립성(Isolation)
    * 지속성(Durability)   

#### 원자성(Atomicity)
* 전체가 성공하거나 전체가 실패하는 것을 의미
* 예. 출금 기능
    * 잔액을 조회
    * 출금 금액이 잔액보다 작은지 검사
    * 출금 금액이 잔액보다 작다면 (잔액 - 출금액)으로 수정
    * 언제, 어디서 출금했는지 정보 기록
    * 사용자에게 출금   

위에서 하나의 작업이 실패한다면 모두 원래대로 복원시켜야 한다. 이를 <b>롤백(Rollback)</b>이라고 한다. 모든 작업이 제대로 수행되었을 때는 정보를 모두 반영한다. 이를 <b>커밋(Commit)</b>이라고 한다.   

#### 일관성(Consistency)
트랜잭션의 작업 처리 결과가 항상 일관성이 있어야 한다. 트랜잭션 진행 중 업데이트된 데이터로 진행되는 것이 아닌 처음에 참조한 데이터로 진행된다.   

#### 독립성(Isolation)
둘 이상의 트랜잭션이 동시에 병행 실행되고 있을 경우, 어느 하나의 트랜잭션이라도 다른 트랜잭션 연산에 끼어들 수 없다. 하나의 트랜잭션이 완료될 때까지, 다른 트랜잭션이 특정 트랜잭션의 결과를 참조할 수 없다.   

#### 지속성(Durability)
트랜잭션이 성공적으로 완료되었을 경우, 결과는 영구적으로 반영되어야 한다.   

## JDBC 프로그래밍엥서 트랜잭션 처리 방법
* DB 연결된 후, Connection 객체의 setAutoCommit 메서드에 flase를 파라미터로 지정 (Default: true)
* 입력, 수정, 삭제 SQL을 실행한 후, 모두 성공했을 경우 Connection이 가지고 있는 commit() 메서드를 호출   

## @EnableTransactionManagement
* Spring Java Config 파일에서 트랜잭션을 활성화할 때 사용하는 애노테이션
* Java Config를 사용하게 되면 PlatformTransactionManager 구현체를 모두 찾아서 그 중 하나를 매핑해 사용
* 특정 트랜잭션 매니저를 사용하고자 한다면 TransactionManagementConfigurer를 Java Config 파일에서 구현하고 원하는 트랜잭션 매니저를 리턴
* 혹은, 특정 트랜잭션 매니저 객체를 생성 시 @Primary 애노테이션을 지정
* Presentation Layer에서는 Controller 객체가 동작
* Service Layer에서는 비즈니스 메서드를 가지고 있는 Service 객체가 동작
* Service 객체는 Repository Layer에 있는 Dao 객체(DB에 접근해 데이터를 가져오는 등의 일들만 수행)를 사용
* Presentation Layer를 다른 것으로 바꿔도, Service Layer와 Repository Layer는 재사용 가능
* 재사용과 유지보수 면에서 Presentation Layer와 Service/Repository Layer는 설정 파일도 분리하는 것이 효율적   

### 설정의 분리
* Presentation Layer와 Service/Repository Layer의 Spring 설정 파일 분리 가능
* web.xml 파일에서 Presentation Layer에 대한 Spring 설정은 DispatcherServlet이 읽도록 하고, 그 외 설정은 ContextLoaderListener을 통해 읽도록 함
* DispatcherServlet을 경우에 따라 2개 이상 설정 가능. 이 경우, 각각 DispatcherServlet의 ApplicationContext가 각각 독립적이기 때문에 각각의 설정 파일에서 생성한 Bean을 서로 사용 불가능
* 위 같은 경우, 동시에 필요한 Bean은 ContextLoaderListener를 사용하여 공통으로 사용하게 가능
* ContextLoaderListener와 DispatcherServlet은 각각 ApplicationContext를 생성. ContextLoaderListener가 생성하는 ApplicationContext가 root컨텍스트가 되고 DispatcherServlet이 생성한 인스턴스는 root컨텍스트를 부모로 하는 컨텍스트 됨 (자식 컨텍스트들은 root컨텍스트의 설정 bean을 사용 가능)

[레이어드 아키텍처란?](https://codingnotes.tistory.com/34)