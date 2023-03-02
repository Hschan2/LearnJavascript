# 데이터베이스 SQL 쿼리 기본 지식

## Where과 Having의 차이
* Where
```
SELECT * FROM 테이블 WHERE 조건절;
```

<b>Where</b>절은 기본적인 조건절로 항상 FROM 뒤에 위치하며 다양한 비교 연산자로 구체적인 조건을 줄 수 있다.

* Having
```
SELECT * 
FROM 테이블 
GROUP BY 필드 
HAVING 조건절;
```

<b>Having</b>절은 항상 

```GROUP BY```절 뒤에 위치하며 ```WHERE```절과 마찬가지로 다양한 비교 연산자로 조건을 줄 수 있다.

두 조건절은 모두 필드에 조건을 줄 수 있다는 것은 동일하지만, ```WHERE```절은 기본적으로 모든 필드에 조건을 줄 수 있지만 ```HAVING```절은 ```GROUP BY```로 그룹화된 필드에 조건을 줄 수 있다는 차이점이 존재한다. 또한, ```HAVING```절에서 조건을 줄 필드는 ```SELECT```문에 반드시 명시되어 있어야 한다.   

물론, 두 조건절을 동시에 사용할 수 있다.
```
SELECT * 
FROM 테이블명 
WHERE 조건절
GROUP BY 컬럼 
HAVING 조건절;
```

정리하자면,   

* WHERE절
    * 그룹화 또는 집계가 발생하기 전에 레코드를 필터링할 때 사용
    * 개별 행에 조건 적용 가능
    * 단일 테이블에서 데이터를 가져오거나 여러 테이블과 결합하여 조건 지정에 사용되는 SQL절
    * 행을 필터링할 때 사용
    * HAVE절에 포함된 하위 쿼리에 있지않으면 집계함수와 사용 불가 (COUNT, MIN, MAX, SUM, AVG, ...)
    * GROUP BY절 앞에 사용
* GROUP절
    * 그룹화 또는 집계가 발생한 후 레코드를 필터링할 때 사용
    * 그룹 전체인 그룹을 나타내는 결과 집합의 행에만 적용
    * SELECT문이 집계값이 지정된 조건을 충족하는 행만 반환하도록 지정하는 SQL절
    * 그룹을 필터링할 때 사용
    * 집계 함수와 함께 사용 가능
    * GROUP BY절 뒤에 사용   

## JOIN (INNER JOIN, LEFT JOIN, RIGHT JOIN, ...)
<b>JOIN(결합, 조인)</b>은 2개 이상의 다른 테이블을 결합시키는 것을 의미한다. JOIN을 하기 위해서는 반드시 <b>공통열(Key) 값</b>이 있어야 한다.   

### INNER JOIN
<b>INNER JOIN</b>은 교집합을 의미하며, 이를 사용하는 경우에는 두 테이블의 공통값이 매칭되는 데이터만 조회된다.   

```
SELECT * 
FROM [MEMBER] A 
INNER JOIN [ORDER] B 
ON A.mem_no = B.mem_no
```

위의 예제로, [MEMBER]와 [ORDER]의 2개의 테이블 모두에 존재하는 ```mem_no```의 데이터만 조회된다.   

### OUTER JOIN
<b>OUTER JOIN</b>은 합집합을 의미하며, 두 테이블 간의 공통값으로 매칭되는 값뿐만 아니라 매칭되지 않는 데이터까지 조회가 된다. OUTER JOIN에는 <b>LEFT JOIN</b>, <b>RIGHT JOIN</b>, <b>FULL JOIN</b>있다.   

LEFT JOIN은 좌측 테이블 기준으로 우측 테이블과 결합을 하는 것이고, RIGHT JOIN은 우측 테이블을 기준으로 좌측 테이블과 결합하는 것이다.   

FULL JOIN은 좌측 테이블과 우측 테이블의 모든 부분이 결합되는 것이다. 공통되는 부분이 없어도 모든 데이터를 조회한다.   

가장 많이 쓰이는 것은 <b>LEFT JOIN</b>이다. 가장 중요한 테이블을 A로 두고 LEFT JOIN으로 필요한 테이블들(B, C, D, ...)등을 결합하는 경우가 많다.   

* LEFT JOIN
```
SELECT * 
FROM [MEMBER] A 
LEFT JOIN [ORDER] B 
ON A.mem_no = B.mem_no
```

여기서 중요한 것은 A 테이블을 기준으로 LEFT JOIN를 하는 경우, A 테이블은 FROM 절에 쓰이고 LEFT JOIN 절에는 B를 작성해야 한다.   

