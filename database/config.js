import mongoose from 'mongoose'

const dbconnection = async() => {
  try {

    await mongoose.connect(process.env.mongodb,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndMOdify: false
    })

    console.log('Base De Datos Online')

  } catch (error) {
    throw new Error('Error al iniciar la BD')

  }

}
export { dbconnection }