import React from 'react'
import {DRAFTS} from '../../apollo/Queries'
import {Query} from 'react-apollo'
import _ from 'lodash'
import DraftItem from './DraftItem';

function Drafts() {
    return (
           <Query query={DRAFTS}>
          {({ loading, error, data }) => {

          if(loading) return <div>Loading...</div>
          if(error)  {
              setTimeout(()=>{
                  window.location.reload()
              }, 2000)
              return <div>Network error...</div>
          }
          else{
            const {drafts} = data


             return (<div className="row m-2">{_.range(drafts.length < 3 ? drafts.length : 3 ).map(i => <DraftItem key={i} {...drafts[i]}/> )}</div>)
            
              }
          }}
        </Query>
        )
}

export default Drafts