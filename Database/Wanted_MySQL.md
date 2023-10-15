# 원티드 프리온보딩 10월 백엔드 챌린지 MySQL
## WHERE
```
SELECT * 
FROM salaries 
WHERE from_date = '1990-01-01';

SELECT * 
FROM salaries 
WHERE from_date > '2000-01-01';

SELECT * 
FROM salaries 
WHERE from_date BETWEEN '1995-01-01' AND '2000-12-31';

SELECT * 
FROM salaries 
WHERE MONTH(from_date) = 6 AND YEAR(from_date) = 1999;

SELECT * 
FROM salaries 
WHERE from_date >= CURDATE() - INTERVAL 30 DAY;
```

## GROUP BY
```
SELECT gender, COUNT(*) as num_employees
FROM employees
GROUP BY gender;

SELECT dept_no, COUNT(emp_no) as num_employees
FROM dept_emp
GROUP BY dept_no WITH ROLLUP;

SELECT 
	dept_no, COUNT(*) 
AS emp_count 
FROM dept_emp 
GROUP BY dept_no;

SELECT 
    dept_no,
    SUM(CASE WHEN hire_date < '2000-01-01' THEN 1 ELSE 0 END) AS hired_before_2000,
    SUM(CASE WHEN hire_date >= '2000-01-01' THEN 1 ELSE 0 END) AS hired_after_2000
FROM 
    (SELECT e.emp_no, e.hire_date, de.dept_no 
     FROM employees e 
     JOIN dept_emp de ON e.emp_no = de.emp_no) AS derived_table
GROUP BY dept_no;

SELECT 
	SUM(CASE WHEN dept_no='d001' THEN emp_count ELSE 0 END) AS COUNT_d001,
	SUM(CASE WHEN dept_no='d002' THEN emp_count ELSE 0 END) AS COUNT_d002,  
	SUM(CASE WHEN dept_no='d003' THEN emp_count ELSE 0 END) AS COUNT_d003,
	SUM(CASE WHEN dept_no='d004' THEN emp_count ELSE 0 END) AS COUNT_d004,  
	SUM(CASE WHEN dept_no='d005' THEN emp_count ELSE 0 END) AS COUNT_d005
FROM (
	SELECT dept_no, COUNT(*) AS emp_count FROM dept_emp GROUP BY dept_no
) tb_derived;
```

## DISTINCT 
```
SELECT DISTINCT hire_date
FROM employees
ORDER BY hire_date;

SELECT salary, COUNT(DISTINCT emp_no) as num_employees
FROM salaries
GROUP BY salary
ORDER BY num_employees DESC;
```

## ORDER BY
```
SELECT first_name, last_name FROM employees ORDER BY last_name;
SELECT first_name, last_name FROM employees ORDER BY 2;
SELECT first_name, last_name FROM employees ORDER BY "last_name";

SELECT emp_no, first_name, last_name, hire_date
FROM employees
ORDER BY hire_date DESC;

SELECT emp_no, first_name, last_name
FROM employees
ORDER BY last_name ASC, first_name ASC;

SELECT emp_no, AVG(salary) AS avg_salary
FROM salaries
GROUP BY emp_no
ORDER BY avg_salary DESC;

SELECT emp_no, first_name
FROM employees
ORDER BY LENGTH(first_name) DESC;
```

## LIMIT 
```
SELECT * FROM employees
ORDER BY emp_no
LIMIT 10;

SELECT * FROM employees
ORDER BY emp_no
LIMIT 20, 10;

SELECT gender, COUNT(emp_no) as count
FROM employees
GROUP BY gender
LIMIT 2;

SELECT DISTINCT hire_date 
FROM employees
LIMIT 10;

SELECT YEAR(hire_date) as hiring_year, COUNT(emp_no) as hire_count
FROM employees
GROUP BY YEAR(hire_date)
HAVING hire_count > 10
LIMIT 5;

SELECT e.emp_no, e.first_name, e.last_name, s.salary
FROM employees e
JOIN salaries s ON e.emp_no = s.emp_no
LIMIT 10;
```

## JOIN
- INNER JOIN
```
SELECT e.emp_no, e.first_name, s.salary
FROM employees e
INNER JOIN salaries s ON e.emp_no = s.emp_no;
```

- LEFT OUTER JOIN
```
SELECT e.emp_no, e.first_name, e.last_name, de.dept_no, d.dept_name
FROM employees e
LEFT JOIN dept_emp de ON e.emp_no = de.emp_no
LEFT JOIN departments d ON de.dept_no = d.dept_no
LIMIT 10;

SELECT e.*, d.*
FROM employees e
LEFT JOIN dept_emp de ON e.emp_no = de.emp_no
LEFT JOIN departments d ON de.dept_no = d.dept_no
LIMIT 10;
```

