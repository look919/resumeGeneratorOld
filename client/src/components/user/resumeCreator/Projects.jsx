import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { projectsUpdate } from '../../../actions/auth';
import { optionUpdate } from '../../../actions/auth';

import InputField from './InputField';
import {
  ProjectIcon,
  WebsiteIcon,
  InfoIcon,
  CalendarIcon,
} from '../../layout/Icons';
import LoadingGIf from '../../../img/loading.gif';

export const Context = React.createContext();

const Projects = ({ user, projectsUpdate, optionUpdate, option }) => {
  if (!user) user = require('../../../utils/defaultUser.json');

  const [formData, setFormData] = useState({
    projectOneName: user.projects[0].name,
    projectOneLink: user.projects[0].url,
    projectOneDesc: user.projects[0].description,
    projectTwoName: user.projects[1].name,
    projectTwoLink: user.projects[1].url,
    projectTwoDesc: user.projects[1].description,
    projectThreeName: user.projects[2].name,
    projectThreeLink: user.projects[2].url,
    projectThreeDesc: user.projects[2].description,
    changes: false,
    loading: false,
  });
  const onChange = (e) => {
    setFormData({
      ...formData,
      changes: true,
      [e.target.name]: e.target.value,
    });
  };
  const setResumeOption = (arg) => {
    optionUpdate(arg);
  };

  const handleSaveDataAndRedirect = async (direction) => {
    setFormData({
      ...formData,
      loading: true,
    });
    if (formData.changes) {
      await projectsUpdate(formData);
      await setFormData({
        ...formData,
        loading: false,
        redirect: direction,
      });
    } else {
      setFormData({
        ...formData,
        loading: false,
        redirect: direction,
      });
    }
  };
  if (formData.redirect === 'next') return <Redirect to={`/user/final`} />;
  if (formData.redirect === 'previous') return <Redirect to={`/user/skills`} />;
  return (
    <div className="resumeCreator__content resumeCreator__content--projects">
      <div className="resumeCreator__content--projects__choose">
        <button
          className="resumeCreator__content--projects__choose__btn"
          onClick={() => setResumeOption('proj')}
        >
          Projects
        </button>
        <h3 className="heading-3">Choose option</h3>
        <button
          className="resumeCreator__content--projects__choose__btn"
          onClick={() => setResumeOption('exp')}
        >
          Work experience
        </button>
      </div>
      <section className="resumeForms resumeForms--projects">
        <div className="resumeForms__project resumeForms__project--1">
          <InputField
            type="text"
            name="projectOneName"
            value={formData.projectOneName}
            Icon={ProjectIcon}
            placeholder="Input__projectOne"
            onChange={onChange}
          />
          <InputField
            name="projectOneLink"
            value={formData.projectOneLink}
            Icon={option === 'proj' ? WebsiteIcon : CalendarIcon}
            text="Input__projectOneLink"
            placeholder="Input__projectOneLink"
            onChange={onChange}
          />
          <div className="textarea__project">
            <FormattedMessage
              id="Input__projectOneDesc"
              defaultMessage="Input__projectOneDesc"
            >
              {(msg) => (
                <textarea
                  autoComplete="new-password"
                  name="projectOneDesc"
                  value={formData.projectOneDesc}
                  placeholder={msg}
                  className="textarea"
                  onChange={(e) => onChange(e)}
                  maxLength={186}
                />
              )}
            </FormattedMessage>
            <p className="resumeForms__field__limit">
              <FormattedMessage
                id="Textarea__limit"
                defaultMessage="Characters limit: "
              />
              {186 - formData.projectOneDesc.length}
            </p>
          </div>
        </div>
        <div className="resumeForms__project resumeForms__project--2">
          <InputField
            name="projectTwoName"
            value={formData.projectTwoName}
            Icon={ProjectIcon}
            text="Input__projectTwo"
            placeholder="Input__projectTwo"
            onChange={onChange}
          />
          <InputField
            name="projectTwoLink"
            value={formData.projectTwoLink}
            Icon={WebsiteIcon}
            text="Input__projectTwoLink"
            placeholder="Input__projectTwoLink"
            onChange={onChange}
          />
          <div className="textarea__project">
            <FormattedMessage
              id="Input__projectTwoDesc"
              defaultMessage="Input__projectTwoDesc"
            >
              {(msg) => (
                <textarea
                  autoComplete="new-password"
                  name="projectTwoDesc"
                  value={formData.projectTwoDesc}
                  placeholder={msg}
                  className="textarea"
                  onChange={(e) => onChange(e)}
                  maxLength={180}
                />
              )}
            </FormattedMessage>
            <p className="resumeForms__field__limit">
              <FormattedMessage
                id="Textarea__limit"
                defaultMessage="Characters limit: "
              />
              {180 - formData.projectTwoDesc.length}
            </p>
          </div>
        </div>
        <div className="resumeForms__project resumeForms__project--3">
          <InputField
            name="projectThreeName"
            value={formData.projectThreeName}
            Icon={ProjectIcon}
            text="Input__projectThree"
            placeholder="Input__projectThree"
            onChange={onChange}
          />
          <InputField
            name="projectThreeLink"
            value={formData.projectThreeLink}
            Icon={WebsiteIcon}
            text="Input__projectThreeLink"
            placeholder="Input__projectThreeLink"
            onChange={onChange}
          />
          <div className="textarea__project">
            <FormattedMessage
              id="Input__projectThreeDesc"
              defaultMessage="Input__projectThreeDesc"
            >
              {(msg) => (
                <textarea
                  autoComplete="new-password"
                  name="projectThreeDesc"
                  value={formData.projectThreeDesc}
                  placeholder={msg}
                  className="textarea"
                  onChange={(e) => onChange(e)}
                  maxLength={115}
                />
              )}
            </FormattedMessage>
            <p className="resumeForms__field__limit">
              <FormattedMessage
                id="Textarea__limit"
                defaultMessage="Characters limit: "
              />
              {115 - formData.projectThreeDesc.length}
            </p>
          </div>
        </div>
      </section>
      <div className="resumeCreator__content__btns">
        <button
          className={`resumeCreator__content__btns__btn resumeCreator__content__btns__btn--previous`}
          onClick={() => handleSaveDataAndRedirect('previous')}
        >
          <FormattedMessage id="Btn.skills" defaultMessage="Skills" />
        </button>
        <div className="resumeCreator__content__btns__info">
          {!formData.loading && (
            <InfoIcon className="resumeCreator__content__btns__info__icon" />
          )}
          <span className="resumeCreator__content__btns__info__text">
            {!formData.loading ? (
              <FormattedMessage
                id="Info.projects"
                defaultMessage="Organize projects from the most important by gradually reducing the amount of text with each subsequent"
              />
            ) : (
              <img
                src={LoadingGIf}
                alt="loading..."
                className="resumeCreator__content__btns__info__loading"
              />
            )}
          </span>
        </div>
        <button
          className={`resumeCreator__content__btns__btn resumeCreator__content__btns__btn--next`}
          onClick={() => handleSaveDataAndRedirect('next')}
        >
          <FormattedMessage id="Btn.download" defaultMessage="Download" />
        </button>
      </div>
    </div>
  );
};

Projects.propTypes = {
  projectsUpdate: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  option: state.auth.option,
});

export default connect(mapStateToProps, { projectsUpdate, optionUpdate })(
  Projects
);
