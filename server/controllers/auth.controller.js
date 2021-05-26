const crypto = require('crypto')
const User = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Email = require('../utils/email');

const {
	createSendToken,
	clearJwtCookie,
	createProtectController,
} = require('../utils/auth')

exports.signup = catchAsync(async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		country,
		state,
		city,
		zip,
		phone,
		company,
		website,
		paypalId,
		address1,
		address2,
		humanKey
	} = req.body
	const newUser = new User({
		firstName,
		lastName,
		email,
		password,
		country,
		state,
		city,
		zip,
		phone,
		company,
		website,
		paypalId,
		address1,
		address2,
    })

	const emailConfirmToken = newUser.createEmailConfirmToken.apply(newUser)
	await newUser.save()
	const url = `${req.protocol}://${req.get(
		'host'
	)}/users/confirmEmail?token=${emailConfirmToken}`
	res.send({ status: 'success' })
	await new Email(newUser, url).sendConfirmation()

});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body
	if (!email || !password) {
		return next(new AppError('Please provide email and password', 400))
	}
	const user = await User.findOne({ email }).select('+password')

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401))
    }

	if (user.status !== 0) {
		return next(
			new AppError(
				'You are blocked by the website',
				403
			)
		)
	}

	if (!user.emailConfirmed) {
		return next(
			new AppError(
				'Email not verified',
				403
			)
		)
	}

	createSendToken(user, 200, req, res)
})

exports.logout = (req, res, next) => {
	clearJwtCookie(res)
	res.status(200).json({ status: 'success' })
}

exports.updatePassword = catchAsync(async (req, res, next) => {
	const { oldPassword, password } = req.body
	if (!oldPassword || !password) {
		return next(
			new AppError(
				'There must be fields oldPassword and password in the post body request',
				400
			)
		)
	}
	// get user from the collection
	const user = await User.findById(req.user.id).select('+password')
	if (!user) {
		return next(new AppError('User could not be found', 404))
	}
	if (!(await user.correctPassword(oldPassword, user.password))) {
		return next(new AppError("Old Password doesn't match", 400))
	}
	user.password = password
	await user.save()
	return res.status(200).json({
		status: 'success',
		message: 'Password changed successfully. Please login to continue.',
	})
	// createSendToken(user, 200, req, res)
})

exports.confirmEmail = catchAsync(async (req, res, next) => {
	/* 
	confirm the email by comapring the hashed token stored in database with the link in email 
	*/
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.query.token)
		.digest('hex')

	const user = await User.findOne({
		emailConfirmToken: hashedToken,
	})
	if (!user) {
		return next(new AppError('Email confirmation token is invalid'))
	}
	user.emailConfirmed = true
	// clear the Token
	user.emailConfirmToken = undefined
	await user.save()
	res.send("Email confirmed successfully. Log In to app.");

	await new Email(user).sendWelcome()
})

exports.protect = createProtectController(User, 'user');