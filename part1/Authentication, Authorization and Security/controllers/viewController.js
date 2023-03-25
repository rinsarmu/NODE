exports.getBase = (req,res,next)=>{
    res.status(200).render('base', {
        text: 'this is natours app'
    })
}

exports.getOverview =  (req,res,next)=>{
    res.status(200).render('overview', {
        title: 'All tours'
    })
}

exports.getTour =  (req,res,next)=>{
    res.status(200).render('tour', {
        title: 'The forest Hiker'
    })
}