import React,{useState, useEffect} from 'react';
import Input from '../../components/input/input.js';
import axios from 'axios';
import classes from './search.module.css';
import Details from '../../components/details/details';
import Maps from '../../components/map/map';
import {ReactComponent as ArrowSvg} from '../../images/icon-arrow.svg';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import {CSSTransition} from 'react-transition-group';
import '../../animation.css';

const animations ={
  enter: '',
  enterActive: 'animate-enter-active',
  exit: '',
  exitActive: 'animate-exit-active'
}



const Search = props =>{
  const [ip, setIp] = useState('');
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}`)
      .then(fetchedData => {
          const data = fetchedData.data;

          const coordinatesData =[data.location.lat, data.location.lng];

          setIp(data.ip);
          setCoordinates(coordinatesData);
          setLocation(`${data.location.city}, ${data.location.region}, ${data.location.postalCode}`);
          setTimezone(`${data.location.timezone}`);
          setIsp(`${data.isp}`)
          setLoading(false);

      })
      .catch(err =>{
        setError(err.message);
      })
    
  }, [])

  const ipHandler = (event) =>{
    const value = event.target.value;

    setIp(value);
  }

  const sendRequest = (event ) =>{

    event.preventDefault();
    setDetailsLoading(true);

    const webRegex = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/g;
    const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;

    const ipAddress = ip;


    let url = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=`;

    if(ip.match(webRegex)){
      url = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&domain=`
    }
    if(ip.match(emailRegex)){
      url = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&email=`
    }

    axios.get(url+ipAddress)
      .then(fetchedData =>{

        const data = fetchedData.data;

        const coordinatesData =[data.location.lat, data.location.lng];

        setIp(data.ip);
        setCoordinates(coordinatesData);
        setLocation(`${data.location.city}, ${data.location.region}, ${data.location.postalCode}`);
        setTimezone(`${data.location.timezone}`);
        setIsp(`${data.isp}`)
        setDetailsLoading(false);
      })
      .catch(err => {
        setError(err.message);
      });
  }

  let show;

  if(isLoading){
    show =(<Spinner />)
  }else{
    show =(
    
    <CSSTransition in={!isLoading}
      classNames={animations}
      timeout={500}
      mountOnEnter
      unmountOnExit
      >
      <React.Fragment>
      <div className={classes.searchDetails}>
      <h2 className="heading-md color-white">IP Address tracker</h2>
      <div className={classes.input}>
        <Input change={(e) => ipHandler(e)} value={ip} placeholder='search a domain or an ip address'/>
        <button onClick={sendRequest}  className={classes.btn}>
          <i className="icon">
            <ArrowSvg />
          </i>
        </button>
      </div>
      <Details ip ={ip} location={location} timezone={timezone} isp={isp} isLoading={detailsLoading}/>
    </div>
      <Maps coordinates={coordinates} location={location}/>
      </React.Fragment>
    </CSSTransition>
     
    )
  }

  if(error){
    show = error;
  }

  

  return (
      <div className= {classes.search}>
        {show}
      </div>
    )
}

export default withErrorHandler(Search, axios);
