CREATE TABLE users (
  user_Id Serial PRIMARY KEY,
  user_name varchar(20),
  password varchar(20)
);
CREATE TABLE supplier (
  supplier_id SERIAL PRIMARY KEY,
  supplier_name varchar(60),
  company_Name varchar(100),
  address varchar(100),
  mobile_no_1 varchar(20),
  mobile_no_2 varchar(20),
  telephone_no varchar(20),
  email varchar(60)
);

CREATE TABLE customer (
  customer_id SERIAL PRIMARY KEY,
  customer_name varchar(60),
  company_Name varchar(100),
  address varchar(100),
  mobile_no_1 varchar(20),
  mobile_no_2 varchar(20),
  telephone_no varchar(20),
  email varchar(60)
);


CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  product_name varchar(50) NOT NULL, 
  type varchar(50),
  brand varchar(50),
  country varchar(50),
  supplier_id INTEGER REFERENCES supplier(supplier_id),
  cost float NOT NULL,
  date date NOT NULL,
  place varchar(50) NOT NULL,
  size varchar(50),
  quantity float NOT NULL,
  unit varchar(50) NOT NULL
);

CREATE TABLE memo (
  memo_id SERIAL PRIMARY KEY,
  date date,
  customer_Id INTEGER REFERENCES customer(customer_id)
);

CREATE TABLE sold_product (
  memo_id INTEGER REFERENCES memo(memo_id),
  product_Id INTEGER REFERENCES product(product_id),
  quantity float,
  unit varchar(50),
  selling_Price float, 
  PRIMARY KEY (memo_id, product_id)
);

CREATE TABLE supplier_transaction (
  supplier_id INTEGER REFERENCES supplier(supplier_id),
  memo_id INTEGER REFERENCES memo(memo_id),
  PRIMARY KEY (supplier_id, memo_id)
);


CREATE TABLE customer_transaction (
  customer_id INTEGER REFERENCES customer(customer_id),
  memo_id INTEGER REFERENCES memo(memo_id),
  PRIMARY KEY (customer_id, memo_id)
);