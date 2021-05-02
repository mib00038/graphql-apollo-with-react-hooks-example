import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { GET_USERS } from "../graphql/queries"
import UserRepositories from "./UserRepositories"
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MuiAvatar from "@material-ui/core/Avatar"
import isEmpty from 'lodash.isempty'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    },
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails)

const Avatar = withStyles(( theme) => ({
  circle: {
    height: '4rem',
    width: '4rem'
  }
}))(MuiAvatar)

const UsersAccordion = ({ debouncedSearchTerm }) => {
  const [expanded, setExpanded] = useState()
  const { data , loading, error } = useQuery(GET_USERS, { variables: { search_term: debouncedSearchTerm }})
  const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false)

  error && console.error(error)

  if (loading || isEmpty(data)) return null

  const { search: { edges }} = data

  return (
    <>
      {edges.map(({ node: { login, avatarUrl,  repositories }}) => (
        <Accordion
          key={login}
          square
          expanded={expanded === login}
          onChange={handleChange(login)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon fontSize='large'/>}
          >
            <div className='flex items-center w-100'>
              <Avatar alt='user avatar' src={avatarUrl} />
              <div className='ml3 f4'>{ login }</div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <UserRepositories {...{ repositories }} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}



export default UsersAccordion