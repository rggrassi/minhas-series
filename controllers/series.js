const index = (req, res) => {
    res.render('series/index')
}

const nova = (req, res) => {
    res.render('series/nova')
}

module.exports = {
    index, nova
}