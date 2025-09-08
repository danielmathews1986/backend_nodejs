import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router()

router.use(limiter)

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.createAccount)

router.post('/confirm-account',
    body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('token no válido'),
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .notEmpty().withMessage('El password es obliglatorio'),
    handleInputErrors,
    AuthController.login
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    AuthController.forgotPassword

)

router.post('/validate-token',
    body('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('token no válido'),
    AuthController.validateToken
)

router.post('/reset-password/:token',
    param('token')
        .notEmpty()
        .isLength({ min: 6, max: 6 })
        .withMessage('token no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
    handleInputErrors,
    AuthController.resetPasswordWithToken2
)


router.get('/user',
    authenticate,
    AuthController.user)

router.post('/update-password',
    authenticate,
    body('current_password')
    .notEmpty().withMessage('El password actual no puede ir vacio'),
    body('password')
    .isLength({ min: 8 }).withMessage('El password nuevo es muy corto, mínimo 8 caracteres'),
    handleInputErrors,
    AuthController.updateCurrentUserPassword)

    
router.post('/check-password',
    authenticate,
    body('password')
    .notEmpty().withMessage('El password actual no puede ir vacio'),
    handleInputErrors,
    AuthController.checkPassword)


export default router