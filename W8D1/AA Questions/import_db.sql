DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS question_follows;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS question_likes;

PRAGMA foreign_keys = ON;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL
);

INSERT INTO 
    users (fname, lname)
VALUES 
    ("Jesse", "Striker"),
    ("Majid", "Moussa"),
    ("John", "Doe"),
    ("Bob", "Ross");

    
CREATE TABLE questions( 
id INTEGER PRIMARY KEY,
title VARCHAR(255) NOT NULL,
body TEXT NOT NULL,
author_id INTEGER NOT NULL,

FOREIGN KEY (author_id) REFERENCES users(id)
);

INSERT INTO  
questions (title,body,author_id)
SELECT 
"Jesse Question",
"What is SQL?", 
users.id
FROM 
users
WHERE 
users.fname = "Jesse" AND users.lname = "Striker";

INSERT INTO  
questions
    (title,body,author_id)
SELECT
    "Majid Question",
    "Why is SQL?",
    users.id
FROM
    users
WHERE 
users.fname = "Majid" AND users.lname = "Moussa";

INSERT INTO  
questions
    (title,body,author_id)
SELECT
    "John Question",
    "How is SQL?",
    users.id
FROM
    users
WHERE 
users.fname = "John" AND users.lname = "Doe";

INSERT INTO  
questions
    (title,body,author_id)
SELECT
    "Bob Question",
    "Where is SQL?",
    users.id
FROM
    users
WHERE 
users.fname = "Bob" AND users.lname = "Ross";

INSERT INTO  
questions
    (title,body,author_id)
SELECT
    "Jesse Question 2",
    "But why?",
    users.id
FROM
    users
WHERE 
users.fname = "Jesse" AND users.lname = "Striker";

CREATE TABLE question_follows(
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

INSERT INTO     
    question_follows (user_id, question_id)
VALUES 
    ((SELECT id FROM users WHERE fname = "Majid" AND lname = "Moussa"),
    (SELECT id FROM questions WHERE title = "Majid Question")),

    ((SELECT id FROM users WHERE fname = "Jesse" AND lname = "Striker"),
    (SELECT id FROM questions WHERE title = "Jesse Question"));

CREATE TABLE replies(
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  parent_reply_id INTEGER ,
  author_id INTEGER NOT NULL,
  body TEXT NOT NULL,

  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (parent_reply_id) REFERENCES replies(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);


INSERT INTO replies 
(question_id, parent_reply_id,author_id,body)
VALUES
(
(select id from questions where title = 'Jesse Question'),
NULL,
(select id from users where fname= 'Majid' and lname = 'Moussa'),
"Structured Query Language."
);

INSERT INTO replies 
(question_id, parent_reply_id,author_id,body)
VALUES
(
(select id from questions where title = 'Jesse Question'),
(select id from replies where body = "Structured Query Language."),
(select id from users where fname= 'Jesse' and lname = 'Striker'),
"Makes sense."
);

CREATE TABLE question_likes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO
question_likes (user_id, question_id)
VALUES 
(
(SELECT id FROM users WHERE fname = "John" AND lname = "Doe"),
(SELECT id FROM questions WHERE title = "Jesse Question")
);

INSERT INTO question_likes (user_id, question_id) VALUES (1,2);
INSERT INTO question_likes (user_id, question_id) VALUES (2,3);
INSERT INTO question_likes (user_id, question_id) VALUES (3,4);