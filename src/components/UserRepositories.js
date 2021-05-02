import React from "react"
import isEmpty from "lodash.isempty"

const UserRepositories = ({ repositories: { edges } }) => (
  <>
    {isEmpty(edges) && <span>No Repositories</span>}
    {!isEmpty(edges) && (
      <div>
        <h2 className='ml4 underline'>User Repositories</h2>
        <ul className='list'>
          {edges.map(({ node: { url, name }}, index) => (
            <li key={index} className='mb2'>
              <a href={url} className='black hover-blue no-underline underline-hover f5'>
                { name }
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
)

export default UserRepositories