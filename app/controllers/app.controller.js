const REDIRECT_LOGIN = "/user/login";

exports.dashboard = async(req, res) => {
    const uid = res.locals.uid;
    res.redirect(`/app/dashboard/${uid}`) // passando uid como url param
}

exports.dashboardId = async(req, res) => {
        if (req.session.userData) {
            res.render('dashboard', { userData: req.session.userData});
        } else {
            res.redirect(REDIRECT_LOGIN);
        }
    };
