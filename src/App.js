import UsersAccordion from "./components/UsersAccordion"
import SearchUser from "./components/SearchUsers"
import {useDebounce} from "use-debounce"
import {useState} from "react"
import Container from "@material-ui/core/Container"
import isEmpty from 'lodash.isempty'

const App = () => {
  const [ searchInput, setSearchInput ] = useState()
  const [ debouncedSearchTerm ] = useDebounce(searchInput, 500)

  return (
    <Container maxWidth='sm' className='mb5'>
      <SearchUser {...{ setSearchInput }} />
      {!isEmpty(debouncedSearchTerm) && <UsersAccordion {...{ debouncedSearchTerm }} />}
    </Container>
  )
}

export default App
