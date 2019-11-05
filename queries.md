# Database Queries

## Find all customers with postal code 1010
    Ans: SELECT * FROM [Customers] Where PostalCode = 1010;

## Find the phone number for the supplier with the id 11
    Ans: SELECT * FROM [Suppliers] Where supplierID = 11;

## List first 10 orders ever places, descending by the order date
    Ans: SELECT * FROM [Orders] Order by OrderDate desc limit 10;

## Find all customers that live in London, Madrid, or Brazil
    Ans: SELECT * FROM [Customers] Where City in ('London', 'Madrid') or Country = 'Brazil';

## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
    Ans: INSERT into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
            values ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag Ends", "111", "Middle-Earth");

## Update Bilbo Baggins record so that the postal code changes to "11122"
    Ans: UPDATE [Customers] set PostalCode = "11122" where customerID = 93;

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
## code below displays the unique cities only
    SELECT DISTINCT City FROM Customers

## code below displays only the number of unique cities 
    SELECT COUNT(DISTINCT City) FROM Customers;


## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
    Ans: SELECT * FROM [Suppliers] WHERE LENGTH(SupplierName) > 20;
