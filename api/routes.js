const express = require("express");
const router = express.Router();
const pgp = require('pg-promise')();
var format = require('pg-format');
const db = pgp("postgres://postgres:admin@localhost:5432/ICA2") 

router.get("/poll/:id", async (req, res) => {

    try {
      const data = await db.any('SELECT answers.id, answers.answer, answers.vote, questions.id AS qid, questions.question FROM questions, answers WHERE questions.id = $1 AND answers.question_id = questions.id ORDER BY answers.id', req.params.id);

      if (data && data.length) {
          
        const payload = {
            id: data[0].qid,
            question: data[0].question,
            answers: data.map(({qid, question, ...keepAttrs}) => keepAttrs)
        }

        res.json(payload);

    } else {
        res.sendStatus(404)
    }

} catch (e) {
    console.error(e);
    res.sendStatus(500);
}

});

router.patch('/poll/answer/:id', async (req,res) => {

    try{
        const data = await db.oneOrNone('Update answers SET vote = vote + 1 WHERE id = $1 RETURNING 1', req.params.id);

        if (data) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }    
});

router.post('/poll', (req,res) => {

    try{
        db.task(async t => {
            const data = await t.oneOrNone('INSERT INTO questions (question) VALUES ($1) RETURNING id', req.body.question);

            if (data) {
                let sql = 'INSERT INTO answers (answer, question_id) VALUES ';
                for (let i = 0; i < req.body.answers.length; i++) {
                    sql += format('(%L, %L), ', req.body.answers[i], data.id);
                }
                sql = sql.slice(0, -2);
                await t.none(sql);
                res.json(data);

                } else {
                    res.sendStatus(404)
                }
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }    
});
   

module.exports = router;
