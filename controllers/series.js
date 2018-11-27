const labels = [
    { id: 'to-watch', value: 'Para assistir' },
    { id: 'watching', value: 'Assistindo' },
    { id: 'watched', value: 'Assistido' }
]

const index = async ({ Serie }, req, res) => {
    const series = await Serie.find({})
    res.render('series/index', { series, labels })
}

const novaProcess = async ({ Serie }, req, res) => {
    const serie = new Serie(req.body)
    await serie.save()
    res.redirect('/series')
}

const novaForm = (req, res) => {
    res.render('series/nova')
}

const editarForm = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    res.render('series/editar', { serie, labels })
}

const editarProcess = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    serie.name = req.body.name
    serie.status = req.body.status
    await serie.save()

    res.redirect('/series')
}

const excluir = async ({ Serie }, req, res) => {
    await Serie.deleteOne({ _id: req.params.id })
    res.redirect('/series')
}

module.exports = {
    index, novaProcess, novaForm, excluir, editarForm, editarProcess
}