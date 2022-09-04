import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGitHubRepos } from '../../action/profile'

const ProfileGitHub = ({username, getGitHubRepos, repos}) => {
    useEffect(()=>{
        getGitHubRepos(username);
    },[getGitHubRepos, username])
  return (
    <div className='profile-github'>
        <h2 className="txt-primary my-1"><i class="fab fa-github"></i>Github Repos</h2>
        {repos===null ? <Spinner/> : <>
        {repos.map((repo)=>{
            return <div key={repo._id} className='repo bg-white p-1 my-1'>
                <div>
                    <h4>
                        <a href={repo.html_url} target='_blank' className='text-decoration-none' rel='noopener noreferrer'>{repo.name}</a>
                    </h4>
                    <p>{repo.description}</p>
                </div>
                <div>
                    <ul className='d-flex flex-column'>
                        <li className="badge badge-primary">
                            Stars: {repo.stargazers_count}
                        </li>
                        <li className="badge badge-dark">
                            Watchers: {repo.watchers_count}
                        </li>
                        <li className="badge badge-light text-dark">
                            Forks: {repo.forks_count}
                        </li>
                    </ul>
                </div>
            </div>
        })}
        
        </>}
    </div>
  )
}

ProfileGitHub.propTypes = {
    getGitHubRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
    username:PropTypes.string.isRequired,
}

const mapStateToProps = state =>({
    repos:state.profile.repos,
})

export default connect(mapStateToProps,{getGitHubRepos})(ProfileGitHub)