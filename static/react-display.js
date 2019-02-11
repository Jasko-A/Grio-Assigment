/*Create by Jasmin Adzic*/

//component for main Login screen
class Login extends React.Component {
	
  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onLogIn(username, password)
  }		
  
  render () {
    return(
        React.createElement('form',{onSubmit: this.handleSignIn.bind(this)},
        		React.createElement('h2',{id: 'title'},"Log In"),
        		React.createElement('input', {type: 'text', className: 'input-box', id: 'input-user', ref: 'username', placeholder: 'Username'}),
        		React.createElement('input', {type: 'password', className: 'input-box', id: 'input-pass', ref: 'password', placeholder: 'Password'}),
        		React.createElement('input', {type: 'submit', value: 'Log In', id: 'login-button'})
        	)

      );
  }
}

//Compnonet for screen after login including the popup
class Counter extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      popup: 0,
      count: 0,
      tempCount: 0
    };
    this.incrementer = this.incrementer.bind(this);
    this.onPopup = this.onPopup.bind(this);
    this.keepCount = this.keepCount.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  keepCount (){
    this.setState({popup: 0})
  }
  updateCount () {
    this.setState({count: this.state.tempCount, popup: 0})
  }
  
  onPopup() {
    axios.post('?'+this.state.count, this.state.count).then(res => {
      this.setState({tempCount: res.data, popup: 1})
    });
  }

  incrementer() {
    var currCount = this.state.count;
    var nextCount;
    if(currCount == 0)
    {
      nextCount = 1;
    }
    else {
      nextCount = currCount * 2
    }
    currCount = nextCount;
    this.setState({tempCount: currCount})
  }


  
	render () {

      console.log("Pop up state: " + this.state.popup);
      return (
        React.createElement('div',{className: this.props.className, id: 'count-display'},
            React.createElement('h2', {id: 'user-name'}, "Welcome " + this.props.username + ' !'),
            React.createElement('h2', {id: 'count-title'}, "The count is: " + this.state.count),
            React.createElement('button', {type: 'button', id: 'popup-button', onClick: this.onPopup.bind(this)}, "Increment ?"),
            React.createElement('button', {type: 'button', id: 'logout-button', onClick: this.props.onLogOut}, "Log Out"),
            React.createElement('div',{className: "popup", style:{display: (this.state.popup) ? 'flex' : 'none'}},
                  React.createElement('div',{id:"popup-main"}, 
                      React.createElement('div',{id:"curr-count"},
                        React.createElement('h3',{id:"curr-count-heading"},"Current Count: " + this.state.count),
                        React.createElement('button', {type: 'button', className: 'hvr-sweep-to-right', id: 'inc-button', onClick: this.keepCount.bind(this)}, "Cancel")
                      ),
                      React.createElement('div',{id:"next-count"},
                        React.createElement('h3',{id:"next-count-heading"},"Next Count: " + this.state.tempCount),
                        React.createElement('button', {type: 'button', className: 'hvr-sweep-to-left', id: 'inc-button', onClick: this.updateCount.bind(this)}, "Confirm")
                      )
                  )
              )
        )
      );  	
	}
}


// The react component for the App
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { logInInfo: null,
    							 tempUser: 'Jasmin',
    							 tempPass: 'Grio@SF'
    						 };
    
  }
  //changes the state after login success
  logIn(user, pass)
  {
  	console.log(user);
  	console.log(pass);
    axios.post('?'+ user +'/'+ pass).then(res => {
      console.log(res.data);
      this.setState({logInInfo: res.data})
    });
  }

  logOut()
  {
    this.setState({logInInfo: null})
  }

  render() {
    if(this.state.logInInfo === null)
    {
      return React.createElement('div',  // type
      { className: 'formContainer'}, // properties
        React.createElement(Login, {onLogIn: this.logIn.bind(this)})//contents  
      );  
    }
    else {
      console.log("Login Succesful!!");
    	return(
    		React.createElement(Counter,{className:'main-body', onLogOut: this.logOut.bind(this), username: this.state.logInInfo.user})
    	);
    }
  }  
};



//start the react App
const reactContainer = document.getElementById("main-display");

var reactApp = ReactDOM.render(React.createElement(App),reactContainer);

window.dispatchEvent(new Event('resize'));












