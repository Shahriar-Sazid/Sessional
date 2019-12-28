CREATE TABLE users (
  user_name varchar(20) PRIMARY KEY,
  password varchar(20)
);
CREATE TABLE supplier (
  supplier_name varchar(60) PRIMARY KEY,
  company_name varchar(100),
  address varchar(100),
  mobile_no_1 varchar(20),
  mobile_no_2 varchar(20),
  telephone_no varchar(20),
  email varchar(60)
);

CREATE TABLE customer (
  customer_name varchar(60) PRIMARY KEY,
  company_name varchar(100),
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
  supplier_name varchar(60) REFERENCES supplier(supplier_name),
  cost float NOT NULL,
  date date NOT NULL,
  place varchar(50) NOT NULL REFERENCES godown(godown_name),
  size varchar(50),
  quantity float NOT NULL,
  unit varchar(50) NOT NULL
);

CREATE TABLE memo (
  memo_id SERIAL PRIMARY KEY,
  date date,
  customer_name varchar(60) REFERENCES customer(customer_name)
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
  supplier_name varchar(60) REFERENCES supplier(supplier_name),
  memo_id INTEGER REFERENCES memo(memo_id),
  PRIMARY KEY (supplier_name, memo_id)
);


CREATE TABLE customer_transaction (
  customer_name varchar(60) REFERENCES customer(customer_name),
  memo_id INTEGER REFERENCES memo(memo_id),
  PRIMARY KEY (customer_name, memo_id)
);

CREATE TABLE godown(
  godown_name varchar(30) PRIMARY KEY,
  address varchar(60)
);

CREATE TABLE account(
  account_name varchar(50) PRIMARY KEY,
  holder_name varchar(50),
  bank varchar(30),
  branch varchar(30),
  account_no varchar(50)
);