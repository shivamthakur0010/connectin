import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

const ProfileTop = ({profile:{
    status, company, location, website, social, user:{name, avatar}
}}) => {
  return (
    <div class="profile-top bg-primary p-2">
      <img
        class="round-img my-1"
        src={avatar}
        alt=""
      />
      <h1 class="large">{name}</h1>
      <p class="lead">{status} {company && <span> at {company}</span>}</p>
      <p>{location && <span>{location}</span>}</p>
      <div class="icons my-1">
        {website && (
        <Link to={website} target="_blank" rel="noopener noreferrer">
          <i class="fas fa-globe fa-2x"></i>
        </Link>
        )}
        {social && social.twitter && (
        <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-twitter fa-2x"></i>
        </Link>
        )}
        {social && social.facebook && (
        <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-facebook fa-2x"></i>
        </Link>
        )}
        {social && social.linkedin && (
        <Link to={social.linkedin} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin fa-2x"></i>
        </Link>
        )}
        {social && social.youtube &&(
        <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-youtube fa-2x"></i>
        </Link>
        )}
        {social && social.instagram &&(
        <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram fa-2x"></i>
        </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
    profiles:PropTypes.object.isRequired,
};

export default ProfileTop;
