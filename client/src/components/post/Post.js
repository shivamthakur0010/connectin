import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../action/post';
import { useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost,post:{post, loading}}) => {
    const {id} = useParams();
    useEffect(() =>{
        getPost(id);
    },[getPost, id]);
  return loading || post ===null ? <Spinner/> : <>
  <Link to='/posts' className='btn'>Go Back</Link>
  <PostItem post={post} showActions={false}/>
  <CommentForm postId={post._id}/>
  <div className="comments">
    {post.comments.map(comment=>{
      return <CommentItem key={comment._id} comment={comment} postId={post._id}/>
    })}
  </div>
  </>
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}
const mapStateToProps = (state) =>({
    post:state.post,
})

export default connect(mapStateToProps,{getPost})(Post)