const sendJwt = (user, res) => {
    const token = user.generateJwtFromUser();
    return res.status(201).cookie("access_token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 10 * 1000),
        secure: false,
    }).json({
        success: true,
        access_token: token,
        data: {
            name: user.name,
            email: user.email
        }
    });
}

module.exports = { sendJwt };