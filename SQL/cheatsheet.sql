/*
## File Format: .sql ##
## Report File Format: .rdl ##
## Dataset File Format: .rsd ##
## Data Source File Format: .rds ##

######## Report Development Steps ########
1) select tool
2) acquire data
	2.1) data source
	2.2) data set
3) design layout
4) preview report
5) deploy to report server
##########################################

######## Data Source And Data Set ########
1) Data Source: 
It tells SSRS where to find your data – the connection details.

2) Dataset: 
It defines what data you want from that connection, 
and organizes it for your report.
##########################################

############### Select Top ###############
Meaning:
select top limits the number (or percentage) of rows returned from a query.

Syntax:
	select top 5 * from TableName
	select top 50 percent * from TableName

Notes:
- TOP 5 returns the first 5 rows based on the query order.
- TOP PERCENT returns a percentage of the total rows.
##########################################

################ With Ties ###############
Meaning:
with ties returns additional rows that have the same value
as the last row in the TOP result based on the ORDER BY column.

Syntax:
	SELECT TOP Number WITH TIES *
	FROM TableName
	ORDER BY ColumnName;

Notes:
- Must be used with ORDER BY.
- May return more rows than the number specified in TOP.
- Used to include rows that have the same ranking/value as the last row
  in the result.
##########################################

################## Database Basics ####################
- create database DatabaseName; -- Creates a new SQL database
- drop database DatabaseName;   -- Deletes the database
#######################################################

########### Database Selection ###########
Meaning:
This action indicates that we have selected the database and 
clicked on "New Query" to create a new query

Syntax:
	Use [dataBaseName]
	go
##########################################

######## Use Space In Column Name ########
Syntax:
	create table Rooms (
		RoomId smallint identity(1, 1) primary key,
		[Room Number] tinyint not null,
		RoomFloor tinyint not null,
	)
##########################################

################ Order By ################
Syntax:
	select * from Guests
	order by FirstName asc, LastName desc
--> Alexander	Taylor
--> Alexander	Johnson
--> Alexander	Anderson
------------------------------------
	select * from Guests
	order by FirstName asc, LastName asc
--> Alexander	Anderson
--> Alexander	Johnson
--> Alexander	Taylor
##########################################

############ Join CheatSheet #############
Syntax:
	SELECT 
	    table1.column1,
	    table2.column2,
	    table3.column3
	FROM table1 AS alias1
	JOIN table2 AS alias2 ON alias1.referenced_column = alias2.target_column
	JOIN table3 AS alias3 ON alias1.referenced_column = alias3.target_column
##########################################

################ If Exist ################
Meaning:
it won't show an error when we deleted the table already

Syntax:
drop table if exists TableName
##########################################

################## View ##################
Meaning:
view is a saved select

Syntax:
	create view ViewName as 
	select * from TableName

Usage:
	select * from ViewName
##########################################

################# Index ##################
Meaning:
Indexes make data retrieval faster by reducing the amount of data SQL Server must scan.
Users cannot see indexes directly; SQL Server uses them internally to improve performance.
(Table Scan) --> (index seek)

Create Syntax:
    create index IndexName
    on TableName (Column1, Column2, ...)

Drop Syntax:
     drop index IndexName on TableName;
	 Or
	 drop index TableName.IX_Name;

Index Types:
1) Non-Clustered Index (default)
   - Creates a separate structure to speed up searches.
   - Does NOT change physical order of the table.

   Syntax:
     create index IX_Name
     on TableName(Col1, Col2)

2) Clustered Index
   - Determines physical order of rows in the table.
   - Only ONE clustered index per table.
   - A Primary Key creates a clustered index by default,
     unless a clustered index already exists or you explicitly specify NONCLUSTERED.

   Syntax:
     create clustered index IX_Name
     on TableName(Col1)

3) Unique Index
   - Ensures values in the columns are unique.
   - Automatically created when using UNIQUE constraints.

   Syntax:
     create unique index IX_Name
     on TableName(Col1)

Include Columns: (Only for non-clustered indexes)
Used when you want extra columns to be stored inside the index
to avoid key lookups. (Faster SELECT)

   Syntax:
     create index IX_Name
     on TableName(Col1)
     include(ColA, ColB)

Order (ASC / DESC):
Useful for ORDER BY queries.

   Syntax:
     create index IX_Name
     on Table (Col1 asc, Col2 desc)

Filtered Index:
Index only a subset of data.
Great for sparse or conditional rows.

   Syntax:
     create index IX_Name
     on TableName (Col1)
     where IsDeleted = 0 -- condition

Notes:
- Foreign Keys do NOT automatically create indexes.
- Indexes should be added manually for faster joins.
- Avoid indexing columns that change frequently (e.g., LastUpdate)
  because every write must update all related indexes.
##########################################

############### Group By #################
Meaning:
The GROUP BY clause in SQL allows you to aggregate data based
on the unique combinations of values in specified columns.

Syntax:
	select column1, column2, column3, AggregateFunction(column4) 
	from TableName
	group by column1, column2, column3

Initial Grouping: The query first creates groups based on the distinct values in column1. For example:
column1: value1
column1: value2
column1: value3

Nested Grouping: Within each initial group (defined by column1),
the query then creates subgroups based on the distinct values in column2. For example:
column1: value1 --> column2: value1
column1: value1 --> column2: value2
column1: value2 --> column2: value1
column1: value2 --> column2: value2
column1: value3 --> column2: value1
column1: value3 --> column2: value2

Further Nested Grouping: This process continues with column3.
Within each subgroup (defined by column1 and column2),
subgroups are created based on the distinct values in column3. For example:
column1:value1 --> column2:value1 --> column3:value1
column1:value1 --> column2:value1 --> column3:value2
column1:value1 --> column2:value2 --> column3:value1
column1:value1 --> column2:value2 --> column3:value2
column1:value2 --> column2:value1 --> column3:value1
column1:value2 --> column2:value1 --> column3:value2
column1:value2 --> column2:value2 --> column3:value1
column1:value2 --> column2:value2 --> column3:value2
column1:value3 --> column2:value1 --> column3:value1
column1:value3 --> column2:value1 --> column3:value2
column1:value3 --> column2:value2 --> column3:value1
column1:value3 --> column2:value2 --> column3:value2

Key Takeaway: The order of columns in the GROUP BY clause defines the hierarchy of the grouping process.
and finally the results are aggregated within the most specific group
##########################################

################ SubQuery ################
Meaning:
A subquery (also known as an inner query or nested query) is a query nested inside another SQL query.
Subqueries allow you to use the result of one query as part of the conditions or data of another query.

Syntax:
1) In the WHERE Clause: This is the most common usage. 
   You use a subquery to filter the results of the main query based on values returned by the subquery.
		select *
		from Employees
		where Salary > (select avg(Salary) from Employees);

2) In the SELECT Clause: This allows you to display data from the subquery as an additional column in 
   the result set of the main query LIKE USING JOIN.
		select 
			CityName,
			StateProvinceID,
			(
				select StateProvinceName
				from Application.StateProvinces 
				where StateProvinceID = Cities.StateProvinceID
			) as StateProvinceName
		from Application.Cities

3) With EXISTS and NOT EXISTS: These clauses check for the existence or non-existence of rows based on a subquery.
   --> it will return all rooms which have any reservation
		select * from Rooms
		where exists 
		(
			select 1 from RoomReservations 
			where RoomId = Rooms.RoomId
		)

   --> it will return all rooms which dont have any reservation
		select * from Rooms
		where not exists 
		(
			select 1 from RoomReservations
			where RoomId = Rooms.RoomId
		)

4) With ALL and ANY: These operators are used to compare a value with all or some of the values
   returned by a subquery.

   --> Finds products whose price is greater than *all* of the prices of electronic products.
		select *
		from Products
		where Price > ALL 
		(
			select Price from Products 
			where Category = 'Electronics'
		);

   --> Finds products whose price is greater than *at least one* of the prices of electronic products.
		select *
		from Products
		where Price > ANY 
		(
			select Price from Products 
			where Category = 'Electronics'
		);

5) In the HAVING Clause: This filters groups of results after they've been aggregated
   (e.g., using GROUP BY).
  --> Shows departments where the average salary is higher than the overall average salary of the company.
		select DepartmentID, AVG(Salary) AS AvgSalary
		from Employees
		group by DepartmentID
		having avg(Salary) > (select avg(Salary) from Employees);
##########################################

################# Having #################
Meaning:
The HAVING clause is used to filter the results of a GROUP BY clause. 
Think of it as a WHERE clause for groups. It allows you to filter based on aggregate functions
(like SUM, AVG, COUNT, MIN, MAX) after the data has been grouped.

Why Do We Need HAVING?
You can't use a WHERE clause to filter based on aggregate functions.
The WHERE clause operates before the grouping and aggregation occurs. 
HAVING comes after the grouping and aggregation.

Syntax:
	SELECT column1, column2, aggregate_function(column3)
	FROM table_name
	WHERE condition  -- Optional: Filter rows *before* grouping
	GROUP BY column1, column2
	HAVING aggregate_function(column3) operator value;
##########################################

################# IsNull #################
Meaning:
IsNull replaces NULL values with a specified value.

Syntax:
	select 
		IsNull(ColName, ReplacementValue)
	from TableName

Notes:
- If ColName is NULL, the function returns ReplacementValue.
- If ColName is NOT NULL, the original value is returned.
- Commonly used to avoid NULL results in queries.
##########################################

############ System Functions ############
-- select StateProvinceName, SalesTerritory from Application.StateProvinces
--> Alabama 	Southeast
--> Alaska  	Far West
--> Arizona  	Southwest
-- select lower(StateProvinceName), upper(SalesTerritory) from Application.StateProvinces
--> alabama 	SOUTHEAST
--> alaska  	FAR WEST
--> arizona  	SOUTHWEST
-- select left(StateProvinceName, 2), right(SalesTerritory, 3) from Application.StateProvinces
--> Al	        ast
--> Al      	est
--> Ar      	est
##########################################

################## Case ##################
Meaning:
CASE is used to perform conditional logic inside SQL queries.
It works like an IF...ELSE structure and also behaves similar to a SWITCH...CASE
statement in programming languages: the first matched condition returns a value.

Types:
1) Simple CASE (just like a switch-case based on a single variable).
   Compares one expression with multiple fixed values

Syntax:
	select 
		column1,
		case column2
			when value1 then result1
			when value2 then result2
			when value3 then result3
			else default_result
		end as AliasName
	from TableName

Example:
	select 
		ProductName,
		case CategoryID
			when 1 then 'Electronics'
			when 2 then 'Clothing'
			when 3 then 'Food'
			else 'Other'
		end as CategoryName
	from Products


2) Searched CASE (This is more flexible and works like multiple IF...ELSE IF conditions.)
   Uses full logical conditions instead of matching a single expression.

Syntax:
	select
		column1,
		case
			when condition1 then result1
			when condition2 then result2
			when condition3 then result3
			else default_result
		end as AliasName
	from TableName

Example:
	select
		EmployeeName,
		Salary,
		case
			when Salary < 3000 then 'Low'
			when Salary between 3000 and 7000 then 'Medium'
			when Salary > 7000 then 'High'
			else 'Unknown'
		end as SalaryLevel
	from Employees


3) Usage With ORDER BY:
	select
		ProductName,
		Price
	from Products
	order by 
		case 
			when Price < 100 then 1
			when Price between 100 and 500 then 2
			else 3
		end;


Notes:
- CASE returns a single value.
- Works like SWITCH-CASE or IF-ELSE depending on the version used.
- Can be used in SELECT, WHERE, ORDER BY, GROUP BY, and HAVING.
- ELSE is optional; without ELSE, unmatched conditions return NULL.
##########################################

############### Functions ################
Meaning:
A Function is a reusable SQL object that takes input parameters
and returns a single value.

Syntax:
	create function SchemaName.FunctionName(@Param1 Param1Type, @Param2 Param2Type)
	returns ReturnType
	as
	begin
	declare @VarName VarType
	set @VarName = @Param1
	return @VarName
	end

Usage:
select SchemaName.FunctionName(Value1, Value2);

Notes:
- In SQL Server functions usually belong to a schema (e.g., dbo).
- When calling a function, include the schema name.

Example:
	create function ToFahrenheit(@Celsuis decimal(10, 2))
	returns decimal(10, 2)
	as
	begin
	declare @Fahrenheit decimal(10, 2)
	set @Fahrenheit = (@Celsuis * 1.8 + 32);
	return @Fahrenheit;
	end

##########################################

########### Stored Procedures ############
Meaning:
A Stored Procedure (SP) is a prepared SQL code that you can save, 
so the code can be reused over and over again. It improves 
performance and security.

1) Basic Commands:
   - CREATE PROCEDURE: Defines a new procedure.
   - ALTER PROCEDURE: Modifies an existing procedure.
   - DROP PROCEDURE: Deletes a procedure.
   - EXEC (or EXECUTE): Runs the procedure.

2) Parameters & Default Values:
   Procedures can accept input values. You can also set default 
   values so the procedure runs even if a parameter is missing.

Syntax:
	create procedure SchemaName.ProcedureName
		@Param1 dataType,
		@Param2 dataType = DefaultValue -- Optional parameter
	as
	begin
		set nocount on; -- prevents SQL Server from sending the message
		-- SQL logic goes here
	end
	go

Example (With Logic & Joins):
	alter procedure Warehouse.uspSelectProducts 
		@Color varchar(255),
		@SupplierName varchar(255) = ''     -- Empty default
	as
	begin
		-- Validation Logic
		if @Color is null
		begin
			print 'Error: color name should not be empty'
			return -- Exits the procedure early
		end

		select 
			SI.StockItemName,
			C.ColorName,
			S.SupplierName
		from Warehouse.StockItems as SI
		inner join Warehouse.Colors as C on SI.ColorID = C.ColorID
		inner join Purchasing.Suppliers as S on SI.SupplierID = S.SupplierID
		where C.ColorName = @Color
		and S.SupplierName like ('%' + @SupplierName + '%')
	end
	go

3) Execution Methods:
   - Positional: Values must match the order of parameters.
   - Named: Explicitly mapping values to names (Recommended for clarity).

Examples:
	-- Using Positional parameters
	exec Warehouse.uspSelectProducts 'Black', 'Global'

	-- Using Named parameters
	exec Warehouse.uspSelectProducts 
		@Color = 'Blue', 
		@SupplierName = 'Akbar'

4) Procedures with CASE Logic:
   You can pass parameters to use inside a CASE statement for 
   dynamic reporting.

Example:
	CREATE PROCEDURE CheckUser @msg1 nvarchar(30), @msg2 nvarchar(30)
	as
	begin
		select Username,
			case 
				when UserName = 'superuser' then @msg1
				when UserName = 'admin' then @msg2
				else 'guest'
			end as AccessLevel
		from Users
	end
	go

Notes:
- Use 'BEGIN' and 'END' to group blocks of code.
- 'RETURN' immediately exits the procedure.
- 'PRINT' is used for debugging and showing messages.
- Always use 'GO' after creating/altering a procedure in a script.
##########################################

######### Get system Procedures ##########
-- select 
--		SCHEMA_NAME(SCHEMA_ID) as SchemaName, 
--		name as ProcedureName
-- from sys.procedures
##########################################

############# SET NOCOUNT ON #############
Meaning:
SET NOCOUNT ON prevents SQL Server from sending the message 
"(X rows affected)" after each statement (INSERT, UPDATE, DELETE, SELECT).

By default, SQL Server returns a message indicating how many rows were
affected by a statement. This message is sent to the client application
(SSMS, ADO.NET, etc).

When SET NOCOUNT ON is enabled, these messages are suppressed.

Syntax:
	create procedure ExampleProcedure
	as
	begin
		set notcount on
		-- SQL logic goes here
	end
	go

Example:

Without NOCOUNT:
	update Users set IsActive = 1 where IsActive = 0
Result:
	(5 rows affected)

With NOCOUNT:
	SET NOCOUNT ON
	update Users set IsActive = 1 where IsActive = 0
Result:
	(no message returned)

Notes:
- Does NOT change the actual number of affected rows.
- The system variable @@ROWCOUNT still works normally.
- Reduces unnecessary network traffic between SQL Server and the client.
- Improves performance in procedures that execute many statements.
- Common best practice: place SET NOCOUNT ON at the beginning of Stored Procedures.
- Very useful in loops, triggers, and procedures with multiple queries.
##########################################

##### CTE (Common Table Expression) ######
Meaning:
A CTE creates a temporary result set that exists only during the execution of a single query.

Why use CTE?
1. Improves readability
2. Breaks complex queries into smaller logical steps
3. Makes working with window functions easier
4. Can simplify recursive queries

with CTE:
	with TableName as (
	    select ...
	)
	select * from TableName

without CTE:
	select * from (select ...) t

Notes:
- Exists only for the duration of the query
- Not stored as a physical table
##########################################

########## Variable Declaration ##########
Single variable:
-- declare @VarName VarType
-- set @VarName = VarValue

Or (declare + assign):
-- declare @VarName VarType = VarValue

Multiple variables:
-- declare 
--    @VarName1 VarType1 = VarValue1,
--    @VarName2 VarType2 = VarValue2,
--    ...
##########################################

########## Variable Assignment ###########
Meaning:
In SQL Server variables can be assigned values using either SET or SELECT.
Both methods store a value inside a variable, but their behavior is slightly different.

1) SET (Standard ANSI Method):
SET assigns a value to a single variable. 
It is safer when using subqueries because it throws an error if more than one row is returned.

Syntax:
	declare @VarName dataType
	set @VarName = Value

Example:
	declare @MaxHours smallint
	set @MaxHours = (
		select max(VacationHours)
		from HumanResources.Employee
	)

2) SELECT (T‑SQL Extension):
SELECT can assign values to one or multiple variables in a single statement.
It is commonly used when retrieving multiple values at once.

Syntax:
	declare @Var1 dataType, @Var2 dataType

	select
		@Var1 = Expression1,
		@Var2 = Expression2

Example:
	declare 
		@ErrorMessage nvarchar(4000),
		@ErrorNumber int

	select
		@ErrorMessage = ERROR_MESSAGE(),
		@ErrorNumber = ERROR_NUMBER()

Key Differences:

Multiple Variables:
- SET → assigns only one variable at a time.
- SELECT → can assign multiple variables in one statement.

Multiple Rows Returned:
- SET → throws an error if the subquery returns more than one row.
- SELECT → does not throw an error; the variable receives the value from the last row.

No Rows Returned:
- SET → variable becomes NULL.
- SELECT → variable keeps its previous value.

Notes:
- SET is ANSI standard SQL.
- SELECT assignment is specific to T‑SQL (SQL Server).
- SELECT is often preferred when assigning several variables at once.
##########################################

################# Schema #################
Meaning:
A schema is a logical container in a database that groups related objects
such as tables, views, procedures, and functions.

Creating schema:
	create schema SchemaName

Deleting schema:
	drop schema SchemaName

Transfering data in schema:
	alter schema DestinationSchema
	transfer SourceSchema.ObjectName
##########################################

########### Insert With Select ###########
Meaning:
It allows inserting multiple rows at once using the result
of a SELECT query instead of fixed VALUES.

Syntax:
	insert into TargetTable (col1, col2, col3, ...)
	select col1, col2, col3, ... from SourceTable
	where <optional conditions>;
##########################################

############ Update With Join ############
Meaning:
Multiple rows UPDATE allows updating multiple rows at once using
data coming from another table.

Syntax:
	update T
	set	T.Column1 = S.Column1,
		T.Column2 = S.Column2,
		T.Column3 = S.Column3, ...
	from TargetTable as T
	join SourceTable as S
	on T.KeyColumn = S.KeyColumn;
##########################################

############ Update With Join ############
Meaning:
Multiple rows Delete allows deleting multiple rows at once using
data coming from another table.

Syntax:
	delete tn1
	from TableName1 as tn1
	join TableName2 as tn2 on tn1.KeyColumn = tn2.KeyColumn
##########################################

################ Trigger #################
Meaning:
A trigger is a special stored procedure that automatically executes in response to
INSERT, UPDATE, or DELETE operations on a table.

Triggers in SQL Server are statement-level, meaning they fire once per statement,
not once per row.

Syntax:
	create trigger TriggerName
	on TableName 
	(after | instead of) insert, update, delete
	as
	begin
	    -- T-SQL Code
	end;

Example:
	alter trigger DeletingLog
	on Users after delete
	as 
	begin
		insert into BackUpLogs (message)
		select 'deleted successfully ' + UserName + ' with id : ' + cast(id as varchar(10)) from deleted
	end

	create trigger UpdatingLog
	on Users after update
	as
	begin
		insert into BackUpLogs (message)
		select 'updated from ' + deleted.UserName + ' into ' + inserted.UserName from inserted
		inner join deleted on inserted.id = deleted.id
	end

	create trigger LogAction
	on Users after insert, delete, update
	as
	begin
		-- insert
		if exists (select * from inserted) and not exists (select * from deleted)
		begin
			insert into UserLog 
		    select 'action: insert - id: ' + cast(id as varchar(10)) from inserted
		end
	
		-- delete
		if not exists (select * from inserted) and exists (select * from deleted)
		begin
			insert into UserLog
			select 'action: delete - id: ' + cast(id as varchar(10)) from deleted
		end
	
		-- update
	
		if exists (select * from inserted) and exists (select * from deleted)
		begin
			insert into UserLog
			select 'action: update - id: ' + cast(id as varchar(10)) from inserted
		end
	end
##########################################

###### Cross Join (Cartesian Join) #######
Meaning:
Combines every row from the first table with every row from the second table.
Each row in Table1 is paired with all rows in Table2.

Syntax:
	select 
		Table1.ColumnName,
		Table2.ColumnName,
		...
	from Table1
	cross join Table2

Result:
If Table1 has N rows and Table2 has M rows, the result will contain:
	N × M rows

Notes:
- CROSS JOIN produces a Cartesian Product.
- No join condition is used (no ON clause).
- Usually used when all combinations of rows are needed.
- Be careful: result size grows very quickly with large tables.
- Equivalent to listing multiple tables in FROM without a WHERE condition.
##########################################

#### Multiple Tables (Old Style Join) ####
Meaning:
Multiple tables can be listed in the FROM clause separated by commas.
This creates a Cartesian product unless filtered with conditions in WHERE.

Syntax:
	select column_list
	from Table1, Table2, Table3
	where Table1.Col = Table2.Col
	  and Table2.Col = Table3.Col

Example:
select ACI.CityName as 'City',
       ASP.StateProvinceName as 'State'
	from Application.Cities as ACI, Application.StateProvinces as ASP
	where ACI.StateProvinceID = ASP.StateProvinceID

Notes:
- This is called implicit join or old-style join.
- Without a WHERE condition, it produces a Cartesian product (every row combined with every row).
- Modern SQL prefers explicit JOIN syntax for better readability.
##########################################

################### <> ###################
Meaning:
<> means "not equal to" in SQL. It works the same as != and is ANSI‑standard.

Usage:
	select * from TableName
	where ColName <> 'Value';

Notes:
- Preferred in many SQL systems because it's standard.
- <> does not match NULL. Use IS NULL / IS NOT NULL for NULL checks.
-- 1) where ColName <> 'Value' or is null
-- 2) where ColName <> null ==> where ColName is not null
##########################################

####### TRY CATCH (Error Handling) #######
Meaning:
TRY...CATCH is used to handle runtime errors in T‑SQL.
If an error occurs inside the TRY block, execution jumps to the CATCH block
where the error can be handled (logging, messages, rollback, etc).

Syntax:
	BEGIN TRY
		-- SQL statements that may cause an error
	END TRY
	BEGIN CATCH
		-- Error handling logic
	END CATCH

Example:
	begin try
		select 10 / 0
	end try
	begin catch
		print 'An error occurred'
	end catch

####### Error Information Functions ######
Meaning:
SQL Server provides built‑in functions that return information
about the error that occurred inside the CATCH block.

Common Functions:
	ERROR_NUMBER()    -- Returns the error number
	ERROR_MESSAGE()   -- Returns the error message text
	ERROR_LINE()      -- Returns the line number where the error occurred
	ERROR_PROCEDURE() -- Returns the stored procedure name (if any)
	ERROR_SEVERITY()  -- Returns the severity level
	ERROR_STATE()     -- Returns the error state

Example:
	begin try
		select 10 / 0
	end try
	begin catch
		select
			ERROR_NUMBER() as ErrorNumber,
			ERROR_MESSAGE() as ErrorMessage,
			ERROR_LINE() as ErrorLine
	end catch

######## Store Error In Variables ########
Meaning:
Error details can be stored in variables for logging,
custom messages, or debugging.

Syntax:
	begin catch
		declare
			@ErrorMessage nvarchar(4000),
			@ErrorNumber int

		select
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorNumber = ERROR_NUMBER()

		print @ErrorMessage
	end catch

######### THROW (Re‑throw Error) #########
Meaning:
THROW raises an error or rethrows the current error.
It is the modern replacement for RAISERROR.

Re‑throw current error:
	begin catch
		print 'Error handled'
		throw
	end catch

Custom error:
	throw 50001, 'Custom error occurred', 1

Parameters:
	ErrorNumber, Message, State

####### TRY CATCH With Transaction #######
Meaning:
TRY...CATCH is commonly used with transactions to ensure
that if an error occurs the transaction is rolled back.

Example:
	begin try
		begin tran
		insert into Users values ('Ali')
		insert into Orders values (1, 100)
		commit tran
	end try
	begin catch
		rollback tran
		print ERROR_MESSAGE()
	end catch

############## XACT_STATE() ##############
Meaning:
Returns the state of the current transaction.

Values:
	1   → Transaction is active and committable
   -1   → Transaction exists but is uncommittable
	0   → No transaction exists

Example:
	begin catch
		if XACT_STATE() <> 0
			rollback tran
	end catch

Notes:
- TRY must be immediately followed by CATCH.
- Only runtime errors are caught.
- Syntax errors are not caught by TRY...CATCH.
- TRY...CATCH can be nested.
- Commonly used inside Stored Procedures.
##########################################

#### Transactions (SQL Server / T‑SQL) ###
Meaning:
A Transaction is a unit of work where multiple SQL statements are executed
as one operation. Either all changes are saved (COMMIT) or all changes
are undone (ROLLBACK). This helps maintain data integrity.

Core Commands:
- BEGIN TRANSACTION  --> starts the transaction
- COMMIT TRANSACTION --> saves all changes
- ROLLBACK TRANSACTION --> undoes all changes made in the transaction
- SAVE TRANSACTION [Name]  --> creates a savepoint allowing partial rollback within the transaction

ACID Principles:
- Atomicity   : All operations succeed or all are rolled back.
- Consistency : The database remains in a valid state after the transaction.
- Isolation   : Transactions do not interfere with each other.
- Durability  : After COMMIT, changes are permanently stored.

Syntax:
	begin tran
	-- SQL statements (INSERT / UPDATE / DELETE)
	commit tran

Example:
	begin tran
		update Accounts
		set Balance = Balance - 100
		where Id = 1

		update Accounts
		set Balance = Balance + 100
		where Id = 2
	commit tran

Notes:
- If an error happens before COMMIT, you can run ROLLBACK.
- ROLLBACK cancels every change made since BEGIN TRANSACTION.

###### TRY / CATCH With Transactions #####
Meaning:
TRY/CATCH is used to handle errors and prevent leaving an open transaction.

Syntax:
	begin try
		begin tran
		-- SQL statements
		commit tran
	end try
	begin catch
		IF @@TRANCOUNT > 0
			rollback tran
		throw;
	end catch

Notes:
- @@TRANCOUNT shows how many transactions are currently open.
- Checking @@TRANCOUNT prevents errors when calling ROLLBACK.
- THROW re-throws the original error.

####### What ROLLBACK Actually Does ######
Meaning:
It restores the database to the exact state it had
before BEGIN TRANSACTION was executed.

Example:
	begin tran
	insert into Orders values (1)
	insert into Orders values (2)
	insert into Orders values (3)
	rollback tran

Result:
None of the three rows remain in the table.

################ Savepoint ###############
Meaning:
A savepoint allows partial rollback inside a transaction.

Syntax:
	begin tran
	save tran SavePointName
	-- SQL statements
	rollback tran SavePointName
	commit tran

Example:
	begin tran
	insert into Users values (1,'Ali')
	save tran sp1
	insert into Users values (2,'Reza')
	rollback tran sp1
	commit tran

Result:
Only the first INSERT remains.

####### Transaction Isolation Level ######
Meaning:
Isolation Level controls how transactions interact with each other
when accessing the same data.

Levels (lowest to highest isolation):
- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SNAPSHOT
- SERIALIZABLE

Syntax:
	set tran isolation level read committed
	begin tran
	-- SQL statements
	commit tran

Notes:
- Always use TRY/CATCH when working with transactions.
- Always check @@TRANCOUNT before calling ROLLBACK.
- Always re-throw errors using THROW.
- Never leave a transaction open.
- Keep transactions short to avoid locking problems.
- COMMIT only makes changes permanent when the outermost transaction commits.
##########################################

################## MERGE #################
Meaning:
MERGE is used to synchronize two tables by performing INSERT, UPDATE,
or DELETE operations in a single statement based on a matching condition.

Typical usage:
- Data synchronization
- ETL processes
- Upsert operations (UPDATE if exists, INSERT if not)

Condition Logic and Allowed Actions:
MERGE operates on exactly three possible match conditions. Each condition
represents a specific existence-state of a row across the Source and Target
tables, and only certain actions make logical sense in each case.

1) WHEN MATCHED
   Meaning:
     The row exists in both the Source table (S) and the Target table (T).
     ON condition found a match on both sides.

   Source: Present
   Target: Present

   Allowed and Logical Actions:
     - UPDATE   (typical: synchronize Target with Source)
     - DELETE   (valid: remove the row if business rules require it)

   Invalid Actions:
     - INSERT (meaningless because the Target row already exists)

2) WHEN NOT MATCHED
   Meaning:
     The row exists in the Source table but does NOT exist in the Target table.
     ON condition did not find a corresponding Target row.

   Source: Present
   Target: Missing

   Allowed and Logical Actions:
     - INSERT   (typical and logical: create the missing row)

   Invalid Actions:
     - UPDATE or DELETE (cannot be applied because the Target row does not exist)

3) WHEN NOT MATCHED BY SOURCE
   Meaning:
     The row exists in the Target table but does NOT exist in the Source table.
     ON condition did not find a corresponding Source row.

   Source: Missing
   Target: Present

   Allowed and Logical Actions:
     - DELETE   (typical: remove rows that no longer exist in Source)
     - UPDATE   (less common but allowed; for example to “deactivate” rows instead of deleting)

   Invalid Actions:
     - INSERT (meaningless because the Target row already exists)

Syntax:
	merge TargetTable as T
	using SourceTable as S
	on T.KeyColumn = S.KeyColumn
	when matched then
		update set T.Column = S.Column
	when not matched then
		insert (Column1, Column2)
		values (S.Column1, S.Column2)
	when not matched by source then
		delete;

Example:
	merge Employees as T
	using NewEmployees as S
	on T.EmployeeID = S.EmployeeID
	when matched then
		update set
			T.Name = S.Name,
			T.Salary = S.Salary
	when not matched then
		insert (EmployeeID, Name, Salary)
		values (S.EmployeeID, S.Name, S.Salary)
	when not matched by source then
		delete;

Example (Upsert (update & insert) Only):
	merge Products as T
	using NewProducts as S
	on T.ProductID = S.ProductID
	when matched then
		update set T.Price = S.Price
	when not matched then
		insert (ProductID, Name, Price)
		values (S.ProductID, S.Name, S.Price);

Using OUTPUT:
The OUTPUT clause can be used to see which action occurred.

	merge Employees as T
	using NewEmployees as S
	on T.EmployeeID = S.EmployeeID
	when matched then
		update set Salary = S.Salary
	when not matched then
		insert (EmployeeID, Salary)
		values (S.EmployeeID, S.Salary)
	output $action, inserted.*, deleted.*;

Notes:
- MERGE requires a matching condition defined in the ON clause.
- WITH TIES cannot be used inside MERGE.
- Source can be a table, view, CTE, or SELECT query.
- Often used in data warehouse and ETL pipelines.
- Be careful with concurrency issues when multiple processes update the same rows.
- Some teams prefer using UPDATE + INSERT instead of MERGE for OLTP systems.
- Always ensure the ON condition uniquely identifies rows.
##########################################

##### USER-DEFINED TABLE TYPE (UDTT) #####
Meaning:
A User-Defined Table Type (UDTT) is a custom table structure you define once
and then reuse as a data type (like INT, NVARCHAR)
for: Table variables, Table-valued parameters (TVPs) in stored procedures/functions

Syntax:
1) Define the table type (done once per database)
	create type SchemaName.TableTypeName as table (
		Column1 type1,
		Column2 type2,
		...
	);

2) Declare a variable of this type
	declare @VarName SchemaName.TableTypeName;

3) Use it like a table
	insert into @VarName (Column1, Column2)
	values (val1, val2), (val3, val4);
	select * from @VarName;

Notes:
- Defined at the database level (visible in sys.types).
- Cannot be altered; you must DROP and re-CREATE if you need changes.
- Often used together with TVP(Table-Valued Parameter)s to send multiple rows.
##########################################

############# TABLE VARIABLE #############
Meaning:
A table variable is a variable that holds tabular(جدولی) data (rows + columns),
similar to a small in-memory table, but with specific scope and optimization behavior.

Syntax:
Option 1: Ad-hoc structure
	declare @VarName table (
		Column1 type1,
		Column2 type2,
		...
	);
	insert into @VarName (Column1, Column2)
	values (val1, val2), (val3, val4), ...
	select * from @VarName;

Option 2: Using a UDTT (User-Defined table type)
	declare @VarName SchemaName.TableTypeName;
	insert into @VarName (Column1, Column2)
	values (val1, val2), (val3, val4), ...;
	select * from @VarName;

Notes:
- Scope-limited: only accessible within the current batch, procedure, or function.
- Stored in tempdb internally, but treated syntactically like a variable.
- Generally fewer statistics → the optimizer may estimate poor row counts.
- Good for small data sets; for large sets, temporary tables often perform better.
##########################################

############ TEMPORARY TABLE #############
Meaning:
A temporary table is a physical table created in tempdb that exists only for
the duration of your session (or connection), and behaves very similarly to a normal table.

Syntax:
– Local temporary table (visible only in current session)
	create table #TempTableName (
		Column1 type1,
		Column2 type2,
		...
	);
	insert into #TempTableName (Column1, Column1)
	values (val1, val2), (val3, val4), ...
	select * from #TempTableName;

– Global temporary table (visible to all sessions)
	create table ##GlobalTempTableName (
		Column1 type1,
		Column2 type2,
		...
	);

Explanation:
Local temp tables (#TableName) exist only for the current session or connection.
Global temp tables (##Name) are visible to all sessions until the creating session ends and all other references are closed.

They support:
- Indexes
- Constraints
- Statistics
- Complex queries and joins

Notes:
- Physically created in tempdb, similar to regular tables.
- Better suited than table variables for large data sets and complex query plans.
- Dropped automatically at the end of the session, or explicitly via:drop table #TempTableName;
##########################################
*/








