위의 예제로, [MEMBER] 테이블에 있는 데이터는 모두 저장하고, [ORDER] 테이블에는 없는 데이터라도 이 값은 NULL로 가져다 붙게 된다. 즉, 가입은 되어 있지만 주문은 하지 않는 경우에 NULL로 출력된다.   

* RIGHT JOIN
```
SELECT * 
FROM [MEMBER] A 
RIGHT JOIN [ORDER] B 
ON A.mem_no = B.mem_no
```

LEFT JOIN과 반대로 [ORDER] 테이블의 모든 데이터를 저장하고, [MEMBER] 테이블엥는 없는 데이터라도 NULL로 가져다 붙는다. 즉, 가입은 되어 있지 않지만 주문은 한 비회원 주문과 같은 경우이다.   

* FULL JOIN
```
SELECT * 
FROM [MEMBER] A 
FULL JOIN [ORDER] B 
ON A.mem_no = B.mem_no
```

FULL JOIN의 경우에는 [MEMBER] 테이블과 [ORDER] 테이블 모든 부분이 결합되어 조회된다. (만약 비회원 주문이 비활성화라면, LEFT JOIN과 같은 출력앖이 나온다.)   

## CROSS JOIN & SELF JOIN
자주 사용하지 않는 JOIN 기법이지만, 알아두는 것이 좋다.   

### CROSS JOIN
<b>CROSS JOIN</b>은 두 테이블 A, B가 있을 때 이를 1개 행씩 결합하는 조인이다. 즉, 테이블 A의 행 1개가 테이블 B의 모든 행의 하나씩 결합된다. 예를 들어, A 테이블에 1개의 행이, B 테이블에 5개의 행이 있으면 1 * 5로 5번 조인한다. 또는, A 테이블에 2개의 행이, B 테이블에 3개의 행이 있으면 2 * 3로 6번 조인한다.   

```
SELECT * 
FROM [MEMBER] A 
CROSS JOIN [ORDER] B 
WHERE A.mem_no = '1000001'
```

위의 예제는 [MEMBER] 테이블이 좌측, [ORDER] 테이블이 우측으로 결합된 경우이다. [MEMBER] 테이블은 ```mem_no```가 모두 '1000001'이며, [ORDER] 테이블의 ```mem_no```는 다양하게 있다. 그 이유는 좌측 [MEMBER] 테이블에서 ```mem_no```가 '1000001'인 것만, 우측 [ORDER] 테이블은 전체가 결합되었기 때문이다.   

### SELF JOIN
<b>SELF JOIN</b>은 자기 자신의 테이블에 대해 1개 행씩 결합하는 조인이다. 즉, 테이블 A에 1개의 행이 테이블 A의 모든 행에 하나씩 결합되는 것이다. 이 경우에는 테이블 A의 특정 행만 하나 뽑고, 이에 대해 A의 모든 행에 매칭시킨다. 예를 들어, 특정 행 1개와 A의 행 100개가 있으면 1 * 100으로 100번 조인된다.   

```
SELECT * 
FROM [MEMBER] A, [MEMBER] B 
WHERE A.mem_no = '1000001'
```

SELF JOIN은 다른 경우와는 특별한 방법이다. 다른 방법은 모두 ```~ JOIN```으로 사용하는 것과 달리 SELF JOIN은 FROM절에 자기 자신의 테이블을 2개 사용한다.   

좌측은 [MEMBER] 테이블의 ```mem_no```가 '1000001'인 것만, 우측은 [ORDER] 테이블 전체가 결합된다.   

## 복습
* [ORDER] 테이블을 기준으로 [MEMBER] 테이블을 LEFT JOIN
```
SELECT * 
FROM [ORDER] A 
LEFT JOIN [MEMBER] B 
ON A.mem_no = B.mem_no
```

* 위의 LEFT JOIN 결과를 이용해서 [gender] 컬럼별로 [sales_amt] 컬럼의 합계 구하기 (SUM(sales_amt)의 이름은 tot_amt로 할 것)
```
SELECT B.gender AS gender, SUM(A.sales_amt) AS tot_amt 
FROM [ORDER] A 
LEFT JOIN [MEMBER] B 
ON A.mem_no = B.mem_no 
GROUP BY B.gender
```

* 1번 LEFT JOIN 결과를 이용해서 [gender]와 [addr]의 컬럼별로 [sales_amt] 컬럼의 합계 구하기 (SUM(sales_amt)의 이름은 tot_amt로 할 것)
```
SELECT B.gender AS gender, B.addr AS addr, SUM(A.sales_amt) AS tot_amt 
FROM [ORDER] A 
LEFT JOIN [MEMBER] B 
ON A.mem_no = B.mem_no 
GROUP BY B.gender, B.addr
```