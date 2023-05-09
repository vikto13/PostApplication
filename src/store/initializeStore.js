import Article from './storeSlices/Article'
import Author from './storeSlices/Author'
import Message from './storeSlices/Message'
import Alert from './storeSlices/Alert'
import Pagination from './storeSlices/Pagination'
export const inilializeStore = {
    modules: {
        Article,
        Author,
        Message,
        Alert,
        Pagination
    }
}