- RIGHT OUTER JOIN
```
SELECT e.emp_no, e.first_name, e.last_name, de.dept_no, d.dept_name
FROM employees e
RIGHT JOIN dept_emp de ON e.emp_no = de.emp_no
JOIN departments d ON de.dept_no = d.dept_no  
LIMIT 10;

SELECT e.*, d.*
FROM employees e
RIGHT JOIN dept_emp de ON e.emp_no = de.emp_no
RIGHT JOIN departments d ON de.dept_no = d.dept_no  
LIMIT 10;
```

- FULL JOIN
```
SELECT 
    c.CustomerID, 
    c.CustomerName, 
    o.OrderID, 
    o.OrderDate, 
    o.Product
FROM 
    Customers c
LEFT JOIN 
    Orders o ON c.CustomerID = o.CustomerID

UNION

SELECT 
    o.CustomerID, 
    c.CustomerName, 
    o.OrderID, 
    o.OrderDate, 
    o.Product
FROM 
    Orders o
LEFT JOIN 
    Customers c ON o.CustomerID = c.CustomerID
WHERE 
    c.CustomerID IS NULL;




SELECT 
    e.emp_no, 
    e.first_name, 
    e.last_name, 
    s.salary
FROM employees e
LEFT JOIN salaries s ON e.emp_no = s.emp_no
WHERE s.from_date <= CURRENT_DATE AND (s.to_date >= CURRENT_DATE OR s.to_date = '9999-01-01') 

UNION


SELECT 
    s.emp_no, 
    e.first_name, 
    e.last_name, 
    s.salary
FROM salaries s
LEFT JOIN employees e ON s.emp_no = e.emp_no
WHERE e.emp_no IS NULL AND (s.from_date <= CURRENT_DATE AND (s.to_date >= CURRENT_DATE OR s.to_date = '9999-01-01'));
```

- CROSS JOIN
```
SELECT e.emp_no, e.first_name, e.last_name, s.salary, s.from_date, s.to_date
FROM employees e
CROSS JOIN salaries s
LIMIT 100; 
```

- SELF JOIN
```
SELECT 
    e1.first_name AS Employee1_FirstName, 
    e1.last_name AS Employee1_LastName,
    e2.first_name AS Employee2_FirstName, 
    e2.last_name AS Employee2_LastName,
    e1.birth_date
FROM 
    employees e1
JOIN 
    employees e2 ON e1.birth_date = e2.birth_date
WHERE 
    e1.emp_no < e2.emp_no
LIMIT 10;
```

## SUBQUERY
```
SELECT 
	emp_no, 
	(SELECT 
		dept_name 
		FROM departments 
		WHERE dept_name='Sales1') 
FROM dept_emp 
LIMIT 10;

SELECT 
	emp_no, 
	(SELECT 
		dept_name 
		FROM departments 
	) 
FROM dept_emp 
LIMIT 10;

SELECT 
	emp_no, 
	(SELECT 
		dept_name,
		dept_no
		FROM departments 
		WHERE dept_name='Sales1') 
FROM dept_emp 
LIMIT 10;

SELECT 
	COUNT(
		CONCAT(
			e1.first_name, 
			(SELECT e2.first_name FROM employees e2 WHERE e2.emp_no=e1.emp_no)
		)
	) 
FROM employees e1;

SELECT
    sub.dept_no,
    d.dept_name,
    AVG(s.salary) AS avg_salary
FROM
    (SELECT
        de.dept_no
     FROM
        dept_emp de
     GROUP BY
        de.dept_no
     HAVING
        COUNT(de.emp_no) > 10) AS sub
JOIN
    dept_emp de ON sub.dept_no = de.dept_no
JOIN
    salaries s ON de.emp_no = s.emp_no
JOIN
    departments d ON sub.dept_no = d.dept_no
GROUP BY
    sub.dept_no, d.dept_name;

JOIN으로 한다면

SELECT 
    de.dept_no,
    d.dept_name,
    AVG(s.salary) AS avg_salary
FROM 
    dept_emp de
JOIN 
    salaries s ON de.emp_no = s.emp_no
JOIN 
    departments d ON de.dept_no = d.dept_no
GROUP BY 
    de.dept_no, d.dept_name
HAVING 
    COUNT(DISTINCT de.emp_no) > 10;


SELECT 
	e.emp_no, e.first_name, e.last_name, e.birth_date, e.gender, e.hire_date
FROM employees e
WHERE e.emp_no IN (
    SELECT de.emp_no
    FROM dept_emp de
    JOIN salaries s ON de.emp_no = s.emp_no
    GROUP BY de.emp_no
    HAVING AVG(s.salary) > 50000
);

JOIN으로 한다면

SELECT DISTINCT 
	e.emp_no, e.first_name, e.last_name, e.birth_date, e.gender, e.hire_date
FROM employees e
JOIN dept_emp de ON e.emp_no = de.emp_no
JOIN salaries s ON e.emp_no = s.emp_no
GROUP BY e.emp_no, e.first_name, e.last_name, e.birth_date, e.gender, e.hire_date
HAVING AVG(s.salary) > 50000;
```

