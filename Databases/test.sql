--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2019-10-22 09:43:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2883 (class 1262 OID 16681)
-- Name: Shop Database; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Shop Database" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE "Shop Database" OWNER TO postgres;

\connect -reuse-previous=on "dbname='Shop Database'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16692)
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    customer_name character varying(60),
    company_name character varying(100),
    address character varying(100),
    mobile_no_1 character varying(20),
    mobile_no_2 character varying(20),
    telephone_no character varying(20),
    email character varying(60)
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16690)
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_customer_id_seq OWNER TO postgres;

--
-- TOC entry 2884 (class 0 OID 0)
-- Dependencies: 204
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- TOC entry 212 (class 1259 OID 16754)
-- Name: customer_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_transaction (
    customer_id integer NOT NULL,
    memo_id integer NOT NULL
);


ALTER TABLE public.customer_transaction OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16713)
-- Name: memo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.memo (
    memo_id integer NOT NULL,
    date date,
    customer_id integer
);


ALTER TABLE public.memo OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16711)
-- Name: memo_memo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.memo_memo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.memo_memo_id_seq OWNER TO postgres;

--
-- TOC entry 2885 (class 0 OID 0)
-- Dependencies: 208
-- Name: memo_memo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.memo_memo_id_seq OWNED BY public.memo.memo_id;


--
-- TOC entry 207 (class 1259 OID 16700)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name character varying(50) NOT NULL,
    type character varying(50),
    brand character varying(50),
    country character varying(50),
    supplier_id integer,
    cost double precision NOT NULL,
    date date NOT NULL,
    place character varying(50) NOT NULL,
    size character varying(50),
    quantity double precision NOT NULL,
    unit character varying(50) NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16698)
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_id_seq OWNER TO postgres;

--
-- TOC entry 2886 (class 0 OID 0)
-- Dependencies: 206
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;


--
-- TOC entry 210 (class 1259 OID 16724)
-- Name: sold_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sold_product (
    memo_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity double precision,
    unit character varying(50),
    selling_price double precision
);


ALTER TABLE public.sold_product OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16684)
-- Name: supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier (
    supplier_id integer NOT NULL,
    supplier_name character varying(60),
    company_name character varying(100),
    address character varying(100),
    mobile_no_1 character varying(20),
    mobile_no_2 character varying(20),
    telephone_no character varying(20),
    email character varying(60)
);


ALTER TABLE public.supplier OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16682)
-- Name: supplier_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supplier_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supplier_supplier_id_seq OWNER TO postgres;

--
-- TOC entry 2887 (class 0 OID 0)
-- Dependencies: 202
-- Name: supplier_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supplier_supplier_id_seq OWNED BY public.supplier.supplier_id;


--
-- TOC entry 211 (class 1259 OID 16739)
-- Name: supplier_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier_transaction (
    supplier_id integer NOT NULL,
    memo_id integer NOT NULL
);


ALTER TABLE public.supplier_transaction OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16779)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(20) NOT NULL,
    password character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16777)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 2888 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2724 (class 2604 OID 16695)
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- TOC entry 2726 (class 2604 OID 16716)
-- Name: memo memo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memo ALTER COLUMN memo_id SET DEFAULT nextval('public.memo_memo_id_seq'::regclass);


--
-- TOC entry 2725 (class 2604 OID 16703)
-- Name: product product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- TOC entry 2723 (class 2604 OID 16687)
-- Name: supplier supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier ALTER COLUMN supplier_id SET DEFAULT nextval('public.supplier_supplier_id_seq'::regclass);


--
-- TOC entry 2727 (class 2604 OID 16782)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2731 (class 2606 OID 16697)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 2741 (class 2606 OID 16758)
-- Name: customer_transaction customer_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_transaction
    ADD CONSTRAINT customer_transaction_pkey PRIMARY KEY (customer_id, memo_id);


--
-- TOC entry 2735 (class 2606 OID 16718)
-- Name: memo memo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memo
    ADD CONSTRAINT memo_pkey PRIMARY KEY (memo_id);


--
-- TOC entry 2733 (class 2606 OID 16705)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- TOC entry 2737 (class 2606 OID 16728)
-- Name: sold_product sold_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sold_product
    ADD CONSTRAINT sold_product_pkey PRIMARY KEY (memo_id, product_id);


--
-- TOC entry 2729 (class 2606 OID 16689)
-- Name: supplier supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (supplier_id);


--
-- TOC entry 2739 (class 2606 OID 16743)
-- Name: supplier_transaction supplier_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_transaction
    ADD CONSTRAINT supplier_transaction_pkey PRIMARY KEY (supplier_id, memo_id);


--
-- TOC entry 2743 (class 2606 OID 16784)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2750 (class 2606 OID 16759)
-- Name: customer_transaction customer_transaction_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_transaction
    ADD CONSTRAINT customer_transaction_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- TOC entry 2751 (class 2606 OID 16764)
-- Name: customer_transaction customer_transaction_memo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_transaction
    ADD CONSTRAINT customer_transaction_memo_id_fkey FOREIGN KEY (memo_id) REFERENCES public.memo(memo_id);


--
-- TOC entry 2745 (class 2606 OID 16719)
-- Name: memo memo_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memo
    ADD CONSTRAINT memo_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);


--
-- TOC entry 2744 (class 2606 OID 16706)
-- Name: product product_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(supplier_id);


--
-- TOC entry 2746 (class 2606 OID 16729)
-- Name: sold_product sold_product_memo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sold_product
    ADD CONSTRAINT sold_product_memo_id_fkey FOREIGN KEY (memo_id) REFERENCES public.memo(memo_id);


--
-- TOC entry 2747 (class 2606 OID 16734)
-- Name: sold_product sold_product_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sold_product
    ADD CONSTRAINT sold_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- TOC entry 2749 (class 2606 OID 16749)
-- Name: supplier_transaction supplier_transaction_memo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_transaction
    ADD CONSTRAINT supplier_transaction_memo_id_fkey FOREIGN KEY (memo_id) REFERENCES public.memo(memo_id);


--
-- TOC entry 2748 (class 2606 OID 16744)
-- Name: supplier_transaction supplier_transaction_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_transaction
    ADD CONSTRAINT supplier_transaction_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(supplier_id);


-- Completed on 2019-10-22 09:43:49

--
-- PostgreSQL database dump complete
--

