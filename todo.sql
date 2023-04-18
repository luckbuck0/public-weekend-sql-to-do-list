CREATE TABLE "toDoList" (

	"id" SERIAL PRIMARY KEY,
	"date" DATE ,
	"todo" VARCHAR(100),
	"is_Complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "toDoList"
	("todo","date")
	VALUES
  ('Get some groceries','20230417');