## USING INDEX
- LIKE
```
SELECT * FROM employees WHERE last_name LIKE '%odt';
SELECT * FROM employees WHERE last_name LIKE 'Aam%';
```

- BETWEEN
```
SELECT * FROM comments WHERE CommentDateTime BETWEEN '2023-03-04' AND '2023-04-06';

SELECT * FROM comments WHERE PostID BETWEEN 1 AND 200;
SELECT * FROM COMMENTS IGNORE INDEX (PostId) WHERE PostID BETWEEN 1 AND 200;
```

- IN
```
SELECT * FROM comments WHERE PostID IN (1);
```

- 컬럼 변경
```
SELECT * FROM employees WHERE SUBSTRING(last_name, 1, 3) = 'Aam';
SELECT * FROM comments WHERE LOWER(Comment) = 'asf';
```

- PARTITION
```
CREATE TABLE reservations (
    id INT AUTO_INCREMENT,
    num_customer INT,
    requested_at DATETIME,
    PRIMARY KEY(id, requested_at)
)
PARTITION BY RANGE (MONTH(requested_at)) (
    PARTITION p1 VALUES LESS THAN (2),  -- January
    PARTITION p2 VALUES LESS THAN (3),  -- February
    PARTITION p12 VALUES LESS THAN (13) -- December
);

ALTER TABLE comments
PARTITION BY RANGE (MONTH(CommentDatetime)) (
    PARTITION p1 VALUES LESS THAN (2),   
    PARTITION p2 VALUES LESS THAN (3),   
    PARTITION p3 VALUES LESS THAN (4),   
    PARTITION p4 VALUES LESS THAN (5),   
    PARTITION p5 VALUES LESS THAN (6),   
    PARTITION p6 VALUES LESS THAN (7),   
    PARTITION p7 VALUES LESS THAN (8),   
    PARTITION p8 VALUES LESS THAN (9),       
		PARTITION p9 VALUES LESS THAN (10),   
    PARTITION p10 VALUES LESS THAN (11),   
    PARTITION p11 VALUES LESS THAN (12),   
    PARTITION p12 VALUES LESS THAN (13)  
);
```

## PROCEDURE
```
DELIMITER //

CREATE PROCEDURE AddMultipleCommentsForPosts(
	IN numUsers INT, 
	IN postsPerUser INT, 
	IN commentsPerPost INT
)
BEGIN
    DECLARE userCounter INT DEFAULT 1;
    DECLARE postCounter INT DEFAULT 1;
    DECLARE commentCounter INT DEFAULT 1;
    DECLARE generatedComment TEXT;
    DECLARE randomDateTime DATETIME;
    DECLARE randomUserID INT;

    -- Function to generate a random string of given length
    SET @chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    SET @stringLength = 10;

    WHILE userCounter <= numUsers DO
        SET postCounter = 1;

        WHILE postCounter <= postsPerUser DO
            SET commentCounter = 1;

            WHILE commentCounter <= commentsPerPost DO
                -- Generating a random string of length 10
                SET generatedComment = SUBSTRING(
									@chars, FLOOR(RAND() * LENGTH(@chars)) + 1, 1
								);
                SET @i = 1;
                WHILE @i < @stringLength DO
                    SET generatedComment = CONCAT(
														generatedComment, 
														SUBSTRING(@chars, FLOOR(RAND() * LENGTH(@chars)) + 1, 1)
												);
                    SET @i = @i + 1;
                END WHILE;

                -- Generate random datetime between 2023-01-01 00:00:00 to 2023-10-09 23:59:59
                SET randomDateTime = TIMESTAMPADD(SECOND, FLOOR(282 * 24 * 60 * 60 * RAND()), '2023-01-01 00:00:00');

                -- Generate a random user ID between 1 and 100 (assuming you have 100 users with sequential IDs)
                SET randomUserID = FLOOR(1 + (RAND() * 100));

                INSERT INTO comments (PostID, UserID, Comment, CommentDatetime)
                VALUES ((userCounter - 1) * postsPerUser + postCounter, randomUserID, generatedComment, randomDateTime);

                SET commentCounter = commentCounter + 1;
            END WHILE;

            SET postCounter = postCounter + 1;
        END WHILE;

        SET userCounter = userCounter + 1;
    END WHILE;
    
END //

DELIMITER ;
```

## TRIGGER
```
DELIMITER //

CREATE TRIGGER tr_check_birthdate_before_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.birth_date < '1930-01-01' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid birth date. Employees born before 1930 cannot be inserted.';
    END IF;
END;

//

DELIMITER ;
```

- bullet point
    - asdf asdf asdf
    - asdf asdf asdf
    - asdf asdf asdf
    - asdfasdfasdfasdf
        - fewfwefwef