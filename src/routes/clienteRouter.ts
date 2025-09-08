import { Router } from 'express'
import { ClienteController } from '../controllers/ClienteController'
import { TarjetaController } from '../controllers/TarjetaController'
import { authenticate } from '../middleware/auth'
import { hasAccess, validateClienteId, validateClienteExists } from '../middleware/cliente'
// import { validateTarjetaExists, validateTarjetaId, validateTarjetaInput } from '../middleware/tarjeta'

const router = Router()

router.use(authenticate) // user.id

router.param('clienteId', validateClienteId)
router.param('clienteId', validateClienteExists)
router.param('clienteId', hasAccess)

// router.param('tarjetaId', validateTarjetaId)
// router.param('tarjetaId', validateTarjetaExists)

// cliente
router.get('/', ClienteController.getAll)
router.post('/',ClienteController.addCliente)
router.get('/:clienteId', ClienteController.getById)
router.put('/:clienteId', ClienteController.updateClientById)
// router.delete('/:clienteId', ClienteController.deleteById)

// tarjetas
// Ruta para crear tarjeta de cliente, sin middlewares restrictivos para depuración
router.post('/:clienteId/tarjetas', TarjetaController.create);

export default router