import React,{useState, useEffect, useCallback} from 'react';
import Detail from './detail';
import classes from './details.module.css';
import Spinner from '../../components/UI/spinner/spinner';
import {CSSTransition} from 'react-transition-group';
import '../../animation.css';
import styled from 'styled-components';
import useWindowDimensions from '../../customHooks/window.js';

const animations ={
  enter: '',
  enterActive: 'animate-enter-active',
  exit: '',
  exitActive: 'animate-exit-active'
}

const Container = styled.div(props =>`
  display: ${props.width > 800? 'flex': 'grid'}
`)

const Maincontainer = styled.div(props =>`
  display: grid;
  grid-auto-flow: column;
  background-color: #fff;
  padding: 2rem 4rem;
  border-radius: 1.5rem;
  position: absolute;
  width: 65vw;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.15);
  transition: all .5s cubic-bezier(0.550, 0.085, 0.680, 0.530);

  @media (max-width: 50em){
    grid-auto-flow: row;
    top: ${props.width > 800 || props.full ? '180%' : '100%'};
    width: 65vw;
    display: block;
    padding: 1rem 4rem;
  }

`)

const Details = props =>{

  const [full, setFull] = useState(true);
  const dimension = useWindowDimensions()[0];


  const showFullHandler = useCallback(() => {
    if(dimension.width > 800) {
      setFull(true);
      return;
    }
    setFull(prevState => !prevState);

  },[dimension.width]);


    useEffect(() =>{

    showFullHandler();

  },[dimension.width, showFullHandler])


  let show = (
    
      <Maincontainer onClick={showFullHandler} width={dimension.width} full={full}>
        <Detail name="IpAddress" detail={props.ip} style={classes.detail} />

        <CSSTransition in={full}
          mountOnEnter 
          timeout={500}
          unmountOnExit 
          classNames={animations}>

          <Container width={dimension.width}>
            <Detail name="Location" detail={props.location} style={classes.detail} />
            <Detail name="Timezone" detail={props.timezone} style={classes.detail} />
            <Detail name="Isp" detail={props.isp} style={classes.detail} />
          </Container>
              
        </CSSTransition>
      </Maincontainer>

    )
  if(props.isLoading)
    show = <Spinner />

  return show;
}

export default Details;
