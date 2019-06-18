import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_year
            launch_success
            rocket {
                rocket_name
            }
        }
    }
`

const LaunchItem = props => {
    const { mission_name, launch_date_local, launch_success } = props.launch
    return (
    <article>
        <header>{`Mission ${mission_name}`}</header>
        <p>{`Date: ${launch_date_local}`}</p>
        <p className='tag'>{launch_success ? 'Success' : 'Fail'}</p>
        <button>Launch Details</button>
    </article>)
}

const Launches = () => {
    return (
        <section>
            <h1>Launches</h1>
            <Query query={LAUNCHES_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <h2>Loading!</h2>
                    if (error) console.log(error)
                    console.log(data)
                    return (
                    <Fragment>
                        {data.launches.map(l => <LaunchItem launch={l} key={l.flight_number}/>)}
                    </Fragment>
                    )
                }}
            </Query>
        </section>
    )
}

export default Launches
