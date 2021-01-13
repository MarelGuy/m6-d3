const express = require("express")
const ArticleModel = require("../schemas/article_schema")

const app = express.Router()

app.get('/', async (req, res, next) => {
    try {
        const articles = await ArticleModel.find()
        res.status(200).send(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
});
app.get('/:id', async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id)
        if (article) {
            res.status(200).send(article)
        } else {
            res.status(404).send("Error 404, data not found")
        }

    } catch (err) {
        console.log(err)
        next(err)
    }
});
app.post('/', async (req, res, next) => {
    try {
        const newArticle = new ArticleModel(req.body)

        const { _id } = await newArticle.save()
        res.status(200).send("Created!")
    } catch (err) {
        console.log(err)
        next(err)
    }
});
app.put('/:id', async (req, res, next) => {
    try {
        const modifiedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        })
        if (modifiedArticle) {
            res.status(200).send("Data changed!")
        } else {
            next()
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
});
app.delete('/:id', async (req, res, next) => {
    try {
        const DeletedArticle = await ArticleModel.findByIdAndDelete(req.params.id)
        if (DeletedArticle) {
            res.status(200).send("Data deleted!")
        } else {
            next()
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
});

module.exports = app