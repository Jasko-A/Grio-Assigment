
/* This array is just for testing purposes.  You will need to 
   get the real image data using an AJAX query. */

const photos = [
{src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/A%20Torre%20Manuelina.jpg", width: 574, height: 381 },
{src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Uluru%20sunset1141.jpg", width: 500 , height: 334 },
{src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Sejong tomb 1.jpg", width: 574, height: 430},
{src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Serra%20da%20Capivara%20-%20Painting%207.JPG", width: 574, height: 430},
{src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Royal%20Palace%2c%20Rabat.jpg", width: 574, height: 410},
{src: "http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Red%20pencil%20urchin%20-%20Papahnaumokukea.jpg", width: 574 , height: 382 }
];



// A react component for a tag
class Tag extends React.Component {

    render () {
	return React.createElement('p',  // type
	    { className: 'tagText'}, // properties
	   this.props.text);  // contents
    }
};


// A react component for controls on an image tile
class TileControl extends React.Component {

    render () {
	// remember input vars in closure
        var _selected = this.props.selected;
        var _src = this.props.src;
        // parse image src for photo name
	var photoName = _src.split("/").pop();
	photoName = photoName.split('%20').join(' ');

        return ( React.createElement('div', 
 	 {className: _selected ? 'selectedControls' : 'normalControls'},  
         // div contents - so far only one tag
              React.createElement(Tag,
		 { text: photoName })
	    )// createElement div
	)// return
    } // render
};


// A react component for an image tile
class ImageTile extends React.Component {

    render() {
	// onClick function needs to remember these as a closure
	var _onClick = this.props.onClick;
	var _index = this.props.index;
	var _photo = this.props.photo;
	var _selected = _photo.selected; // this one is just for readability

	return (
	    React.createElement('div', 
	        {style: {margin: this.props.margin, width: _photo.width},
			 className: 'tile',
                         onClick: function onClick(e) {
			    console.log("tile onclick");
			    // call Gallery's onclick
			    return _onClick (e, 
					     { index: _index, photo: _photo }) 
				}
		 }, // end of props of div
		 // contents of div - the Controls and an Image
		React.createElement(TileControl,
		    {selected: _selected, 
		     src: _photo.src}),
		React.createElement('img',
		    {className: _selected ? 'selected' : 'normal', 
                     src: _photo.src, 
		     width: _photo.width, 
                     height: _photo.height
			    })
				)//createElement div
	); // return
    } // render
} // class

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
        		React.createElement('input', {type: 'text', ref: 'username', placeholder: 'Username'}),
        		React.createElement('input', {type: 'password', ref: 'password', placeholder: 'Password'}),
        		React.createElement('input', {type: 'submit', value: 'Log In', id: 'login-button'})
        	)

      );
  }
}

class Counter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      popup: 0,
      count: 0
    };
    this.incrementer = this.incrementer.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
      this.setState({popup: 1})
      console.log("State of popup is: " + this.state.popup);
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
    this.setState({count: currCount})
  }


  
	render () {
    // if(this.state.popup == 0)
    // {
      var count = this.props.count;
      console.log(count);
      return (
        React.createElement('div',{className: this.props.className, id: 'count-display'},
            React.createElement('h2', {id: 'count-title'}, "The count is: " + this.state.count),
            React.createElement('button', {type: 'button', id: 'increment-button', onClick: this.onButtonClick.bind(this)}, "Increment ?")
        )
        
        
      );
    // }
    // else {
    //   React.createElement(Popup,{inc: this.incrementer.bind(this)})
    // }
		
	}
}

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}
// The react component for the whole image gallery
// Most of the code for this is in the included library
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { logInInfo: null,
    							 tempUser: 'Jasmin',
    							 tempPass: 'Grio@SF'
    						 }; //JSON object
    
  }
  //changes the state after login success
  logIn(user, pass)
  {
  	console.log(user);
  	console.log(pass);
  	if(user == this.state.tempUser && pass == this.state.tempPass)
  	{
  		console.log("PASSED1");
  		this.setState({
  				logInInfo: {
  					user,
  					pass,
  				}
  		})
  		console.log("PASSED2");
  	}
  	

  }
  // selectTile(event, obj) {
  //   console.log("in onclick!", obj);
  //   let photos = this.state.photos;
  //   photos[obj.index].selected = !photos[obj.index].selected;
  //   this.setState({ photos: photos });
  // }

  render() {
    if(this.state.logInInfo === null)
    {
      return React.createElement('div',  // type
      { className: 'formContainer'}, // properties
        React.createElement(Login, {onLogIn: this.logIn.bind(this)})  
      );  
    }
    else {
    	console.log("GOING ONTO THE NEXT");
    	return(
    		React.createElement(Counter,{className:'main-body'})
    	);
    }
  }  
};


/* Finally, we actually run some code */

const reactContainer = document.getElementById("main-display");

var reactApp = ReactDOM.render(React.createElement(App),reactContainer);
//duct tape
window.dispatchEvent(new Event('resize'));

function updateImages()
{
  var reqIndices = document.getElementById("req-text").value;
  console.log(reqIndices);
  reqIndices = reqIndices.trim();
  console.log(reqIndices);

  if (!reqIndices) return; // No query? Do nothing!

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/query?numList=" + reqIndices.replace(/ |,/g, "+")); // We want more input sanitization than this!
  xhr.addEventListener("load", (evt) => {
    if (xhr.status == 200) {
    	console.log(xhr.responseText);
    	var imgObj = xhr.responseText.split("pFilename").join("src");
        reactApp.setState({photos:JSON.parse(imgObj)});
        window.dispatchEvent(new Event('resize')); /* The world is held together with duct tape */
    } else {
        console.log("XHR Error!", xhr.responseText);
    }
  } );
  xhr.send();
}











