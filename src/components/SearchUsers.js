import TextField from '@material-ui/core/TextField'

const SearchUser = ({ setSearchInput }) => {
  const handleOnChange = (e) => setSearchInput(e.target.value)

  return (
    <div className='pv4 w-100'>
      <TextField
        label='Search username'
        variant='outlined'
        type='search'
        onChange={handleOnChange}
        className='w-100'
      />
    </div>
  )
}

export default SearchUser