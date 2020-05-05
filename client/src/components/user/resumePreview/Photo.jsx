import React from 'react';

const Photo = ({ user }) => {
  if (!user) user = require('../../../utils/defaultUser.json');

  return (
    <div className="resumePreview__photo">
      <img
        src={require(`../../../img/users/${user.photo}`)}
        alt="user"
        className="resumePreview__photo__img"
      />
    </div>
  );
};

export default Photo;
