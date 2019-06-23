import React from 'react'
import {DRAFTS} from '../../apollo/Queries'
import {Query} from 'react-apollo'

import Loading from './Loading';
import ConnectionError from './ConnectionError';
import DraftCarousel from './DraftCarousel';

function Drafts() {
    return (
           <Query query={DRAFTS}  pollInterval={500}>
          {({ loading, error, data }) => {

          if(loading) return <Loading/>
          if(error)  {
              setTimeout(()=>{
                  window.location.reload()
              }, 2000)
              return <ConnectionError/>
          }
          else{
            const {drafts} = data

             return (
               <DraftCarousel drafts={drafts}/>
                 )           
              }
          }}
        </Query>
        )
}

export default Drafts

/**<div className="row m-4">{_.range(drafts.length < 3 ? drafts.length : 3 ).map(i => <DraftItem key={i} {...drafts[i]}/> )}</div> */