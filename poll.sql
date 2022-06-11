DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR NOT NULL
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    answer VARCHAR NOT NULL,
    vote INT DEFAULT 0 NOT NULL
);

INSERT INTO questions (question) VALUES
('Which operating system do you use?'),
('What is your average screen time per day?');

INSERT INTO answers (question_id, answer, vote) VALUES
(1, 'Windows', 22),
(1, 'MacOS', 30),
(1, 'Linux', 29),
(1, 'Other', 9),
(2, 'Zero to Three', 43),
(2, 'Three to Six', 99),
(2, 'Six to Nine', 130),
(2, 'Nine to Twelve', 88),
(2, 'More', 12),
