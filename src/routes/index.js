import express from "express"
import path from "path"
import urlRoute from "./shortner.routes.js"

const router = express.Router()

const defaultRoutes = [
	{
		name: "urlRoute",
		path: "/url",
		route: urlRoute,
	},
]



defaultRoutes.forEach(({ name, path, route, isProtected }) => {
	try {
	  if (isProtected) {
		router.use(path, auth, route)
	  } else {
		router.use(path, route)
	  }
	} catch (err) {
	  throw new Error(`Failed to mount ${name} at path: ${path}. Error: ${err.message}`)
	}
  })
  

export default router
