import axios from "axios";
import {  useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const LIMIT = 5;

const App = () => {
const [users, setUsers] = useState([]);
const [totalUsers, setTotalUsers] = useState(0);
const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:4001/api/users/all', {
      params: {
        page: activePage,
        size: LIMIT
      }
    }).then(({data}) => {
      setActivePage(activePage+ 1);
      setUsers([...users, ...data.records]);
      setTotalUsers(data.total)
    }).catch(error => {
      console.log(error.response);
    })
  }


  return (
    <div className="app">  
        <InfiniteScroll
            dataLength={users.length}
            next={fetchData}
            hasMore={users.length < totalUsers}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center', marginTop: '10px' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
         {users.map(user => (
          <div className="card mt-2" >
          <div className="card-body">
            <div className="userIntro">
              <div className="userTitles">
                <h5 className="card-title">{user.firstName + ' ' + user.lastName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{"@" + user.username}</h6>
              </div>
            <div>
              <img src={user.image}  height={150}/>
            </div>
            </div>
            <p className="card-text"> {user.address.address + ', ' + user.address.city + ', ' + user.address.state + ' ' + user.address.postalCode}</p>
            <a href={user.domain} className="card-link">Domain link</a>
          </div>
        </div>
         ))}
         </InfiniteScroll>
    </div>
  );
};

export default App;
