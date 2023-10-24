import model from '../../models';
const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => {
    Promise.all(Object.keys(model).map((modelKey) => {
        return model[modelKey].sync({ alter: isDev })
    }))
        .then(() => {
            console.log('Database Sync!');
            console.log('Tables: ', Object.keys(model))
            console.log('----------------------------')
        })
        .catch((error) => {
            console.log('Database sync error!')
            console.log(error)
        })
}
export default dbInit