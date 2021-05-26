import React, { useEffect } from 'react'
import LeftBar from './components/LeftBar'
import './App.css'

import Login from './components/pages/Login'
import Topbar from './components/Topbar'
import AddNews from './components/pages/AddNews'
import ViewNews from './components/pages/ViewNews'
import ViewTeams from './components/pages/ViewTeams'
import ViewMatches from './components/pages/ViewMatches'
import EditMatch from './components/pages/EditMatch'
import ViewTournaments from './components/pages/ViewTournaments'
import Feedback from './components/pages/Feedback'
import ViewBugs from './components/pages/ViewBugs'
import ViewExercises from './components/pages/ViewExercises';
import AddExercise from './components/pages/AddExercise';
import ViewInjuries from './components/pages/ViewInjuries';
import AddInjury from './components/pages/AddInjury';
import ViewUsers from './components/pages/ViewUsers';
import ViewGrounds from './components/pages/ViewGrounds';
import AddGround from './components/pages/AddGround';
import cookieParser from './utils/cookieParser'

import { request } from './utils/request'

const admin = JSON.parse(localStorage.getItem('admin') || '{}');
const isLoggedIn = cookieParser(document.cookie).type === 'admin';

export default function () {

  const [screen, setScreen] = React.useState('');
  const [base, setBase] = React.useState({isc: {}});
  const [users, setUsers] = React.useState(null);

  const setAppBase = (data, key, isc) => {
    if (isc) {
      base.isc[key] = data;
    }
    else {
      key = key ? key: screen;
      setBase({... base, [key]: data});
    }
  }

  useEffect(() => {
    //console.log(base);
  })

  const BUTTONS = Object.freeze([
    {title: 'Home', onClick : () => setScreen('Home')},
    {title: 'Add News', onClick : () => setScreen('AddNews')},
    {title: 'View News', onClick : () => setScreen('ViewNews')},
    {title: 'View Teams', onClick : () => setScreen('ViewTeams')},
    {title: 'View Matches', onClick : () => setScreen('ViewMatches')},
    {title: 'Edit Match', onClick : () => setScreen('EditMatch')},
    {title: 'View Tournaments', onClick: () => setScreen('ViewTournaments')},
    {title: 'View Feedbacks', onClick: () => setScreen('ViewFeedbacks')},
    {title: 'View Bugs', onClick: () => setScreen('ViewBugs')},
    {title: 'View Exercises', onClick: () => setScreen('ViewExercises')},
    {title: 'Add Exercise', onClick: () => setScreen('AddExercise')},
    {title: 'View Injuries', onClick: () => setScreen('ViewInjuries')},
    {title: 'Add Injury', onClick: () => setScreen('AddInjury')},
    {title: 'View Users', onClick: () => setScreen('ViewUsers')},
    {title: 'View Grounds', onClick: () => setScreen('ViewGrounds')},
    {title: 'Add Ground', onClick: () => setScreen('AddGround')}
  ]);

  if (isLoggedIn) {
  return (
    <>
      <Topbar />
      <LeftBar 
        buttonList = {BUTTONS}
      />
      <div className = 'main-container'>
        <div style = {{display : screen == 'AddNews' ? 'block' : 'none'}}>
          <AddNews base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewNews' ? 'block' : 'none'}}>
          <ViewNews base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewTeams' ? 'block' : 'none'}}>
          <ViewTeams base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewMatches' ? 'block' : 'none'}}>
          <ViewMatches base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'EditMatch' ? 'block' : 'none'}}>
          <EditMatch base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewTournaments' ? 'block' : 'none'}}>
          <ViewTournaments base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewFeedbacks' ? 'block' : 'none'}}>
          <Feedback base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewBugs' ? 'block' : 'none'}}>
          <ViewBugs base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewExercises' ? 'block' : 'none'}}>
          <ViewExercises base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'AddExercise' ? 'block' : 'none'}}>
          <AddExercise base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewInjuries' ? 'block' : 'none'}}>
          <ViewInjuries base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'AddInjury' ? 'block' : 'none'}}>
          <AddInjury base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewUsers' ? 'block' : 'none'}}>
          <ViewUsers base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'ViewGrounds' ? 'block' : 'none'}}>
          <ViewGrounds base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
        <div style = {{display : screen == 'AddGround' ? 'block' : 'none'}}>
          <AddGround base = {base} setBase = {setAppBase} setScreen = {setScreen} />
        </div>
      </div>
    </>
  )
  }
  else {
    return <Login />
  }
}