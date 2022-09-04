import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getPosts } from '../../action/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({getPosts, post:{posts, loading}}) => {
    useEffect(() =>{
        getPosts()
        console.log(getPosts());
    },[getPosts]);
  return loading ? <Spinner/> : (
    <>
    <h1 className="large text-primary">Posts</h1>
    <p className="lead">
      <i className="fas fa-user"></i>{' '}Welcome to the community
    </p>
    {/* post form */}
    <PostForm/>
    {posts===null ? <h1>No Post</h1> : <div className="posts">
      {posts.map(post =>{
        return <PostItem key={post._id} post={post}/>
})}
    </div>}

    </>
  )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    post:state.post,
})

export default connect(mapStateToProps,{getPosts})(Posts)