-- Window Functions
-- PARTITION BY

/*
################ Window Functions ################
Meaning:
Window functions perform calculations across a set of rows that are
related to the current row, without collapsing rows like GROUP BY.
They allow running totals, ranking, moving averages, etc.

Common Window Functions:
- ROW_NUMBER()
- RANK()
- DENSE_RANK()
- NTILE()
- SUM() OVER (...)
- AVG() OVER (...)
- COUNT() OVER (...)

Syntax:
	select 
		column1,
		SUM(Sales) over (partition by Region order by Date) as RunningSales
	from SalesTable;

Notes:
- They do NOT reduce row count.
- Calculations happen “over” a window defined by PARTITION BY and ORDER BY.
- ORDER BY inside OVER() defines calculation order.
- PARTITION BY splits data into logical groups.
###################################################

################# PARTITION BY ####################
Meaning:
PARTITION BY divides rows into logical groups (partitions).
Each window function is calculated separately inside its own partition.

Syntax:
	select 
		Department,
		EmployeeName,
		Salary,
		AVG(Salary) over (partition by Department) as AvgSalaryPerDept
	from Employees;

Explanation:
- Each department acts like a mini-table.
- Window function resets for each partition.

Notes:
- Works only inside OVER() clause.
- Similar to GROUP BY but does NOT collapse rows.
###################################################

############ Update With OUTPUT #############
Meaning:
The OUTPUT clause returns information about the rows affected by UPDATE.

Syntax:
	update TableName
	set ColumnName = Value
	output inserted.*, deleted.*
	where Condition;

Example:
	update Employees
	set Salary = Salary + 100
	output
		inserted.EmployeeID,
		deleted.Salary as OldSalary,
		inserted.Salary as NewSalary
	where DepartmentID = 2;

Explanation:
- deleted → old values
- inserted → new values

#############################################

-- داکیومنت microsoft/sql/t-sql باید مطالعه شود
*/