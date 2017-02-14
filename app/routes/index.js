/**
 * Created by sito on 01/02/2017.
 */
module.exports = function(app) {
    require('./radioStation')(app);
    require('./schedule')(app);
    require('./player')(app);
    app.get('*', function(req, res){
        res.redirect('/');
    });
};