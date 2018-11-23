import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        //this tells the App what state to listen to and receive it as a prop. In this case, we're making
        //the App container listen to the searchField state, passing it to its prop 'searchField'.
        //By doing this approach via redux, we longer need to define the state within the app class. 
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

//dispatch parameter is what sends the  Action to the Reducer.
const mapDispatchToProps = (dispatch) => {
    //Here we're telling the App container what action I should listen to that needs to be dispatched 
    //to the reducers which is passed to the App's prop 'onSearchChange'.
    //onSearchChange is the name of the prop the App will receive (it can be any name). 
    //We named it onSearchChange because it's the same name as function onSearchChange() in App.js
    //which we used to capture the search field change event.
    //onSearchChange is going to receive an event, because it's an input box that users will type in.  
    //Once it receives the event, it's going to dispatch the setSearchField action, so that the reducer
    //is aware of it. Also when the setSearchField action gets dispatched, it's going to listen to/ or 
    //receive a text as a param (i.e. whatever the user has inputted). We pass it event.target.value
    //same as we did in the onSearchChange() function. Because the event we capture has the property 
    //target.value which gives us the text in the search field.
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
         });
         return isPending ? 
            <h1 className='tc'>Loading...</h1> : 
         (
            <div className='tc'>
                <h1 className='f1'>Robot Friends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary> 
                </Scroll>
            </div>
        );
    }
}

//the connect function which we imported from react-redux module, will connect the Redux store to each 
//Container (or smart component), which is what we're doing in the statement below - where App container 
//we're using connect() function (which is a higher order function - meaning it returns another function)
//connects the App to the Redux store. The bracket around the App is because the connect() function 
//returns another function, and that function is where the App container is passed to as a param.
//The app container is now connected and subcribes to any state changes in the Redux store.
//connect() function takes two params - mapStateToProps and mapDispatchToProps.
//This is basically where we need to tell the app what STATE and what action (which needs to be dispatched)
//to the Reducer) it needs to be lookout for.
//To do this, we define at the top of this file, just before App class definition, mapStateToProps and 
//mapDispatchToProps. By defining these function, connect will be able to pass the state and action that
//the App should lookout for as props for the App. 
export default connect(mapStateToProps, mapDispatchToProps)(App);